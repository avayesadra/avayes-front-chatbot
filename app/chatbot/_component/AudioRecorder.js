import { useState, useEffect } from "react";
import axios from "axios";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { toast } from "react-toastify";
import { apiUrl } from "../../../api";

const AudioRecorder = ({ setInputMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const recorderControls = useAudioRecorder();

  const handleToggleRecording = () => {
    if (isRecording) {
      recorderControls.stopRecording();

      setIsRecording(false);
    } else {
      recorderControls.startRecording();

      setIsRecording(true);

      setIsCancelled(false); // Reset cancel state on new recording
    }
  };

  const handleCancelRecording = () => {
    if (isRecording) {
      recorderControls.stopRecording(); // Stop recording immediately

      setIsRecording(false);

      setIsCancelled(true); // Set cancel state
    }
  };

  const addAudioElement = async (blob) => {
    if (isCancelled) {
      return; // Don't process the blob if recording was cancelled
    }

    const audioFile = new File([blob], "voice.wav", { type: "audio/wav" });

    const formData = new FormData();
    formData.append("audio", audioFile);

    const promise = axios.post(`${apiUrl}/account/speech_to_text/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.promise(
      promise,
      {
        pending: "در حال پردازش صدا...",
        success: {
          render({ data }) {
            setInputMessage(data.data.transcription_text);

            return "متن با موفقیت دریافت شد";
          },
        },
        error: {
          render({ data }) {
            console.error("Error uploading file:", data);
            return "خطا در تبدیل صوت به متن، مجدد تلاش کنید.";
          },
        },
      },
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      }
    );
  };

  useEffect(() => {
    if (recorderControls.recordingBlob && !isCancelled) {
      addAudioElement(recorderControls.recordingBlob);
    }
  }, [recorderControls.recordingBlob]);

  return (
    <div className="flex items-center flex-row justify-center my-2 gap-4">
      <button
        onClick={handleToggleRecording}
        className={`py-2 px-4 rounded-full shadow-lg transition-colors duration-200 flex items-center ${
          isRecording
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 ml-1"
        >
          <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
          <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
        </svg>{" "}
        {isRecording ? "پایان ضبط" : "شروع ضبط"}
      </button>

      {isRecording && (
        <div className="text-center text-red-500 font-bold">در حال ضبط...</div>
      )}

      {isRecording && (
        <button
          onClick={handleCancelRecording}
          className="py-2 px-4 rounded-full shadow-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          لغو
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;
