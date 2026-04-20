"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { guestbookEntries } from "@/data/guestbook";

const guestbookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ten phai co it nhat 2 ky tu")
    .max(50, "Ten khong duoc qua 50 ky tu"),
  message: z
    .string()
    .trim()
    .min(1, "Loi nhan khong duoc de trong")
    .max(500, "Loi nhan khong duoc qua 500 ky tu"),
});

export interface ActionState {
  success: boolean;
  errors?: {
    name?: string[];
    message?: string[];
  };
}

export async function createGuestbookEntry(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  void prevState;

  const rawData = {
    name: formData.get("name") as string,
    message: formData.get("message") as string,
  };

  const result = guestbookSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const oneMinuteAgo = Date.now() - 60_000;
  const hasRecentDuplicate = guestbookEntries.some((entry) => {
    const createdAtTime = new Date(entry.createdAt).getTime();

    if (Number.isNaN(createdAtTime) || createdAtTime < oneMinuteAgo) {
      return false;
    }

    return (
      entry.name === result.data.name && entry.message === result.data.message
    );
  });

  if (hasRecentDuplicate) {
    return {
      success: false,
      errors: {
        message: ["Ban da gui loi nhan trung lap trong vong 1 phut."],
      },
    };
  }

  guestbookEntries.unshift({
    id: Date.now().toString(),
    name: result.data.name,
    message: result.data.message,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/guestbook");

  return { success: true };
}

export async function deleteGuestbookEntry(id: string): Promise<ActionState> {
  const index = guestbookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    return {
      success: false,
      errors: { message: ["Khong tim thay loi nhan"] },
    };
  }

  guestbookEntries.splice(index, 1);
  revalidatePath("/guestbook");

  return { success: true };
}
