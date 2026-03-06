import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  participantLogin: (email: string, data_nascimento: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user);
          setIsAdmin(data.session.user.user_metadata?.role === "admin");
        }
        
        // Also check for participant session in localStorage
        const participantData = localStorage.getItem("kukacast_participant");
        if (participantData && !data.session) {
          setUser(JSON.parse(participantData));
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setUser(data.user);
    setIsAdmin(data.user?.user_metadata?.role === "admin");
  };

  const participantLogin = async (email: string, data_nascimento: string) => {
    const { participantesAPI } = await import("./api");
    const response = await participantesAPI.login(email, data_nascimento);
    
    if (response.success) {
      setUser(response.participante);
      setIsAdmin(false);
      localStorage.setItem("kukacast_participant", JSON.stringify(response.participante));
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("kukacast_participant");
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, participantLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
