import { DashboardTable, type Column } from "@/components/dashboard/DashboardTable";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { EditAnnouncementModal } from "@/components/dashboard/EditAnnouncementModal";
import { NewAnnouncementModal } from "@/components/dashboard/NewAnnouncementModal";
import { deleteAnnouncementAction } from "@/app/actions/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAnnouncements } from "@/lib/supabase/queries";
import type { Announcement } from "@/lib/supabase/types";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

const announcementColumns = (announcements: Announcement[]): Column<Announcement>[] => [
  {
    header: "Title",
    cell: (row) => <span className="font-medium">{row.title}</span>,
  },
  {
    header: "Content",
    cell: (row) => (
      <span className="text-slate-500">
        {row.content.length > 80 ? row.content.slice(0, 80) + "…" : row.content}
      </span>
    ),
  },
  {
    header: "Expires",
    cell: (row) =>
      row.date_expired ? (
        formatDate(row.date_expired)
      ) : (
        <span className="text-slate-400">—</span>
      ),
    className: "text-slate-500 whitespace-nowrap",
  },
  {
    header: "Created",
    cell: (row) => formatDate(row.created_at),
    className: "text-slate-500 whitespace-nowrap",
  },
  {
    header: "",
    cell: (row) => (
      <div className="flex items-center gap-1 justify-end">
        <EditAnnouncementModal announcement={row} />
        <DeleteButton
          action={deleteAnnouncementAction.bind(null, row.id)}
          label="announcement"
        />
      </div>
    ),
  },
];

const AnnouncementsPage = async () => {
  const announcements = await getAllAnnouncements();
  const columns = announcementColumns(announcements);

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
            Announcements
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {announcements.length}{" "}
            {announcements.length === 1 ? "announcement" : "announcements"} total
          </p>
        </div>
        <NewAnnouncementModal />
      </div>

      <hr className="border-slate-300" />

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            columns={columns}
            rows={announcements}
            emptyMessage="No announcements yet. Add one to get started."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsPage;
