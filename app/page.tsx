"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/dashboard");
    });
  }, [router]);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* App Title */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Bookmark Manager
          </h1>
          <p className="text-gray-400 mt-3">
            Save and manage your favorite links securely.
          </p>
        </div>

        {/* Glass Card */}
        <div
          className="
            backdrop-blur-xl
            bg-white/5
            border border-white/10
            rounded-2xl
            shadow-xl
            p-8
            space-y-6
          "
        >
          <button
            onClick={loginWithGoogle}
            className="
              w-full
              flex items-center justify-center gap-3
              bg-white text-black
              font-medium
              py-3 px-4
              rounded-xl
              hover:bg-gray-200
              transition
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20"
              height="20"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.8 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 5.1 29.2 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 16.2 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 5.1 29.2 3 24 3 16.3 3 9.7 7.4 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 43c5.2 0 9.9-2 13.5-5.3l-6.2-5.1C29.3 34.7 26.8 35 24 35c-5.3 0-9.8-3.1-11.3-7.6l-6.5 5C9.7 39.6 16.3 43 24 43z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.7 5.6-7 6.8l6.2 5.1C39.7 36.6 44 30.5 44 23c0-1.3-.1-2.2-.4-3.5z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500">
          Secure authentication powered by Supabase
        </p>
      </div>
    </div>
  );
}
