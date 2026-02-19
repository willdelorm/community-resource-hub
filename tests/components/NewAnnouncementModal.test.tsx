import { NewAnnouncementModal } from "@/components/dashboard/NewAnnouncementModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/content", () => ({
  createAnnouncementAction: vi.fn(),
}));

import { createAnnouncementAction } from "@/app/actions/content";
const mockAction = vi.mocked(createAnnouncementAction);

async function openModal() {
  await userEvent.click(screen.getByRole("button", { name: "New" }));
}

describe("NewAnnouncementModal", () => {
  it("renders a New button", () => {
    render(<NewAnnouncementModal />);
    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
  });

  it("opens the modal with the expected fields", async () => {
    render(<NewAnnouncementModal />);
    await openModal();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Title *")).toBeInTheDocument();
    expect(screen.getByLabelText("Content *")).toBeInTheDocument();
    expect(screen.getByLabelText("Expires on")).toBeInTheDocument();
  });

  it("submits title and content to the action", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewAnnouncementModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "Spring Fair");
    await userEvent.type(screen.getByLabelText("Content *"), "Join us April 12.");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Spring Fair", content: "Join us April 12." }),
    );
  });

  it("passes null for date_expired when left blank", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewAnnouncementModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "No Expiry");
    await userEvent.type(screen.getByLabelText("Content *"), "Some content.");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({ date_expired: null }),
    );
  });

  it("closes the modal on success", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewAnnouncementModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "T");
    await userEvent.type(screen.getByLabelText("Content *"), "C");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error banner when the action returns an error", async () => {
    mockAction.mockResolvedValueOnce({ error: "Database error" });
    render(<NewAnnouncementModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "T");
    await userEvent.type(screen.getByLabelText("Content *"), "C");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Database error")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets the form when the modal is closed", async () => {
    mockAction.mockResolvedValueOnce({ error: "fail" });
    render(<NewAnnouncementModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "Old title");
    await userEvent.type(screen.getByLabelText("Content *"), "Old content");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("fail");

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await openModal();

    expect(screen.getByLabelText("Title *")).toHaveValue("");
    expect(screen.getByLabelText("Content *")).toHaveValue("");
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });
});
