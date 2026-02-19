"use client";

import { sendPasswordReset } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

type RecoveryFormProps = {
  onBack: () => void;
};

const RecoveryForm = ({ onBack }: RecoveryFormProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await sendPasswordReset(email);
      if (result?.error) {
        setError(result.error);
      } else {
        setSent(true);
      }
    });
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          Recovery link sent! Check your email.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-center text-primary hover:underline"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <FormInput
        id="email"
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Sending…" : "Send Recovery Link"}
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="text-sm text-center text-primary hover:underline"
      >
        Back to login
      </button>
    </form>
  );
};

export default RecoveryForm;
