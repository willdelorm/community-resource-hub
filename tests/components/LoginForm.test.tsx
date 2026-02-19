import LoginForm from "@/components/LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/actions/auth", () => ({
  signIn: vi.fn(),
}));

import { signIn } from "@/app/actions/auth";
const mockSignIn = vi.mocked(signIn);

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    render(<LoginForm onForgotPassword={vi.fn()} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
  });

  it("calls onForgotPassword when the link is clicked", async () => {
    const onForgotPassword = vi.fn();
    render(<LoginForm onForgotPassword={onForgotPassword} />);

    await userEvent.click(screen.getByText("Forgot Password?"));

    expect(onForgotPassword).toHaveBeenCalledOnce();
  });

  it("submits email and password to signIn", async () => {
    mockSignIn.mockResolvedValueOnce({error: ""});
    render(<LoginForm onForgotPassword={vi.fn()} />);

    await userEvent.type(screen.getByLabelText("Email"), "admin@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "secret");
    await userEvent.click(screen.getByRole("button", { name: "Log In" }));

    expect(mockSignIn).toHaveBeenCalledWith("admin@example.com", "secret");
  });

  it("shows an error message when signIn returns an error", async () => {
    mockSignIn.mockResolvedValueOnce({ error: "Invalid credentials" });
    render(<LoginForm onForgotPassword={vi.fn()} />);

    await userEvent.type(screen.getByLabelText("Email"), "admin@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: "Log In" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });
});
