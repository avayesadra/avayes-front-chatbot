"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function ServicesListCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `http://62.3.41.6/customer/create_service_form/`,
        formData
      );

      console.log(response);
    } catch (error) {
      // console.error("Error creating account:", error); // Handle errors
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نام و نام خانوادگی
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register("fullName", { required: true, maxLength: 80 })}
            />
          </div>

          <div>
            <label
              htmlFor="studentNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              شماره دانشجویی
            </label>
            <input
              id="studentNumber"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register("studentNumber", { required: true, maxLength: 100 })}
            />
          </div>

          <div>
            <label
              htmlFor="nationalId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              کد ملی
            </label>
            <input
              id="nationalId"
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register("nationalId", {
                required: true,
                minLength: 10,
                maxLength: 11,
              })}
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              شماره تماس
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              {...register("phoneNumber", {
                required: true,
                minLength: 10,
                maxLength: 11,
              })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <span className="text-sm font-medium text-gray-700">
            آیا خودتان هستید؟
          </span>

          <div className="flex items-center">
            <input
              id="is-self-yes"
              type="radio"
              value="Yes"
              {...register("is_self", { required: true })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="is-self-yes" className="mr-2 text-sm text-gray-700">
              بله
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="is-self-no"
              type="radio"
              value="No"
              {...register("is_self", { required: true })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="is-self-no" className="mr-2 text-sm text-gray-700">
              خیر
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            توضیحات
          </label>
          <textarea
            id="description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            {...register("description", { required: true, maxLength: 500 })}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
}
