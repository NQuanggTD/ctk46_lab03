export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24 text-center">
      <h1 className="text-4xl font-bold mb-6">Về chúng tôi</h1>
      <p className="text-lg text-gray-700">
        Đây là trang giới thiệu về chúng tôi. Chúng tôi tập trung vào việc cung
        cấp các giải pháp web hiện đại và chất lượng cao.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-left shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="mb-3 text-xl font-semibold">Thong tin ca nhan</h2>
        <p>Ho ten: [Nhap ho ten that]</p>
        <p>MSSV: [Nhap MSSV]</p>
        <p>Email: [Nhap email]</p>
      </div>
    </main>
  );
}
