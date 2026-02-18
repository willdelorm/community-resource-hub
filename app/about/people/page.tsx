import PeopleBio from "@/components/PeopleBio";

const peopleProfiles = [
  // TODO: Replace with placeholder people
  {
    name: "Name",
    pronouns: "They/He",
    team: "leadership",
    position: "Position",
    description: "Description",
    photo: "/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.svg",
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
        <h2 className="text-4xl font-bold text-center mb-8 drop-shadow-md">
          Team Name
        </h2>
        {peopleProfiles
          .filter((profile) => profile.team === "leadership")
          .map((profile, index) => (
            <PeopleBio key={index} profile={profile} />
          ))}
      </section>
    </main>
  );
};

export default People;
