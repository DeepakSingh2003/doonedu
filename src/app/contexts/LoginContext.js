"use client";
import { createContext, useContext, useState } from "react";
import AuthModal from "../components/LoginModal";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // modal state
  const [modalType, setModalType] = useState("login"); // login/signup type

  // login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false); // close modal on login
  };

  // logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  // open modal
  const openModal = (type = "login") => {
    setModalType(type);
    setIsAuthModalOpen(true);
  };

  // close modal
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
      {/* Render modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          type={modalType}
          onClose={closeModal}
          onLogin={login}
        />
      )}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
