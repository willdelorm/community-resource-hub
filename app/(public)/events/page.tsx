export default function Events() {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Events
        </h1>
      </section>
      <section className="flex flex-col justify-center items-center p-6">
        <p className="mx-3 mb-3 text-center">
          This calendar contains events happening all over the area.<br />Select an
          event below to see details.
        </p>
        <div className="max-w-3xl w-full py-6">
          {/* TODO: Insert calendar here */}
        </div>
        <p className="text-center my-6">
          If something is missing,{" "}
          <a className="underline" href="/about/contact">
            let us know!
          </a>
        </p>
      </section>
    </main>
  );
}
