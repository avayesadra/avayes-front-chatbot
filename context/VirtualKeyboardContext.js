import { Drawer } from '@mui/material';
import React, { createContext, useState, useRef, useContext, useEffect } from 'react';
import KeyboardReact from 'react-simple-keyboard'; // Ensure you have this library installed
import 'react-simple-keyboard/build/css/index.css'; // Import the CSS for the virtual keyboard

// Create the context
const VirtualKeyboardContext = createContext();

// Create the provider component
export const VirtualKeyboardProvider = ({ children }) => {
  const [inputs, setInputs] = useState({});
  const [currentInputName, setCurrentInputName] = useState(null);
  const [layout, setLayout] = useState("default");
  const [openDrawer, setOpenDrawer] = useState(false);
  const keyboard = useRef(null);

  // Initialize the keyboard ref
  useEffect(() => {
    if (keyboard.current) {
      keyboard.current.keyboard.setInput(inputs[currentInputName] || "");
    }
  }, [currentInputName, inputs]);

  const onChange = (input) => {
    if (currentInputName) {
      setInputs(prevInputs => ({
        ...prevInputs,
        [currentInputName]: input
      }));
    }
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event, name) => {
    const input = event.target.value;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: input
    }));
    if (name === currentInputName && keyboard.current) {
      keyboard.current.keyboard.setInput(input);
    }
  };

  const toggleDrawer = (newOpen, name = null) => () => {
    setOpenDrawer(newOpen);
    setCurrentInputName(name);
  };

  return (
    <VirtualKeyboardContext.Provider value={{ inputs, onChangeInput, toggleDrawer }}>
      {children}
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer(false)}
        anchor={"bottom"}
        hideBackdrop
      >
        <div>
          <div className="p-2 text-center" style={{ background: "#eee" }}>
            <span onClick={toggleDrawer(false)}>پنهان کردن کیبورد</span>
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
        </div>
      </Drawer>
    </VirtualKeyboardContext.Provider>
  );
};

// Custom hook for using the context
export const useVirtualKeyboard = () => {
  return useContext(VirtualKeyboardContext);
};
