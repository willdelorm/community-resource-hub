import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("DeleteButton", () => {
  it("renders the Delete trigger button", () => {
    render(<DeleteButton action={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("opens the confirmation dialog when the trigger is clicked", async () => {
    render(<DeleteButton action={vi.fn()} label="this resource" />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Delete this resource?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("uses 'this item' as the default label", async () => {
    render(<DeleteButton action={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText("Delete this item?")).toBeInTheDocument();
  });

  it("calls the action when the confirm Delete button is clicked", async () => {
    const action = vi.fn().mockResolvedValue({ success: true });
    render(<DeleteButton action={action} label="this event" />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    const dialog = screen.getByRole("dialog");
    await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));

    expect(action).toHaveBeenCalledOnce();
  });

  it("closes the dialog after a successful delete", async () => {
    const action = vi.fn().mockResolvedValue({ success: true });
    render(<DeleteButton action={action} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    const dialog = screen.getByRole("dialog");
    await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an error message when the action fails", async () => {
    const action = vi.fn().mockResolvedValue({ error: "Something went wrong" });
    render(<DeleteButton action={action} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    const dialog = screen.getByRole("dialog");
    await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("clears the error and closes the dialog on Cancel", async () => {
    const action = vi.fn().mockResolvedValue({ error: "Oops" });
    render(<DeleteButton action={action} />);

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    const dialog = screen.getByRole("dialog");
    await userEvent.click(within(dialog).getByRole("button", { name: "Delete" }));
    expect(await screen.findByText("Oops")).toBeInTheDocument();

    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
