import { NewResourceModal } from "@/components/dashboard/NewResourceModal";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/content", () => ({
  createResourceAction: vi.fn(),
}));

// Radix Select is replaced with a native <select> to keep tests focused on
// component logic rather than the Radix internals.
vi.mock("@/components/ui/select", () => ({
  Select: ({
    onValueChange,
    value,
    children,
  }: {
    onValueChange: (value: string) => void;
    value: string;
    children: React.ReactNode;
  }) => (
    <select id="category" value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
  ),
}));

import { createResourceAction } from "@/app/actions/content";
const mockAction = vi.mocked(createResourceAction);

async function openModal() {
  await userEvent.click(screen.getByRole("button", { name: "New" }));
}

describe("NewResourceModal", () => {
  it("renders a New button", () => {
    render(<NewResourceModal />);
    expect(screen.getByRole("button", { name: "New" })).toBeInTheDocument();
  });

  it("opens the modal with the expected fields", async () => {
    render(<NewResourceModal />);
    await openModal();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Category *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("disables Save when no category is selected", async () => {
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "Food Bank");

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("enables Save once a category is selected", async () => {
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "Food Bank");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");

    expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
  });

  it("submits name and category to the action", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "City Food Bank");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({ name: "City Food Bank", category: "Food" }),
    );
  });

  it("passes null for optional fields left blank", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "X");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({
        description: null,
        website: null,
        phone: null,
        email: null,
        address: null,
      }),
    );
  });

  it("defaults is_active to true", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "X");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({ is_active: true }),
    );
  });

  it("closes the modal on success", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "X");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error banner when the action returns an error", async () => {
    mockAction.mockResolvedValueOnce({ error: "Insert failed" });
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "X");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Insert failed")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets the form when the modal is closed", async () => {
    mockAction.mockResolvedValueOnce({ error: "fail" });
    render(<NewResourceModal />);
    await openModal();

    await userEvent.type(screen.getByLabelText("Name *"), "Old name");
    await userEvent.selectOptions(screen.getByLabelText("Category *"), "Food");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("fail");

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await openModal();

    expect(screen.getByLabelText("Name *")).toHaveValue("");
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });
});
