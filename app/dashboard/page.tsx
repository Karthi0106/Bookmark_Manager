"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddBookmark from "@/Components/Addbookmark";
import BookmarkList from "@/Components/Bookmarklist";

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Your Bookmarks
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Logged in as {user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium rounded-lg 
              bg-red-500/10 hover:bg-red-500/20 
              text-red-400 transition"
          >
            Logout
          </button>
        </div>

        {/* Glass Card Container */}
        <div
          className="
          backdrop-blur-xl 
          bg-white/5 
          border border-white/10 
          rounded-2xl 
          shadow-xl 
          p-6 
          space-y-6
        "
        >
          <AddBookmark user={user} setBookmarks={setBookmarks} />
          <BookmarkList
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        </div>
      </div>
    </div>
  );
}
