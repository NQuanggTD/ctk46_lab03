"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition ${
        liked
          ? "bg-red-50 border-red-200 text-red-600"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
      <span className="font-bold">{count} lượt thích</span>
    </button>
  );
}
