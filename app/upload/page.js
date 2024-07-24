"use client";

import { useEffect, useState } from "react";
import WebcamCaptureComponent from "../../components/WebCamCaptureComponent";
import ProtectedRoute from "../../components/HOC/ProtectedRouteComponent";

const UploadDocumentPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [fileType, setFileType] = useState("birth-certificate");

  const handleSelectTypeFile = (type) => {
    setCapturedImage(null);

    setFileType(type);
  };

  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  };

  const handleDeleteImage = () => {
    setCapturedImage(null);
  };

  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col items-center">
        <div
          className="text-center"
          style={{
            width: "500px",
            marginBottom: "25px",
          }}
        >
          <h2 className="services text-white p-4">
            انتخاب فایل{" "}
            {fileType === "birth-certificate"
              ? "شناسنامه"
              : fileType === "national-card"
              ? "کارت ملی"
              : fileType === "student-card"
              ? "کارت دانشجویی"
              : ""}
          </h2>

          <div
            className="m-auto pb-2 px-2"
            style={{
              background: "#b5c2f9",
              width: "90%",
              borderRadius: "0 0 25px 25px",
            }}
          >
            <ul
              style={{
                border: "2px solid #000",
                borderRadius: "0 0 20px 20px",
                padding: "10px",
              }}
            >
              <li
                className="mb-2"
                onClick={() => handleSelectTypeFile("birth-certificate")}
                style={{
                  background: "#8c97c1",
                  borderRadius: "30px",
                  padding: "10px",
                }}
              >
                شناسنامه
              </li>

              <li
                className="mb-2"
                onClick={() => handleSelectTypeFile("national-card")}
                style={{
                  background: "#8c97c1",
                  borderRadius: "30px",
                  padding: "10px",
                }}
              >
                کارت ملی
              </li>

              <li
                onClick={() => handleSelectTypeFile("student-card")}
                style={{
                  background: "#8c97c1",
                  borderRadius: "30px",
                  padding: "10px",
                }}
              >
                کارت دانشجویی
              </li>
            </ul>
          </div>
        </div>

        {!capturedImage && (
          <WebcamCaptureComponent
            onImageCapture={handleImageCapture}
            capturedImage={capturedImage}
            onDeleteImage={handleDeleteImage}
          />
        )}

        {capturedImage && (
          <div className="flex flex-col items-center">
            <div className="w-full p-4">
              <div className="text-center mb-4">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="max-w-full h-auto rounded"
                />
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <button
                onClick={handleDeleteImage}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
              >
                ارسال
              </button>

              <button
                onClick={handleDeleteImage}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-2"
              >
                حذف
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UploadDocumentPage;
