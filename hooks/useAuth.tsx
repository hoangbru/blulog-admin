"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { setAccessToken } from "@/lib/axios";
import { User } from "@/types/user";
import { fetcher, mutation } from "@/lib/utils";

type UserDataType = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: UserDataType) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem("BLA_ACT");
        if (token) {
          setAccessToken(token);
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetcher("/api/profile");
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      }
    };
    fetchProfile();
  }, []);

  const login = async (userData: UserDataType) => {
    const response = await mutation("/api/login/admin", "POST", userData);
    const { accessToken, user } = response.data;

    if (user.role === "admin") {
      toast.success("Login successful!");
      setIsAuthenticated(true);
      setAccessToken(accessToken);
      sessionStorage.setItem("BLA_ACT", accessToken);
      router.push("/");
    } else {
      toast.error("You are not authorized to access this page.");
      router.push("/login");
    }
  };

  const logout = async () => {
    try {
      const response = await mutation("/api/logout", "POST");
      const message = response.meta?.message;

      setUser(null);
      sessionStorage.removeItem("BLA_ACT");
      setAccessToken(null);
      setIsAuthenticated(false);
      toast.success(message);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed, please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
