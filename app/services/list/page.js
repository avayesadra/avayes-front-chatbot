"use client";

import axios from "axios";
import Link from "next/link";
import { global_header } from "../../../api";
import { useEffect, useState } from "react";
import DataTableComponent from "../../../components/DataTableComponent";

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

export default function ServicesListPage() {
  const [complaintData, setComplaintData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://62.3.41.6/customer/requests_list/",
        {
          headers: global_header,
        }
      );

      const data = response.data.request_list;
      setComplaintData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4 items-center">
        <div className="col-span-2">
          <h4 className="font-bold">درخواست‌ها</h4>
        </div>

        <div className="text-left">
          <Link href={"/complaint/create"}>
            <button className="btn-primary">ثبت درخواست</button>
          </Link>
        </div>
      </div>

      <DataTableComponent data={complaintData} />

      <div className="mt-4 flex justify-between">
        <div>
          <span className="text-sm text-gray-600">
            Showing 1 to 10 of 100 entries
          </span>
        </div>

        <div>
          <nav className="inline-flex items-center">
            <button className="bg-gray-200 hover:bg-gray-300 rounded-l-md px-3 py-2 outline-none focus:outline-none">
              <i className="fas fa-angle-double-left"></i>
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              <i className="fas fa-angle-left"></i>
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              1
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              2
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              3
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              4
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              5
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              6
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              7
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              8
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              9
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 outline-none focus:outline-none">
              10
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 rounded-r-md px-3 py-2 outline-none focus:outline-none">
              <i className="fas fa-angle-double-right"></i>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
