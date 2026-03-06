import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-8e4e7d99/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTHENTICATION ============

// Create default admin user on startup
async function createDefaultAdmin() {
  try {
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const adminExists = existingUser?.users?.some(u => u.email === "email@kukacast.com");
    
    if (!adminExists) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: "email@kukacast.com",
        password: "123456",
        email_confirm: true,
        user_metadata: {
          role: "admin",
          nome: "Administrador"
        }
      });
      
      if (error) {
        console.log("Error creating default admin:", error);
      } else {
        console.log("Default admin user created successfully");
      }
    }
  } catch (error) {
    console.log("Error in createDefaultAdmin:", error);
  }
}

// Call on startup
createDefaultAdmin();

// Admin signup endpoint
app.post("/make-server-8e4e7d99/admin/signup", async (c) => {
  try {
    const { email, password, nome } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "admin",
        nome
      }
    });
    
    if (error) {
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log("Admin signup error:", error);
    return c.json({ error: "Failed to create admin user" }, 500);
  }
});

// Admin login (uses standard Supabase client-side signInWithPassword)

// Participant registration
app.post("/make-server-8e4e7d99/participantes/register", async (c) => {
  try {
    const { nome, email, telefone, data_nascimento, cidade } = await c.req.json();
    
    if (!nome || !email || !telefone || !data_nascimento || !cidade) {
      return c.json({ error: "Todos os campos são obrigatórios" }, 400);
    }
    
    const participante = {
      id: crypto.randomUUID(),
      nome,
      email,
      telefone,
      data_nascimento,
      cidade,
      data_cadastro: new Date().toISOString(),
      role: "participante"
    };
    
    // Store in KV store
    await kv.set(`participante:${participante.id}`, participante);
    await kv.set(`participante:email:${email}`, participante.id);
    
    return c.json({ success: true, participante });
  } catch (error) {
    console.log("Registration error:", error);
    return c.json({ error: "Falha ao registrar participante" }, 500);
  }
});

// Participant login
app.post("/make-server-8e4e7d99/participantes/login", async (c) => {
  try {
    const { email, data_nascimento } = await c.req.json();
    
    if (!email || !data_nascimento) {
      return c.json({ error: "Email e data de nascimento são obrigatórios" }, 400);
    }
    
    // Get participant by email
    const participanteId = await kv.get(`participante:email:${email}`);
    
    if (!participanteId) {
      return c.json({ error: "Participante não encontrado" }, 404);
    }
    
    const participante = await kv.get(`participante:${participanteId}`);
    
    if (!participante) {
      return c.json({ error: "Participante não encontrado" }, 404);
    }
    
    // Verify birth date
    if (participante.data_nascimento !== data_nascimento) {
      return c.json({ error: "Data de nascimento incorreta" }, 401);
    }
    
    // Remove sensitive data
    const { ...safeParticipante } = participante;
    
    return c.json({ success: true, participante: safeParticipante });
  } catch (error) {
    console.log("Login error:", error);
    return c.json({ error: "Falha ao fazer login" }, 500);
  }
});

// Get participant by ID
app.get("/make-server-8e4e7d99/participantes/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const participante = await kv.get(`participante:${id}`);
    
    if (!participante) {
      return c.json({ error: "Participante não encontrado" }, 404);
    }
    
    return c.json({ participante });
  } catch (error) {
    console.log("Get participant error:", error);
    return c.json({ error: "Falha ao buscar participante" }, 500);
  }
});

// List all participants (admin only)
app.get("/make-server-8e4e7d99/participantes", async (c) => {
  try {
    const participantesData = await kv.getByPrefix("participante:");
    const participantes = participantesData
      .filter(item => !item.key.includes(":email:"))
      .map(item => item.value);
    
    return c.json({ participantes });
  } catch (error) {
    console.log("List participants error:", error);
    return c.json({ error: "Falha ao listar participantes" }, 500);
  }
});

// ============ WORKSHOPS ============

// Create workshop
app.post("/make-server-8e4e7d99/workshops", async (c) => {
  try {
    const { titulo, subtitulo, descricao, data_workshop, imagem_capa, status } = await c.req.json();
    
    const workshop = {
      id: crypto.randomUUID(),
      titulo,
      subtitulo,
      descricao,
      data_workshop,
      imagem_capa,
      status: status || "ativo",
      data_criacao: new Date().toISOString()
    };
    
    await kv.set(`workshop:${workshop.id}`, workshop);
    
    return c.json({ success: true, workshop });
  } catch (error) {
    console.log("Create workshop error:", error);
    return c.json({ error: "Falha ao criar workshop" }, 500);
  }
});

// Get all workshops
app.get("/make-server-8e4e7d99/workshops", async (c) => {
  try {
    const workshopsData = await kv.getByPrefix("workshop:");
    const workshops = workshopsData.map(item => item.value);
    
    return c.json({ workshops });
  } catch (error) {
    console.log("List workshops error:", error);
    return c.json({ error: "Falha ao listar workshops" }, 500);
  }
});

// Get workshop by ID
app.get("/make-server-8e4e7d99/workshops/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const workshop = await kv.get(`workshop:${id}`);
    
    if (!workshop) {
      return c.json({ error: "Workshop não encontrado" }, 404);
    }
    
    return c.json({ workshop });
  } catch (error) {
    console.log("Get workshop error:", error);
    return c.json({ error: "Falha ao buscar workshop" }, 500);
  }
});

// Update workshop
app.put("/make-server-8e4e7d99/workshops/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const workshop = await kv.get(`workshop:${id}`);
    
    if (!workshop) {
      return c.json({ error: "Workshop não encontrado" }, 404);
    }
    
    const updatedWorkshop = { ...workshop, ...updates };
    await kv.set(`workshop:${id}`, updatedWorkshop);
    
    return c.json({ success: true, workshop: updatedWorkshop });
  } catch (error) {
    console.log("Update workshop error:", error);
    return c.json({ error: "Falha ao atualizar workshop" }, 500);
  }
});

