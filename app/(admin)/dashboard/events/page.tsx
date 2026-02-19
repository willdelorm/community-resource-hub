import { DashboardTable, type Column } from "@/components/dashboard/DashboardTable";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { EditEventModal } from "@/components/dashboard/EditEventModal";
import { NewEventModal } from "@/components/dashboard/NewEventModal";
import { deleteEventAction } from "@/app/actions/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllEvents } from "@/lib/supabase/queries";
import { isDemoUser } from "@/lib/supabase/demo";
import type { Event } from "@/lib/supabase/types";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

const eventColumns = (isDemo: boolean): Column<Event>[] => [
  {
    header: "Title",
    cell: (row) => <span className="font-medium">{row.title}</span>,
  },
  {
    header: "Start",
    cell: (row) => formatDate(row.start_date),
    className: "text-slate-500 whitespace-nowrap",
  },
  {
    header: "End",
    cell: (row) =>
      row.end_date ? (
        formatDate(row.end_date)
      ) : (
        <span className="text-slate-400">—</span>
      ),
    className: "text-slate-500 whitespace-nowrap",
  },
  {
    header: "Location",
    cell: (row) =>
      row.location ?? <span className="text-slate-400">—</span>,
    className: "text-slate-500",
  },
  {
    header: "Recurring",
    cell: (row) =>
      row.is_recurring ? (
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
          Yes
        </span>
      ) : (
        <span className="text-slate-400">—</span>
      ),
  },
  ...(!isDemo
    ? [
        {
          header: "",
          cell: (row: Event) => (
            <div className="flex items-center gap-1 justify-end">
              <EditEventModal event={row} />
              <DeleteButton
                action={deleteEventAction.bind(null, row.id)}
                label="event"
              />
            </div>
          ),
        } satisfies Column<Event>,
      ]
    : []),
];

const EventsPage = async () => {
  const [events, isDemo] = await Promise.all([
    getAllEvents(),
    isDemoUser(),
  ]);
  const columns = eventColumns(isDemo);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-black uppercase tracking-wide text-slate-800">
            Events
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {events.length} {events.length === 1 ? "event" : "events"} total
          </p>
        </div>
        {!isDemo && <NewEventModal />}
      </div>

      <hr className="border-slate-300" />

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            columns={columns}
            rows={events}
            emptyMessage="No events yet. Add one to get started."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsPage;
