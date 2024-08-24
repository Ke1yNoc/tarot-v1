"use client";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {CircleCheck, CircleHelp, Send} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import {interpretation} from "@/service/llm";
import {getTarot} from "@/service/tarot";
import {Input} from "@/components/ui/input";
import {image} from "@/service/image";


type Message = {
  role: "user" | "assistant";
  type: "text" | "select";
  content: string | React.JSX.Element;
};

export default function Analysis() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputDisabled, setInputDisabled] = React.useState(false);
  const [localTarot, setLocalTarot] = React.useState<Tarot>({} as Tarot);
  const [drawResult, setDrawResult] = React.useState<string>("");
  const [action, setAction] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState<string>("");

  const submit = (imgUrl: FileList|null) => {
    setAction(true)
    // @ts-ignore
    image(imgUrl.item(0), localTarot.tarotId).then((res) => {
      if (res.pred.length === 0) {
        return
      }
      let pre = "";
      res.pred.forEach((item: any) => {
        pre += item
        pre += "、"
      })
      pre = pre.substring(0, pre.length - 1)
      router.push("/divination/result?question=" + encodeURIComponent(question) + "&solutionID=" + localTarot.tarotId + "&result=" + encodeURIComponent(pre));
    }).catch((err) => {
      setAction(false)
      // @ts-ignore
      inputRef.current.value = '';
      setMessages((messages) => [...messages, {
        role: "assistant",
        type: "text",
        content: "图片识别失败"
      }]);
      return
    })
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "instant"});
  }, [messages]);

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
    setQuestion(question)
    const solutionID = searchParams.get("solutionID");
    if (solutionID === null || solutionID === "") {
      router.back()
      return
    }
    const result = searchParams.get("result");
    if (result === null || result === "") {
      router.back()
      return
    }
    setDrawResult(result)
    getTarot(solutionID).then((res) => {
      setLocalTarot(res)
      setMessages([{
        role: "user",
        type: "text",
        content: <div>{question}<br/>用{res.name}抽到了<br/>{result}</div>
      },
        {
          role: "assistant",
          type: "select",
          content: (
            <div className="inline-flex items-center justify-center w-full gap-4">
              <Button
                onClick={() => {
                  setAction(true)
                  interpretation(question, solutionID, res.name, result).then((ires) => {
                    const outputs = ires.data.outputs
                    setMessages((messages) => [...messages, {
                      role: "assistant",
                      type: "text",
                      content: outputs.interpretationResult
                    }]);
                  }).catch((e) => {
                    console.log(e)
                  })
                }}
              >
                <CircleCheck color="green" className="mr-2 h-4 w-4"/>是的
              </Button>
              <div>
                <Button
                  onClick={handleButtonClick}
                >
                  <CircleHelp color="red" className="mr-2 h-4 w-4 "/>不是,重新识别
                </Button>
              </div>
            </div>
          ),
        },
        {
          role: "assistant",
          type: "select",
          content: (
            <div className="inline-flex items-center justify-center w-full gap-4">
              <a href={"/divination/result" + `?solutionID=${solutionID}&question=${question}`}>
                手动输入
              </a>
            </div>
          ),
        }
      ])
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };


  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputLength === 0) return;
    setInputDisabled(true);
    let nowMessages: Message[] = [...messages, {role: "user", content: input, type: "text"}]
    setMessages(nowMessages)
    setInput("");
    interpretation(input, localTarot.tarotId, localTarot.name, drawResult).then((ires) => {
      const outputs = ires.data.outputs
      setMessages([...nowMessages, {
        role: "assistant",
        type: "text",
        content: outputs.interpretationResult
      }])
      setInputDisabled(false)
    }).catch((e) => {
      console.log(e)
    })
  };

  return (
    <div>
      <div className="w-full overflow-y-auto pl-5 pr-5 h-[calc(100vh-11rem)]">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
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

      <input
        id="image"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={inputRef}
        onChange={(event) => submit(event.target.files)}
      />
    </div>
  );
}
