"use client"; // This is a client component 👈🏽

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function DataTableComponent({ data }) {
  return (
    <table className="table-auto min-w-full bg-white shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2">عنوان</th>
          <th className="px-4 py-2">تاریخ</th>
          <th className="px-4 py-2">وضعیت</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>

      <tbody>
        {data &&
          data.map((item) => {
            return (
              <tr>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2 text-center">{item.created_at}</td>
                <td className="border px-4 py-2 text-center">{item.status}</td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/complaint/${item.id}`}>
                    <button>مشاهده</button>
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default DataTableComponent;
