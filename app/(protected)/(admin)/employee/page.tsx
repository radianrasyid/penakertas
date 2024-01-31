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
import { Input } from "@/components/ui/input";
import { GETEmployeePaginated } from "@/services/user/api";
import { UserListPaginatedResponseType } from "@/types/general";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const data: Payment[] = [...Array(10)].map((item, index) => {
  return {
    id: `m5gr84i9-${index + 4}`,
    no: index + 1,
    nrpt: "test",
    address: "Jalan Adi Sucipto",
    email: "radian.rasyid@gmail.com",
    fullname: "Muhammad Radian Rasyid",
    phoneNumber: "08123789123",
  };
});

export type Payment = {
  id: string;
  no: number;
  nrpt: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  email: string;
};

const ProvinceMasterPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(data.length);
  const [rows, setRows] = useState<Payment[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
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
      cell: ({ row, table }) => (
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
      accessorKey: "nrpt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NRPT/PIN
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row: { index }, column: { id }, getValue, table }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);
        const onBlur = () => table.options.meta?.updateData(index, id, value);

        useMemo(() => {
          setValue(initialValue);
        }, [initialValue]);

        return (
          <Input
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        );
      },
    },
    {
      accessorKey: "fullname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Lengkap
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("fullname")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Alamat
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Telp
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
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
                onClick={() => router.push(`/employee/detail/${payment.id}`)}
              >
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.fullname)}
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
    setLoadingTable(true);
    try {
      const fetching = (await GETEmployeePaginated({
        pageNumber: currentPage,
        pageSize: pageSize,
        searchQuery: searchQuery,
      })) as UserListPaginatedResponseType;

      const process = fetching.data.map((e, index) => {
        return {
          id: `${e.id}`,
          no: index + 1,
          nrpt: e.employmentId,
          address: e.homeAddress,
          email: e.email,
          fullname: `${e.firstName} ${e.lastName}`,
          phoneNumber: e.phoneNumber,
        };
      });

      setRows(process);
    } catch (error) {
    } finally {
      setLoadingTable(false);
    }
  };

  useMemo(() => {
    getData();
  }, []);
  return (
    <div className="bg-white p-4 drop-shadow-2xl rounded-xl">
      <div className="flex justify-between">
        <span className="text-lg font-semibold">Data Pegawai</span>
        <Button
          variant={"default"}
          className="flex gap-2 items-center"
          onClick={() => router.push("/employee/add-employee")}
        >
          <FaPlus /> Pegawai
        </Button>
      </div>
      <DataTableServerside
        key={pageSize + currentPage}
        columns={columns}
        data={rows}
        currentPage={currentPage}
        pageSize={pageSize}
        dataSetter={setRows}
        totalData={totalData}
        totalPage={totalPage}
        onPageSizeChange={(e) => setPageSize(e)}
        onPageChange={(e) => setCurrentPage(e)}
      />
    </div>
  );
};

export default ProvinceMasterPage;
