import LogoutButton from "@/components/LogoutButton";
import { createClient } from "@/lib/supabase/server";
import { isDemoUser } from "@/lib/supabase/demo";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isSignedIn = !!data?.claims;
  const isDemo = isSignedIn && (await isDemoUser());

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black uppercase tracking-widest">
              CommonGround
            </span>
            <span className="rounded bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-900">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <LogoutButton />
            ) : (
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Back to site
              </Link>
            )}
          </div>
        </div>
      </header>

      {isDemo && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2 text-sm text-amber-800">
            <span className="font-semibold">Demo mode</span>
            <span className="text-amber-600">—</span>
            <span>You&apos;re viewing a read-only preview. All edits are disabled.</span>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
