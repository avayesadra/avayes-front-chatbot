import { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChatInput({ onSendMessage }) {
  const [inputMessage, setInputMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const keyboardRef = useRef();
  const inputRef = useRef();

  const recorderControls = useAudioRecorder();

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onChange = (input) => {
    setInputMessage(input);
  };

  const handleShift = () => {
    const keyboard = keyboardRef.current;
    keyboard.setOptions({
      layoutName:
        keyboard.options.layoutName === "default" ? "shift" : "default",
    });
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
    if (button === "{enter}") handleSendMessage();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    recorderControls.recordingBlob &&
      addAudioElement(recorderControls.recordingBlob);
  }, [recorderControls.recordingBlob]);

  const handleStartRecording = () => {
    recorderControls.startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    recorderControls.stopRecording();
    setIsRecording(false);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      recorderControls.stopRecording();
      setIsRecording(false);
    } else {
      recorderControls.startRecording();
      setIsRecording(true);
    }
  };

  const addAudioElement = async (blob) => {
    const audioFile = new File([blob], "voice.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioFile);

    const promise = axios.post(
      "http://51.68.110.35/speech_to_text/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
            return "پیامی دریافت نشد، لطفا مجدد تلاش نمایید.";
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

  return (
    <div className="border-t border-gray-200" style={{ background: "#f3f4f6" }}>
      <div className="flex items-center flex-row justify-center my-2 gap-4">
        <button
          onClick={() => setKeyboardVisible(!keyboardVisible)}
          className="py-2 px-4 rounded-full shadow-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center"
        >
          {keyboardVisible ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>پنهان کردن کیبورد</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>نمایش کیبورد</span>
            </>
          )}
        </button>

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
          </svg>

          {isRecording ? "پایان ضبط" : "شروع ضبط"}
        </button>

        {isRecording && (
          <div className="text-center text-red-500 font-bold">
            در حال ضبط...
          </div>
        )}
      </div>

      <div className="flex px-2 pb-2">
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="پیام خود را بنویسید.."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white mr-2 rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ارسال
        </button>
      </div>

      {keyboardVisible && (
        <div className="mt-4">
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            layoutName="default"
            onChange={onChange}
            onKeyPress={onKeyPress}
            layout={{
              default: [
                "{bksp} = - 0 9 8 7 6 5 4 3 2 1 `",
                "\\ چ ج ح خ ه ع غ ف ق ث ص ض",
                "گ ک م ن ت ا ل ب ی س ش",
                "/ . و پ د ذ ر ز ط ظ {shift}",
                "{space}",
              ],
              shift: [
                "{bksp} + ـ ( ) * ، × ٪ ﷼ ٫ ٬ ! ÷",
                "| { } [ ] ّ َ ِ ُ ً ٍ ٌ ْ",
                "؛ : « » ة آ أ إ ي ئ ؤ ",
                "؟ < > ء ٔ ‌ ٰ ژ ٓ ك {shift}",
                "{space}",
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}
