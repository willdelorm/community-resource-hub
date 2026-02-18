"use client";

import { useState } from "react";

export const forms = [
  { name: "Communication", id: "communication" },
  { name: "Event", id: "add-event" },
  { name: "Add a Resource", id: "add-resource" },
  { name: "Remove a Resource", id: "remove-resource" },
];

const ContactForm = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
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
            htmlFor="email"
          >
            Organization
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3"
            id="text"
            type="text"
            name="organization"
            placeholder="CommonGround Collective"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message*
          </label>
          <textarea
            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            name="message"
            required
          />
          <button
            className="shadow font-bold py-2 px-4 rounded w-full bg-orange-400 hover:bg-yellow-400 text-white"
            type="submit"
          >
            Send message!
          </button>
        </>
      </form>
      <span>{result}</span>
    </div>
  );
};

export default ContactForm;
