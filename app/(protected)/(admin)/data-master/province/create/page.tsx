"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POSTCreateProvince } from "@/services/geolocation/api";
import { useFormik } from "formik";
import { toast } from "sonner";

const ProvinceCreate = () => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      provinceName: "",
    },
    onSubmit: async (val) => {
      const fetching = POSTCreateProvince({
        provinceName: val.provinceName,
      });
      toast.promise(fetching, {
        loading: "Saving new province...",
        success: (data) => {
          return data.message;
        },
        error: () => {
          return "Something went wrong";
        },
      });
    },
  });
  return (
    <div className="bg-white p-4 drop-shadow-2xl rounded-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Label>Nama Provinsi</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            name="provinceName"
            value={values.provinceName}
            onChange={handleChange}
            className="w-full"
          />
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default ProvinceCreate;
