import { Autocomplete, Checkbox } from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CustomTextfield } from "../ui/custom-textfield-mui";
import { Input } from "../ui/input";
import { InputCustom } from "../ui/input-with-icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function TableCell<TData, TValue>({
  getValue,
  row,
  column,
  table,
}: CellContext<TData, TValue>) {
  const initialValue = getValue();

  const [value, setValue] = useState<any>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () =>
    table.options.meta?.updateData(row.index, column.id, value);

  if (table.options.meta?.type) {
    switch (table.options.meta.type) {
      case "date":
        return (
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
                      setValue(d);
                    }}
                    onDayBlur={onBlur}
                  />
                </PopoverContent>
              </Popover>
            }
          />
        );
      case "text":
        return (
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type={table.options.meta.type}
            onBlur={onBlur}
          />
        );
      case "number":
        return (
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type={table.options.meta.type}
            onBlur={onBlur}
          />
        );
      case "options":
        return (
          <Autocomplete
            size="small"
            options={table.options.meta.options as any[]}
            onBlur={onBlur}
            disabled={table.options.meta.options?.length == 0}
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
        );
    }
  }
}

export default TableCell;
