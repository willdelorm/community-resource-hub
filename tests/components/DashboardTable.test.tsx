import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

type Row = { id: string; name: string; score: number };

const columns = [
  { header: "Name", cell: (row: Row) => row.name },
  { header: "Score", cell: (row: Row) => row.score, className: "text-right" },
];

const rows: Row[] = [
  { id: "1", name: "Alice", score: 42 },
  { id: "2", name: "Bob", score: 99 },
];

describe("DashboardTable", () => {
  it("renders column headers", () => {
    render(<DashboardTable columns={columns} rows={rows} />);

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Score" })).toBeInTheDocument();
  });

  it("renders a row for each item", () => {
    render(<DashboardTable columns={columns} rows={rows} />);

    expect(screen.getByRole("cell", { name: "Alice" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "42" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Bob" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "99" })).toBeInTheDocument();
  });

  it("renders custom JSX from cell renderers", () => {
    const richColumns = [
      {
        header: "Status",
        cell: (row: Row) => (
          <span data-testid={`status-${row.id}`}>{row.score > 50 ? "High" : "Low"}</span>
        ),
      },
    ];
    render(<DashboardTable columns={richColumns} rows={rows} />);

    expect(screen.getByTestId("status-1")).toHaveTextContent("Low");
    expect(screen.getByTestId("status-2")).toHaveTextContent("High");
  });

  it("shows the default empty message when rows is empty", () => {
    render(<DashboardTable columns={columns} rows={[]} />);

    expect(screen.getByText("No entries yet.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("shows a custom empty message", () => {
    render(
      <DashboardTable columns={columns} rows={[]} emptyMessage="Nothing here." />,
    );

    expect(screen.getByText("Nothing here.")).toBeInTheDocument();
  });
});
