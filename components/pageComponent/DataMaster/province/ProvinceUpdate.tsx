"use client";
export const dynamic = "force-dynamic";
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
    });

    setFieldValue("provinceName", fetching.data.name);
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

export default ProvinceEditPage;
