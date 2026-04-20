"use client";

import { useActionState, useState } from "react";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { sendContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = {
  success: false,
};

function ContactForm({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  if (state.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700">Gui thanh cong!</CardTitle>
          <CardDescription>
            Cam on ban da lien he. Toi se phan hoi som nhat co the.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" onClick={onReset} variant="secondary">
            Gui tin nhan khac
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Ho va ten</Label>
        <Input id="name" name="name" placeholder="Nguyen Van A" required />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          required
        />
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Tieu de</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Chu de ban muon trao doi"
          required
        />
        {state.errors?.subject && (
          <p className="text-sm text-red-500">{state.errors.subject[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Noi dung</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Viet noi dung tin nhan..."
          rows={6}
          required
        />
        {state.errors?.message && (
          <p className="text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>

      <SubmitButton
        idleText="Gui tin nhan"
        pendingText="Dang gui..."
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      />
    </form>
  );
}

export default function ContactPage() {
  const [formKey, setFormKey] = useState(0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Lien he</h1>
      <p className="mt-2 text-muted-foreground">
        Ban co cau hoi hoac muon hop tac? Hay gui tin nhan cho toi!
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardHeader className="space-y-0">
              <CardTitle className="text-lg">Email</CardTitle>
              <CardDescription>nguyenvana@sv.dlu.edu.vn</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="space-y-0">
              <CardTitle className="text-lg">GitHub</CardTitle>
              <CardDescription>github.com/nguyenvana</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="space-y-0">
              <CardTitle className="text-lg">Dia chi</CardTitle>
              <CardDescription>
                Dai hoc Da Lat, 01 Phu Dong Thien Vuong, Da Lat
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Form lien he</CardTitle>
              <CardDescription>
                Form nay dung Server Actions + Zod validation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm
                key={formKey}
                onReset={() => setFormKey((prev) => prev + 1)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
