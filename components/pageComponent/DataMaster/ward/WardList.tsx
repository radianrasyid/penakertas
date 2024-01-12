"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTableServerside } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GETListWardPaginate } from "@/services/geolocation/api";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const data: Payment[] = [...Array(10)].map((item, index) => {
  return {
    id: `m5gr84i9-${index + 4}`,
    no: index + 1,
    ward: "Kepulauan Riau",
    aksi: null,
  };
});

export type Payment = {
  id: string;
  no: number;
  ward: string;
  aksi: null | string;
};

const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div className="capitalize">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "ward",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kelurahan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("ward")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.ward)}
            >
              Ubah
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.ward)}
              className="hover:bg-red-500"
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const WardMasterPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(data.length);
  const [rows, setRows] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(5);

  const getData = async () => {
    setLoading(true);
    const fetching = await GETListWardPaginate({
      pageNumber: currentPage,
      pageSize: pageSize,
      searchQuery: searchQuery,
    });

    setRows(
      fetching.data.map((item: any, index: number) => {
        return {
          id: `${item.uid}`,
          no: index + 1,
          ward: item.name,
          aksi: null,
        };
      })
    );
    setTotalData(fetching.totalData);
    setTotalPage(fetching.totalPages);
    setLoading(false);
  };

  useMemo(() => {
    getData();
  }, [currentPage, pageSize, searchQuery]);

  return (
    <div className="">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Data Kelurahan</span>

        <Button
          variant={"default"}
          className="flex gap-2 items-center"
          onClick={() => router.push("/data-master/wards/create")}
        >
          <FaPlus /> Kelurahan
        </Button>
      </div>
      <DataTableServerside
        key={pageSize + currentPage}
        columns={columns}
        data={rows}
        loading={loading}
        currentPage={currentPage}
        pageSize={pageSize}
        totalData={totalData}
        totalPage={totalPage}
        onPageSizeChange={(e) => setPageSize(e)}
        onPageChange={(e) => setCurrentPage(e)}
      />
    </div>
  );
};

export default WardMasterPage;
