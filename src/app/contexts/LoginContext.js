"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import AuthModal from "../components/LoginModal";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");

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
    localStorage.setItem("loggedIn", "true"); // For popup login
    setUser(userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    
    // Show success toast
    toast.success(`Welcome back, ${userData.name}!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const logout = () => {
    const userName = user?.name || "User";
    localStorage.removeItem("loginData");
    localStorage.removeItem("loggedIn"); // Remove popup login flag
    setUser(null);
    setIsLoggedIn(false);
    
    // Show logout success toast
    toast.success(`Goodbye, ${userName}! You have been logged out successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
          onLoginSuccess={login}
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