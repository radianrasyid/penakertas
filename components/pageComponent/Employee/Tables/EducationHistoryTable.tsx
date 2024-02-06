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
import { DELETEEducation, POSTAddEducation } from "@/services/user/api";
import { OptionsType } from "@/types/forms";
import { Data } from "@/types/general";
import { Autocomplete, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

export type EducationHistoryTable = {
  id: string;
  no: number;
  educationPlace: string;
  educationLevel: string;
  address: string;
  major: string;
  graduationYear: string | Date;
  aksi: null | string;
};

const EducationHistoryTable = ({
  educationLevelList,
  data,
}: {
  educationLevelList: OptionsType[];
  data: {
    address: string;
    createdAt: string;
    educationLevel: string;
    educationPlace: string;
    graduationYear: string;
    id: string;
    major: string;
    personRelatedId: string;
    updatedAt: string;
  }[];
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<EducationHistoryTable[]>(
    data.map((i, index) => {
      return {
        address: i.address,
        aksi: "",
        educationLevel: i.educationLevel,
        educationPlace: i.educationPlace,
        graduationYear: new Date(i.graduationYear),
        id: i.id,
        major: i.major,
        no: index + 1,
      };
    })
  );
  const [maritalStatusOption, setMaritalStatusOption] = useState<string[]>([]);
  const [editedRows, setEditedRows] = useState<Data>({});
  const [totalData, setTotalData] = useState<number>(rows.length);
  const [pageTick, setPageTick] = useState<number>(0);
  const router = useRouter();

  const columns: ColumnDef<EducationHistoryTable>[] = [
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
      accessorKey: "educationPlace",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Instansi
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
              onBlur={onBlur}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              value={value}
            />
          ) : (
            <span>{value}</span>
          );
        }

        return <span>{value}</span>;
      },
    },
    {
      accessorKey: "educationLevel",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Pendidikan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue: string = getValue() as string;
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<any | OptionsType>(initialValue);

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
              options={[...educationLevelList].map((i) => i.name)}
              onBlur={onBlur}
              disabled={[...educationLevelList].length == 0}
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
      accessorKey: "address",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alamat
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
      accessorKey: "major",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jurusan
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
      accessorKey: "graduationYear",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tahun Lulus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row, column, table }) => {
        const initialValue = getValue();
        const tableMeta = table.options.meta;
        const [value, setValue] = useState<Date>(
          new Date(initialValue as unknown as string)
        );

        const onBlur = () => {
          tableMeta?.updateData(row.index, column.id, value);
        };
        useEffect(() => {
          setValue(initialValue as Date);
        }, [initialValue]);

        if (tableMeta?.editedRow) {
          return tableMeta.editedRow[row.id] ? (
            <InputCustom
              className="w-full"
              inputClassname="w-full text-center"
              id="period-search-textfield"
              value={
                !!value
                  ? dayjs(new Date(value)).format("DD MMMM YYYY")
                  : dayjs(new Date()).format("DD MMMM YYYY")
              }
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
                      toYear={new Date().getFullYear()}
                      fromYear={1900}
                      captionLayout="dropdown"
                      className="rounded-lg"
                      onDayBlur={onBlur}
                      defaultMonth={!!value ? new Date(value) : new Date()}
                      mode="single"
                      selected={!!value ? new Date(value) : new Date()}
                      onSelect={(e, d) => {
                        setValue(d);
                        tableMeta.updateData(row.index, column.id, d);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              }
            />
          ) : (
            <span>
              {dayjs(!!value ? new Date(value) : new Date()).format(
                "DD MMMM YYYY"
              )}
            </span>
          );
        }

        return (
          <span>
            {dayjs(!!value ? new Date(value) : new Date()).format(
              "DD MMMM YYYY"
            )}
          </span>
        );
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
        <span
          className="text-lg font-medium"
          onClick={() => console.log(educationLevelList)}
        >
          Data Riwayat Pendidikan
        </span>
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
          address: "",
          aksi: "",
          educationLevel: "",
          educationPlace: "",
          graduationYear: new Date(),
          id: `${Math.floor(Math.random() * 1000)}`,
          major: "",
          no: 1,
        }}
        onFinishAddData={async () => {
          const fetching = POSTAddEducation({ educationData: rows });
          toast.promise(fetching, {
            loading: "Adding education data",
            success: "education data successfully added",
            error: "Something went wrong",
          });
        }}
        onDeleteData={async (e) => {
          const fetching = DELETEEducation(e?.id as string);
          toast.promise(fetching, {
            loading: "Deleting education data...",
            success: "education data successfully deleted",
            error: "Something went wrong",
          });
        }}
      />
    </div>
  );
};

export default EducationHistoryTable;
