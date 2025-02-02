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
            height: "55px",
          }}
        >
          <div className="flex flex-1 justify-center">
            فرماندهی انتظامی جمهوری اسلامی ایران
          </div>

          {/* <div className="flex lg:flex-1 justify-center footer__logo mx-auto">
            <Link href={"/"}>
              <Image src={avayeSadraLogo} height={70} alt="آوای صدرا رسانه" />
            </Link>
          </div> */}

          {/* <div className="hidden lg:flex lg:flex-1 justify-start">
            بزرگترین رسانه تبلیغات محیطی کشور
          </div> */}
        </nav>
      </div>
    </footer>
  );
};

export default FooterComponent;