// Delete workshop
app.delete("/make-server-8e4e7d99/workshops/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`workshop:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log("Delete workshop error:", error);
    return c.json({ error: "Falha ao deletar workshop" }, 500);
  }
});

// ============ PALESTRAS ============

// Create palestra
app.post("/make-server-8e4e7d99/palestras", async (c) => {
  try {
    const { workshop_id, titulo, descricao, video_youtube, material_pdf, ordem } = await c.req.json();
    
    const palestra = {
      id: crypto.randomUUID(),
      workshop_id,
      titulo,
      descricao,
      video_youtube,
      material_pdf,
      ordem: ordem || 0,
      data_publicacao: new Date().toISOString()
    };
    
    await kv.set(`palestra:${palestra.id}`, palestra);
    
    return c.json({ success: true, palestra });
  } catch (error) {
    console.log("Create palestra error:", error);
    return c.json({ error: "Falha ao criar palestra" }, 500);
  }
});

// Get palestras by workshop
app.get("/make-server-8e4e7d99/palestras/workshop/:workshopId", async (c) => {
  try {
    const workshopId = c.req.param("workshopId");
    const palestrasData = await kv.getByPrefix("palestra:");
    const palestras = palestrasData
      .map(item => item.value)
      .filter(p => p.workshop_id === workshopId)
      .sort((a, b) => a.ordem - b.ordem);
    
    return c.json({ palestras });
  } catch (error) {
    console.log("List palestras error:", error);
    return c.json({ error: "Falha ao listar palestras" }, 500);
  }
});

// Get palestra by ID
app.get("/make-server-8e4e7d99/palestras/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const palestra = await kv.get(`palestra:${id}`);
    
    if (!palestra) {
      return c.json({ error: "Palestra não encontrada" }, 404);
    }
    
    return c.json({ palestra });
  } catch (error) {
    console.log("Get palestra error:", error);
    return c.json({ error: "Falha ao buscar palestra" }, 500);
  }
});

// Update palestra
app.put("/make-server-8e4e7d99/palestras/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const palestra = await kv.get(`palestra:${id}`);
    
    if (!palestra) {
      return c.json({ error: "Palestra não encontrada" }, 404);
    }
    
    const updatedPalestra = { ...palestra, ...updates };
    await kv.set(`palestra:${id}`, updatedPalestra);
    
    return c.json({ success: true, palestra: updatedPalestra });
  } catch (error) {
    console.log("Update palestra error:", error);
    return c.json({ error: "Falha ao atualizar palestra" }, 500);
  }
});

// Delete palestra
app.delete("/make-server-8e4e7d99/palestras/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`palestra:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log("Delete palestra error:", error);
    return c.json({ error: "Falha ao deletar palestra" }, 500);
  }
});

// ============ MATERIAIS ============

// Create material
app.post("/make-server-8e4e7d99/materiais", async (c) => {
  try {
    const { palestra_id, titulo, descricao, arquivo } = await c.req.json();
    
    const material = {
      id: crypto.randomUUID(),
      palestra_id,
      titulo,
      descricao,
      arquivo,
      data_upload: new Date().toISOString()
    };
    
    await kv.set(`material:${material.id}`, material);
    
    return c.json({ success: true, material });
  } catch (error) {
    console.log("Create material error:", error);
    return c.json({ error: "Falha ao criar material" }, 500);
  }
});

// Get materials by palestra
app.get("/make-server-8e4e7d99/materiais/palestra/:palestraId", async (c) => {
  try {
    const palestraId = c.req.param("palestraId");
    const materiaisData = await kv.getByPrefix("material:");
    const materiais = materiaisData
      .map(item => item.value)
      .filter(m => m.palestra_id === palestraId);
    
    return c.json({ materiais });
  } catch (error) {
    console.log("List materiais error:", error);
    return c.json({ error: "Falha ao listar materiais" }, 500);
  }
});

// ============ CMS / LANDING PAGE ============

// Get landing page content
app.get("/make-server-8e4e7d99/cms/landing-page", async (c) => {
  try {
    const content = await kv.get("cms:landing-page");
    
    // Default content if not set
    if (!content) {
      const defaultContent = {
        hero_title: "Kuka Cast",
        hero_subtitle: "Tecnologia, comunicação e letramento digital para transformar realidades.",
        hero_cta: "Participar do workshop gratuito",
        about_title: "Sobre o Projeto",
        about_description: "O Kuka Cast é uma plataforma de educação digital que capacita pessoas a compreender e utilizar a tecnologia de forma consciente e responsável.",
        learning_title: "O que você vai aprender",
        modules_title: "Conteúdo do Workshop"
      };
      
      await kv.set("cms:landing-page", defaultContent);
      return c.json({ content: defaultContent });
    }
    
    return c.json({ content });
  } catch (error) {
    console.log("Get CMS content error:", error);
    return c.json({ error: "Falha ao buscar conteúdo" }, 500);
  }
});

// Update landing page content
app.put("/make-server-8e4e7d99/cms/landing-page", async (c) => {
  try {
    const updates = await c.req.json();
    
    const currentContent = await kv.get("cms:landing-page") || {};
    const updatedContent = { ...currentContent, ...updates };
    
    await kv.set("cms:landing-page", updatedContent);
    
    return c.json({ success: true, content: updatedContent });
  } catch (error) {
    console.log("Update CMS content error:", error);
    return c.json({ error: "Falha ao atualizar conteúdo" }, 500);
  }
});

Deno.serve(app.fetch);