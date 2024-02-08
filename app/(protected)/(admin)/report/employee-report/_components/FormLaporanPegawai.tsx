"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { CustomTextfield } from "@/components/ui/custom-textfield-mui";
import { Label } from "@/components/ui/label";
import { GetSessionData } from "@/lib/actions";
import { OptionsType } from "@/types/forms";
import { Autocomplete, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

const FormLaporanPegawai = ({
  workGroupList,
  workUnitList,
}: {
  workGroupList: OptionsType[];
  workUnitList: OptionsType[];
}) => {
  const { setFieldValue, handleSubmit, values, errors } = useFormik({
    initialValues: {
      workGroup: "",
      workUnit: "",
    },
    onSubmit: async (val) => {
      const authData = await GetSessionData();
      const res = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData?.user?.jwt}`,
        },
        body: JSON.stringify({
          workGroup: (val.workGroup as any).name,
          workUnit: (val.workUnit as any).name,
        }),
      });
      toast.promise(res, {
        loading: "Creating your file...",
        success: async (data) => {
          const result = await data.arrayBuffer();
          const newBlob = new Blob([result]);
          const url = URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `laporan ${(val.workGroup as any).name}-${
            (val.workUnit as any).name
          }-${dayjs(new Date()).format("DD MMMM YYYY - HH:mm:ss")}.pdf`;
          link.target = "_blank";
          link.click();
          URL.revokeObjectURL(url);
          return "File is served!";
        },
        error: "Something went wrong",
      });
    },
  });

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-wrap gap-x-5"
      >
        <div className="grow">
          <Label htmlFor="kelompok-pekerjaan-textfield">
            Kelompok Pekerjaan
          </Label>
          <Autocomplete
            size="small"
            options={workGroupList}
            disableCloseOnSelect
            getOptionLabel={(opt) => opt.name}
            isOptionEqualToValue={(e, v) => e.name === v.name}
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
                  {option.name}
                </li>
              );
            }}
            onChange={(e, v) => {
              setFieldValue("workGroup", v);
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
            renderInput={(params) => (
              <CustomTextfield {...params} placeholder="Provinsi" />
            )}
          />
        </div>
        <div className="grow">
          <Label htmlFor="unit-kerja-textfield">Unit Kerja</Label>
          <Autocomplete
            size="small"
            options={workUnitList}
            disableCloseOnSelect
            getOptionLabel={(opt) => opt.name}
            isOptionEqualToValue={(e, v) => e.name === v.name}
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
                  {option.name}
                </li>
              );
            }}
            onChange={(e, v) => {
              setFieldValue("workUnit", v);
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
            renderInput={(params) => (
              <CustomTextfield {...params} placeholder="Provinsi" />
            )}
          />
        </div>
        <Button className="mt-6" type="submit">
          Cetak
        </Button>
      </form>
    </Container>
  );
};

export default FormLaporanPegawai;
