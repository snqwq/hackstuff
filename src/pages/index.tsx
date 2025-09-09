"use client";

import { useState, useEffect, useCallback, useMemo, JSX } from "react";
import { supabase } from "@/lib/supabase";
import { Item } from "@/lib/types";
import ItemCard from "@/components/ItemCard";

export default function Home(): JSX.Element {
  const texts = useMemo(
    () => [
      "She load on my ing till i... well... i shant say...",
      "Looooooooooooading...",
      "🐟",
      "loading...",
      "Loading... Please wait.",
      "loading... Dont wait",
      "not loading... goodluck",
      "i wonder if anyone actually reads these",
    ],
    []
  );
  const getRandomLoadingText = useCallback((): string => {
    return texts[Math.floor(Math.random() * texts.length)];
  }, [texts]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems(): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    if (loading) {
      setLoadingText(getRandomLoadingText());
    }
  }, [loading, getRandomLoadingText]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">{loadingText}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={fetchItems}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-[montserrat] italic">
          HackStuff.cool &lt;- no domain yet
        </h1>
        <p className="text-xl text-gray-600">guhhhh!?!??!</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No items found.</p>
          <p className="text-gray-400 mt-2">Probably not a good sign...</p>
        </div>
      )}
    </div>
  );
}
