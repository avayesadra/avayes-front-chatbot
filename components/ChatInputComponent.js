import { useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export default function ChatInput({ onSendMessage }) {
  const [inputMessage, setInputMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardRef = useRef();

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);
      setInputMessage("");
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
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onFocus={() => setKeyboardVisible(true)}
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
