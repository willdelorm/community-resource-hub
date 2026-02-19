"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateAnnouncementAction } from "@/app/actions/content";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Announcement } from "@/lib/supabase/types";

type EditAnnouncementModalProps = {
  announcement: Announcement;
};

function toDateInput(iso: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function EditAnnouncementModal({ announcement }: EditAnnouncementModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(announcement.title);
  const [content, setContent] = useState(announcement.content);
  const [dateExpired, setDateExpired] = useState(toDateInput(announcement.date_expired));

  function resetToAnnouncement() {
    setTitle(announcement.title);
    setContent(announcement.content);
    setDateExpired(toDateInput(announcement.date_expired));
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) resetToAnnouncement();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await updateAnnouncementAction(announcement.id, {
        title,
        content,
        date_expired: dateExpired ? new Date(dateExpired).toISOString() : null,
      });
      if ("error" in result) {
        setError(result.error);
      } else {
        setOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="xs">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <FormInput
            id="title"
            label="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Spring Resource Fair — Save the Date!"
          />

          <div className="flex flex-col gap-1">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Announcement details…"
              rows={5}
            />
          </div>

          <FormInput
            id="date_expired"
            label="Expires on"
            type="date"
            value={dateExpired}
            onChange={(e) => setDateExpired(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
