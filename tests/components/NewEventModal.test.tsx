import { NewEventModal } from "@/components/dashboard/NewEventModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/content", () => ({
  createEventAction: vi.fn(),
}));

import { createEventAction } from "@/app/actions/content";
const mockAction = vi.mocked(createEventAction);

async function openModal() {
  await userEvent.click(screen.getByRole("button", { name: "New" }));
}

describe("NewEventModal", () => {
  it("renders a New button", () => {
    render(<NewEventModal />);
    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
  });

  it("opens the modal with the expected fields", async () => {
    render(<NewEventModal />);
    await openModal();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Title *")).toBeInTheDocument();
    expect(screen.getByLabelText("Start *")).toBeInTheDocument();
    expect(screen.getByLabelText("End")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
  });

  it("disables Save when no start date is provided", async () => {
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "Community Meeting");

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("enables Save once a start date is provided", async () => {
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "Community Meeting");
    await userEvent.type(screen.getByLabelText("Start *"), "2026-03-01T18:00");

    expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
  });

  it("submits required fields to the action", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "Community Meeting");
    await userEvent.type(screen.getByLabelText("Start *"), "2026-03-01T18:00");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Community Meeting",
        start_date: new Date("2026-03-01T18:00").toISOString(),
      }),
    );
  });

  it("passes null for optional fields left blank", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "T");
    await userEvent.type(screen.getByLabelText("Start *"), "2026-03-01T18:00");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({
        description: null,
        end_date: null,
        location: null,
        url: null,
      }),
    );
  });

  it("closes the modal on success", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "T");
    await userEvent.type(screen.getByLabelText("Start *"), "2026-03-01T18:00");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error banner when the action returns an error", async () => {
    mockAction.mockResolvedValueOnce({ error: "Save failed" });
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "T");
    await userEvent.type(screen.getByLabelText("Start *"), "2026-03-01T18:00");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Save failed")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets the form when the modal is closed", async () => {
    mockAction.mockResolvedValueOnce({ error: "fail" });
    render(<NewEventModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Title *"), "Old title");
    await userEvent.type(screen.getByLabelText("Start *"), "2026-03-01T18:00");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("fail");

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await openModal();

    expect(screen.getByLabelText("Title *")).toHaveValue("");
    expect(screen.getByLabelText("Start *")).toHaveValue("");
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });
});
