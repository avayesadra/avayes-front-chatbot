import Image from "next/image";
import Link from "next/link";
import serviceImage1 from "../public/service-1.png";
import serviceImage2 from "../public/service-2.png";
import serviceImage3 from "../public/service-3.png";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="relative flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          <div className="services gap-4">
            <Link href={"/services"} className="services__item h-full">
              <span className="services__heading">خدمات</span>

              <Image src={serviceImage1} height={200} alt="خدمات" />
            </Link>
          </div>

          <div className="services gap-4">
            <Link href={"/contact"} className="services__item h-full">
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
            <div className="services__item h-3/6">
              <span className="services__heading">راهنمای ساختمان</span>

              <Image src={serviceImage3} height={100} alt="راهنمای ساختمان" />
            </div>

            <div className="services__item h-3/6">
              <span className="services__heading">سوالات متداول</span>

              <Image src={serviceImage2} width={100} alt="سوالات متداول" />
            </div>
          </div>

          <div className="services gap-4">
            <div className="services__item h-full">
              <span className="services__heading">قوانین</span>

              <Image src={serviceImage2} height={200} alt="قوانین" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
