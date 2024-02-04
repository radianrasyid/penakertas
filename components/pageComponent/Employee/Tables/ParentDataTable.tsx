"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { DataTableServerside } from "@/components/table/DataTable";
import { EditCell } from "@/components/table/EditCell";
import { Button } from "@/components/ui/button";
import { Checkbox as CheckboxShad } from "@/components/ui/checkbox";
import { CustomTextfield } from "@/components/ui/custom-textfield-mui";
import { Input } from "@/components/ui/input";
import { DELETEParent, POSTAddParent } from "@/services/user/api";
import { OptionsType } from "@/types/forms";
import { Data } from "@/types/general";
import { Autocomplete, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

export type ParentDataTable = {
  id: string;
  no: number;
  fullname: string;
  status: string;
  profession: string;
  aksi: null | string;
};

const ParentDataTable = ({
  parentStatusList,
  data,
}: {
  parentStatusList: OptionsType[];
  data: {
    createdAt: string;
    fullname: string;
    id: string;
    personRelatedId: string;
    profession: string;
    status: string;
    updatedAt: string;
  }[];
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<ParentDataTable[]>(
    data.map((i, index) => {
      return {
        aksi: "",
        fullname: i.fullname,
        id: i.id,
        no: index + 1,
        profession: i.profession,
        status: i.status,
      };
    })
  );
  const [maritalStatusOption, setMaritalStatusOption] = useState<string[]>([]);
  const [editedRows, setEditedRows] = useState<Data>({});
  const [totalData, setTotalData] = useState<number>(rows.length);
  const [pageTick, setPageTick] = useState<number>(0);
  const router = useRouter();

  const columns: ColumnDef<ParentDataTable>[] = [
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
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
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
              options={[...parentStatusList].map((i) => i.name)}
              onBlur={onBlur}
              disabled={[...parentStatusList].length == 0}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profesi
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
      id: "edit",
      cell: EditCell,
    },
  ];

  return (
    <div className="bg-white p-4 drop-shadow-2xl rounded-xl">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Data Orang Tua</span>

        {/* <Button
          variant={"default"}
          className="flex gap-2 items-center"
          onClick={async () => {
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
          // disabled={isSubmitDisabled}
          type="button"
        >
          <FaPlus /> Data
        </Button> */}
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
          aksi: "",
          id: `${Math.floor(Math.random() * 1000)}`,
          profession: "",
          fullname: "",
          status: "",
          no: 1,
        }}
        onFinishAddData={() => {
          const fetching = POSTAddParent({
            parentData: rows,
          });

          toast.promise(fetching, {
            loading: "Uploading parent data...",
            success: "Upload parent data success",
            error: "Something went wrong",
          });
        }}
        onDeleteData={(e) => {
          console.log(e);
          const fetching = DELETEParent(e?.id as string);
          toast.promise(fetching, {
            loading: "Deleting child data...",
            success: "Child data deleted successfully",
            error: "Something went wrong",
          });
        }}
      />
    </div>
  );
};

export default ParentDataTable;
