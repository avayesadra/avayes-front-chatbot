// ChatInput.js
import { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import AudioRecorder from "./AudioRecorder"; // Import the new component

export default function ChatInput({ onSendMessage, loading }) {
  const [inputMessage, setInputMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardRef = useRef();
  const inputRef = useRef();

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);

      setInputMessage(""); // Clear the input message

      if (keyboardRef.current) {
        keyboardRef.current.clearInput(); // Clear the virtual keyboard input
      }
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

  const handleKeyboardToggle = () => {
    setKeyboardVisible(!keyboardVisible);

    if (keyboardRef.current) {
      keyboardRef.current.clearInput(); // Clear the virtual keyboard input when toggling
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   if (inputMessage.trim().length >= 2) {
  //     handleSendMessage();
  //   }
  // }, [inputMessage]);

  return (
    <div className="border-t border-gray-200" style={{ background: "#f3f4f6" }}>
      <div className="flex items-center flex-row justify-center my-2 gap-4">
        <button
          onClick={handleKeyboardToggle}
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
                />
              </svg>

              <span>نمایش کیبورد</span>
            </>
          )}
        </button>

        <AudioRecorder setInputMessage={setInputMessage} />
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
          disabled={loading}
        />

        <button
          onClick={handleSendMessage}
          className="flex items-center justify-center w-20 bg-green-700 text-white mr-2 rounded-full px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        >
          {!loading ? (
            "ارسال"
          ) : (
            <div className="w-4 h-4 border-2 border-solid rounded-full border-gray-100 border-t-gray-400 spin"></div>
          )}
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
