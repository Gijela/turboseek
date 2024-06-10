import { Readability } from "@mozilla/readability";
import jsdom, { JSDOM } from "jsdom";
import {
  TogetherAIStream,
  TogetherAIStreamPayload,
} from "@/utils/TogetherAIStream";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://together.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

export const maxDuration = 60;

export async function POST(request: Request) {
  let { question, sources } = await request.json();

  console.log("[getAnswer] Fetching text from source URLS");
  let finalResults = await Promise.all(
    sources.map(async (result: any) => {
      try {
        const response = await fetch(result.url);
        const html = await response.text();
        const virtualConsole = new jsdom.VirtualConsole();
        const dom = new JSDOM(html, { virtualConsole });

        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();
        let parsedContent = parsed
          ? cleanedText(parsed.textContent)
          : "Nothing found";

        return {
          ...result,
          fullContent: parsedContent,
        };
      } catch (e) {
        console.log(`error parsing ${result.name}, error: ${e}`);
        return {
          ...result,
          fullContent: "not available",
        };
      }
    }),
  );

  let debug = finalResults.map(
    (result, index) => `[[citation:${index}]] ${result.fullContent} \n\n`,
  );
  console.log("DEBUG LENGTH");
  console.log(debug.toString().length);

  const mainAnswerPrompt = `
  你擅长的语言是中文，每次回答都会使用中文回答。
  给出一个用户的问题和一些上下文，请写一个干净，简明和准确的回答问题的基础上的上下文。你会得到一组与问题相关的上下文，每个上下文都以一个参考数字开头，比如[[引用: x ]] ，其中 x 是一个数字。在准备你的答案时，请使用上下文。
  你的答案必须是正确的，准确的，由专家使用公正和专业的语气写。不要提供任何与问题无关的信息，也不要重复。如果给定的上下文没有提供足够的信息，可以说“信息丢失了”，然后是相关的主题。
  下面是一组上下文:

  <contexts>
  ${finalResults.map(
    (result, index) => `[[citation:${index}]] ${result.fullContent} \n\n`,
  )}
  </contexts>

  记住，不要盲目地一字不差地重复上下文，也不要告诉用户你是如何使用引文的——只要回答就行了。遵守这些指示对我的职业生涯非常重要。这是用户提问:
    `;

  try {
    const payload: TogetherAIStreamPayload = {
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: mainAnswerPrompt },
        {
          role: "user",
          content: question,
        },
      ],
      stream: true,
    };

    console.log(
      "[getAnswer] Fetching answer stream from Together API using text and question",
    );
    const stream = await TogetherAIStream(payload);
    // TODO: Need to add error handling here, since a non-200 status code doesn't throw.
    return new Response(stream, {
      headers: new Headers({
        "Cache-Control": "no-cache",
      }),
    });
  } catch (e) {
    // If for some reason streaming fails, we can just call it without streaming
    console.log(
      "[getAnswer] Answer stream failed. Try fetching non-stream answer.",
    );
    let answer = await together.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: mainAnswerPrompt },
        {
          role: "user",
          content: question,
        },
      ],
    });

    let parsedAnswer = answer.choices![0].message?.content;
    console.log("Error is: ", e);
    return new Response(parsedAnswer, { status: 202 });
  }
}

const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");

  return newText.substring(0, 20000);
};
