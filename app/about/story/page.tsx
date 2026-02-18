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
        {/* TODO: Write up a story. */}
        <p className="mb-3">
          Let me tell you, it is an awesome story.
        </p>
      </section>
    </main>
  );
};

export default Story;
