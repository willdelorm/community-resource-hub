import { EditResourceModal } from "@/components/dashboard/EditResourceModal";
import type { Resource } from "@/lib/supabase/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/app/actions/content", () => ({
  updateResourceAction: vi.fn(),
}));

// Replace Radix Select with a native <select> for straightforward testing.
vi.mock("@/components/ui/select", () => ({
  Select: ({ onValueChange, value, children }: any) => (
    <select id="category" value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => <option value={value}>{children}</option>,
}));

import { updateResourceAction } from "@/app/actions/content";
const mockAction = vi.mocked(updateResourceAction);

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

async function openModal() {
  await userEvent.click(screen.getByRole("button", { name: "Edit" }));
}

describe("EditResourceModal", () => {
  it("renders an Edit trigger button", () => {
    render(<EditResourceModal resource={resource} />);
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("pre-populates fields with the resource's current values", async () => {
    render(<EditResourceModal resource={resource} />);
    await openModal();

    expect(screen.getByLabelText("Name *")).toHaveValue("City Food Bank");
    expect(screen.getByLabelText("Category *")).toHaveValue("Food");
    expect(screen.getByLabelText("Phone")).toHaveValue("555-1234");
    expect(screen.getByLabelText("Address")).toHaveValue("123 Main St");
  });

  it("pre-populates with empty strings for null optional fields", async () => {
    const minimal: Resource = {
      ...resource,
      description: null,
      website: null,
      phone: null,
      email: null,
      address: null,
    };
    render(<EditResourceModal resource={minimal} />);
    await openModal();

    expect(screen.getByLabelText("Phone")).toHaveValue("");
    expect(screen.getByLabelText("Address")).toHaveValue("");
  });

  it("submits updated values to the action", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditResourceModal resource={resource} />);
    await openModal();

    const nameInput = screen.getByLabelText("Name *");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Updated Food Bank");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      "r1",
      expect.objectContaining({ name: "Updated Food Bank" }),
    );
  });

  it("passes null for optional fields that are cleared", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditResourceModal resource={resource} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Phone"));
    await userEvent.clear(screen.getByLabelText("Address"));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(mockAction).toHaveBeenCalledWith(
      "r1",
      expect.objectContaining({ phone: null, address: null }),
    );
  });

  it("closes the modal on success", async () => {
    mockAction.mockResolvedValueOnce({ success: true });
    render(<EditResourceModal resource={resource} />);
    await openModal();

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error banner when the action returns an error", async () => {
    mockAction.mockResolvedValueOnce({ error: "Update failed" });
    render(<EditResourceModal resource={resource} />);
    await openModal();

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("Update failed")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets to the original values when the modal is cancelled", async () => {
    mockAction.mockResolvedValueOnce({ error: "fail" });
    render(<EditResourceModal resource={resource} />);
    await openModal();

    await userEvent.clear(screen.getByLabelText("Name *"));
    await userEvent.type(screen.getByLabelText("Name *"), "Temporary name");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await screen.findByText("fail");

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await openModal();

    expect(screen.getByLabelText("Name *")).toHaveValue("City Food Bank");
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });
});
