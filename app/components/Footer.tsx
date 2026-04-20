export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/85 px-4 py-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
      <div className="container mx-auto flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>Lab 02 - Next.js App Router</p>
        <p>
          Ho ten: [Nhap ho ten that] | MSSV: [Nhap MSSV] | Email: [Nhap email]
        </p>
      </div>
    </footer>
  );
}