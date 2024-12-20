"use client";
import SmartSelect from "@/components/re-useables/SmartSelect/page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ICourse } from "../model/course";
import { RegisterCourse } from "./add-course";
import { UpdateCourse } from "./update-course";

export default function Courses() {
  useEffect(() => {
    const courses =
      JSON.parse(window.localStorage.getItem("courses") || "[]") || [];
    setData(courses);
  }, []);
  const updateCourses = () => {
    const courses =
      JSON.parse(window.localStorage.getItem("courses") || "[]") || [];
    setData(courses);
  };
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [data, setData] = useState<ICourse[]>([]);
  const [open, setOpen] = React.useState(false);
  const columns: ColumnDef<ICourse>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Course Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "teacher",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Teacher
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">{row.getValue("teacher")}</div>
      ),
    },
    {
      accessorKey: "courseCode",
      header: () => <div className="text-right">Course Code</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.getValue("courseCode")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const course = row.original;
        const [open, setOpen] = React.useState(false);

        const handleCloseDialog = () => {
          updateCourses();
          setOpen(false);
          toast.success(`${course.title} updated successfully!`);
        };
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(course.courseCode.toString())
                  }>
                  Copy Course ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                  className="text-gray-600">
                  <SquarePen /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Update Course Data Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="lg:max-w-[40vw] max-h-[65vh] overflow-y-auto p-6 rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle>Update Course</DialogTitle>
                  <DialogDescription>
                    Update course. Click submit when you're done.
                  </DialogDescription>
                </DialogHeader>
                <UpdateCourse
                  courseId={course.id}
                  onSave={handleCloseDialog}
                />
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleCloseDialog = () => {
    const courses =
      JSON.parse(window.localStorage.getItem("courses") || "[]") || [];
    setData(courses);
    setOpen(false);
    var newCourse = courses[courses.length - 1];
    toast.success(
      `${newCourse.courseCode}: ${newCourse.title} is added successfully`
    );
  };

  return (
    <div className="pe-4 ps-8">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Button onClick={() => setOpen(true)} variant="outline">
          Add course
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="lg:max-w-[40vw] max-h-[65vh] overflow-y-auto p-6 rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle>Add Course</DialogTitle>
              <DialogDescription>
                Add course. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <RegisterCourse onSave={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter courses..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto">
          <SmartSelect
            items={table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column: Column<ICourse>) => {
                return {
                  key: column.id,
                  label: column.id,
                  isChecked: column.getIsVisible(),
                };
              })}
            onCheckedChange={(item, value) =>
              table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .find((coulmn) => coulmn.id == item.key)
                ?.toggleVisibility(!!value)
            }
            title="Columns"
            variant={"outline"}
            key={"id"}></SmartSelect>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
