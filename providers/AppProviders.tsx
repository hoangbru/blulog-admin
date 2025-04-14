"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/hooks/useAuth";
import { AppStateProvider } from "@/store/AppStateContext";

const AppProviders = ({ children }: { children: ReactNode }) => {
  
  return (
    <AppStateProvider>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </AppStateProvider>
  );
};

export default AppProviders;
