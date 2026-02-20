import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/actions/auth", () => ({
  updatePassword: vi.fn(),
}));

import { updatePassword } from "@/app/actions/auth";
const mockUpdatePassword = vi.mocked(updatePassword);

describe("UpdatePasswordForm", () => {
  it("renders password and confirm fields", () => {
    render(<UpdatePasswordForm />);

    expect(screen.getByLabelText("New password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm new password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Password" }),
    ).toBeInTheDocument();
  });

  it("shows a mismatch error without calling the action", async () => {
    render(<UpdatePasswordForm />);

    await userEvent.type(screen.getByLabelText("New password"), "newpassword1");
    await userEvent.type(
      screen.getByLabelText("Confirm new password"),
      "differentpassword",
    );
    await userEvent.click(screen.getByRole("button", { name: "Update Password" }));

    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it("calls updatePassword with the new password when fields match", async () => {
    mockUpdatePassword.mockResolvedValueOnce({ error: "" });
    render(<UpdatePasswordForm />);

    await userEvent.type(screen.getByLabelText("New password"), "newpassword1");
    await userEvent.type(
      screen.getByLabelText("Confirm new password"),
      "newpassword1",
    );
    await userEvent.click(screen.getByRole("button", { name: "Update Password" }));

    expect(mockUpdatePassword).toHaveBeenCalledWith("newpassword1");
  });

  it("shows an error message when updatePassword returns an error", async () => {
    mockUpdatePassword.mockResolvedValueOnce({ error: "Password is too short" });
    render(<UpdatePasswordForm />);

    await userEvent.type(screen.getByLabelText("New password"), "newpassword1");
    await userEvent.type(
      screen.getByLabelText("Confirm new password"),
      "newpassword1",
    );
    await userEvent.click(screen.getByRole("button", { name: "Update Password" }));

    expect(await screen.findByText("Password is too short")).toBeInTheDocument();
  });
});
