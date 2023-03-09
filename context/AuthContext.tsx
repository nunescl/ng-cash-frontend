import React, { useContext, useState, useEffect, useRef } from "react";
import { ScriptProps } from "next/script";
import { parseCookies, destroyCookie } from "nookies";

export const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: ScriptProps) {
  const [currentUser, setCurrentUser] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  function logout() {
    destroyCookie(undefined, "accessToken");
    setTimeout(() => (window.location.href = "/signin"), 1000);
    return;
  }

  function CheckLogin(ctx?: any) {
    const { accessToken: token } = parseCookies(ctx);
    if (token) {
      setCurrentUser(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    CheckLogin();
  });

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
