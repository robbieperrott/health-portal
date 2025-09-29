import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { question } = body;

  const reply = {
    role: "bot",
    text: `You asked: "${question}". Here is a mocked response.`,
  };

  await new Promise((resolve) => setTimeout(resolve, 700));

  return NextResponse.json(reply);
}
