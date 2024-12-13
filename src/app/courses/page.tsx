'use client'
import SmartSelect from "@/components/re-useables/SmartSelect/page"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import React from "react"
import React, { FormEvent } from "react"
import { toast } from "sonner"

const initialData = [
    { id: 'm5gr84i9', title: 'Data Structures & Algorithms', teacher: 'John Doe', courseCode: 'DI-325' },
    { id: '3u1reuv4', title: 'Programming Fundamentals', teacher: 'Jane Doe', courseCode: 'CC-123' },
    { id: 'derv1ws0', title: 'Web Development', teacher: 'Orion Pax', courseCode: 'WD-456' },
    { id: '5kma53ae', title: 'Machine Learning', teacher: 'Jeason', courseCode: 'ML-789' },
    { id: 'bhqecj4p', title: 'Software Engineering', teacher: 'Ciliona', courseCode: 'SE-101' }
];

class Course {
    id: any
    title: any
    teacher: string
    courseCode: any

    constructor(data: any) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.title = data.title;
        this.teacher = 'Zubair';
        this.courseCode = data.courseCode;
    }
}

export const columns: ColumnDef<Course>[] = [
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
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Course Title
                    <ArrowUpDown />
                </Button>
            )
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
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Teacher
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize ml-4">{row.getValue("teacher")}</div>,
    },
    {
        accessorKey: "courseCode",
        header: () => <div className="text-right">Course Code</div>,
        cell: ({ row }) => {

            return <div className="text-right font-medium">{row.getValue("courseCode")}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const course = row.original

            return (
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
                            onClick={() => navigator.clipboard.writeText(course.courseCode!)}
                        >
                            Copy Course ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Course</DropdownMenuItem>
                        <DropdownMenuItem>View Course details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function Courses() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [courses, setCourses] = React.useState<Course[]>(initialData)
    const [open, setOpen] = React.useState(false);

    const table = useReactTable({
        data: courses,
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
    })

    async function handleAddCourse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries()) as unknown as any;
        const newCourse = new Course(data);
        setCourses([...courses,  newCourse])
        setOpen(false)
        toast.success(`${newCourse.courseCode}: ${newCourse.title} is added successfully`);
    }

    return (
        <div className="pe-4 ps-8">
            <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-semibold">Courses</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add Course</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Add Course</DialogTitle>
                            <DialogDescription>
                                This dialog box to add course.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddCourse}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Course Title
                                    </Label>
                                    <Input id="title" name="title" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="courseCode" className="text-right">
                                        Course Code
                                    </Label>
                                    <Input id="courseCode" name="courseCode" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" >Save</Button>
                            </DialogFooter>
                        </form>
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
                        items={
                            table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column: Column<Course>) => {
                                    return {
                                        key: column.id,
                                        label: column.id,
                                        isChecked: column.getIsVisible()
                                    }
                                })}
                        onCheckedChange={(item, value) =>
                            table
                                .getAllColumns()
                                .filter((column) => column.getCanHide()).find(coulmn => coulmn.id == item.key)?.toggleVisibility(!!value)
                        }
                        title="Columns"
                        variant={'outline'}
                        key={'id'}
                    ></SmartSelect>
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
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
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
                                    className="h-24 text-center"
                                >
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
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>

    )
}   