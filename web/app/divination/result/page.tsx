"use client"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";

export default function Result() {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const [solutionID, setSolutionID] = React.useState("");
  const [question, setQuestion] = useState<string>("");
  const inputLength = input.trim().length;
  const searchParams = useSearchParams();

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputLength === 0) return;
    router.push("/divination/analysis?question=" + encodeURIComponent(question) + "&solutionID=" + solutionID + "&result=" + encodeURIComponent(input));
  };

  useEffect(() => {
    if (searchParams === null) {
      router.back()
      return
    }
    const solutionID = searchParams.get("solutionID");
    if (solutionID === null || solutionID === "") {
      router.back()
      return
    }
    setSolutionID(solutionID)
    const question = searchParams.get("question");
    if (question === null || question === "") {
      router.back()
      return
    }
    const result = searchParams.get("result");
    if (result != null && result !== "") {
      router.push("/divination/analysis?question=" + encodeURIComponent(question) + "&solutionID=" + solutionID + "&result=" + result);
      return
    }
    setQuestion(question)
  }, [])

  return (
    <div className="m-5 top-12 h-[calc(100%-4rem)] flex justify-center items-center flex-col">
      <form onSubmit={handleSend} className="flex w-full items-center space-x-2">
        <Input
          id="message"
          placeholder="输入刚才你抽到的牌"
          className="flex-1 text-base"
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button type="submit" size="icon" disabled={inputLength === 0}>
          <Send className="h-5 w-5"/>
        </Button>
      </form>
      <div className="mt-5 text-center text-3xl">
        按牌阵顺序
        <div className="mt-4"/>
        输入刚才你抽到的牌
        <div className="mt-4"/>
        例如星币1、宝剑5逆位
      </div>
    </div>

  );
}
