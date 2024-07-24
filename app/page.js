"use client";

import Image from "next/image";
import Link from "next/link";
import serviceImage1 from "../public/service-1.png";
import serviceImage2 from "../public/service-2.png";
import serviceImage3 from "../public/service-3.png";
import serviceImage4 from "../public/service-4.png";
import serviceImage5 from "../public/service-5.png";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="relative flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          <div className="services gap-4">
            <Link href={"/services"} className="services__item h-full p-6">
              <span className="services__heading">خدمات</span>

              <Image src={serviceImage1} height={200} alt="خدمات" />
            </Link>
          </div>

          <div className="services gap-4">
            <Link href={"/contact"} className="services__item h-full p-6">
              <span className="services__heading">
                نظرات
                <br />
                شکایات
                <br />
                ارتباطات
              </span>

              <Image
                src={serviceImage2}
                height={200}
                alt="نظرات، شکایات، ارتباطات"
              />
            </Link>
          </div>

          <div className="services gap-4">
            <Link href={"/"} className="services__item h-3/6 p-6">
              <span className="services__heading">راهنمای ساختمان</span>

              <Image src={serviceImage3} height={100} alt="راهنمای ساختمان" />
            </Link>

            <Link href={"/"} className="services__item h-3/6 p-6">
              <span className="services__heading">سوالات متداول</span>

              <Image src={serviceImage4} width={100} alt="سوالات متداول" />
            </Link>
          </div>

          <div className="services gap-4">
            <Link href={"/chatbot"} className="services__item h-full p-6">
              <span className="services__heading">قوانین</span>

              <Image src={serviceImage5} height={200} alt="قوانین" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
