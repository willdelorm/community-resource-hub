import { EditEventModal } from "@/components/dashboard/EditEventModal";
import type { Event } from "@/lib/supabase/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/content", () => ({
  updateEventAction: vi.fn(),
}));

import { updateEventAction } from "@/app/actions/content";
const mockAction = vi.mocked(updateEventAction);

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

async function openModal() {
  await userEvent.click(screen.getByRole("button", { name: "Edit" }));
}

describe("EditEventModal", () => {
  it("renders an Edit trigger button", () => {
    render(<EditEventModal event={event} />);
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("pre-populates fields with the event's current values", async () => {
    render(<EditEventModal event={event} />);
    await openModal();

    expect(screen.getByLabelText("Title *")).toHaveValue("Community Meeting");
    // toDatetimeLocal slices ISO string to first 16 chars
    expect(screen.getByLabelText("Start *")).toHaveValue("2026-03-01T18:00");
    expect(screen.getByLabelText("End")).toHaveValue("2026-03-01T20:00");
    expect(screen.getByLabelText("Location")).toHaveValue("Town Hall");
  });

  it("pre-populates with empty strings for null optional fields", async () => {
    const minimal: Event = {
      ...event,
      description: null,
      end_date: null,
      location: null,
      url: null,
    };
    render(<EditEventModal event={minimal} />);
    await openModal();

    expect(screen.getByLabelText("End")).toHaveValue("");
    expect(screen.getByLabelText("Location")).toHaveValue("");
  });

  it("submits updated values to the action", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditEventModal event={event} />);
    await openModal();

    const titleInput = screen.getByLabelText("Title *");
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated Meeting");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      "e1",
      expect.objectContaining({ title: "Updated Meeting" }),
    );
  });

  it("passes null for optional fields that are cleared", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditEventModal event={event} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Location"));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      "e1",
      expect.objectContaining({ location: null }),
    );
  });

  it("disables Save when the start date is cleared", async () => {
    render(<EditEventModal event={event} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Start *"));

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("closes the modal on success", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditEventModal event={event} />);
    await openModal();

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error banner when the action returns an error", async () => {
    mockAction.mockResolvedValueOnce({ error: "Update failed" });
    render(<EditEventModal event={event} />);
    await openModal();

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Update failed")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets to the original values when the modal is cancelled", async () => {
    mockAction.mockResolvedValueOnce({ error: "fail" });
    render(<EditEventModal event={event} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Title *"));
    await userEvent.type(screen.getByLabelText("Title *"), "Temporary edit");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("fail");

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await openModal();

    expect(screen.getByLabelText("Title *")).toHaveValue("Community Meeting");
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });
});
