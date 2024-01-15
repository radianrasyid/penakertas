"use client";
import { Button } from "@/components/ui/button";
import { CustomTextfield } from "@/components/ui/custom-textfield-mui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GETSubdistrictList, POSTCreateWard } from "@/services/geolocation/api";
import { Autocomplete, Checkbox } from "@mui/material";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

const WardCreate = () => {
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      districtName: "",
      province: {
        name: "",
        id: "",
      },
    },
    onSubmit: async (val) => {
      const fetching = POSTCreateWard({
        wardName: val.districtName,
        subdistrict: {
          id: val.province.id,
          name: val.province.name,
        },
      });
      toast.promise(fetching, {
        loading: "Saving new district...",
        success: (data) => {
          return data.message;
        },
        error: () => {
          return "Something went wrong";
        },
      });
    },
  });
  const [provinceList, setProvinceList] = useState<
    { id: string; name: string; value: string }[]
  >([]);
  const getData = async () => {
    const res = await GETSubdistrictList({ district: "" });
    console.log("ini response", res);
    return setProvinceList(res.data);
  };
  useMemo(() => {
    getData();
  }, []);
  return (
    <div className="bg-white p-4 drop-shadow-2xl rounded-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex gap-2 flex-wrap">
          <div className="flex-1 md:basis-1/2">
            <Label onClick={() => console.log(values)}>Nama Kelurahan</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                name="districtName"
                value={values.districtName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex-1 md:basis-1/2">
            <Label>Kecamatan</Label>
            <div className="flex gap-2">
              <Autocomplete
                size="small"
                options={provinceList}
                disableCloseOnSelect
                getOptionLabel={(opt) => opt.name}
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
                  setFieldValue("province", v);
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
                  <CustomTextfield {...params} placeholder="Kecamatan" />
                )}
              />
              <Button type="submit">Save</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WardCreate;
