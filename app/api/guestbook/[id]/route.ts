import { NextRequest, NextResponse } from "next/server";

import { guestbookEntries } from "@/data/guestbook";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE /api/guestbook/[id]
export async function DELETE(request: NextRequest, context: RouteParams) {
  void request;
  const { id } = await context.params;
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Khong tim thay loi nhan" },
      { status: 404 },
    );
  }

  const deleted = guestbookEntries.splice(index, 1)[0];
  return NextResponse.json(deleted);
}

// PUT /api/guestbook/[id]
export async function PUT(request: NextRequest, context: RouteParams) {
  const { id } = await context.params;
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Khong tim thay loi nhan" },
      { status: 404 },
    );
  }

  const body = await request.json();
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 50) {
    return NextResponse.json(
      { error: "Ten phai tu 2 den 50 ky tu" },
      { status: 400 },
    );
  }

  if (message.length < 1 || message.length > 500) {
    return NextResponse.json(
      { error: "Loi nhan phai tu 1 den 500 ky tu" },
      { status: 400 },
    );
  }

  const updatedEntry = {
    ...guestbookEntries[index],
    name,
    message,
  };

  guestbookEntries[index] = updatedEntry;

  return NextResponse.json(updatedEntry);
}
