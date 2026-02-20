import PeopleBio from "@/components/PeopleBio";

const peopleProfiles = [
  {
    name: "Alex Rivera",
    pronouns: "They/Them",
    position: "Executive Director",
    description: "Alex has been working in community organizing for over a decade, connecting residents with essential services and advocating for equitable access to resources.",
    photo: "/alex-starnes-WYE2UhXsU1Y-unsplash.jpg",
  },
  {
    name: "Jordan Kim",
    pronouns: "She/Her",
    position: "Program Manager",
    description: "Jordan oversees the development and coordination of community programs, ensuring every initiative is inclusive, impactful, and responsive to local needs.",
    photo: "/clay-elliot-mpDV4xaFP8c-unsplash.jpg",
  },
  {
    name: "Marcus Thompson",
    pronouns: "He/Him",
    position: "Outreach Coordinator",
    description: "Marcus builds relationships across neighborhoods and partner organizations, making sure community members know about and can access the resources available to them.",
    photo: "/willian-souza-p5BoBF0XJUA-unsplash.jpg",
  },
];

const People = () => {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          People
        </h1>
      </section>
      <section className="px-6 my-12 mx-auto max-w-4xl">
        {peopleProfiles
          .map((profile, index) => (
            <PeopleBio key={index} profile={profile} />
          ))}
      </section>
    </main>
  );
};

export default People;
