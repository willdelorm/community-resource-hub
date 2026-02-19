import { EditAnnouncementModal } from "@/components/dashboard/EditAnnouncementModal";
import type { Announcement } from "@/lib/supabase/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/content", () => ({
  updateAnnouncementAction: vi.fn(),
}));

import { updateAnnouncementAction } from "@/app/actions/content";
const mockAction = vi.mocked(updateAnnouncementAction);

const announcement: Announcement = {
  id: "a1",
  title: "Spring Fair",
  content: "Join us on April 12th.",
  date_expired: "2026-04-12T00:00:00Z",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

async function openModal() {
  await userEvent.click(screen.getByRole("button", { name: "Edit" }));
}

describe("EditAnnouncementModal", () => {
  it("renders an Edit trigger button", () => {
    render(<EditAnnouncementModal announcement={announcement} />);
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("pre-populates fields with the announcement's current values", async () => {
    render(<EditAnnouncementModal announcement={announcement} />);
    await openModal();

    expect(screen.getByLabelText("Title *")).toHaveValue("Spring Fair");
    expect(screen.getByLabelText("Content *")).toHaveValue("Join us on April 12th.");
    // toDateInput converts ISO → YYYY-MM-DD
    expect(screen.getByLabelText("Expires on")).toHaveValue("2026-04-12");
  });

  it("pre-populates with empty expiry when date_expired is null", async () => {
    const noExpiry = { ...announcement, date_expired: null };
    render(<EditAnnouncementModal announcement={noExpiry} />);
    await openModal();

    expect(screen.getByLabelText("Expires on")).toHaveValue("");
  });

  it("submits the updated values to the action", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditAnnouncementModal announcement={announcement} />);
    await openModal();

    const titleInput = screen.getByLabelText("Title *");
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated Title");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      "a1",
      expect.objectContaining({ title: "Updated Title" }),
    );
  });

  it("passes null for date_expired when the field is cleared", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditAnnouncementModal announcement={announcement} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Expires on"));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      "a1",
      expect.objectContaining({ date_expired: null }),
    );
  });

  it("closes the modal on success", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditAnnouncementModal announcement={announcement} />);
    await openModal();

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error banner when the action returns an error", async () => {
    mockAction.mockResolvedValueOnce({ error: "Update failed" });
    render(<EditAnnouncementModal announcement={announcement} />);
    await openModal();

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Update failed")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets to the original values when the modal is cancelled", async () => {
    mockAction.mockResolvedValueOnce({ error: "fail" });
    render(<EditAnnouncementModal announcement={announcement} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Title *"));
    await userEvent.type(screen.getByLabelText("Title *"), "Temporary edit");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("fail");

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await openModal();

    expect(screen.getByLabelText("Title *")).toHaveValue("Spring Fair");
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });
});
