// components/ProtectedRoute.js
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import { useAuth } from "../../app/context/AuthContext";
import { useModal } from "../../app/context/ModalContext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuth();
  const { openModal } = useModal();
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAuthentication = useCallback(() => {
    console.log(checkAuth());

    if (checkAuth()) {
      setShowContent(true);
    } else {
      const currentPageUrl = window.location.pathname;

      openModal(() => {
        if (checkAuth()) {
          setShowContent(true);
        }
      }, currentPageUrl);

      setShowContent(false);
    }

    setLoading(false);
  }, [checkAuth, openModal, router]);

  useEffect(() => {
    // Function to check authentication immediately on component mount
    handleAuthentication();

    // Interval to check authentication every 1 minute
    const interval = setInterval(() => {
      handleAuthentication();
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures it runs only once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BounceLoader color={"#9f0003"} />
      </div>
    );
  }

  return showContent ? children : null;
};

export default ProtectedRoute;
