import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/queries", () => ({
  createResource: vi.fn(),
  updateResource: vi.fn(),
  deleteResource: vi.fn(),
  createAnnouncement: vi.fn(),
  updateAnnouncement: vi.fn(),
  deleteAnnouncement: vi.fn(),
  createEvent: vi.fn(),
  updateEvent: vi.fn(),
  deleteEvent: vi.fn(),
}));

import { revalidatePath } from "next/cache";
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
import {
  createAnnouncementAction,
  createEventAction,
  createResourceAction,
  deleteAnnouncementAction,
  deleteEventAction,
  deleteResourceAction,
  updateAnnouncementAction,
  updateEventAction,
  updateResourceAction,
} from "@/app/actions/content";

const mockRevalidatePath = vi.mocked(revalidatePath);
const mockCreateResource = vi.mocked(createResource);
const mockUpdateResource = vi.mocked(updateResource);
const mockDeleteResource = vi.mocked(deleteResource);
const mockCreateAnnouncement = vi.mocked(createAnnouncement);
const mockUpdateAnnouncement = vi.mocked(updateAnnouncement);
const mockDeleteAnnouncement = vi.mocked(deleteAnnouncement);
const mockCreateEvent = vi.mocked(createEvent);
const mockUpdateEvent = vi.mocked(updateEvent);
const mockDeleteEvent = vi.mocked(deleteEvent);

const dbError = new Error("DB failure");

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

describe("createResourceAction", () => {
  it("calls createResource, revalidates /dashboard, and returns success", async () => {
    mockCreateResource.mockResolvedValueOnce({} as any);
    const data = { name: "Food Bank", category: "Food" as const };

    const result = await createResourceAction(data);

    expect(mockCreateResource).toHaveBeenCalledWith(data);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true });
  });

  it("returns error message when createResource throws an Error", async () => {
    mockCreateResource.mockRejectedValueOnce(dbError);

    const result = await createResourceAction({ name: "X", category: "Food" });

    expect(result).toEqual({ error: "DB failure" });
    expect(mockRevalidatePath).not.toHaveBeenCalled();
  });

  it("returns fallback message when a non-Error value is thrown", async () => {
    mockCreateResource.mockRejectedValueOnce("unexpected string");

    const result = await createResourceAction({ name: "X", category: "Food" });

    expect(result).toEqual({ error: "Failed to create resource" });
  });
});

describe("updateResourceAction", () => {
  it("calls updateResource, revalidates both paths, and returns success", async () => {
    mockUpdateResource.mockResolvedValueOnce({} as any);

    const result = await updateResourceAction("r1", { name: "Updated" });

    expect(mockUpdateResource).toHaveBeenCalledWith("r1", { name: "Updated" });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/resources");
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockUpdateResource.mockRejectedValueOnce(dbError);

    const result = await updateResourceAction("r1", {});

    expect(result).toEqual({ error: "DB failure" });
  });

  it("returns fallback message for non-Error throws", async () => {
    mockUpdateResource.mockRejectedValueOnce(42);

    const result = await updateResourceAction("r1", {});

    expect(result).toEqual({ error: "Failed to update resource" });
  });
});

describe("deleteResourceAction", () => {
  it("calls deleteResource, revalidates both paths, and returns success", async () => {
    mockDeleteResource.mockResolvedValueOnce(undefined);

    const result = await deleteResourceAction("r1");

    expect(mockDeleteResource).toHaveBeenCalledWith("r1");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/resources");
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockDeleteResource.mockRejectedValueOnce(dbError);

    const result = await deleteResourceAction("r1");

    expect(result).toEqual({ error: "DB failure" });
  });
});

// ---------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------

