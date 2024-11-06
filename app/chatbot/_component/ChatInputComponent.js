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
          autoFocus
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
    </div>
  );
}
