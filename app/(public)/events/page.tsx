import { getUpcomingEvents } from "@/lib/supabase/queries";

function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  if (!endDate) {
    return start.toLocaleDateString("en-US", options);
  }

  const end = new Date(endDate);
  const sameDay = start.toDateString() === end.toDateString();

  if (sameDay) {
    return `${start.toLocaleDateString("en-US", options)} – ${end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  }

  return `${start.toLocaleDateString("en-US", options)} – ${end.toLocaleDateString("en-US", options)}`;
}

export default async function Events() {
  const events = await getUpcomingEvents();

  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Events
        </h1>
      </section>
      <section className="flex flex-col justify-center items-center px-4 sm:px-6 py-6">
        <div className="max-w-3xl w-full py-6">
          {events.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No upcoming events at this time. Check back soon!
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-gray-200">
              {events.map((event) => (
                <article key={event.id} className="py-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">
                      {event.url ? (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-orange-500"
                        >
                          {event.title}
                        </a>
                      ) : (
                        event.title
                      )}
                      {event.is_recurring && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          (recurring)
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatDateRange(event.start_date, event.end_date)}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-500">{event.location}</p>
                    )}
                    {event.description && (
                      <p className="mt-2 text-gray-700">{event.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
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
