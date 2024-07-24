"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DateTime from "./DateTime";
import tvuLogoImage from "../public/tvu-ac-logo.png";
import ACECRLogoImage from "../public/ACECR_logo.png";
import leadersImage from "../public/leaders.png";
import defaultAvatarImage from "../public/default-avatar.png";
import chevronLeftImage from "../public/chevron-left.png";
import homeIconImage from "../public/home-icon.png";
import { useModal } from "../app/context/ModalContext";
import { useAuth } from "../app/context/AuthContext";
import { useCookies } from "react-cookie";

const HeaderComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useModal();
  const { isAuthenticated, logout, checkAuth } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsLoggedIn(checkAuth());
    };

    updateAuthStatus();

    const interval = setInterval(updateAuthStatus, 10000); // Check every minute

    return () => clearInterval(interval);
  }, [checkAuth]);

  const handleLogout = () => {
    logout();

    setIsLoggedIn(false);

    router.push("/");
  };

  const handleLogin = () => {
    openModal();
  };

  return (
    <header className="flex w-full flex-row items-center">
      <div className="basis-1/12 flex justify-end">
        <div
          className="px-4 py-2 text-white text-center"
          style={{
            background: "#01177d",
            border: "2px solid #000",
            borderRadius: "15px",
          }}
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          <Image
            src={defaultAvatarImage}
            width={40}
            className="mx-auto"
            alt=""
          />

          <span className="text-xs mt-2 block">
            {isLoggedIn ? "خروج" : "ورود/ ثبت نام"}
          </span>
        </div>
      </div>

      <div
        className="container mx-auto basis-10/12"
        style={{
          background: "#a9a6a6",
          borderRadius: "0 0 100px 100px",
        }}
      >
        <nav className="mx-auto flex w-full items-center justify-between px-3">
          <div className="flex lg:flex-1 px-2">
            <Image src={ACECRLogoImage} width={80} alt="جهاد دانشگاهی" />
          </div>

          <div
            className="lg:flex lg:flex-1 flex-col items-center justify-center p-5"
            style={{
              background: "#9b9797",
              borderRadius: "0 0 100px 100px",
              height: "105px",
            }}
          >
            {pathname === "/" ? (
              <>
                <h5 className="text-sm">جهش تولید با مشارکت مردم</h5>

                <h3 className="text-2xl font-bold mt-3">جهاد دانشگاهی</h3>
              </>
            ) : (
              <Link href={"/"}>
                <Image
                  src={homeIconImage}
                  width={40}
                  className="mx-auto"
                  alt=""
                />

                <span className="text-xs mt-2 block">صفحه اصلی</span>
              </Link>
            )}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end px-2">
            <Image src={leadersImage} width={100} alt="جهاد دانشگاهی" />
          </div>
        </nav>
      </div>

      <div className="basis-1/12 flex justify-start">
        {pathname !== "/" && (
          <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
            <Image
              src={chevronLeftImage}
              width={40}
              className="mx-auto"
              alt=""
            />

            <span className="text-xs mt-2 block">بازگشت</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