describe("createAnnouncementAction", () => {
  it("calls createAnnouncement, revalidates /dashboard, and returns success", async () => {
    mockCreateAnnouncement.mockResolvedValueOnce({} as any);
    const data = { title: "Spring Fair", content: "Come join us." };

    const result = await createAnnouncementAction(data);

    expect(mockCreateAnnouncement).toHaveBeenCalledWith(data);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockCreateAnnouncement.mockRejectedValueOnce(dbError);

    const result = await createAnnouncementAction({ title: "X", content: "Y" });

    expect(result).toEqual({ error: "DB failure" });
  });

  it("returns fallback message for non-Error throws", async () => {
    mockCreateAnnouncement.mockRejectedValueOnce(null);

    const result = await createAnnouncementAction({ title: "X", content: "Y" });

    expect(result).toEqual({ error: "Failed to create announcement" });
  });
});

describe("updateAnnouncementAction", () => {
  it("calls updateAnnouncement, revalidates both paths, and returns success", async () => {
    mockUpdateAnnouncement.mockResolvedValueOnce({} as any);

    const result = await updateAnnouncementAction("a1", { title: "Updated" });

    expect(mockUpdateAnnouncement).toHaveBeenCalledWith("a1", { title: "Updated" });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/announcements");
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockUpdateAnnouncement.mockRejectedValueOnce(dbError);

    const result = await updateAnnouncementAction("a1", {});

    expect(result).toEqual({ error: "DB failure" });
  });
});

describe("deleteAnnouncementAction", () => {
  it("calls deleteAnnouncement, revalidates both paths, and returns success", async () => {
    mockDeleteAnnouncement.mockResolvedValueOnce(undefined);

    const result = await deleteAnnouncementAction("a1");

    expect(mockDeleteAnnouncement).toHaveBeenCalledWith("a1");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/announcements");
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockDeleteAnnouncement.mockRejectedValueOnce(dbError);

    const result = await deleteAnnouncementAction("a1");

    expect(result).toEqual({ error: "DB failure" });
  });
});

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

describe("createEventAction", () => {
  it("calls createEvent, revalidates /dashboard, and returns success", async () => {
    mockCreateEvent.mockResolvedValueOnce({} as any);
    const data = { title: "Community Meeting", start_date: "2026-03-01T18:00:00Z" };

    const result = await createEventAction(data);

    expect(mockCreateEvent).toHaveBeenCalledWith(data);
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockCreateEvent.mockRejectedValueOnce(dbError);

    const result = await createEventAction({
      title: "X",
      start_date: "2026-03-01T18:00:00Z",
    });

    expect(result).toEqual({ error: "DB failure" });
  });

  it("returns fallback message for non-Error throws", async () => {
    mockCreateEvent.mockRejectedValueOnce(undefined);

    const result = await createEventAction({
      title: "X",
      start_date: "2026-03-01T18:00:00Z",
    });

    expect(result).toEqual({ error: "Failed to create event" });
  });
});

describe("updateEventAction", () => {
  it("calls updateEvent, revalidates both paths, and returns success", async () => {
    mockUpdateEvent.mockResolvedValueOnce({} as any);

    const result = await updateEventAction("e1", { title: "Updated" });

    expect(mockUpdateEvent).toHaveBeenCalledWith("e1", { title: "Updated" });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/events");
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockUpdateEvent.mockRejectedValueOnce(dbError);

    const result = await updateEventAction("e1", {});

    expect(result).toEqual({ error: "DB failure" });
  });
});

describe("deleteEventAction", () => {
  it("calls deleteEvent, revalidates both paths, and returns success", async () => {
    mockDeleteEvent.mockResolvedValueOnce(undefined);

    const result = await deleteEventAction("e1");

    expect(mockDeleteEvent).toHaveBeenCalledWith("e1");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/events");
    expect(result).toEqual({ success: true });
  });

  it("returns error message on failure", async () => {
    mockDeleteEvent.mockRejectedValueOnce(dbError);

    const result = await deleteEventAction("e1");

    expect(result).toEqual({ error: "DB failure" });
  });
});
