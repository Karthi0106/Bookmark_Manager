"use client";

import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ bookmarks, setBookmarks }: any) {
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);

    // Optimistic delete
    setBookmarks((prev: any) =>
      prev.filter((bookmark: any) => bookmark.id !== id)
    );
  };

  if (!bookmarks.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p className="text-lg">No bookmarks yet</p>
        <p className="text-sm mt-2">
          Add your first bookmark above 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark: any) => (
        <div
          key={bookmark.id}
          className="
            group
            flex items-center justify-between
            p-4
            rounded-xl
            bg-white/5
            border border-white/10
            hover:bg-white/10
            transition
          "
        >
          {/* Bookmark Info */}
          <div className="flex flex-col">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-Navyblue-100
                font-medium
                hover:text-blue-400
                transition
              "
            >
              {bookmark.title}
            </a>
            <span className="text-xs text-Navyblue-400 truncate max-w-xs">
              {bookmark.url}
            </span>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="
              text-red-400
              opacity-70
              hover:opacity-100
              hover:text-red-500
              transition
              text-sm
              font-medium
            "
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
