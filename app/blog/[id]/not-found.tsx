import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h2 className="text-2xl font-bold">Bai viet khong ton tai</h2>
      <p className="mt-2 text-muted-foreground">
        Bai viet ban tim kiem khong ton tai hoac da bi xoa.
      </p>
      <Link href="/blog" className="mt-6 text-primary hover:underline">
        ← Quay lai danh sach bai viet
      </Link>
    </main>
  );
}
