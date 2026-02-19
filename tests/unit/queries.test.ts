import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

import {
  createAnnouncement,
  createEvent,
  createResource,
  deleteAnnouncement,
  deleteEvent,
  deleteResource,
  getActiveAnnouncements,
  getActiveResources,
  getAllAnnouncements,
  getAllEvents,
  getAllResources,
  getAnnouncementById,
  getEventById,
  getResourceById,
  getUpcomingEvents,
  updateAnnouncement,
  updateEvent,
  updateResource,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import type { Announcement, Event, Resource } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// Mock helpers
// ---------------------------------------------------------------------------

type QueryResult<T> = { data: T; error: null } | { data: null; error: Error };

/**
 * Creates a chainable Supabase query builder mock.
 *
 * - Every chainable method (select, insert, eq, …) returns `this` so chaining works.
 * - `.single()` resolves to `result`.
 * - Awaiting the builder directly also resolves to `result` (via `then`).
 */
function makeBuilder<T>(result: QueryResult<T>) {
  const builder = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(result),
    then(
      resolve: (v: QueryResult<T>) => unknown,
      reject?: (r: unknown) => unknown,
    ) {
      return Promise.resolve(result).then(resolve, reject);
    },
  };
  return builder;
}

const mockCreateClient = vi.mocked(createClient);

function setupClient<T>(result: QueryResult<T>) {
  const builder = makeBuilder(result);
  const supabase = { from: vi.fn().mockReturnValue(builder) };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockCreateClient.mockResolvedValue(supabase as any);
  return { supabase, builder };
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const resource: Resource = {
  id: "r1",
  name: "City Food Bank",
  description: "Free food assistance",
  category: "Food",
  website: "https://example.com",
  phone: "555-1234",
  email: "food@example.com",
  address: "123 Main St",
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

const announcement: Announcement = {
  id: "a1",
  title: "Spring Fair",
  content: "Join us on April 12th.",
  date_expired: "2026-04-12T00:00:00Z",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

const event: Event = {
  id: "e1",
  title: "Community Meeting",
  description: "Monthly meeting",
  start_date: "2026-03-01T18:00:00Z",
  end_date: "2026-03-01T20:00:00Z",
  location: "Town Hall",
  url: "https://example.com/event",
  is_recurring: false,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

const dbError = new Error("DB error");

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

describe("getActiveResources", () => {
  it("returns active resources", async () => {
    const { builder } = setupClient({ data: [resource], error: null });

    const result = await getActiveResources();

    expect(result).toEqual([resource]);
    expect(builder.eq).toHaveBeenCalledWith("is_active", true);
    expect(builder.order).toHaveBeenCalledWith("name");
  });

  it("adds a category filter when provided", async () => {
    const { builder } = setupClient({ data: [resource], error: null });

    await getActiveResources("Food");

    expect(builder.eq).toHaveBeenCalledWith("category", "Food");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getActiveResources()).rejects.toThrow("DB error");
  });
});

describe("getAllResources", () => {
  it("returns all resources ordered by name", async () => {
    const { builder } = setupClient({ data: [resource], error: null });

    const result = await getAllResources();

    expect(result).toEqual([resource]);
    expect(builder.order).toHaveBeenCalledWith("name");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getAllResources()).rejects.toThrow("DB error");
  });
});

describe("getResourceById", () => {
  it("returns the resource", async () => {
    const { builder } = setupClient({ data: resource, error: null });

    const result = await getResourceById("r1");

    expect(result).toEqual(resource);
    expect(builder.eq).toHaveBeenCalledWith("id", "r1");
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getResourceById("r1")).rejects.toThrow("DB error");
  });
});

describe("createResource", () => {
  it("inserts and returns the new resource", async () => {
    const { builder } = setupClient({ data: resource, error: null });
    const input = { name: "City Food Bank", category: "Food" as const };

    const result = await createResource(input);

    expect(result).toEqual(resource);
    expect(builder.insert).toHaveBeenCalledWith(input);
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(
      createResource({ name: "X", category: "Food" }),
    ).rejects.toThrow("DB error");
  });
});

describe("updateResource", () => {
  it("updates and returns the resource", async () => {
    const { builder } = setupClient({ data: resource, error: null });

    const result = await updateResource("r1", { name: "Updated" });

    expect(result).toEqual(resource);
    expect(builder.update).toHaveBeenCalledWith({ name: "Updated" });
    expect(builder.eq).toHaveBeenCalledWith("id", "r1");
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(updateResource("r1", {})).rejects.toThrow("DB error");
  });
});

describe("deleteResource", () => {
  it("resolves without returning data", async () => {
    const { builder } = setupClient({ data: null, error: null });

    await expect(deleteResource("r1")).resolves.toBeUndefined();
    expect(builder.delete).toHaveBeenCalled();
    expect(builder.eq).toHaveBeenCalledWith("id", "r1");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(deleteResource("r1")).rejects.toThrow("DB error");
  });
});

// ---------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------

describe("getActiveAnnouncements", () => {
  it("returns announcements and filters by expiry", async () => {
    const { builder } = setupClient({ data: [announcement], error: null });

    const result = await getActiveAnnouncements();

    expect(result).toEqual([announcement]);
    expect(builder.or).toHaveBeenCalledWith(
      expect.stringContaining("date_expired.is.null"),
    );
    expect(builder.order).toHaveBeenCalledWith("created_at", {
      ascending: false,
    });
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getActiveAnnouncements()).rejects.toThrow("DB error");
  });
});

