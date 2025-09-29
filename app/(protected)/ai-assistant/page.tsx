"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from 'uuid';

type Role = "user" | "assistant";

interface Message { id: string; role: Role; text: string | React.ReactNode;}

const initialMessages: Message[] = [
  { id: uuidv4(), role: "assistant", text: "Hi! Ask me a question." },
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Scroll the to the last message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const pendingMessage: Message = {id: uuidv4(), role: "assistant", text: <div className="italic text-muted-foreground">Typing...</div>}

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMessage: Message = { id: uuidv4(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMessage]);
    setInput("");

    try {
        setIsSending(true);
        setMessages((m) => [...m, pendingMessage]);
        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: trimmed }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { role: Role; text: string } = await res.json();
        const assistantMessage: Message = { id: uuidv4(), role: data.role ?? "assistant", text: data.text ?? "(no text)" };
        setMessages((m) => [...m.slice(0, m.length - 1), assistantMessage]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        const errMessage: Message = { id: uuidv4(), role: "assistant", text: `Error: ${err?.message ?? "failed to fetch"}` };
        setMessages((m) => [...m, errMessage]);
    } finally {
        setIsSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="bg-background">
      <Card className="w-3xl">
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh] px-4">
            <div className="py-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-xl rounded-br-sm px-3 py-2 max-w-[75%]"
                      : "bg-muted text-foreground rounded-xl rounded-bl-sm px-3 py-2 max-w-[75%]"
                  }>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-3">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Type your question here…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <Button onClick={() => send(input)} className="rounded-xl" disabled={!input.trim()}>
              Ask
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
