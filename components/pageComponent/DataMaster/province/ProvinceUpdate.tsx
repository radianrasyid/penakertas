"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GETProvinceById, PUTEDitProvince } from "@/services/geolocation/api";
import { useFormik } from "formik";
import { useMemo } from "react";
import { toast } from "sonner";

const ProvinceEditPage = ({ id }: { id: string }) => {
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      provinceName: "",
    },
    onSubmit: async (val) => {
      const fetching = PUTEDitProvince({
        data: {
          name: val.provinceName,
        },
        id: id,
        additionalUrl: "",
      });
      toast.promise(fetching, {
        loading: "Editing province...",
        success: (data) => {
          return data.message;
        },
        error: () => {
          return "Something went wrong";
        },
      });
    },
  });

  const getData = async () => {
    const fetching = await GETProvinceById({
      id: id,
      additionalUrl: "",
    });

    setFieldValue("provinceName", fetching.data.name);
  };

  useMemo(() => {
    getData();
  }, []);
  return (
    <div className="bg-white rounded-lg px-4 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Label onClick={() => console.log(values)}>Nama Provinsi</Label>
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

export default ProvinceEditPage;
