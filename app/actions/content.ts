"use server";

import { isDemoUser } from "@/lib/supabase/demo";
import {
  createAnnouncement,
  createEvent,
  createResource,
  deleteAnnouncement,
  deleteEvent,
  deleteResource,
  updateAnnouncement,
  updateEvent,
  updateResource,
} from "@/lib/supabase/queries";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AnnouncementInsert,
  AnnouncementUpdate,
  ContactInsert,
  EventInsert,
  EventUpdate,
  ResourceInsert,
  ResourceUpdate,
} from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { error: string };

export async function createResourceAction(
  data: ResourceInsert,
): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await createResource(data);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create resource" };
  }
}

export async function updateResourceAction(
  id: string,
  data: ResourceUpdate,
): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await updateResource(id, data);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resources");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update resource" };
  }
}

export async function deleteResourceAction(id: string): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await deleteResource(id);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/resources");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete resource" };
  }
}

export async function createAnnouncementAction(
  data: AnnouncementInsert,
): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await createAnnouncement(data);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create announcement" };
  }
}

export async function updateAnnouncementAction(
  id: string,
  data: AnnouncementUpdate,
): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await updateAnnouncement(id, data);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/announcements");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update announcement" };
  }
}

export async function deleteAnnouncementAction(id: string): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await deleteAnnouncement(id);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/announcements");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete announcement" };
  }
}

export async function createEventAction(
  data: EventInsert,
): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await createEvent(data);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create event" };
  }
}

export async function updateEventAction(
  id: string,
  data: EventUpdate,
): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await updateEvent(id, data);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update event" };
  }
}

export async function deleteEventAction(id: string): Promise<ActionResult> {
  if (await isDemoUser()) return { error: "Demo accounts are read-only." };
  try {
    await deleteEvent(id);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete event" };
  }
}

export async function submitContactFormAction(
  data: ContactInsert,
): Promise<ActionResult> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert(data);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : (err as { message?: string })?.message ?? "Failed to send message";
    return { error: message };
  }
}
