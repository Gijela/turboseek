import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let { question } = await request.json();

  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: question }),
  });

  const googleJson = await response.json();

  return NextResponse.json(googleJson);
}
