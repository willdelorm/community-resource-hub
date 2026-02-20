import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-orange-400 to-yellow-400 font-sans dark:from-orange-900 dark:to-yellow-900">
      <div className="flex min-h-screen w-full max-w-3xl flex-col items-center bg-white text-black sm:items-start">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
