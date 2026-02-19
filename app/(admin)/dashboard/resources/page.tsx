import { DashboardTable, type Column } from "@/components/dashboard/DashboardTable";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import { EditResourceModal } from "@/components/dashboard/EditResourceModal";
import { NewResourceModal } from "@/components/dashboard/NewResourceModal";
import { deleteResourceAction } from "@/app/actions/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllResources } from "@/lib/supabase/queries";
import type { Resource } from "@/lib/supabase/types";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

const resourceColumns = (resources: Resource[]): Column<Resource>[] => [
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
  {
    header: "Address",
    cell: (row) =>
      row.address ?? <span className="text-slate-400">—</span>,
    className: "text-slate-500",
  },
  {
    header: "Phone",
    cell: (row) =>
      row.phone ?? <span className="text-slate-400">—</span>,
    className: "text-slate-500",
  },
  {
    header: "Added",
    cell: (row) => formatDate(row.created_at),
    className: "text-slate-500",
  },
  {
    header: "",
    cell: (row) => (
      <div className="flex items-center gap-1 justify-end">
        <EditResourceModal resource={row} />
        <DeleteButton
          action={deleteResourceAction.bind(null, row.id)}
          label="resource"
        />
      </div>
    ),
  },
];

const ResourcesPage = async () => {
  const resources = await getAllResources();
  const columns = resourceColumns(resources);

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
            Resources
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {resources.length} {resources.length === 1 ? "resource" : "resources"} total
          </p>
        </div>
        <NewResourceModal />
      </div>

      <hr className="border-slate-300" />

      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardTable
            columns={columns}
            rows={resources}
            emptyMessage="No resources yet. Add one to get started."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;
