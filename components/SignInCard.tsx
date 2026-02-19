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

type SignInCardProps = {
  demoEmail?: string;
  demoPassword?: string;
};

const SignInCard = ({ demoEmail, demoPassword }: SignInCardProps) => {
  const [view, setView] = useState<View>("login");
  const { title, subtitle } = headings[view];
  const showDemo = !!(demoEmail && demoPassword);

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

      {showDemo && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-2">
            Demo Access
          </p>
          <div className="space-y-1 text-sm text-amber-900">
            <div className="flex justify-between">
              <span className="text-amber-600">Email</span>
              <span className="font-mono">{demoEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">Password</span>
              <span className="font-mono">{demoPassword}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInCard;
