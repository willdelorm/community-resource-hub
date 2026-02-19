"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Resource, ResourceCategory } from "@/lib/supabase/types";
import { RESOURCE_CATEGORIES } from "@/lib/supabase/types";

interface ResourcesTableProps {
  resources: Resource[];
}

export function ResourcesTable({ resources }: ResourcesTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "">("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return resources.filter((r) => {
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.address?.toLowerCase().includes(q);
      const matchesCategory = !category || r.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [resources, search, category]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ResourceCategory | "")}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 sm:w-48"
        >
          <option value="">All categories</option>
          {RESOURCE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          No resources match your search.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden sm:table-cell">Address</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">
                  {resource.website ? (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-orange-500"
                    >
                      {resource.name}
                    </a>
                  ) : (
                    resource.name
                  )}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                    {resource.category}
                  </span>
                </TableCell>
                <TableCell className="hidden max-w-xs whitespace-normal text-gray-500 md:table-cell">
                  {resource.description ?? (
                    <span className="text-gray-300">—</span>
                  )}
                </TableCell>
                <TableCell className="hidden whitespace-normal text-gray-500 sm:table-cell">
                  {resource.address ? (
                    (() => {
                      const comma = resource.address.indexOf(",");
                      if (comma === -1) return resource.address;
                      return (
                        <>
                          {resource.address.slice(0, comma)}
                          <br />
                          {resource.address.slice(comma + 1).trim()}
                        </>
                      );
                    })()
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-500">
                  <div className="flex flex-col gap-0.5 text-xs">
                    {resource.phone && <span>{resource.phone}</span>}
                    {resource.email && (
                      <a
                        href={`mailto:${resource.email}`}
                        className="underline hover:text-orange-500"
                      >
                        {resource.email}
                      </a>
                    )}
                    {!resource.phone && !resource.email && (
                      <span className="text-gray-300">—</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <p className="text-sm text-gray-400">
        Showing {filtered.length} of {resources.length} resources
      </p>
    </div>
  );
}
