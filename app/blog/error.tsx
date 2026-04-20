"use client";

import { useEffect } from "react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi!</h2>
      <p className="text-lg text-gray-700 mb-6">
        Không thể tải nội dung blog. Vui lòng thử lại.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => reset()}
      >
        Thử lại
      </button>
    </main>
  );
}
