"use client";

import { Drawer, SwipeableDrawer } from "@mui/material";
import { useRef, useState } from "react";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const VirtualKeyboardComponent = ({ name }) => {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [openDrawer, setOpenDrawer] = useState(false);

  const keyboard = useRef();

  const onChange = (input) => {
    setInput(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      <SwipeableDrawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        anchor={"bottom"}
        hideBackdrop
      >
        <>
          <div
            className="pt-2 pb-1 text-center flex gap-4 justify-center"
            style={{ background: "#eee" }}
          >
            <span
              onClick={() => setInput("")}
              className="red"
              style={{ color: "#dc2626" }}
            >
              پاک کردن مقدار
            </span>
            |<span onClick={toggleDrawer(false)}>پنهان کردن کیبورد</span>
          </div>

          <KeyboardReact
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
            onChange={onChange}
            onKeyPress={onKeyPress}
            rtl={true}
            layout={{
              default: [
                "{bksp} = - 0 9 8 7 6 5 4 3 2 1 `",
                "\\ چ ج ح خ ه ع غ ف ق ث ص ض {tab}",
                "{enter} گ ک م ن ت ا ل ب ی س ش {lock}",
                "{shift} / . و پ د ذ ر ز ط ظ {shift}",
                "{space}",
              ],
              shift: [
                "{bksp} + ـ ( ) * ، × ٪ ﷼ ٫ ٬ ! ÷",
                "{tab} | { } [ ] ّ َ ِ ُ ً ٍ ٌ ْ",
                "{enter} ؛ : « » ة آ أ إ ي ئ ؤ {lock}",
                "{shift} ؟ < > ء ٔ ‌ ٰ ژ ٓ ك {shift}",
                "{space}",
              ],
            }}
          />
        </>
      </SwipeableDrawer>

      <input
        value={input}
        name={name}
        placeholder={`Tap on the virtual keyboard to start ${name}`}
        onChange={onChangeInput}
        onClick={toggleDrawer(true)}
        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </>
  );
};

export default VirtualKeyboardComponent;
