"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import GuestbookForm from "@/components/guestbook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { GuestbookEntry } from "@/data/guestbook";

const ITEMS_PER_PAGE = 5;

const fetcher = async (url: string): Promise<GuestbookEntry[]> => {
  const res = await fetch(url);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error ?? "Khong the tai so luu but. Vui long thu lai.");
  }

  return data as GuestbookEntry[];
};

export default function GuestbookPage() {
  const { data, error, isLoading, mutate } = useSWR<GuestbookEntry[]>(
    "/api/guestbook",
    fetcher,
  );
  const entries = data ?? [];

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(entries.length / ITEMS_PER_PAGE));

  const paginatedEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return entries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, entries]);

  async function handleDelete(id: string) {
    if (!confirm("Ban co chac muon xoa loi nhan nay?")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
      const responseData = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(responseData?.error ?? "Khong the xoa loi nhan.");
      }

      await mutate();
      const nextTotalPages = Math.max(1, Math.ceil((entries.length - 1) / ITEMS_PER_PAGE));
      setCurrentPage((prev) => Math.min(prev, nextTotalPages));
    } catch (deleteError) {
      alert(
        deleteError instanceof Error
          ? deleteError.message
          : "Khong the xoa loi nhan. Vui long thu lai.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold">So luu but</h1>
        <p className="mt-2 text-muted-foreground">Hay de lai loi nhan cho toi nhe!</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gui loi nhan</CardTitle>
          <CardDescription>
            Form nay dung Server Actions + Zod validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GuestbookForm
            onCreated={() => {
              setCurrentPage(1);
              mutate();
            }}
          />
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {entries.length} loi nhan • Trang {currentPage}/{totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Trang truoc
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              Trang sau
            </Button>
          </div>
        </div>

        {isLoading && (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Dang tai du lieu...
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className="p-6 text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Khong the tai so luu but."}
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && paginatedEntries.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Chua co loi nhan nao. Hay la nguoi dau tien!
            </CardContent>
          </Card>
        )}

        {!isLoading &&
          !error &&
          paginatedEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{entry.name}</CardTitle>
                    <CardDescription>
                      {new Date(entry.createdAt).toLocaleString("vi-VN")}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">ID #{entry.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-foreground/90">{entry.message}</p>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === entry.id}
                  onClick={() => handleDelete(entry.id)}
                >
                  {deletingId === entry.id ? "Dang xoa..." : "Xoa"}
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
