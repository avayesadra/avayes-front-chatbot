"use client";

import Link from "next/link";

const ServiceCategory = ({ title }) => (
  <div className="services">
    <Link href="/services/items/list" className="services__item h-full p-3">
      <span className="services__heading">{title}</span>
    </Link>
  </div>
);

export default function ServicesItemsPage() {
  const categories = [
    "خدمات متداول",
    "خدمات آموزشی",
    "خدمات اداری",
    "خدمات مالی",
  ];

  return (
    <div className="grid grid-cols-1 gap-4 w-5/12 mx-auto mb-4 items-center">
      {categories.map((category, index) => (
        <ServiceCategory key={index} title={category} />
      ))}
    </div>
  );
}
