"use client";

import { useActionState, useEffect, useRef } from "react";

import type { ActionState } from "@/app/guestbook/actions";
import { createGuestbookEntry } from "@/app/guestbook/actions";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ActionState = {
  success: false,
};

interface GuestbookFormProps {
  onCreated?: () => void;
}

export default function GuestbookForm({ onCreated }: GuestbookFormProps) {
  const [state, formAction] = useActionState(createGuestbookEntry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    formRef.current?.reset();
    onCreated?.();
  }, [onCreated, state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Ten cua ban</Label>
        <Input id="name" name="name" placeholder="Nhap ten cua ban" required />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Loi nhan</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Viet loi nhan cua ban..."
          required
          rows={4}
        />
        {state.errors?.message && (
          <p className="text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>
      <SubmitButton
        idleText="Gui loi nhan"
        pendingText="Dang gui..."
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      />
      {state.success && (
        <p className="text-sm text-green-600">Gui loi nhan thanh cong!</p>
      )}
    </form>
  );
}
