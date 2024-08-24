"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";

export default function Divination() {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputLength === 0) return;
    router.push("/divination/chat?question=" + encodeURIComponent(input));
  };

  return (
    <div className="m-5 top-12 h-[calc(100%-4rem)] flex justify-center items-center flex-col">
      <form onSubmit={handleSend} className="flex w-full items-center space-x-2">
        <Input
          id="message"
          placeholder="输入任何你想要占卜的问题"
          className="flex-1 text-base bg-white text-black"
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button type="submit" size="icon" disabled={inputLength === 0}>
          <Send className="h-5 w-5"/>
        </Button>
      </form>
      <div className="mt-5 text-center text-3xl">放松、深呼吸
        <div className="mt-4"/>
        输入你想要占卜的问题
        <div className="mt-4"/>
        开启你的神秘之旅
      </div>
    </div>

  );
}