describe("getAllAnnouncements", () => {
  it("returns all announcements ordered by created_at desc", async () => {
    const { builder } = setupClient({ data: [announcement], error: null });

    const result = await getAllAnnouncements();

    expect(result).toEqual([announcement]);
    expect(builder.order).toHaveBeenCalledWith("created_at", {
      ascending: false,
    });
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getAllAnnouncements()).rejects.toThrow("DB error");
  });
});

describe("getAnnouncementById", () => {
  it("returns the announcement", async () => {
    const { builder } = setupClient({ data: announcement, error: null });

    const result = await getAnnouncementById("a1");

    expect(result).toEqual(announcement);
    expect(builder.eq).toHaveBeenCalledWith("id", "a1");
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getAnnouncementById("a1")).rejects.toThrow("DB error");
  });
});

describe("createAnnouncement", () => {
  it("inserts and returns the new announcement", async () => {
    const { builder } = setupClient({ data: announcement, error: null });
    const input = { title: "Spring Fair", content: "Join us." };

    const result = await createAnnouncement(input);

    expect(result).toEqual(announcement);
    expect(builder.insert).toHaveBeenCalledWith(input);
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(
      createAnnouncement({ title: "X", content: "Y" }),
    ).rejects.toThrow("DB error");
  });
});

describe("updateAnnouncement", () => {
  it("updates and returns the announcement", async () => {
    const { builder } = setupClient({ data: announcement, error: null });

    const result = await updateAnnouncement("a1", { title: "Updated" });

    expect(result).toEqual(announcement);
    expect(builder.update).toHaveBeenCalledWith({ title: "Updated" });
    expect(builder.eq).toHaveBeenCalledWith("id", "a1");
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(updateAnnouncement("a1", {})).rejects.toThrow("DB error");
  });
});

describe("deleteAnnouncement", () => {
  it("resolves without returning data", async () => {
    const { builder } = setupClient({ data: null, error: null });

    await expect(deleteAnnouncement("a1")).resolves.toBeUndefined();
    expect(builder.delete).toHaveBeenCalled();
    expect(builder.eq).toHaveBeenCalledWith("id", "a1");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(deleteAnnouncement("a1")).rejects.toThrow("DB error");
  });
});

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

describe("getUpcomingEvents", () => {
  it("returns upcoming events and filters by start_date", async () => {
    const { builder } = setupClient({ data: [event], error: null });

    const result = await getUpcomingEvents();

    expect(result).toEqual([event]);
    expect(builder.gte).toHaveBeenCalledWith(
      "start_date",
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
    );
    expect(builder.order).toHaveBeenCalledWith("start_date");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getUpcomingEvents()).rejects.toThrow("DB error");
  });
});

describe("getAllEvents", () => {
  it("returns all events ordered by start_date", async () => {
    const { builder } = setupClient({ data: [event], error: null });

    const result = await getAllEvents();

    expect(result).toEqual([event]);
    expect(builder.order).toHaveBeenCalledWith("start_date");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getAllEvents()).rejects.toThrow("DB error");
  });
});

describe("getEventById", () => {
  it("returns the event", async () => {
    const { builder } = setupClient({ data: event, error: null });

    const result = await getEventById("e1");

    expect(result).toEqual(event);
    expect(builder.eq).toHaveBeenCalledWith("id", "e1");
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(getEventById("e1")).rejects.toThrow("DB error");
  });
});

describe("createEvent", () => {
  it("inserts and returns the new event", async () => {
    const { builder } = setupClient({ data: event, error: null });
    const input = {
      title: "Community Meeting",
      start_date: "2026-03-01T18:00:00Z",
    };

    const result = await createEvent(input);

    expect(result).toEqual(event);
    expect(builder.insert).toHaveBeenCalledWith(input);
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(
      createEvent({ title: "X", start_date: "2026-03-01T18:00:00Z" }),
    ).rejects.toThrow("DB error");
  });
});

describe("updateEvent", () => {
  it("updates and returns the event", async () => {
    const { builder } = setupClient({ data: event, error: null });

    const result = await updateEvent("e1", { title: "Updated" });

    expect(result).toEqual(event);
    expect(builder.update).toHaveBeenCalledWith({ title: "Updated" });
    expect(builder.eq).toHaveBeenCalledWith("id", "e1");
    expect(builder.single).toHaveBeenCalled();
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(updateEvent("e1", {})).rejects.toThrow("DB error");
  });
});

describe("deleteEvent", () => {
  it("resolves without returning data", async () => {
    const { builder } = setupClient({ data: null, error: null });

    await expect(deleteEvent("e1")).resolves.toBeUndefined();
    expect(builder.delete).toHaveBeenCalled();
    expect(builder.eq).toHaveBeenCalledWith("id", "e1");
  });

  it("throws on error", async () => {
    setupClient({ data: null, error: dbError });
    await expect(deleteEvent("e1")).rejects.toThrow("DB error");
  });
});
