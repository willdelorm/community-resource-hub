import { Button } from "@/components/ui/button";
import { getActiveAnnouncements } from "@/lib/supabase/queries";
import Image from "next/image";
import Link from "next/link";

const pageButtons = [
  {
    title: "Events",
    link: "/events",
  },
  {
    title: "Resources",
    link: "/resources",
  },
  {
    title: "About",
    link: "/about",
  },
];

export default async function Home() {
  const announcements = (await getActiveAnnouncements()).slice(0, 3);
  
  return (
    <main className="w-full">
      <section className="h-96 w-full flex justify-center items-center relative">
        <h1 className="text-7xl text-center font-bold uppercase text-white filter drop-shadow z-10">
          CommonGround Collective
        </h1>
        <Image
          src="/10-2500x1667.jpg"
          fill={true}
          alt="placeholder hero image"
        />
      </section>
      <section className="mx-auto p-6 bg-gray-200">
        <p className="text-center text-lg mx-auto">
          Your connection to local services, support, and community — all in one
          place.
        </p>
      </section>
      <section className="mx-auto w-full max-w-2xl px-6 py-12">
        <h2 className="text-3xl font-bold text-center uppercase mb-8">
          Announcements
        </h2>
        <div className="flex flex-col divide-y divide-gray-200">
          {announcements.map((item) => (
            <article key={item.id} className="py-6">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              {item.content.split("\n").map((text, index) => (
                <p key={index} className="text-gray-600">
                  {text}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
      <section className="dark-bg w-full py-10">
        <div className="mx-auto flex flex-col items-center gap-4 px-6 sm:flex-row sm:justify-center">
          {pageButtons.map(({ title, link }) => (
            <Button
              asChild
              key={title}
              className="flex-1 bg-orange-400 hover:bg-yellow-400 shadow-md"
            >
              <Link href={link}>{title}</Link>
            </Button>
          ))}
        </div>
      </section>
      <section className="w-full bg-sky-800 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-4xl font-black uppercase text-white drop-shadow">
            Support Our Mission
          </h2>
          <p className="max-w-lg text-lg text-gray-300">
            Your contribution helps us keep resources up to date and reach more
            people in need across our community.
          </p>
          <Button
            asChild
            className="mt-2 bg-orange-400 px-8 py-5 text-base font-bold text-white shadow-lg hover:bg-yellow-400"
          >
            <Link href="/donate">Donate Today</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
