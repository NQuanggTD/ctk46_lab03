import { guestbookEntries } from "../../../data/guestbook";

// GET /api/guestbook — Lấy danh sách tất cả lời nhắn
export async function GET(request: Request) {
  const limitParam = new URL(request.url).searchParams.get("limit");

  if (limitParam === null) {
    return Response.json(guestbookEntries);
  }

  const limit = Number(limitParam);

  if (!Number.isInteger(limit) || limit < 1) {
    return Response.json(
      { error: "limit phải là số nguyên dương" },
      { status: 400 },
    );
  }

  return Response.json(guestbookEntries.slice(0, limit));
}

// POST /api/guestbook — Thêm lời nhắn mới
export async function POST(request: Request) {
  const body = await request.json();
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  // Kiểm tra dữ liệu đầu vào
  if (name.length < 2 || name.length > 50) {
    return Response.json(
      { error: "Tên phải từ 2 đến 50 ký tự" },
      { status: 400 },
    );
  }

  if (message.length < 1 || message.length > 500) {
    return Response.json(
      { error: "Lời nhắn phải từ 1 đến 500 ký tự" },
      { status: 400 },
    );
  }

  // Tạo entry mới
  const newEntry = {
    id: Date.now().toString(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  // Thêm vào đầu mảng (hiển thị mới nhất trước)
  guestbookEntries.unshift(newEntry);

  return Response.json(newEntry, { status: 201 });
}
