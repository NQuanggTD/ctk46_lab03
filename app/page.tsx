import Link from "next/link";
import Counter from "./components/Counter";

export default function HomePage() {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_30%)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <section className="space-y-8">
          <span className="inline-flex w-fit items-center rounded-full border border-brand-violet/20 bg-brand-violet/10 px-4 py-2 text-sm font-semibold text-brand-violet dark:border-brand-emerald/20 dark:bg-brand-emerald/10 dark:text-brand-emerald">
            Tailwind CSS + Next.js
          </span>

          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Chào mừng đến với ứng dụng Next.js của tôi!
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
              Khám phá các tính năng, blog, dự án và trải nghiệm giao diện được
              thiết kế bằng Tailwind CSS với hỗ trợ dark mode.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-violet/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-brand-emerald hover:text-brand-emerald dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-brand-emerald dark:hover:text-brand-emerald"
            >
              Dự án
            </Link>
          </div>
        </section>

        <aside className="grid gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-8">
          <div className="rounded-2xl bg-gradient-to-br from-brand-violet to-brand-emerald p-6 text-white">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              Features
            </p>
            <p className="mt-3 text-2xl font-bold">
              Dark mode, Blog, Dynamic Routes
            </p>
            <p className="mt-2 text-sm text-white/85">
              Giao diện mẫu cho bài thực hành với cấu trúc rõ ràng và khả năng
              mở rộng.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-brand-violet">01</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                Navigation
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Navbar chung cho toàn bộ ứng dụng.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-brand-emerald">02</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                Theming
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Chuyển sáng/tối ngay trong giao diện.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Demo Client Component: Counter
            </p>
            <Counter />
          </div>
        </aside>
      </div>
    </main>
  );
}
