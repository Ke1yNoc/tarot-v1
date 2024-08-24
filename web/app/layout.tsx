"use client";
import {Inter} from "next/font/google";
import "./globals.css";

import {Search, LibraryBig, UserRound, ChevronLeft, CircleHelp, Send} from "lucide-react";
import {ThemeProvider} from "@/components/theme-provider";
import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {ping} from "@/service/auth";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

type Route = {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const routes: Route[] = [
  {
    name: "占卜",
    path: "/divination",
    icon: Search,
  },
  {
    name: "知识",
    path: "/knowledge",
    icon: LibraryBig,
  },
  {
    name: "用户",
    path: "/setting",
    icon: UserRound,
  },
];

export default function RootLayout({
                                     children,

                                   }: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null || token === "") {
      setOpen(true)
    }
    if (pathname === "/") {
      router.push("/divination");
    }
  })

  const headers = [
    {
      path: "/divination",
      left: <div className="w-8"></div>,
      center: <div>占卜</div>,
      right: <CircleHelp className="w-8"/>,
    },
    {
      path: "/divination/chat",
      left: <ChevronLeft className="w-8" onClick={() => router.back()}></ChevronLeft>,
      center: <div>占卜</div>,
      right: <CircleHelp className="w-8"/>,
    },
    {
      path: "/divination/result",
      left: <ChevronLeft className="w-8" onClick={() => router.back()}></ChevronLeft>,
      center: <div>占卜</div>,
      right: <CircleHelp className="w-8"/>,
    },
    {
      path: "/divination/analysis",
      left: <ChevronLeft className="w-8" onClick={() => router.back()}></ChevronLeft>,
      center: <div>占卜</div>,
      right: <CircleHelp className="w-8"/>,
    },
    {
      path: "/divination/teach",
      left: <div className="w-8"></div>,
      center: <div>占卜</div>,
      right: <CircleHelp className="w-8"/>,
    },
    {
      path: "/knowledge",
      left: <div className="w-8"></div>,
      center: <div>知识问答</div>,
      right: <div className="w-8"></div>,
    },
    {
      path: "/setting",
      left: <div className="w-8"></div>,
      center: <div>设置</div>,
      right: <div className="w-8"></div>,
    },
  ]

  const handleSend = () => {
    ping(auth).then((res) => {
      if (res.status !== 200) {
        setErrMsg("无效的序列号")
        return
      }
      localStorage.setItem("token", auth)
      setOpen(false)
    }).catch(() => {
      router.push("/")
    })
  }

  return (
    <html lang="en">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
    <body className={`${inter.className}`}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="fixed top-0 left-0 w-full h-12 bg-black flex items-center justify-between z-50">
        {headers.find((header) => header.path === pathname)?.left}
        {headers.find((header) => header.path === pathname)?.center}
        {headers.find((header) => header.path === pathname)?.right}
      </div>
      <div className="fixed bottom-16 top-12 left-0 w-full min-h-[calc(100%-7rem)] overflow-auto">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[calc(100%-2rem)]">
            <DialogHeader>
              <DialogTitle>激活</DialogTitle>
              <DialogDescription>
                请输入你的产品序列ID
                {errMsg && <div className="text-red-500">{errMsg}</div>}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="name"
                  placeholder="产品序列ID"
                  value={auth}
                  onChange={(event) => setAuth(event.target.value)}
                  className="col-span-4 text-base"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSend}>确定</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {children}
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-black">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          {routes.map((route, index) => (
            <a
              key={index}
              href={route.path}
              className={`inline-flex flex-col items-center justify-center px-5 group`}
            >
              <route.icon className={`${pathname === route.path ? "text-white" : "text-gray-500"}`}/>
              <span className={`text-sm ${pathname === route.path ? "text-white" : "text-gray-500"}`}>
                    {route.name}
                  </span>
            </a>
          ))}
        </div>
      </div>


    </ThemeProvider>
    </body>
    </html>
  );
}
