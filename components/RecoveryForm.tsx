"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";

type RecoveryFormProps = {
  onBack: () => void;
};

const RecoveryForm = ({ onBack }: RecoveryFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Password recovery submitted:", { email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      <Button type="submit" size="lg" className="w-full">
        Send Recovery Link
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
