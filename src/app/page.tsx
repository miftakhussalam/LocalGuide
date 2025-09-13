"use client";

import React, { useState } from "react";
import { Loader, SendHorizontal } from "lucide-react";
import { responseData } from "@/api/lib/llm";
import { PlaceResult } from "@/api/lib/google";
import { RecomendationsCard } from "./components/recomendationsCard";

export default function Page() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [llmResponse, setLlmResponse] = useState<string | undefined>("");
  const [recommendations, setRecommendations] = useState<PlaceResult[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  async function handleSearch() {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const llmRes = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const llmJson = (await llmRes.json()) as responseData;
      setLlmResponse(llmJson.message.content);

      console.log(llmJson.message.content);
      const searchRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: llmJson.message.content, limit: 6 }),
      });
      const searchJson = await searchRes.json();

      console.log("searchJson", searchJson);
      if (searchJson?.places) {
        setRecommendations(searchJson?.places);
      } else if (Array.isArray(searchJson)) {
        setRecommendations(searchJson);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error("Viewer error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-[#E0E0E] p-4 gap-4 w-full">
      <div>
        {llmResponse && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg shadow-md border border-[#1B263B] w-full max-w-2xl">
            <p className="whitespace-pre-wrap">{llmResponse}</p>
          </div>
        )}
        {recommendations.length > 0 && (
          <div className="mt-6 space-y-4 w-full max-w-2xl">
            <div className="flex w-full overflow-y-auto gap-4">
              {recommendations.map((place: PlaceResult) => (
                <RecomendationsCard key={place.place_id} place={place} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-2xl p-2 space-y-0 bg-slate-900 rounded-2xl shadow-lg border-2 border-[#1B263B] flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Looking for something—like a place to go, eat, or something else??"
          className="flex-grow bg-transparent text-xl font-normal text-[#FCA311] px-2 placeholder-yellow-800 focus:outline-none"
        />
        <button
          className="flex items-center hover:cursor-pointer text-[#FCA311] hover:text-orange-200"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <Loader /> : <SendHorizontal />}
        </button>
      </div>
    </main>
  );
}
