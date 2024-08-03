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

  const lastMessageRef = useRef(null);

  const handleSendMessage = async (inputMessage) => {
    const updatedMessages = [
      ...messages,
      { text: inputMessage, sender: "user" },
    ];
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/account/chat/?${messages ? `message=${inputMessage}` : ""}`,
        {
          api_key: "sec_t2gjpFJW4MJsF70LapknkWDedv1wAffA",
          sourceId: "cha_OgRCE572OKSVSXqry0AXD",
        },
        {
          headers: global_header,
        }
      );

      setMessages([
        ...updatedMessages,
        { text: response.data.response, sender: "bot" },
      ]);

      setIsLoading(false);

      // handleLoadResponse(response.data.response);
    } catch (error) {
      if (error.response.data.response === 403) {
        toast.error("مشکلی در ارسال پیش آمده است، لطفا مجدد تلاش نمایید.");

        setIsLoading(false);
      }
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
    <div
      className="flex flex-col h-screen bg-gray-100 mt-2 mb-5 rounded"
      style={{ height: "70vh", width: "80%" }}
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
                  ? "bg-blue-500 text-white"
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

      <ChatInput onSendMessage={handleSendMessage} loading={isLoading} />
    </div>
  );
}
