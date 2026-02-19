"use server";

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
import type {
  AnnouncementInsert,
  AnnouncementUpdate,
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
  try {
    await deleteEvent(id);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete event" };
  }
}
