import { Button } from "@/components/ui/button";
import Link from "next/link";

const pageButtons = [
  {
    title: "Story",
    link: "/about/story",
  },
  {
    title: "People",
    link: "/about/people",
  },
  {
    title: "Contact",
    link: "/about/contact",
  },
];

const About = () => {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          About
        </h1>
      </section>
      <section className="w-64 mx-auto mb-12 py-6 flex flex-col justify-center items-center gap-6">
        {pageButtons.map(({ title, link }) => (
          <Button
            asChild
            key={title}
            className={`w-full bg-orange-400 hover:bg-yellow-400 shadow-md`}
          >
            <Link href={link}>{title}</Link>
          </Button>
        ))}
      </section>
    </main>
  );
};

export default About;
