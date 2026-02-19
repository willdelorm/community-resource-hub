import {
  DashboardTable,
  type Column,
} from "@/components/dashboard/DashboardTable";
import { NewAnnouncementModal } from "@/components/dashboard/NewAnnouncementModal";
import { NewEventModal } from "@/components/dashboard/NewEventModal";
import { NewResourceModal } from "@/components/dashboard/NewResourceModal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAllAnnouncements,
  getAllEvents,
  getAllResources,
} from "@/lib/supabase/queries";
import { isDemoUser } from "@/lib/supabase/demo";
import type { Announcement, Event, Resource } from "@/lib/supabase/types";
import Link from "next/link";

const PREVIEW_LIMIT = 5;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

const resourceColumns: Column<Resource>[] = [
  {
    header: "Name",
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    header: "Category",
    cell: (row) => row.category,
    className: "text-slate-500",
  },
  {
    header: "Status",
    cell: (row) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
          row.is_active
            ? "bg-green-100 text-green-700"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {row.is_active ? "Active" : "Inactive"}
      </span>
    ),
  },
];

const announcementColumns: Column<Announcement>[] = [
  {
    header: "Title",
    cell: (row) => <span className="font-medium">{row.title}</span>,
  },
  {
    header: "Expires",
    cell: (row) =>
      row.date_expired ? (
        formatDate(row.date_expired)
      ) : (
        <span className="text-slate-400">—</span>
      ),
    className: "text-slate-500",
  },
];

const eventColumns: Column<Event>[] = [
  {
    header: "Title",
    cell: (row) => <span className="font-medium">{row.title}</span>,
  },
  {
    header: "Date",
    cell: (row) => formatDate(row.start_date),
    className: "text-slate-500",
  },
  {
    header: "Location",
    cell: (row) => row.location ?? <span className="text-slate-400">—</span>,
    className: "text-slate-500",
  },
];

const Dashboard = async () => {
  const [resources, announcements, events, isDemo] = await Promise.all([
    getAllResources(),
    getAllAnnouncements(),
    getAllEvents(),
    isDemoUser(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wide text-slate-800">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">Manage site content below.</p>
      </div>

      <hr className="border-slate-300" />

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            columns={resourceColumns}
            rows={resources.slice(0, PREVIEW_LIMIT)}
            emptyMessage="No resources yet."
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isDemo && <NewResourceModal />}
          <Link
            href="/dashboard/resources"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            View all →
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            columns={announcementColumns}
            rows={announcements.slice(0, PREVIEW_LIMIT)}
            emptyMessage="No announcements yet."
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isDemo && <NewAnnouncementModal />}
          <Link
            href="/dashboard/announcements"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            View all →
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            columns={eventColumns}
            rows={events.slice(0, PREVIEW_LIMIT)}
            emptyMessage="No events yet."
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isDemo && <NewEventModal />}
          <Link
            href="/dashboard/events"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            View all →
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
