// app/contexts/ModalContext.js
"use client";

import React, { createContext, useState, useContext } from "react";
import AuthModal from "../../components/HOC/AuthModalComponent";
import { usePathname, useRouter } from "next/navigation";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState("");

  const openModal = (pageUrl) => {
    // console.log(pageUrl);
    setShowModal(true);

    setCurrentPageUrl(pageUrl);
  };

  const closeModal = () => {
    setCurrentPageUrl("");

    if (pathname === "/upload") {
      router.back();

      setTimeout(() => {
        setShowModal(false);
      }, 10);
    } else {
      setShowModal(false);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, currentPageUrl }}>
      {children}
      {showModal && (
        <AuthModal onClose={closeModal} currentPageUrl={currentPageUrl} />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
