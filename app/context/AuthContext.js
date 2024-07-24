// app/contexts/AuthContext.js
"use client";

import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const checkAuth = useCallback(() => {
    const token = cookies["token"];
    if (!token) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      if (Date.now() >= tokenData.exp * 1000) {
        // Token has expired
        removeCookie("token", { path: "/" });

        setIsAuthenticated(false);
        return false;
      } else {
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsAuthenticated(false);
      return false;
    }
  }, [cookies, removeCookie, setIsAuthenticated]);

  useEffect(() => {
    // Check authentication status initially
    checkAuth();

    // Set up interval to check authentication status every 1 minute
    const interval = setInterval(() => {
      const isAuth = checkAuth();
      setIsAuthenticated(isAuth); // Update state to force re-render
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [checkAuth]);

  const login = (token) => {
    setCookie("token", token, { path: "/", maxAge: 1 * 60 });

    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
    
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
