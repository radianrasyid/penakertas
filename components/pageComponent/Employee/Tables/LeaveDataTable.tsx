"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon } from "lucide-react";

import { DataTableServerside } from "@/components/table/DataTable";
import { EditCell } from "@/components/table/EditCell";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox as CheckboxShad } from "@/components/ui/checkbox";
import { CustomTextfield } from "@/components/ui/custom-textfield-mui";
import { Input } from "@/components/ui/input";
import { InputCustom } from "@/components/ui/input-with-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DELETELeave, POSTAddLeave } from "@/services/user/api";
import { OptionsType } from "@/types/forms";
import { Data } from "@/types/general";
import { Autocomplete, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

export type LeaveDataTable = {
  id: string;
  no: number;
  skNumber: string;
  skDate: string | Date;
  startDate: string | Date;
  leaveType: string;
  endDate: string | Date;
  aksi: null | string;
};

interface LeaveTypeOption extends OptionsType {
  description: string;
}

const LeaveDataTable = ({
  data,
  leaveTypeList,
}: {
  leaveTypeList: LeaveTypeOption[];
  data: {
    createdAt: string;
    description?: string;
    endDate: string;
    id: string;
    leaveType: string;
    personRelatedId: string;
    skDate: string;
    skNumber: string;
    startDate: string;
    updatedAt: string;
  }[];
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<LeaveDataTable[]>(
    data.map((i, index) => {
      return {
        aksi: "",
        endDate: i.endDate,
        id: i.id,
        leaveType: i.leaveType,
        no: index + 1,
        skDate: i.skDate,
        skNumber: i.skNumber,
        startDate: i.startDate,
      };
    })
  );
  const [editedRows, setEditedRows] = useState<Data>({});
  const [totalData, setTotalData] = useState<number>(rows.length);
  const [pageTick, setPageTick] = useState<number>(0);
  const router = useRouter();

  const columns: ColumnDef<LeaveDataTable>[] = [
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
      accessorKey: "leaveType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jenis Cuti
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
              options={[...leaveTypeList].map((i) => i.name)}
              onBlur={onBlur}
              disabled={[...leaveTypeList].length == 0}
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
      accessorKey: "skNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Nomor SK
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

        return <span>{value.toString()}</span>;
      },
    },
    {
      accessorKey: "skDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal SK
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<any>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <InputCustom
              className="w-full"
              inputClassname="w-full text-center"
              id="period-search-textfield"
              value={dayjs(new Date(value)).format("DD MMMM YYYY")}
              name="periode"
              onClick={() =>
                document.getElementById("period-search-trigger")?.click()
              }
              // onChange={handleChange}
              suffixIcon={
                <Popover>
                  <PopoverTrigger asChild id="period-search-trigger">
                    <Button
                      size={"icon"}
                      type="button"
                      variant={"secondary"}
                      className="bg-transparent"
                    >
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-max">
                    <Calendar
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown"
                      className="rounded-lg"
                      mode="single"
                      selected={new Date(value)}
                      onSelect={(e, d) => {
                        tableMeta.updateData(row.index, column.id, d);
                        setValue(d);
                      }}
                      onDayBlur={onBlur}
                    />
                  </PopoverContent>
                </Popover>
              }
            />
          ) : (
            <span>{dayjs(new Date(value)).format("DD MMMM YYYY")}</span>
          );
        }

        return <span>{value.toString()}</span>;
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Mulai
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<any>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <InputCustom
              className="w-full"
              inputClassname="w-full text-center"
              id="period-search-textfield"
              value={dayjs(new Date(value)).format("DD MMMM YYYY")}
              name="periode"
              onClick={() =>
                document.getElementById("period-search-trigger")?.click()
              }
              // onChange={handleChange}
              suffixIcon={
                <Popover>
                  <PopoverTrigger asChild id="period-search-trigger">
                    <Button
                      size={"icon"}
                      type="button"
                      variant={"secondary"}
                      className="bg-transparent"
                    >
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-max">
                    <Calendar
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown"
                      className="rounded-lg"
                      mode="single"
                      selected={new Date(value)}
                      onSelect={(e, d) => {
                        tableMeta.updateData(row.index, column.id, d);
                        setValue(d);
                      }}
                      onDayBlur={onBlur}
                    />
                  </PopoverContent>
                </Popover>
              }
            />
          ) : (
            <span>{dayjs(new Date(value)).format("DD MMMM YYYY")}</span>
          );
        }

        return <span>{value.toString()}</span>;
      },
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Akhir
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<any>(initialValue);

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <InputCustom
              className="w-full"
              inputClassname="w-full text-center"
              id="period-search-textfield"
              value={dayjs(new Date(value)).format("DD MMMM YYYY")}
              name="periode"
              onClick={() =>
                document.getElementById("period-search-trigger")?.click()
              }
              // onChange={handleChange}
              suffixIcon={
                <Popover>
                  <PopoverTrigger asChild id="period-search-trigger">
                    <Button
                      size={"icon"}
                      type="button"
                      variant={"secondary"}
                      className="bg-transparent"
                    >
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-max">
                    <Calendar
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      captionLayout="dropdown"
                      className="rounded-lg"
                      mode="single"
                      selected={new Date(value)}
                      onSelect={(e, d) => {
                        tableMeta.updateData(row.index, column.id, d);
                        setValue(d);
                      }}
                      onDayBlur={onBlur}
                    />
                  </PopoverContent>
                </Popover>
              }
            />
          ) : (
            <span>{dayjs(new Date(value)).format("DD MMMM YYYY")}</span>
          );
        }

        return <span>{value.toString()}</span>;
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
        <span className="text-lg font-medium">Data Cuti</span>

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
          skNumber: "",
          skDate: "",
          endDate: "",
          leaveType: "",
          startDate: "",
          no: 1,
        }}
        onFinishAddData={() => {
          const fetching = POSTAddLeave({
            leaveData: rows,
          });

          toast.promise(fetching, {
            loading: "Uploading leave data...",
            success: "Leave data uploaded successfully",
            error: "Something went wrong",
          });
        }}
        onDeleteData={(e) => {
          console.log(e);
          const fetching = DELETELeave(e?.id as string);
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

export default LeaveDataTable;
