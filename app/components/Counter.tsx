"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="rounded-full bg-blue-500 px-4 py-2 text-white font-bold transition hover:bg-blue-700"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      <span className="text-2xl font-bold text-slate-900 dark:text-white">
        {count}
      </span>
      <button
        type="button"
        className="rounded-full bg-blue-500 px-4 py-2 text-white font-bold transition hover:bg-blue-700"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}
