import type { Metadata } from "next";
import { SoundTherapyGame } from "@/components/SoundTherapyGame";

export const metadata: Metadata = {
  title: "喜马拉雅颂钵音疗室",
  description:
    "用木棒磨钵、敲钵或棒槌柔敲，演奏四组 CDEFGAB 七脉轮颂钵音阶，叠加叮夏、风铃、雨棍等音疗乐器并录制你的声音旅程。",
};

export default function SoundTherapyPage() {
  return <SoundTherapyGame />;
}
