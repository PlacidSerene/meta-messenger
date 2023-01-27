"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "typings";
import useSWR from "swr";
import fetcher from "utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  console.log(messages);
  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input;
    setInput("");
    const id = uuidv4();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Elly",
      profilePic:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      email: "elly@gmail.com",
    };
    const uploadMessageToUpStash = async () => {
      const res: any = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });
      const data = await res.json();
      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpStash, {
      optimisticData: [message, ...messages!],
    });
  };
  return (
    <form
      className="flex px-10 py-5 space-x-2 border-t bg-white border-gray-100 fixed bottom-0 w-full"
      onSubmit={addMessage}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gay-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!input}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
