"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatInput from "./chatbot/_component/ChatInputComponent";
import LoadingBubbleComponent from "./chatbot/_component/LoadingBubbleComponent";
import { toast } from "react-toastify";
import { apiUrl, global_header } from "../api";

// Sample static message data
const sampleMessages = [{ text: "چطور می‌تونم کمکتون کنم؟", sender: "bot" }];

export default function chatBotPage() {
  const [messages, setMessages] = useState(sampleMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [thread, setThread] = useState(null);
  const [threadIsLoading, setThreadIsLoading] = useState(false);

  const lastMessageRef = useRef(null);

  const handleSendMessage = async (inputMessage) => {
    // Update messages to include the new user message
    const userMessage = { text: inputMessage, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      // Prepare the request payload
      const payload = {
        thread_id: thread,
        message: inputMessage,
      };

      // Send the POST request
      const response = await axios.post(`${apiUrl}/chat/chat_pdf/`, payload, {
        headers: global_header,
      });

      // Extract the bot's response and update messages
      const botMessage = { text: response.data.data.content, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Handle different error scenarios
      const errorMessage = error.response?.data?.content || error.message;

      if (error.response?.status === 403) {
        toast.error("مشکلی در ارسال پیش آمده است، لطفا مجدد تلاش نمایید.");
      } else {
        toast.error(`خطا: ${errorMessage}`);
      }
    } finally {
      // Ensure the loading state is reset regardless of success or failure
      setIsLoading(false);
    }
  };

  const handleStartThread = async () => {
    setThreadIsLoading(true);

    try {
      // Send the POST request
      const response = await axios.post(`${apiUrl}/chat/thread/`, {
        headers: global_header,
      });

      if (response.data.status === 200) {
        setThread(response.data.data.thread_id);
      }

      // // Extract the bot's response and update messages
      // const botMessage = { text: response.data.data.content, sender: "bot" };
      // setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Handle different error scenarios
      const errorMessage = error.response?.data?.content || error.message;

      if (error.response?.status === 403) {
        toast.error("مشکلی در ارسال پیش آمده است، لطفا مجدد تلاش نمایید.");
      } else {
        toast.error(`خطا: ${errorMessage}`);
      }
    } finally {
      // Ensure the loading state is reset regardless of success or failure
      setThreadIsLoading(false);
    }
  };

  // const handleLoadResponse = async (message) => {
  //   const formData = new FormData();
  //   formData.append("text", message.replace(/[\r\n]+/g, ''));
  //   formData.append("server", "farsi");
  //   formData.append("sound", "1");

  //   try {
  //     const response = await axios.post(
  //       `https://api.talkbot.ir/v1/media/text-to-speech/REQ`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer sk-ce552951ba713aac6b81d63d8ff5258b`,
  //         },
  //       }
  //     );

  //     console.log(response.data.response.download);

  //     // Create an Audio object and play it
  //     const audio = new Audio(response.data.response.download);
  //     audio.play();

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);

  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="container mx-auto">
      <div
        className="flex flex-col h-screen bg-gray-100 mt-2 mb-5 rounded-lg mx-auto"
        style={{
          height: "70vh",
          width: "95%",
          backgroundColor: "rgb(193 205 170 / 30%)",
        }}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`flex ${
                message.sender === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-800"
                }`}
                style={{ textAlign: "justify" }}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-end">
              <LoadingBubbleComponent />
            </div>
          )}
        </div>

        {thread ? (
          <ChatInput onSendMessage={handleSendMessage} loading={isLoading} />
        ) : (
          <div className="flex p-4 justify-center">
            <button
              onClick={handleStartThread}
              className="flex items-center justify-center bg-green-900 text-white rounded-full px-4 py-2 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800"
              disabled={threadIsLoading}
              style={{
                height: "48px",
                width: "116px",
              }}
            >
              {!threadIsLoading ? (
                "شروع مکالمه"
              ) : (
                <div className="w-4 h-4 border-2 border-solid rounded-full border-gray-100 border-t-gray-400 spin"></div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
