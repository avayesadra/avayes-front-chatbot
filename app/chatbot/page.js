"use client";

import { useEffect, useState, useRef } from "react";
import { global_header } from "../../api";
import axios from "axios";
import ChatInput from "../../components/ChatInputComponent";
import LoadingBubbleComponent from "./_component/LoadingBubbleComponent";

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
        `http://62.3.41.6/chat/chat/?${
          messages ? `message=${inputMessage}` : ""
        }`,
        {
          api_key: "sec_YD0yAFYR15C6MALgumWmtEG48g6BKuRw",
          sourceId: "cha_qpyXO7SygYm9t9nsk4Icu",
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col h-screen bg-gray-100 mt-2 mb-5"
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

      <ChatInput onSendMessage={handleSendMessage} />

      
    </div>
  );
}
