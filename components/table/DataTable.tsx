import { useSkipper } from "@/hooks/useSkipper";
import { Data } from "@/types/general";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import FooterCell from "./FooterCell";
import CustomPagination from "./customPagination";

export function DataTableServerside<TData, TValue>({
  columns,
  data,
  currentPage,
  onPageChange,
  totalPage,
  totalData,
  pageSize,
  loading,
  columnVisible,
  isServerSearch = false,
  dataSetter,
  onSearchChange,
  editedRows,
  setEditedRows,
  onPageSizeChange,
  canAddData = false,
  initialData,
  onDeleteData,
  onFinishAddData,
  onRemoveAllRows,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  totalPage: number;
  isServerSearch?: boolean;
  onPageChange?: (e: number) => void;
  loading?: boolean;
  totalData: number;
  pageSize: number;
  columnVisible?: VisibilityState;
  onPageSizeChange?: (e: number) => void;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  dataSetter?: Dispatch<SetStateAction<TData[]>>;
  editedRows?: Data;
  setEditedRows?: Dispatch<SetStateAction<Data>>;
  canAddData?: boolean;
  initialData?: TData;
  onDeleteData?: (e?: TData) => void | Promise<void>;
  onFinishAddData?: (e?: TData) => void | Promise<void>;
  onRemoveAllRows?: (e?: TData[]) => void | Promise<void>;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [originalData, setOriginalData] = useState<TData[]>([...data]);

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
    enableRowSelection: true,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        skipAutoResetPageIndex();
        if (!!dataSetter) {
          dataSetter((old) =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            })
          );
        }
      },
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          if (dataSetter && originalData) {
            dataSetter((old) =>
              old.map((e, index) =>
                index === rowIndex ? originalData[rowIndex] : e
              )
            );
          }
          return;
        } else {
          setOriginalData((old) =>
            old.map((e, index) => (index === rowIndex ? data[rowIndex] : e))
          );
          if (dataSetter) {
            dataSetter((old) =>
              old.map((e, index) => (index === rowIndex ? data[rowIndex] : e))
            );
          }
          return;
        }
      },
      addRow: (dataToAdd) => {
        if (!!dataSetter) {
          if (!!dataToAdd && data.length > 0) {
            dataSetter((old) => [...old, dataToAdd]);
            return;
          } else {
            dataSetter([initialData as TData]);
            return;
          }
        }
      },
      removeRow: (rowIndex: number) => {
        if (!!dataSetter) {
          const process = data.filter((_row, index) => index !== rowIndex);
          dataSetter(process);
        }
      },
      removeRows: (selectedRows: number[]) => {
        if (dataSetter) {
          const setFilterFunc = (old: TData[]): TData[] => {
            return old.filter((row, index) => !selectedRows.includes(index));
          };
          dataSetter(setFilterFunc);
          setOriginalData(setFilterFunc);
        }
      },
      editedRow: editedRows,
      setEditedRow: setEditedRows,
      onDeleteData: onDeleteData,
      onFinishAddData: onFinishAddData,
    },
    debugTable: true,
  });

  const removeRows = () => {
    table.options.meta?.removeRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="w-full">
      <div className="flex items-center md:flex-col md:gap-y-2 md:items-start justify-between py-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild hidden={!!onPageSizeChange == false}>
            <Button variant="outline" className="">
              {pageSize} Per Table <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[5, 10, 25, 50, 100].map((item, key) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={item == pageSize}
                onCheckedChange={() => {
                  !!onPageSizeChange ? onPageSizeChange(item) : null;
                }}
              >
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2 flex-wrap md:justify-between">
          <Input
            placeholder="Filter emails..."
            // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              isServerSearch
                ? !!onSearchChange
                  ? onSearchChange(event)
                  : null
                : table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="flex-1 bg-white"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="relative">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
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
            <div className="absolute right-0 top-0 pr-[0.1rem] pt-[0.1rem]">
              {table.getSelectedRowModel().rows.length > 0 && (
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={async () => {
                    if (!!onRemoveAllRows) {
                      await onRemoveAllRows();
                      removeRows();
                      return;
                    }

                    removeRows();
                  }}
                  className="text-xs"
                >
                  <FaTrash /> All
                </Button>
              )}
            </div>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center bg-slate-300 animate-pulse  "
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
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
          {canAddData && (
            <TableFooter>
              <TableRow>
                <TableHead
                  colSpan={table.getCenterLeafColumns().length}
                  align="right"
                >
                  <FooterCell key={data.length} table={table} />
                </TableHead>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
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
      </div> */}
      <div className="flex items-center justify-end md:flex-col md:gap-y-2 space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <CustomPagination
          currentPage={currentPage}
          onPageChange={(e) => (!!onPageChange ? onPageChange(e) : null)}
          pageSize={pageSize}
          siblingsCount={1}
          totalCount={totalData}
        />
      </div>
    </div>
  );
}
