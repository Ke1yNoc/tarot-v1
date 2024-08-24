"use client";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Lightbulb, Volume2, VolumeX, Loader2} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import shuffleGif from "@/public/shuffle.gif";
import cutCardsGif from "@/public/cut_cards.gif";
import {getTarot} from "@/service/tarot";
import {image} from "@/service/image";

export default function Teach() {
  const router = useRouter();
  const [action, setAction] = React.useState<number>(1);
  const [localTarot, setLocalTarot] = React.useState<Tarot>({} as Tarot);
  const [imgUrl, setImgUrl] = React.useState<FileList | null>();
  const searchParams = useSearchParams();
  const [question, setQuestion] = useState<string>("");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        // @ts-ignore
        await audioRef.current.play();
      } catch (err) {
        console.log('Autoplay prevented, user interaction required.');
        setIsPlaying(false);
      }
    };

    if (audioRef.current) {
      playAudio();
    }
  }, []);

  useEffect(() => {
    if (action != 1) {
      if (audioRef.current == null) {
        return
      }
      // @ts-ignore
      audioRef.current.pause();
    }
  }, [action])

  useEffect(() => {
    if (imgUrl) {
      console.log(imgUrl.item(0))
      setLoading(true)
      setError(false)
      // @ts-ignore
      image(imgUrl.item(0), localTarot.tarotId).then((res) => {
        if (res.pred.length === 0) {
          setLoading(false)
          return
        }
        let pre = "";
        res.pred.forEach((item: any) => {
          pre += item
          pre += "、"
        })
        pre = pre.substring(0, pre.length - 1)
        router.push("/divination/analysis?question=" + encodeURIComponent(question) + "&solutionID=" + localTarot.tarotId + "&result=" + encodeURIComponent(pre));
      }).catch((err) => {
        // @ts-ignore
        inputRef.current.value = '';
        setError(true)
        setLoading(false)
        return
      })
    }
  }, [imgUrl])

  const togglePlayPause = () => {
    if (audioRef.current == null) {
      return
    }
    if (isPlaying) {
      // @ts-ignore
      audioRef.current.pause();
    } else {
      // @ts-ignore
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
    const question = searchParams.get("question");
    if (question === null || question === "") {
      router.back()
      return
    }
    setQuestion(question);
    getTarot(solutionID).then((res) => {
      setLocalTarot(res)
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // @ts-ignore
  return (
    <div>
      {action !== 4 &&
        <div className="fixed top-12 left-2" onClick={() => setAction(4)}>
          跳过
        </div>
      }

      {action == 1 &&
        <div className="fixed top-12 right-2">
          {isPlaying && <Volume2 className="h-6 w-6 cursor-pointer" onClick={togglePlayPause}/>}
          {!isPlaying && <VolumeX className="h-6 w-6 cursor-pointer" onClick={togglePlayPause}/>}
        </div>
      }

      <audio ref={audioRef} src="/m.mp3" loop/>
      <div className="w-full pl-5 pr-5 h-[calc(100vh-7rem)] overflow-auto">
        {action === 1 &&
          <div className="text-center text-3xl flex justify-center items-center flex-col gap-2 h-[calc(100vh-7rem)]">
            <p>
              保持安静
            </p>
            <p>
              放松
            </p>
            <p>
              深呼吸
            </p>
            <p>
              脑海中想着你的问题
            </p>
            <div className="flex flex-row justify-center items-center w-full mt-5">
              <div className="flex justify-center items-center">
                <Button className="m-2 h-8 w-32" onClick={() => setAction((prev) => (prev + 1))}> <Lightbulb
                  className="mr-2 h-4 w-4"/>下一步</Button>
              </div>
            </div>
          </div>
        }
        {action === 2 &&
          <div className="h-[calc(100vh-7rem)] fade-in">
            <p className="text-center text-3xl pt-5">
              洗牌
            </p>
            <div className="flex flex-col items-center">
              <Image src={shuffleGif} alt={"shuffle"} className="p-5 pt-10" width={500} height={500}/>
            </div>
            <div className="text-center text-2xl flex justify-center items-center flex-col gap-2">
              <p>
                牌背面朝上摊开
              </p>
              <p>
                双手放在牌面上
              </p>
              <p>
                手掌心揉搓洗牌
              </p>
              <p>
                将牌全部打散
              </p>
              <p>
                最后用手慢慢将牌收拢
              </p>
              <p>
                横向背面朝上
              </p>
            </div>
            <div className="flex flex-row justify-center items-center w-full mt-5">
              <div className="flex justify-center items-center">
                <Button className="m-2 h-8 w-32" onClick={() => setAction((prev) => (prev + 1))}> <Lightbulb
                  className="mr-2 h-4 w-4"/>下一步</Button>
              </div>
            </div>
          </div>
        }
        {action === 3 &&
          <div className="h-[calc(100vh-7rem)]">
            <div className="text-center text-3xl pt-5">
              切牌
            </div>
            <div className="flex flex-col items-center">
              <Image src={cutCardsGif} alt={"tarot"} className="p-5 pt-10" width={500} height={500}/>
            </div>
            <div className="text-center text-2xl flex justify-center items-center flex-col gap-2">
              <p>
                将卡牌分成上下3摞
              </p>
              <p>
                再将卡牌合成1摞
              </p>
              <p>
                顺时针90°转动塔罗牌
              </p>
              <p>
                使之垂直于你
              </p>
            </div>
            <div className="flex flex-row justify-center items-center w-full mt-5">
              <div className="flex justify-center items-center">
                <Button className="m-2 h-8 w-32" onClick={() => setAction((prev) => (prev + 1))}> <Lightbulb
                  className="mr-2 h-4 w-4"/>下一步</Button>
              </div>
            </div>
          </div>
        }
        {action === 4 && localTarot.tarotId &&
          <div>
            <div className="text-center text-3xl pt-5">
              抽牌
            </div>
            <div className="text-center text-2xl flex justify-center items-center flex-col gap-2 pt-5">
              <div>
                脑海中想象着你的问题
              </div>
              <div>
                保持安静
              </div>
              <div>
                放松、深呼吸
              </div>
              <div>
                按照如下顺序抽取塔罗牌
              </div>
              <div className="pt-5">
                {localTarot.name}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image src={"/tarot/" + localTarot.tarotId + ".png"} alt={"tarot"} width={500} height={500}/>
            </div>
            <div className="whitespace-pre-wrap text-center text-2xl leading-relaxed">
              {localTarot.positionExplanation}
            </div>
            {!loading && <div className="flex flex-row justify-center items-center mt-5">
              <Button className="m-2 mb-0 h-8 w-52"
                      onClick={handleButtonClick}>
                <Lightbulb
                  className="mr-2 h-4 w-4"/>我抽好了，拍照识别</Button>
            </div>}
            {!loading && <div className="flex justify-center items-center">
              <Button className="h-8 w-52" variant="link"
                      onClick={() => router.push("/divination/result" + `?solutionID=${localTarot.tarotId}&question=${question}`)}>手动输入抽牌结果</Button>
            </div>}
            {error && <div className="flex justify-center items-center">
              <p className="text-red-500 text-default">
                识别失败
              </p>
            </div>}
            {loading && <div className="flex flex-row justify-center items-center mt-5">
              <Button className="m-2 mb-0 h-8 w-52" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                识别中
              </Button>
            </div>}
            <div className="pb-10"></div>
          </div>
        }
      </div>
      <input
        id="image"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={inputRef}
        onChange={(event) => setImgUrl(event.target.files)}
      />
    </div>
  );
}
