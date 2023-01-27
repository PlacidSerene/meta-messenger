"use client";
import React from "react";
import useSWR from "swr";
import { Message } from "typings";
import fetcher from "utils/fetchMessages";
import MessageComponent from "./MessageComponent";

function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  return (
    <div className="space-y-5 px-5 pb-32 pt-8 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
