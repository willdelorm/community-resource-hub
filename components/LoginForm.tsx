"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type LoginFormProps = {
  onForgotPassword: () => void;
};

const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Admin login submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormInput
        id="username"
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        required
        value={formData.username}
        onChange={handleChange}
        placeholder="admin"
      />

      <FormInput
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
