"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmark({ user, setBookmarks }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title || !url) return;

    try {
      setLoading(true);

      // Basic URL normalization
      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;

      const { data, error } = await supabase
        .from("bookmarks")
        .insert([
          {
            title,
            url: formattedUrl,
            user_id: user.id,
          },
        ])
        .select();

      if (!error && data) {
        // Optimistic update
        setBookmarks((prev: any) => [data[0], ...prev]);
      }

      setTitle("");
      setUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      addBookmark();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-black-200">
        Add New Bookmark
      </h2>

      <div className="space-y-3">
        <input
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-white/5
            border border-white/10
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
            placeholder-gray-400
            transition
          "
          placeholder="Bookmark title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-white/5
            border border-white/10
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
            placeholder-gray-400
            transition
          "
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={addBookmark}
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-medium
    bg-blue-600
    border border-blue-600
    text-white
    transition-colors duration-200
    hover:bg-transparent
    hover:text-blue-400
    hover:border-blue-400
    disabled:opacity-50
          "
        >
          {loading ? "Adding..." : "Add Bookmark"}
        </button>
      </div>
    </div>
  );
}
