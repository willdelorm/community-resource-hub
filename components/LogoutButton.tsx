"use client";

import { signOut } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-xs text-slate-400 hover:text-white transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
