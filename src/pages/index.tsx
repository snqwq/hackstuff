"use client";

import { useState, useEffect, JSX } from "react";
import { supabase } from "@/lib/supabase";
import { Item } from "@/lib/types";
import ItemCard from "@/components/ItemCard";

export default function Home(): JSX.Element {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">She load on my ing till i...</div>
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
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cool Stuff (insert actually good title here)
        </h1>
        <p className="text-xl text-gray-600">
          guhhhh!?!??!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No items found.</p>
          <p className="text-gray-400 mt-2">
            Add some cool stuff to your database!
          </p>
        </div>
      )}
    </div>
  );
}
