"use client";
import React, {useEffect, useRef} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {knowledge} from "@/service/llm";

type Message = { role: "user" | "assistant"; content: string };

export default function Knowledge() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputDisabled, setInputDisabled] = React.useState(false);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "instant"});
  }, [messages]);

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputLength === 0) return;
    setInputDisabled(true);
    setMessages((messages) => [...messages, {
      role: "user",
      content: input
    }]);
    setInput("");

    knowledge(input).then((res) => {
      const outputs = res.data.outputs
      setMessages((messages) => [...messages, {
        role: "assistant",
        content: outputs.answerGeneral
      }]);
      setInputDisabled(false);
    })
  };

  return (
    <div>
      <div className="w-full pl-5 pr-5 h-[calc(100vh-11rem)] top-12 overflow-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef}/>
        </div>
      </div>
      <div className="fixed bottom-16 left-0 w-full bg-black">
        <form onSubmit={handleSend} className="flex w-full items-center space-x-2 p-4">
          <Input
            id="message"
            placeholder="请输入你的问题"
            className="flex-1 text-base"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0 || inputDisabled}>
            <Send className="h-5 w-5"/>
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
