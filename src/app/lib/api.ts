import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-8e4e7d99`;

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

// Participant API
export const participantesAPI = {
  register: async (data: {
    nome: string;
    email: string;
    telefone: string;
    data_nascimento: string;
    cidade: string;
  }) => {
    return apiCall("/participantes/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login: async (email: string, data_nascimento: string) => {
    return apiCall("/participantes/login", {
      method: "POST",
      body: JSON.stringify({ email, data_nascimento }),
    });
  },

  getById: async (id: string) => {
    return apiCall(`/participantes/${id}`);
  },

  getAll: async () => {
    return apiCall("/participantes");
  },
};

// Workshops API
export const workshopsAPI = {
  create: async (data: {
    titulo: string;
    subtitulo?: string;
    descricao: string;
    data_workshop?: string;
    imagem_capa?: string;
    status?: string;
  }) => {
    return apiCall("/workshops", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getAll: async () => {
    return apiCall("/workshops");
  },

  getById: async (id: string) => {
    return apiCall(`/workshops/${id}`);
  },

  update: async (id: string, data: Partial<any>) => {
    return apiCall(`/workshops/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/workshops/${id}`, {
      method: "DELETE",
    });
  },
};

// Palestras API
export const palestrasAPI = {
  create: async (data: {
    workshop_id: string;
    titulo: string;
    descricao: string;
    video_youtube?: string;
    material_pdf?: string;
    ordem?: number;
  }) => {
    return apiCall("/palestras", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getByWorkshop: async (workshopId: string) => {
    return apiCall(`/palestras/workshop/${workshopId}`);
  },

  getById: async (id: string) => {
    return apiCall(`/palestras/${id}`);
  },

  update: async (id: string, data: Partial<any>) => {
    return apiCall(`/palestras/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/palestras/${id}`, {
      method: "DELETE",
    });
  },
};

// Materiais API
export const materiaisAPI = {
  create: async (data: {
    palestra_id: string;
    titulo: string;
    descricao: string;
    arquivo: string;
  }) => {
    return apiCall("/materiais", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getByPalestra: async (palestraId: string) => {
    return apiCall(`/materiais/palestra/${palestraId}`);
  },
};

// CMS API
export const cmsAPI = {
  getLandingPage: async () => {
    return apiCall("/cms/landing-page");
  },

  updateLandingPage: async (data: Partial<any>) => {
    return apiCall("/cms/landing-page", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};
