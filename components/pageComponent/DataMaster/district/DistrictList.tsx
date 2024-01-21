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
import {
  DELETEDistrict,
  GETListDistrictPaginate,
} from "@/services/geolocation/api";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

export type Payment = {
  id: string;
  no: number;
  district: string;
  aksi: null | string;
};

const DistrictMasterPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [pageTick, setPageTick] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<Payment[]>([]);
  const [totalData, setTotalData] = useState<number>(rows.length);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(5);
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
      accessorKey: "district",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            District
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("district")}</div>,
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
                onClick={() =>
                  router.push(`/data-master/districts/edit/${payment.id}`)
                }
              >
                Ubah
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  const fetching = DELETEDistrict({
                    id: payment.id,
                  });
                  toast.promise(fetching, {
                    loading: "Deleting data...",
                    success: (data) => {
                      setPageTick(pageTick + 1);
                      return (data as any).message;
                    },
                    error: (data) => data.message,
                  });
                }}
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

  const getData = async () => {
    setLoading(true);
    const fetching = await GETListDistrictPaginate({
      pageNumber: currentPage,
      pageSize: pageSize,
      searchQuery: searchQuery,
    });

    setRows(
      fetching.data.map((item: any, index: number) => {
        return {
          id: `${item.id}`,
          no: index + 1,
          district: item.name,
          aksi: null,
        };
      })
    );
    setTotalData(fetching.totalData);
    setLoading(false);
  };

  useMemo(() => {
    getData();
  }, [currentPage, pageSize, searchQuery, pageTick]);
  return (
    <div className="bg-white p-4 drop-shadow-2xl rounded-xl">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Data Kabupaten/Kota</span>

        <Button
          variant={"default"}
          className="flex gap-2 items-center"
          onClick={() => router.push("/data-master/districts/create")}
        >
          <FaPlus /> Kota
        </Button>
      </div>
      <DataTableServerside
        key={pageSize + currentPage}
        isServerSearch={true}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        columns={columns}
        data={rows}
        currentPage={currentPage}
        loading={loading}
        pageSize={pageSize}
        totalData={totalData}
        totalPage={totalPage}
        onPageSizeChange={(e) => setPageSize(e)}
        onPageChange={(e) => setCurrentPage(e)}
      />
    </div>
  );
};

export default DistrictMasterPage;
