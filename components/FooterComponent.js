"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import avayeSadraLogo from "../public/avaye-sadra-logo.png";

const FooterComponent = () => {
  return (
    <footer className="flex w-full relative">
      <div className="container mx-auto">
        <nav
          className="mx-auto flex w-full items-center justify-between p-3"
          style={{
            background: "#c6c4c4",
            borderRadius: "100px 100px 0 0",
          }}
        >
          <div className="flex lg:flex-1 justify-end">
            موسسه اطلاع رسانی و تبلیغاتی آوای صدرا
          </div>

          <div className="flex lg:flex-1 justify-center footer__logo">
            <Link href={"/"}>
              <Image src={avayeSadraLogo} height={70} alt="آوای صدرا رسانه" />
            </Link>
          </div>

          <div className="lg:flex lg:flex-1 justify-start">
            بزرگترین رسانه تبلیغات محیطی کشور
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default FooterComponent;
