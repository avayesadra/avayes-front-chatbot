"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";

const WebcamCaptureComponent = ({
  onImageCapture,
  capturedImage,
  onDeleteImage,
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [devices, setDevices] = useState([]);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    onImageCapture(imageSrc); // Send the captured image to the parent component
  }, [webcamRef, onImageCapture]);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Webcam column */}
      <div className="p-4" style={{ maxWidth: "450px" }}>
        {devices.map((device, key) => (
          <div key={device.deviceId} className="text-center mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ deviceId: device.deviceId }}
              className="w-full rounded"
            />
            {/* <p className="mt-2">
              Camera: {device.label || `Device ${key + 1}`}
            </p> */}
          </div>
        ))}
      </div>

      {/* Controls and captured image column */}
      <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
        <div className="mb-4">
          <button
            onClick={capture}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-2"
          >
            ثبت اسکن
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamCaptureComponent;
