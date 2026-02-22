"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateResourceAction } from "@/app/actions/content";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RESOURCE_CATEGORIES, type Resource, type ResourceCategory } from "@/lib/supabase/types";

type EditResourceModalProps = {
  resource: Resource;
};

export function EditResourceModal({ resource }: EditResourceModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(resource.name);
  const [category, setCategory] = useState<ResourceCategory>(resource.category);
  const [description, setDescription] = useState(resource.description ?? "");
  const [website, setWebsite] = useState(resource.website ?? "");
  const [phone, setPhone] = useState(resource.phone ?? "");
  const [email, setEmail] = useState(resource.email ?? "");
  const [address, setAddress] = useState(resource.address ?? "");
  const [isActive, setIsActive] = useState(resource.is_active);

  function resetToResource() {
    setName(resource.name);
    setCategory(resource.category);
    setDescription(resource.description ?? "");
    setWebsite(resource.website ?? "");
    setPhone(resource.phone ?? "");
    setEmail(resource.email ?? "");
    setAddress(resource.address ?? "");
    setIsActive(resource.is_active);
    setError(null);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) resetToResource();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await updateResourceAction(resource.id, {
        name,
        category,
        description: description || null,
        website: website || null,
        phone: phone || null,
        email: email || null,
        address: address || null,
        is_active: isActive,
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <FormInput
            id="name"
            label="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="City Food Bank"
          />

          <div className="flex flex-col gap-1">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category *
            </Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as ResourceCategory)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {RESOURCE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of services offered…"
              rows={3}
            />
          </div>

          <FormInput
            id="website"
            label="Website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
          />
          <FormInput
            id="phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="555-000-1234"
          />
          <FormInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@example.com"
          />
          <FormInput
            id="address"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Springfield"
          />

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(!!checked)}
            />
            <Label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active (visible on site)
            </Label>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
