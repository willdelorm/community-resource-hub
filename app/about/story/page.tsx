const Story = () => {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Story
        </h1>
      </section>
      <section className="px-6 my-12 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-3 drop-shadow-md">
          Our Story
        </h2>
        <p className="mb-3">
          The Community Resource Hub was founded in 2018 by a small group of
          neighbors who noticed that too many people in their city were
          struggling to find the help they needed — not because resources
          didn&apos;t exist, but because they were scattered, hard to navigate,
          and often unknown to the people who needed them most.
        </p>
        <p className="mb-3">
          What started as a hand-maintained spreadsheet shared at a local
          community meeting quickly grew into something larger. Volunteers began
          documenting food pantries, housing assistance programs, mental health
          services, and more. Word spread, and within a year the project had
          outgrown its informal roots and incorporated as a nonprofit
          organization.
        </p>
        <p className="mb-3">
          In 2020, the Hub launched its first digital platform, making it easier
          for residents and social workers alike to search for and connect with
          local services. During the challenges of that year, the organization
          expanded rapidly — adding new categories of resources, partnering with
          city agencies, and onboarding dozens of community volunteers.
        </p>
        <p className="mb-3">
          Today, the Community Resource Hub serves thousands of people each
          month. Our team works closely with local organizations to keep
          information accurate and up to date, and we remain committed to our
          founding belief: that access to community support should be simple,
          dignified, and available to everyone.
        </p>
      </section>
    </main>
  );
};

export default Story;
