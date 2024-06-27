"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "شکایت اول",
    last_update: "2024-03-04T08:37:27Z",
    status: "در حال بررسی",
  },
  {
    id: 2,
    title: "شکایت دوم",
    last_update: "2024-03-04T08:37:27Z",
    status: "در حال بررسی",
  },
  {
    id: 3,
    title: "شکایت سوم",
    last_update: "2024-03-04T08:37:27Z",
    status: "در حال بررسی",
  },
  {
    id: 4,
    title: "شکایت چهارم",
    last_update: "2024-03-04T08:37:27Z",
    status: "در حال بررسی",
  },
];

export default function ServicesCreatePage() {
  return (
    <div className="grid grid-cols-1 gap-4 w-5/12 mx-auto mb-4 items-center">
      <div className="services">
        <Link href={"/services/create"} className="services__item h-full">
          <span className="services__heading">خدمات متداول</span>
        </Link>
      </div>

      <div className="services">
        <Link href={"/services/create"} className="services__item h-full">
          <span className="services__heading">خدمات آموزشی</span>
        </Link>
      </div>

      <div className="services">
        <Link href={"/services/create"} className="services__item h-full">
          <span className="services__heading">خدمات اداری</span>
        </Link>
      </div>

      <div className="services">
        <Link href={"/services/create"} className="services__item h-full">
          <span className="services__heading">خدمات مالی</span>
        </Link>
      </div>
    </div>
  );
}
