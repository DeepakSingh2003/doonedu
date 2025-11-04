"use client";

import { createContext, useContext, useState, useEffect } from "react";
import AuthModal from "../components/LoginModal";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // "login" | "signup"

  // Load login state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("loginData");
    if (stored) {
      try {
        const { user } = JSON.parse(stored);
        setUser(user);
        setIsLoggedIn(true);
      } catch (e) {
        console.warn("Invalid login data in localStorage");
      }
    }
  }, []);

  const login = (userData) => {
    const payload = { user: userData };
    localStorage.setItem("loginData", JSON.stringify(payload));
    setUser(userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false); // close modal
  };

  const logout = () => {
    localStorage.removeItem("loginData");
    setUser(null);
    setIsLoggedIn(false);
  };

  const openModal = (type = "login") => {
    setModalType(type);
    setIsAuthModalOpen(true);
  };

  const closeModal = () => setIsAuthModalOpen(false);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        openModal,
        closeModal,
        modalType,
      }}
    >
      {children}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeModal}
          onLoginSuccess={login}  // Changed prop name for clarity
        />
      )}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within LoginProvider");
  }
  return context;
}