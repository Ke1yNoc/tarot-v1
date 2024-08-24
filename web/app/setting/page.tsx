import {Button} from "@/components/ui/button";
import React from "react";

export default function Setting() {
  return (
    <div>
      <div className="max-w-md mx-auto rounded-xl p-6 shadow-md">
        <div className="flex items-center mb-6">
          <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center">
            <span className="text-2xl">小</span>
          </div>
          <div className="ml-4">
            <p className="font-semibold">小明</p>
            <button className="text-red-500">编辑</button>
          </div>
        </div>
        <div className="space-y-4">
          <Button className="w-full py-2 px-4">
            历史记录
          </Button>
        </div>
        <div className="mt-6">
          <Button className="w-full py-2 px-4">
            绑定产品ID
          </Button>
        </div>
        <div className="mt-6">
          <Button className="w-full py-2 px-4">
            用户协议
          </Button>
        </div>
        <div className="mt-6">
          <Button className="w-full py-2 px-4" variant="destructive">
            退出登陆
          </Button>
        </div>
      </div>
    </div>

  );
}
