"use client";

import { updatePassword } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

const UpdatePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await updatePassword(password);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <FormInput
        id="password"
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <FormInput
        id="confirm"
        label="Confirm new password"
        name="confirm"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="••••••••"
      />

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Updating…" : "Update Password"}
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
