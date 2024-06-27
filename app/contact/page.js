"use client";

import Link from "next/link";
import Image from "next/image";
import contactServiceImage1 from "../../public/contact-service-1.png";
import contactServiceImage2 from "../../public/contact-service-2.png";
import contactServiceImage3 from "../../public/contact-service-3.png";

export default function ContactPage() {
  return (
    <div className="container mx-auto">
      <div className="relative flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          <div className="services gap-4">
            <Link href={"/services"} className="services__item h-full">
              <span className="services__heading">نظرات</span>

              <Image src={contactServiceImage1} height={200} alt="خدمات" />
            </Link>
          </div>

          <div className="services gap-4">
            <div className="services__item h-full">
              <span className="services__heading">شکایات</span>

              <Image src={contactServiceImage2} height={200} alt="خدمات" />
            </div>
          </div>

          <div className="services gap-4">
            <div className="services__item h-full">
              <span className="services__heading">ارتباطات</span>

              <Image src={contactServiceImage3} height={200} alt="خدمات" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
