import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black uppercase tracking-widest">
              CommonGround
            </span>
            <span className="rounded bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-900">
              Admin
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
