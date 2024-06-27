"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServicesPage() {
  return (
    <div className="grid grid-cols-1 gap-4 w-5/12 mx-auto mb-4 items-center">
      <div className="services">
        <Link href={"/services/create"} className="services__item h-full">
          <span className="services__heading">درخواست خدمت جدید</span>
        </Link>
      </div>

      <div className="services">
        <Link href={"/services/list"} className="services__item h-full">
          <span className="services__heading">پیگیری خدمت گذشته</span>
        </Link>
      </div>
    </div>
  );
}
