"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createEventAction } from "@/app/actions/content";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NewEventModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  function resetForm() {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setUrl("");
    setIsRecurring(false);
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) resetForm();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createEventAction({
        title,
        description: description || null,
        start_date: new Date(startDate).toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : null,
        location: location || null,
        url: url || null,
        is_recurring: isRecurring,
      });
      if ("error" in result) {
        setError(result.error);
      } else {
        setOpen(false);
        resetForm();
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
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
            placeholder="Community Meeting"
          />

          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the event…"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="start_date"
              label="Start *"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <FormInput
              id="end_date"
              label="End"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <FormInput
            id="location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Town Hall, 100 Main St"
          />
          <FormInput
            id="url"
            label="URL"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/event"
          />

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_recurring"
              checked={isRecurring}
              onCheckedChange={(checked) => setIsRecurring(!!checked)}
            />
            <Label htmlFor="is_recurring" className="text-sm font-medium text-gray-700">
              Recurring event
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !startDate}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
