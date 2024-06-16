"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearch } from "@/components/provide/SearchProvide";
import InputArea from "@/components/InputArea";
import SourceCard from "@/components/SourceCard";
import SimilarTopics from "@/components/SimilarTopics";
import { Spin } from "antd";

export default function SearchList() {
  const router = useRouter();
  const { loading, sources, similarQuestions, reset } = useSearch();
  const screenHeight = window.innerHeight;

  return (
    <>
      <div className="fixed z-[999] left-0 top-0 py-4 bg-white flex w-full justify-center border-b border-zinc-300">
        <Image
          src={"/googleLogo.png"}
          width={100}
          height={40}
          alt="google"
          className="mr-6 cursor-pointer object-contain"
          onClick={() => {
            reset();
            router.push("/");
          }}
        ></Image>
        <InputArea />
      </div>

      {/* google search result */}
      <div className={`mt-[115px] h-[${screenHeight - 115}] overflow-y-auto flex flex-col items-center`}>
        <div className="my-8 flex w-full flex-col bg-white lg:max-w-[1080px]">
          <Spin tip="加载中..." spinning={!sources.length}>
            {sources.map((source, index) => (
              <div className="mb-4" key={index}>
                <SourceCard source={source} />
              </div>
            ))}
            {!!similarQuestions.length && (
              <div className="my-12">
                <SimilarTopics similarQuestions={similarQuestions} />
              </div>
            )}
          </Spin>
        </div>
      </div>

      {/* loading */}
      <div className="fixed left-2 top-2 z-[1000]">
        <Spin spinning={loading}></Spin>
      </div>
    </>
  );
}
