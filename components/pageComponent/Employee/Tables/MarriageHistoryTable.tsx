"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import action from "@/app/action";
import { DataTableServerside } from "@/components/table/DataTable";
import { EditCell } from "@/components/table/EditCell";
import { Button } from "@/components/ui/button";
import { Checkbox as CheckboxShad } from "@/components/ui/checkbox";
import { CustomTextfield } from "@/components/ui/custom-textfield-mui";
import { Input } from "@/components/ui/input";
import { DELETEPartner, POSTAddPartner } from "@/services/user/api";
import { OptionsType } from "@/types/forms";
import { Data } from "@/types/general";
import { Autocomplete, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

export type MarriageHistoryTable = {
  id: string;
  no: number;
  fullname: string;
  status: string;
  profession: string;
  phoneNumber: string;
  aksi: null | string;
};

const MarriageHistoryTable = ({
  maritalStatus,
  data,
}: {
  maritalStatus: OptionsType[];
  data: {
    bpjsOfEmployment?: { link: string; mimetype: string };
    bpjsOfHealth?: { link: string; mimetype: string };
    createdAt: string;
    fullname: string;
    id: string;
    status: string;
    identityCard: { link: string; mimetype: string };
    marriageCertificate: { link: string; mimetype: string };
    personRelatedId: string;
    phoneNumber: string;
    photograph?: { link: string; mimetype: string };
    profession: string;
    updatedAt: string;
  }[];
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<MarriageHistoryTable[]>(
    data.map((i, index) => {
      return {
        fullname: i.fullname,
        aksi: "",
        id: i.id,
        no: index + 1,
        phoneNumber: i.phoneNumber,
        profession: i.profession,
        status: i.status,
      };
    })
  );
  const [maritalStatusOption, setMaritalStatusOption] = useState<string[]>(
    maritalStatus.map((e) => e.name)
  );
  const [editedRows, setEditedRows] = useState<Data>({});
  const [totalData, setTotalData] = useState<number>(rows.length);
  const [pageTick, setPageTick] = useState<number>(0);
  const router = useRouter();

  const columns: ColumnDef<MarriageHistoryTable>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <CheckboxShad
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <CheckboxShad
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
    },
    {
      accessorKey: "fullname",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Lengkap
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<string>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onBlur={onBlur}
            />
          ) : (
            <span>{value}</span>
          );
        }

        return <span>{value}</span>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<string>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <Autocomplete
              size="small"
              options={maritalStatusOption}
              onBlur={onBlur}
              disabled={maritalStatusOption.length == 0}
              value={value}
              disableCloseOnSelect
              getOptionLabel={(opt) => opt}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={<MdCheckBoxOutlineBlank />}
                      checkedIcon={<MdCheckBox />}
                      style={{ marginRight: 2 }}
                      checked={selected}
                      sx={{
                        fontFamily: "Poppins",
                      }}
                    />
                    {option}
                  </li>
                );
              }}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                    fontSize: "12px",
                  },
                },
              }}
              fullWidth
              onChange={(e, v) => {
                setValue(v as string);
              }}
              renderInput={(params) => (
                <CustomTextfield {...params} placeholder="Kelompok pekerjaan" />
              )}
            />
          ) : (
            <span>{value}</span>
          );
        }

        return <span>{value}</span>;
      },
    },
    {
      accessorKey: "profession",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Pekerjaan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<string>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onBlur={onBlur}
            />
          ) : (
            <span>{value}</span>
          );
        }

        return <span>{value}</span>;
      },
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nomor Telepon
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<string>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onBlur={onBlur}
            />
          ) : (
            <span>{value}</span>
          );
        }

        return <span>{value}</span>;
      },
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row, table }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => {
    //               router.push(`/data-master/province/edit/${payment.id}`);
    //             }}
    //           >
    //             Ubah
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onClick={async () => {
    //               const fetching = DELETEProvince({
    //                 id: payment.id,
    //               });
    //               toast.promise(fetching, {
    //                 loading: "Deleting data...",
    //                 success: (data) => {
    //                   setPageTick(pageTick + 1);
    //                   return (data as any).message;
    //                 },
    //                 error: (data) => data.message,
    //               });
    //             }}
    //             className="hover:bg-red-500"
    //           >
    //             Hapus
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
    {
      id: "edit",
      cell: EditCell,
    },
  ];

  return (
    <div className="bg-white p-4 drop-shadow-2xl rounded-xl">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Data Riwayat Pernikahan</span>
      </div>
      <DataTableServerside
        isServerSearch={true}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        key={pageSize + currentPage + rows.length}
        columns={columns}
        canAddData
        loading={loading}
        data={rows}
        editedRows={editedRows}
        setEditedRows={setEditedRows}
        currentPage={currentPage}
        dataSetter={setRows}
        pageSize={pageSize}
        totalData={totalData}
        totalPage={totalPage}
        onPageSizeChange={(e) => setPageSize(e)}
        onPageChange={(e) => setCurrentPage(e)}
        initialData={{
          id: `${Math.floor(Math.random() * 1000)}`,
          aksi: "",
          fullname: "",
          no: 1,
          phoneNumber: "",
          profession: "",
          status: "",
        }}
        onFinishAddData={async () => {
          const fetching = POSTAddPartner({ partnertData: rows });
          toast.promise(fetching, {
            loading: "Uploading partner data",
            success: async (data) => {
              console.log(data);
              await action();
              return "Upload user data success";
            },
            error: "Upload partner data failed",
          });
        }}
        onDeleteData={(e) => {
          const fetching = DELETEPartner(e?.id as string);
          toast.promise(fetching, {
            loading: "Deleting partner data...",
            success: async (data) => {
              console.log(data);
              return "Delete partner data success";
            },
            error: "Delete partner data failed",
          });
        }}
      />
    </div>
  );
};

export default MarriageHistoryTable;
