export default async function Resources() {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Resources
        </h1>
      </section>
      <section className="px-6 mb-3 text-center">
        <p>
          Here you can find local, state, and national organizations that serve
          the area.
        </p>
      </section>
      <section className="px-6 mb-3">
        {/* TODO: Update and add table */}
        {/* <ClientTable
            data={filteredData}
            tags={tags}
            tableType="organizations"
          /> */}
      </section>
      <section className="px-6 mb-6 md:mb-24 text-center">
        <p>
          To add a resource to this list, please contact us{" "}
          <a className="underline" href="/about/contact">
            here
          </a>
          .
        </p>
      </section>
    </main>
  );
}
