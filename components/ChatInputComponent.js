import { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

export default function ChatInput({ onSendMessage }) {
  const [inputMessage, setInputMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardRef = useRef();
  const inputRef = useRef();

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

  const addAudioElement = async (blob) => {
    // Now proceed with the upload
    const audioFile = new File([blob], "voice.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const response = await axios.post(
        "http://51.68.110.35/speech_to_text/",
        formData, // Send formData directly, not wrapped in an object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setInputMessage(response.data.transcription_text);
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <div className="border-t border-gray-200" style={{ background: "#f3f4f6" }}>
      <div className="flex items-center flex-row justify-center my-2 gap-4">
        <span
          onClick={() => setKeyboardVisible(!keyboardVisible)}
          className="py-2 px-4 rounded-full shadow-lg"
          style={{ background: "#ebebeb" }}
        >
          {keyboardVisible ? "پنهان کردن کیبورد" : "نمایش کیبورد"}
        </span>

        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          mediaRecorderOptions={{
            audioBitsPerSecond: 128000,
          }}
        />
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
