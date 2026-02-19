import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

type DashboardTableProps<T extends { id: string }> = {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
};

export function DashboardTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "No entries yet.",
}: DashboardTableProps<T>) {
  if (rows.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-slate-400">{emptyMessage}</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.header} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((col) => (
              <TableCell key={col.header} className={col.className}>
                {col.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
