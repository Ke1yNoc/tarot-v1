"use client";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {CircleCheck, CircleHelp, Lightbulb} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {question as questionApi} from "@/service/llm";
import Image from "next/image";
import {getTarot} from "@/service/tarot";

type Message = {
  role: "user" | "assistant";
  type: "text" | "image" | "select";
  content: string | React.JSX.Element;
};

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [localTarot, setLocalTarot] = React.useState<Tarot>({} as Tarot);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [question, setQuestion] = useState<string>("");
  const [action, setAction] = useState<boolean>(false);

  useEffect(() => {
    if (searchParams === null) {
      router.back()
      return
    }
    const question = searchParams.get("question");
    if (question === null || question === "") {
      router.back()
      return
    }
    setQuestion(question);
    setMessages([{
      role: "user",
      type: "text",
      content: question
    }, {
      role: "assistant",
      type: "text",
      content: "你想问的问题是：" + question
    }, {
      role: "assistant",
      type: "select",
      content: (
        <div className="inline-flex items-center justify-center w-full gap-4">
          <Button
            onClick={() => {
              setAction(true)
              questionApi(question)
                .then((res) => {
                  const outputs = res.data.outputs
                  setMessages((messages) => [...messages, {
                    role: "assistant",
                    type: "text",
                    content: outputs.answer
                  }]);
                  getTarot(outputs.solutionID)
                    .then((res) => {
                      if (res != null) {
                        setLocalTarot(res)
                      }
                    }).catch((e) => {
                    console.log(e)
                  })
                }).catch((e) => {
                console.log(e)
              })
            }}
          >
            <CircleCheck color="green" className="mr-2 h-4 w-4"/>是的
          </Button>
          <Button
            onClick={() => {
              router.back();
            }}
          >
            <CircleHelp color="red" className="mr-2 h-4 w-4 "/>重新提问
          </Button>
        </div>
      ),
    }
    ])
  }, [])

  return (
    <div>
      <div className="w-full pl-5 pr-5 min-h-[calc(100vh-7rem)] top-12 overflow-auto text-default">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 whitespace-pre-wrap ${
                  message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
                } ${message.type === "text" ? "" : "hidden"}`}
              >
                {message.content as string}
              </div>

              {!action &&
                <div
                  className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  } ${message.type === "select" ? "" : "hidden"}`}
                >
                  {message.type === "select" ? message.content : null}
                </div>
              }
            </div>
          ))}
          {localTarot.tarotId &&
            <div>
              <div className="text-center flex justify-center items-center flex-col gap-2 pt-5">
                {localTarot.name}
              </div>
              <div className="flex flex-col items-center">
                <Image src={"/tarot/" + localTarot.tarotId + ".png"} alt={"tarot"} width={500} height={500}/>
              </div>
              <div className="whitespace-pre-wrap text-center leading-relaxed">
                {localTarot.positionExplanation}
              </div>
              <div className="flex justify-center items-center mt-5">
                <Button className="m-2  h-8 w-52"
                        onClick={() => router.push(`/divination/teach?solutionID=${localTarot.tarotId}&question=${question}`)}>
                  <Lightbulb
                    className="mr-2 h-4 w-4"/>开始洗牌</Button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
