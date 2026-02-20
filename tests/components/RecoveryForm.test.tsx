import RecoveryForm from "@/components/RecoveryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/actions/auth", () => ({
  sendPasswordReset: vi.fn(),
}));

import { sendPasswordReset } from "@/app/actions/auth";
const mockSendPasswordReset = vi.mocked(sendPasswordReset);

describe("RecoveryForm", () => {
  it("renders the email field and submit button", () => {
    render(<RecoveryForm onBack={vi.fn()} />);

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Recovery Link" }),
    ).toBeInTheDocument();
  });

  it("calls sendPasswordReset with the entered email on submit", async () => {
    mockSendPasswordReset.mockResolvedValueOnce({ success: true });
    render(<RecoveryForm onBack={vi.fn()} />);

    await userEvent.type(
      screen.getByLabelText("Email address"),
      "user@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send Recovery Link" }),
    );

    expect(mockSendPasswordReset).toHaveBeenCalledWith("user@example.com");
  });

  it("shows the success state after a successful submission", async () => {
    mockSendPasswordReset.mockResolvedValueOnce({ success: true });
    render(<RecoveryForm onBack={vi.fn()} />);

    await userEvent.type(
      screen.getByLabelText("Email address"),
      "user@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send Recovery Link" }),
    );

    expect(
      await screen.findByText("Recovery link sent! Check your email."),
    ).toBeInTheDocument();
  });

  it("shows an error message when sendPasswordReset returns an error", async () => {
    mockSendPasswordReset.mockResolvedValueOnce({ error: "User not found" });
    render(<RecoveryForm onBack={vi.fn()} />);

    await userEvent.type(
      screen.getByLabelText("Email address"),
      "nobody@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send Recovery Link" }),
    );

    expect(await screen.findByText("User not found")).toBeInTheDocument();
  });

  it("calls onBack when the back link is clicked", async () => {
    const onBack = vi.fn();
    render(<RecoveryForm onBack={onBack} />);

    await userEvent.click(screen.getByText("Back to login"));

    expect(onBack).toHaveBeenCalledOnce();
  });
});
