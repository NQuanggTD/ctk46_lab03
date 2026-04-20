import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post, User } from "@/types/post";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  if (!res.ok) {
    throw new Error("Khong the tai thong tin tac gia");
  }

  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);
  const author = await getUser(post.userId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/blog" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Quay lai danh sach
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl capitalize">{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground">Tac gia: {author.name}</p>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-foreground/90">{post.body}</p>
        </CardContent>
      </Card>
    </div>
  );
}
