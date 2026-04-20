import { NextRequest, NextResponse } from "next/server";

import { guestbookEntries } from "@/data/guestbook";

// GET /api/guestbook
export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");

  if (limitParam === null) {
    return NextResponse.json(guestbookEntries);
  }

  const limit = Number(limitParam);

  if (!Number.isInteger(limit) || limit < 1) {
    return NextResponse.json(
      { error: "limit phai la so nguyen duong" },
      { status: 400 },
    );
  }

  return NextResponse.json(guestbookEntries.slice(0, limit));
}

// POST /api/guestbook
export async function POST(request: NextRequest) {
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

  const newEntry = {
    id: Date.now().toString(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);

  return NextResponse.json(newEntry, { status: 201 });
}
