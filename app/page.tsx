import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Announcement {
  id: number;
  title: string;
  content: string;
  dateCreated: Date;
  dateExpired: Date;
}

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

const announcements: Announcement[] = [];

export default function Home() {
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
          This is a great hub for resources in the area.
        </p>
      </section>
      <section className="dark-bg p-12 mx-auto">
        <div className="w-64 mx-auto flex flex-col justify-center items-center gap-6 z-10">
          {pageButtons.map(({ title, link }) => (
            <Button
              asChild
              key={title}
              className={`w-full bg-orange-400 hover:bg-yellow-400 shadow-md`}
            >
              <Link href={link}>{title}</Link>
            </Button>
          ))}
        </div>
      </section>
      <section className="flex flex-col max-w-4xl mx-auto px-6 py-6 md:py-24">
        <h2 className="text-3xl font-bold text-center uppercase mb-6">
          Announcements
        </h2>
        {announcements.map((item) => (
          <article key={item.id} className="mb-6">
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            {item.content.split("\n").map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <hr className="border-gray-200 w-1/2 mx-auto mt-6" />
          </article>
        ))}
      </section>
      <section className="py-6 mx-auto bg-white bg-opacity-80 text-black">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center gap-8">
          <h2 className="text-3xl font-regular w-3/5">Support us!</h2>
          <Button asChild className="w-32 bg-orange-400 hover:bg-yellow-400">
            <Link href="/donate">DONATE</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
