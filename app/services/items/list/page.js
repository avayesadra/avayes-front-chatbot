"use client";

import Link from "next/link";
import { useState } from "react";

const ServiceItem = ({ title, description, link }) => {
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();

    setIsHintModalOpen(true);
  };

  const closeHintModal = () => {
    setIsHintModalOpen(false);
  };

  return (
    <div className="services relative">
      <Link href={link} className="services__item h-full p-3">
        <span className="services__heading">{title}</span>
        <span className="services__tip" onClick={openModal}>
          مطالعه
        </span>
      </Link>

      {isHintModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="mb-4">{description}</p>
            <button
              onClick={closeHintModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ServicesListPage() {
  const services = [
    {
      id: 1,
      title: "آپلود مدارک",
      description: "توضیحات مربوط به آپلود مدارک",
      link: "/upload",
    },
    {
      id: 2,
      title: "اعتراض به نمره",
      description: "توضیحات مربوط به اعتراض به نمره",
      link: "/services/items/list/create",
    },
    {
      id: 3,
      title: "درخواست فارغ التحصیلی",
      description: "توضیحات مربوط به درخواست فارغ التحصیلی",
      link: "/services/items/list/create",
    },
    {
      id: 4,
      title: "درخواست خوابگاه",
      description: "توضیحات مربوط به درخواست خوابگاه",
      link: "/services/items/list/create",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 w-5/12 mx-auto mb-4 items-center">
      {services.map((service, index) => (
        <ServiceItem
          key={index}
          title={service.title}
          link={service.link}
          description={service.description}
        />
      ))}
    </div>
  );
}
