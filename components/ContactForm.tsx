"use client";

import { useState } from "react";
import { submitContactFormAction } from "@/app/actions/content";

const ContactForm = () => {
  const [result, setResult] = useState<{ success: true } | { error: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check — bots fill hidden fields
    if (data.get("botcheck")) return;

    setSubmitting(true);
    setResult(null);

    const result = await submitContactFormAction({
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: (data.get("phone") as string) || null,
      message: data.get("message") as string,
    });

    setSubmitting(false);
    setResult(result);

    if ("success" in result) {
      form.reset();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto text-black">
      <form
        className="bg-white px-8 pt-6 pb-8 mb-4 rounded"
        onSubmit={onSubmit}
      >
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />
        <>
          <input
            type="hidden"
            name="subject"
            value="[Form Submission] Communication"
          />
          <h2 className="block text-gray-700 text-md font-bold">
            Communication or inquiry
          </h2>
          <p className="">
            <em>* indicates a required field</em>
          </p>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required
            aria-required="true"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3"
            id="email"
            type="email"
            name="email"
            placeholder="info@cgc.org"
            required
            aria-required="true"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3"
            id="phone"
            type="text"
            name="phone"
            placeholder="541-555-1050"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message*
          </label>
          <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            id="message"
            name="message"
            required
          />
          <button
            className="shadow font-bold py-2 px-4 rounded w-full bg-orange-400 hover:bg-yellow-400 text-white disabled:opacity-50"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send message!"}
          </button>
        </>
      </form>
      {result && (
        "success" in result ? (
          <p className="text-green-600 font-medium text-center">
            Message sent! We&apos;ll be in touch soon.
          </p>
        ) : (
          <p className="text-red-600 font-medium text-center">
            {result.error}
          </p>
        )
      )}
    </div>
  );
};

export default ContactForm;
