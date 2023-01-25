import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <main className="">
      {/* MessageList */}
      <MessageList />
      <ChatInput />
     
    </main>
  );
}
