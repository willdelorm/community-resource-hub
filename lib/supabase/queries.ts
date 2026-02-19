import { createClient } from "@/lib/supabase/server";
import type {
  Announcement,
  AnnouncementInsert,
  AnnouncementUpdate,
  ContactInsert,
  ContactSubmission,
  Event,
  EventInsert,
  EventUpdate,
  Resource,
  ResourceCategory,
  ResourceInsert,
  ResourceUpdate,
} from "@/lib/supabase/types";

// ============================================================
// Resources
// ============================================================

export async function getActiveResources(
  category?: ResourceCategory,
): Promise<Resource[]> {
  const supabase = await createClient();
  let query = supabase
    .from("resources")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAllResources(): Promise<Resource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createResource(
  resource: ResourceInsert,
): Promise<Resource> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .insert(resource)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateResource(
  id: string,
  resource: ResourceUpdate,
): Promise<Resource> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resources")
    .update(resource)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteResource(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// Announcements
// ============================================================

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .or(`date_expired.is.null,date_expired.gte.${new Date().toISOString()}`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getAnnouncementById(
  id: string,
): Promise<Announcement | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createAnnouncement(
  announcement: AnnouncementInsert,
): Promise<Announcement> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .insert(announcement)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAnnouncement(
  id: string,
  announcement: AnnouncementUpdate,
): Promise<Announcement> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .update(announcement)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// Events
// ============================================================

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_date", new Date().toISOString())
    .order("start_date");
  if (error) throw error;
  return data;
}

export async function getAllEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date");
  if (error) throw error;
  return data;
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createEvent(event: EventInsert): Promise<Event> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(
  id: string,
  event: EventUpdate,
): Promise<Event> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

// ============================================================
// Contact Submissions
// ============================================================

export async function createContactSubmission(
  submission: ContactInsert,
): Promise<ContactSubmission> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert(submission)
    .select()
    .single();
  if (error) throw error;
  return data;
}
