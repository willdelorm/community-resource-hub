import ContactForm from "@/components/ContactForm";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/actions/content", () => ({
  submitContactFormAction: vi.fn(),
}));

import { submitContactFormAction } from "@/app/actions/content";
const mockSubmit = vi.mocked(submitContactFormAction);

beforeEach(() => {
  vi.clearAllMocks();
});

const fillAndSubmit = async (overrides: Record<string, string> = {}) => {
  const fields = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "541-555-0100",
    message: "Hello, I need help.",
    ...overrides,
  };

  if (fields.name) await userEvent.type(screen.getByLabelText("Name*"), fields.name);
  if (fields.email) await userEvent.type(screen.getByLabelText("Email*"), fields.email);
  if (fields.phone) await userEvent.type(screen.getByLabelText("Phone"), fields.phone);
  if (fields.message) await userEvent.type(screen.getByLabelText("Message*"), fields.message);

  await userEvent.click(screen.getByRole("button", { name: "Send message!" }));
};

describe("ContactForm", () => {
  it("renders all expected fields and submit button", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Message*")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send message!" })).toBeInTheDocument();
  });

  it("does not render an Organization field", () => {
    render(<ContactForm />);
    expect(screen.queryByLabelText(/organization/i)).not.toBeInTheDocument();
  });

  it("calls submitContactFormAction with form values on submit", async () => {
    mockSubmit.mockResolvedValueOnce({ success: true });
    render(<ContactForm />);

    await fillAndSubmit();

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "541-555-0100",
      message: "Hello, I need help.",
    });
  });

  it("passes null for phone when left blank", async () => {
    mockSubmit.mockResolvedValueOnce({ success: true });
    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText("Name*"), "Jane Doe");
    await userEvent.type(screen.getByLabelText("Email*"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Message*"), "Hi.");
    await userEvent.click(screen.getByRole("button", { name: "Send message!" }));

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ phone: null }),
    );
  });

  it("disables the button and shows 'Sending...' while submitting", async () => {
    let resolve!: (v: { success: true }) => void;
    mockSubmit.mockReturnValueOnce(new Promise((r) => { resolve = r; }));
    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText("Name*"), "Jane");
    await userEvent.type(screen.getByLabelText("Email*"), "jane@example.com");
    await userEvent.type(screen.getByLabelText("Message*"), "Hi.");
    await userEvent.click(screen.getByRole("button", { name: "Send message!" }));

    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();

    resolve({ success: true });
  });

  it("shows success message and resets the form on success", async () => {
    mockSubmit.mockResolvedValueOnce({ success: true });
    render(<ContactForm />);

    await fillAndSubmit();

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Name*")).toHaveValue("");
    expect(screen.getByLabelText("Message*")).toHaveValue("");
  });

  it("shows the error message returned by the action on failure", async () => {
    mockSubmit.mockResolvedValueOnce({ error: "Database unavailable" });
    render(<ContactForm />);

    await fillAndSubmit();

    expect(await screen.findByText("Database unavailable")).toBeInTheDocument();
    expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
  });

  it("does not call the action when the honeypot field is filled", async () => {
    render(<ContactForm />);

    const botcheck = document.querySelector<HTMLInputElement>('input[name="botcheck"]')!;
    fireEvent.click(botcheck);

    await userEvent.type(screen.getByLabelText("Name*"), "Bot");
    await userEvent.type(screen.getByLabelText("Email*"), "bot@spam.com");
    await userEvent.type(screen.getByLabelText("Message*"), "Buy cheap meds!");
    await userEvent.click(screen.getByRole("button", { name: "Send message!" }));

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("re-enables the button and does not reset the form on error", async () => {
    mockSubmit.mockResolvedValueOnce({ error: "Failed to send message" });
    render(<ContactForm />);

    await fillAndSubmit();

    await screen.findByText("Failed to send message");
    expect(screen.getByRole("button", { name: "Send message!" })).not.toBeDisabled();
    expect(screen.getByLabelText("Name*")).toHaveValue("Jane Doe");
  });
});
