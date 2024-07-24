import { useState } from "react";
import { useAuth } from "../../app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthModal = ({ onClose, currentPageUrl }) => {
  const { login } = useAuth();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://62.3.41.6/account/login/?${
          phoneNumber ? `phone_number=${phoneNumber}&is_guest=true` : ""
        }`
      );
      // Assuming the server sends the token to the phone number

      setOtp(response.data.otp);
    } catch (error) {
      console.error("Error requesting token:", error);
      throw error;
    }

    setStep("otp");
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://62.3.41.6/account/validate_otp/",
        {
          phone_number: phoneNumber,
          otp: otp,
        }
      );

      login(response.data.token);

      onClose();

      if (currentPageUrl) {
        router.push(currentPageUrl);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      throw error;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-1/4 bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">ورود/ ثبت‌نام</h2>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="mt-5">
            <p className="text-sm mb-3" style={{ textAlign: "justify" }}>
              برای ورود یا ثبت‌نام، شماره موبایل خود را وارد نمایید.
            </p>

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="شماره موبایل"
              className="border p-1 mb-4 w-full text-center"
              required
            />

            <button
              type="submit"
              className="w-full border-2 border-blue-500 bg-blue-500 hover:border-blue-700 hover:bg-blue-700 text-white py-1 px-4 rounded-xl mt-2"
            >
              ارسال کد اعتبارسنجی
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="mt-5">
            <p className="text-sm mb-3" style={{ textAlign: "justify" }}>
              کد اعتبارسنجی ارسال شده به شماره{" "}
              <span className="font-bold">{phoneNumber}</span> را وارد نمایید.
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="border p-2 mb-4 w-full text-center"
            />

            <div className="flex justify-between gap-2">
              <button
                onClick={() => setStep("phone")}
                className="w-1/3 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-1 rounded-xl"
              >
                اصلاح شماره
              </button>

              <button
                type="submit"
                className="w-2/3 bg-green-700 hover:bg-green-900 text-white px-4 py-1 rounded-xl"
              >
                ارسال
              </button>
            </div>
          </form>
        )}

        <button
          onClick={onClose}
          className="w-full border-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white py-1 px-4 rounded-xl mt-2"
        >
          لغو
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
