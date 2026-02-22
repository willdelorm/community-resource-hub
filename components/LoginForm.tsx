"use client";

import { signIn } from "@/app/actions/auth";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

type LoginFormProps = {
  onForgotPassword: () => void;
};

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await signIn(email, password);
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
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
      />

      <FormInput
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <div className="flex justify-center sm:justify-end">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Signing in…" : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
