"use client";

// import Answer from "@/components/Answer";
import InputArea from "@/components/InputArea";
import { log } from "console";
// import SimilarTopics from "@/components/SimilarTopics";
// import Sources from "@/components/Sources";
import Image from "next/image";
// import { useRef, useState } from "react";
// import {
//   createParser,
//   ParsedEvent,
//   ReconnectInterval,
// } from "eventsource-parser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const [question, setQuestion] = useState("");
  // const [showResult, setShowResult] = useState(false);
  // const [sources, setSources] = useState<{ name: string; url: string }[]>([]);
  // const [answer, setAnswer] = useState("");
  // const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  // const chatContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // const handleDisplayResult = async (newQuestion?: string) => {
  //   newQuestion = newQuestion || promptValue;

  //   setShowResult(true);
  //   setLoading(true);
  //   setQuestion(newQuestion);
  //   setPromptValue("");

  //   await Promise.all([
  //     handleSourcesAndAnswer(newQuestion),
  //     // handleSimilarQuestions(newQuestion),
  //   ]);

  //   setLoading(false);
  // };

  // async function handleSourcesAndAnswer(question: string) {
  //   let result = await fetch("/api/google/search", {
  //     method: "POST",
  //     body: JSON.stringify({ question }),
  //   });
  //   let googleResult = await result.json();
  //   console.log("🚀 ~ handleDisplayResult ~ sources:", googleResult);

  //   let similarQuestions = [];
  //   if (googleResult.relatedSearches) {
  //     similarQuestions = googleResult.relatedSearches.map(
  //       (item: any) => item.query || item.title,
  //     );
  //     similarQuestions.length =
  //       similarQuestions.length > 3 ? 3 : similarQuestions.length;
  //   }
  //   if (googleResult.peopleAlsoAsk) {
  //     similarQuestions = googleResult.peopleAlsoAsk.map(
  //       (item: any) => item.question,
  //     );
  //     similarQuestions.length =
  //       similarQuestions.length > 3 ? 3 : similarQuestions.length;
  //   }
  //   setSimilarQuestions(similarQuestions);

  //   const source = googleResult.organic.map((item: any) => ({
  //     name: item.title,
  //     url: item.link,
  //   }));
  //   setSources(source);

  //   // ai summary down load
  //   const response = await fetch("/api/getRagResult", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ question, sources }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }

  //   if (response.status === 202) {
  //     const fullAnswer = await response.text();
  //     setAnswer(fullAnswer);
  //     return;
  //   }

  //   // This data is a ReadableStream
  //   const data = response.body;
  //   if (!data) {
  //     return;
  //   }

  //   const onParse = (event: ParsedEvent | ReconnectInterval) => {
  //     if (event.type === "event") {
  //       const data = event.data;
  //       try {
  //         const text = JSON.parse(data).text ?? "";
  //         setAnswer((prev) => prev + text);
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     }
  //   };

  //   // https://web.dev/streams/#the-getreader-and-read-methods
  //   const reader = data.getReader();
  //   const decoder = new TextDecoder();
  //   const parser = createParser(onParse);
  //   let done = false;
  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read();
  //     done = doneReading;
  //     const chunkValue = decoder.decode(value);
  //     parser.feed(chunkValue);
  //   }
  // }

  // const reset = () => {
  //   setShowResult(false);
  //   // setPromptValue("");
  //   setQuestion("");
  //   setAnswer("");
  //   setSources([]);
  //   setSimilarQuestions([]);
  // };

  useEffect(() => {
    console.log('测试 cr agent， 1+2', 1+2);
    console.log('a+222, ', 1+2+0+3+0+1);
    console.log('a+223, ', 1+2+0+3+0+1);
    console.log('aaaa==');
    
    
  }, [])

  return (
    <>
      <main>
        <div className="flex h-[80vh] flex-col items-center justify-center">
          <Image
            unoptimized
            src="/googleLogo.png"
            alt="logo"
            width={272}
            height={92}
            className="mb-8"
          ></Image>

          <InputArea jumpPage={() => router.push("/search")} />
        </div>
      </main>
    </>
  );
}

// {showResult && (
//   <div className="flex h-full min-h-[68vh] w-full grow flex-col justify-between">
//     <div className="container w-full space-y-2">
//       <div className="container space-y-2">
//         <div className="container flex w-full items-start gap-3 px-5 pt-2 lg:px-10">
//           <div className="flex w-fit items-center gap-4">
//             <Image
//               unoptimized
//               src={"/img/message-question-circle.svg"}
//               alt="message"
//               width={30}
//               height={30}
//               className="size-[24px]"
//             />
//             <p className="pr-5 font-bold uppercase leading-[152%] text-black">
//               Question:
//             </p>
//           </div>
//           <div className="grow">&quot;{question}&quot;</div>
//         </div>
//         <>
//           <Sources sources={sources} />
//           <Answer answer={answer} />
//           <SimilarTopics
//             similarQuestions={similarQuestions}
//             handleDisplayResult={handleDisplayResult}
//             reset={reset}
//           />
//         </>
//       </div>

//       <div className="pt-1 sm:pt-2" ref={chatContainerRef}></div>
//     </div>
//     <div className="container px-4 lg:px-0">
//       <InputArea
//         promptValue={promptValue}
//         setPromptValue={setPromptValue}
//         handleDisplayResult={handleDisplayResult}
//         disabled={loading}
//         reset={reset}
//       />
//     </div>
//   </div>
// )}
