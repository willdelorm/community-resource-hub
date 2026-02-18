"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RecoveryForm from "@/components/RecoveryForm";

type View = "login" | "recovery";

const headings: Record<View, { title: string; subtitle: string }> = {
  login: {
    title: "Admin Sign In",
    subtitle: "Enter your credentials to continue.",
  },
  recovery: {
    title: "Forgot Password",
    subtitle: "Enter your email and we'll send a recovery link.",
  },
};

const SignInCard = () => {
  const [view, setView] = useState<View>("login");
  const { title, subtitle } = headings[view];

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-black uppercase text-center mb-1">
        {title}
      </h1>
      <p className="text-center text-gray-500 mb-6">{subtitle}</p>

      <hr className="border-gray-200 mb-6" />

      {view === "login" ? (
        <LoginForm onForgotPassword={() => setView("recovery")} />
      ) : (
        <RecoveryForm onBack={() => setView("login")} />
      )}
    </div>
  );
};

export default SignInCard;
