import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sendPasswordReset, updatePassword } from "@/app/actions/auth";

const mockRedirect = vi.mocked(redirect);
const mockCreateClient = vi.mocked(createClient);

const mockUpdateUser = vi.fn();
const mockResetPasswordForEmail = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockCreateClient.mockResolvedValue({
    auth: {
      updateUser: mockUpdateUser,
      resetPasswordForEmail: mockResetPasswordForEmail,
    },
  } as never);
});

// ---------------------------------------------------------------------------
// updatePassword
// ---------------------------------------------------------------------------

describe("updatePassword", () => {
  it("calls updateUser with the given password and redirects to /dashboard on success", async () => {
    mockUpdateUser.mockResolvedValueOnce({ error: null });

    await updatePassword("newpassword1");

    expect(mockUpdateUser).toHaveBeenCalledWith({ password: "newpassword1" });
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("returns an error message and does not redirect when updateUser fails", async () => {
    mockUpdateUser.mockResolvedValueOnce({
      error: { message: "Password too weak" },
    });

    const result = await updatePassword("weak");

    expect(result).toEqual({ error: "Password too weak" });
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// sendPasswordReset
// ---------------------------------------------------------------------------

describe("sendPasswordReset", () => {
  it("calls resetPasswordForEmail with the correct email and redirectTo", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    await sendPasswordReset("user@example.com");

    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("user@example.com", {
      redirectTo: "https://example.com/auth/callback?next=/update-password",
    });

    process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
  });

  it("returns { success: true } on success", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });

    const result = await sendPasswordReset("user@example.com");

    expect(result).toEqual({ success: true });
  });

  it("returns an error message when resetPasswordForEmail fails", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({
      error: { message: "Unable to send email" },
    });

    const result = await sendPasswordReset("user@example.com");

    expect(result).toEqual({ error: "Unable to send email" });
  });

  it("falls back to localhost:3000 when no site URL env var is set", async () => {
    mockResetPasswordForEmail.mockResolvedValueOnce({ error: null });
    const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const originalVercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_VERCEL_URL;

    await sendPasswordReset("user@example.com");

    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("user@example.com", {
      redirectTo: "http://localhost:3000/auth/callback?next=/update-password",
    });

    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    process.env.NEXT_PUBLIC_VERCEL_URL = originalVercelUrl;
  });
});
