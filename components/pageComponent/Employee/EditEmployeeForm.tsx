"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CustomTextfield } from "@/components/ui/custom-textfield-mui";
import { Input } from "@/components/ui/input";
import { InputCustom } from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  GETDistrictList,
  GETSubdistrictList,
  GETWardList,
} from "@/services/geolocation/api";
import { EditEmployeeType, OptionsType } from "@/types/forms";
import { Data, UserDetailResponseType } from "@/types/general";
import { Autocomplete, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

const EditEmployeeForm = ({
  provinceList = [],
  educationLevelList = [],
  genderList = [],
  maritalStatusList = [],
  religionList = [],
  workGroupList = [],
  workPartList = [],
  workUnitList = [],
  userData,
}: {
  provinceList: OptionsType[];
  workGroupList: OptionsType[];
  workUnitList: OptionsType[];
  workPartList: OptionsType[];
  religionList: OptionsType[];
  genderList: OptionsType[];
  educationLevelList: OptionsType[];
  maritalStatusList: OptionsType[];
  userData: UserDetailResponseType;
}) => {
  const [provinceOptions, setProvinceOptions] =
    useState<{ id: string; name: string; value: string }[]>(provinceList);
  const [districtList, setDistrictList] = useState<
    { id: string; name: string; value: string }[]
  >([]);
  const [subdistrictList, setSubdistrictList] = useState<OptionsType[]>([]);
  const [wardList, setWardList] = useState<OptionsType[]>([]);

  const { setFieldValue, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      backTitle: undefined,
      birthPlace: undefined,
      bpjsOfEmployment: undefined,
      bpjsOfHealth: undefined,
      childs: undefined,
      cityDistrict: undefined,
      createdAt: undefined,
      dateOfBirth: undefined,
      decisionLetterNumber: undefined,
      email: undefined,
      employmentId: undefined,
      familyCertificateNumber: undefined,
      firstName: undefined,
      frontTitle: undefined,
      gender: undefined,
      homeAddress: undefined,
      identityNumber: undefined,
      jobDescription: undefined,
      lastName: undefined,
      latestEducationLevel: undefined,
      leaves: undefined,
      maritalStatus: undefined,
      neighborhood: undefined,
      neighborhoodHead: undefined,
      npwpNumber: undefined,
      phoneNumber: undefined,
      placementLocation: undefined,
      Province: undefined,
      relationships: undefined,
      religion: undefined,
      startingYear: undefined,
      subdistrict: undefined,
      telephone: undefined,
      ward: undefined,
      workGroup: undefined,
      workPart: undefined,
      workUnit: undefined,
      bpjsOfEmploymentFile: undefined,
      bpjsOfHealthFile: undefined,
      decisionLetter: undefined,
      familyCertificate: undefined,
      identity: undefined,
      npwp: undefined,
      photograph: undefined,
    } as EditEmployeeType,
    validateOnChange: false,
    onSubmit: async (values) => {},
  });

  const getDistrict = async () => {
    if (values.Province === undefined) return null;

    const fetching = GETDistrictList({
      province: !!values.Province?.id
        ? (provinceList.find((e) => e.name === values.Province?.name)
            ?.id as string)
        : "",
    });
    toast.promise(fetching, {
      loading: "Memuat kabupaten/kota...",
      success: (data) => {
        setDistrictList(data.data);
        return "Memuat kabupaten/kota berhasil";
      },
      error: () => {
        return "Terjadi kesalahan dalam memuat kabupaten/kota";
      },
    });
  };

  const getSubdistrict = async () => {
    if (values.cityDistrict === undefined) return null;

    const fetching = GETSubdistrictList({
      district: !!values.cityDistrict?.id
        ? (districtList.find((e) => e.name === values.cityDistrict?.name)
            ?.id as string)
        : "",
    });
    toast.promise(fetching, {
      loading: "Memuat kecamatan...",
      success: (data) => {
        setSubdistrictList(data.data);
        return "Memuat kecamatan berhasil";
      },
      error: () => {
        return "Terjadi kesalahan dalam memuat kecamatan";
      },
    });
  };

  const getWard = async () => {
    if (values.subdistrict === undefined) return null;

    const fetching = GETWardList({
      subdistrict: !!values.subdistrict?.id
        ? (subdistrictList.find((e) => e.name === values.subdistrict?.name)
            ?.id as string)
        : "",
    });
    toast.promise(fetching, {
      loading: "Memuat kelurahan...",
      success: (data) => {
        setWardList(data.data);
        return "Memuat kelurahan berhasil";
      },
      error: () => {
        return "Terjadi kesalahan dalam memuat kelurahan";
      },
    });
  };

  const preprocessData = () => {
    const currentData = userData.data;
    Object.keys(currentData).map((i) => {
      let nowData = (currentData as Data)[i];
      if (nowData !== null) {
        console.log("ini i", i);
        switch (true) {
          case [
            "Province",
            "cityDistrict",
            "subdistrict",
            "ward",
            "religion",
            "gender",
            "workGroup",
            "workPart",
            "workUnit",
            "latestEducationLevel",
            "maritalStatus",
          ].some((e) => e === i):
            setFieldValue(i, {
              name: (currentData as Data)[i],
              value: ((currentData as Data)[i] as string).toUpperCase(),
            });
            break;
          default:
            setFieldValue(i, (currentData as Data)[i]);
            break;
        }
      }
    });
  };

  useMemo(() => {
    getDistrict();
  }, [values.Province]);

  useMemo(() => {
    getSubdistrict();
  }, [values.cityDistrict]);

  useMemo(() => {
    getWard();
  }, [values.subdistrict]);

  useEffect(() => {
    preprocessData();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex justify-between mb-5">
          <span className="text-lg font-semibold">Edit Pegawai</span>
        </div>

        <div className="bg-white drop-shadow-lg rounded-xl mb-2">
          <div className="flex justify-between w-full bg-cyan-600 px-4 py-2 rounded-tl-lg rounded-tr-lg">
            <span
              className="text-base font-semibold text-white"
              onClick={() =>
                console.log({
                  userData,
                  currentState: values,
                })
              }
            >
              Data Diri
            </span>
          </div>
          <div className="w-full bg-white px-4 py-4 rounded-bl-lg rounded-br-lg">
            {/* NRPT, NAMA LENGKAP, GELAR DEPAN, GELAR BELAKANG */}
            <div className="flex flex-wrap flex-auto gap-2 mb-4">
              {/* NRPT */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">NRPT/PIN</Label>
                <Input
                  id="nrpt-pin-textfield"
                  name="nrpt"
                  onChange={handleChange}
                  className=""
                  value={values.employmentId || ""}
                />
              </div>

              {/* NAMA DEPAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-1/2">
                <Label htmlFor="nama-lengkap-textfield">Nama Depan</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="firstname"
                  onChange={handleChange}
                  className=""
                  value={values.firstName || ""}
                />
              </div>

              {/* NAMA BELAKANG */}
              <div className="flex flex-col gap-2 flex-1 md:basis-1/2">
                <Label htmlFor="nama-lengkap-textfield">Nama Belakang</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="lastname"
                  onChange={handleChange}
                  className=""
                  value={values.lastName || ""}
                />
              </div>

              {/* GELAR DEPAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">Gelar Depan</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="frontTitle"
                  onChange={handleChange}
                  className=""
                  value={values.frontTitle || ""}
                />
              </div>

              {/* GELAR BELAKANG */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-belakang-textfield">Gelar Belakang</Label>
                <Input
                  id="gelar-belakang-textfield"
                  name="backTitle"
                  onChange={handleChange}
                  className=""
                  value={values.backTitle || ""}
                />
              </div>
            </div>

            {/* KELOMPOK PEKERJAAN, UNIT KERJA, BAGIAN */}
            <div className="flex flex-wrap gap-2">
              {/* KELOMPOK PEKERJAAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Kelompok Pekerjaan
                </Label>
                <Autocomplete
                  size="small"
                  options={workGroupList}
                  value={values.workGroup || null}
                  defaultValue={values.workGroup}
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
                    setFieldValue("workGroup", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* UNIT KERJA */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Unit Kerja
                </Label>
                <Autocomplete
                  size="small"
                  options={workUnitList}
                  value={values?.workUnit || null}
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
                    setFieldValue("workUnit", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* BAGIAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">Bagian</Label>
                <Autocomplete
                  size="small"
                  options={workPartList}
                  value={values?.workPart || null}
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
                    setFieldValue("workPart", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white drop-shadow-lg rounded-xl mb-2">
          <div className="flex justify-between w-full bg-cyan-600 px-4 py-2 rounded-tl-lg rounded-tr-lg">
            <span className="text-base font-semibold text-white">
              Data Lengkap
            </span>
          </div>
          <div className="w-full bg-white px-4 py-4 rounded-bl-lg rounded-br-lg">
            {/* AGAMA, JENIS KELAMIN, PENDIDIKAN TERAKHIR, STATUS PERKAWINAN */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* AGAMA */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">Agama</Label>
                <Autocomplete
                  size="small"
                  options={religionList}
                  value={values?.religion || null}
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
                    setFieldValue("religion", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* JENIS KELAMIN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Jenis Kelamin
                </Label>
                <Autocomplete
                  size="small"
                  options={genderList}
                  value={values?.gender || null}
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
                    setFieldValue("gender", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* PENDIDIKAN TERAKHIR */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Pendidikan Terakhir
                </Label>
                <Autocomplete
                  size="small"
                  options={educationLevelList}
                  value={values?.latestEducationLevel || null}
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
                    setFieldValue("latestEducation", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* STATUS PERKAWINAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Status Perkawinan
                </Label>
                <Autocomplete
                  size="small"
                  options={maritalStatusList}
                  value={values?.maritalStatus || null}
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
                    setFieldValue("maritalStatus", v);
                  }}
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>
            </div>

            {/* URAIAN KERJA, PENEMPATAN, TAHUN MASUK */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* URAIAN KERJA */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Uraian Kerja</Label>
                <Input
                  id="nrpt-pin-textfield"
                  name="workDescription"
                  onChange={handleChange}
                  className=""
                  value={values?.jobDescription || ""}
                />
              </div>

              {/* PENEMPATAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nama-lengkap-textfield">Penempatan</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="placement"
                  onChange={handleChange}
                  className=""
                  value={values?.placementLocation || ""}
                />
              </div>

              {/* TAHUN MASUK */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">Tahun Masuk</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="startYear"
                  onChange={handleChange}
                  className=""
                  value={values?.startingYear || ""}
                />
              </div>

              {/* NOMOR SK */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Nomor SK</Label>
                <Input
                  id="nrpt-pin-textfield"
                  name="decisionLetterNumber"
                  onChange={handleChange}
                  className=""
                  value={values?.decisionLetterNumber || ""}
                />
              </div>
            </div>

            {/* RT, RW, PROVINSI, KABUPATEN/KOTA */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* RT */}
              <div className="flex flex-col gap-2 flex-1 md:basis-1/2">
                <Label htmlFor="nama-lengkap-textfield">RT</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="neighborhood"
                  onChange={handleChange}
                  className=""
                  value={values?.neighborhood || ""}
                />
              </div>

              {/* RW */}
              <div className="flex flex-col gap-2 flex-1 md:basis-1/2">
                <Label htmlFor="nama-lengkap-textfield">RW</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="neighborhoodHead"
                  onChange={handleChange}
                  className=""
                  value={values?.neighborhoodHead || ""}
                />
              </div>

              {/* PROVINSI */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Provinsi
                </Label>
                <Autocomplete
                  size="small"
                  options={provinceOptions}
                  value={values?.Province || null}
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
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: "10px",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                      },
                    },
                  }}
                  onChange={(e, v) => {
                    setFieldValue("Province", v);
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* KABUPATEN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Kabupaten/Kota
                </Label>
                <Autocomplete
                  size="small"
                  options={districtList}
                  value={values?.cityDistrict || null}
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
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: "10px",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                      },
                    },
                  }}
                  onChange={(e, v) => setFieldValue("cityDistrict", v)}
                  fullWidth
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* KECAMATAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Kecamatan
                </Label>
                <Autocomplete
                  size="small"
                  options={subdistrictList}
                  value={values?.subdistrict || null}
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
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: "10px",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                      },
                    },
                  }}
                  onChange={(e, v) => setFieldValue("subdistrict", v)}
                  fullWidth
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>

              {/* KELURAHAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="kelompok-pekerjaan-autocomplete">
                  Kelurahan
                </Label>
                <Autocomplete
                  size="small"
                  options={wardList}
                  value={values?.ward || null}
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
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: "10px",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                      },
                    },
                  }}
                  onChange={(e, v) => setFieldValue("ward", v)}
                  fullWidth
                  renderInput={(params) => (
                    <CustomTextfield
                      {...params}
                      placeholder="Kelompok pekerjaan"
                    />
                  )}
                />
              </div>
            </div>

            {/* ALAMAT RUMAH */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* ALAMAT RUMAH */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nama-lengkap-textfield">Alamat Rumah</Label>
                <Textarea
                  rows={2}
                  id="nama-lengkap-textfield"
                  name="address"
                  onChange={handleChange}
                  className=""
                  value={values?.homeAddress || ""}
                />
              </div>
            </div>

            {/* KECAMATAN, KELURAHAN, TEMPAT LAHIR, TANGGAL LAHIR */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* TEMPAT LAHIR */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Tempat Lahir</Label>
                <Input
                  id="nrpt-pin-textfield"
                  name="birthPlace"
                  onChange={handleChange}
                  className=""
                  value={values?.birthPlace || ""}
                />
              </div>

              {/* TANGGAL LAHIR */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Tanggal Lahir</Label>
                <InputCustom
                  className="w-full"
                  inputClassname="w-full text-center"
                  id="period-search-textfield"
                  value={dayjs(
                    values.dateOfBirth == null
                      ? new Date()
                      : new Date(values.dateOfBirth)
                  ).format("DD MMMM YYYY")}
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
                          defaultMonth={
                            values.dateOfBirth == null
                              ? new Date()
                              : new Date(values.dateOfBirth)
                          }
                          mode="single"
                          selected={
                            values.dateOfBirth !== undefined
                              ? new Date(values.dateOfBirth)
                              : new Date()
                          }
                          onSelect={(e, d) => {
                            setFieldValue("dateOfBirth", d);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  }
                />
              </div>
            </div>

            {/* NOMOR HP, NOMOR TELEPON, EMIAL */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* NOMOR HP */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Nomor Hp</Label>
                <Input
                  id="nrpt-pin-textfield"
                  name="phoneNumber"
                  onChange={handleChange}
                  className=""
                  value={values?.phoneNumber || ""}
                />
              </div>

              {/* NOMOR TELEPON */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nama-lengkap-textfield">Nomor Telp</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="telephone"
                  onChange={handleChange}
                  className=""
                  value={values?.telephone || ""}
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">Email</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="email"
                  onChange={handleChange}
                  className=""
                  value={values?.email || ""}
                />
              </div>
            </div>

            {/* NOMOR KK, NOMOR IDENTITAS, NPWP, BPJS TENAGA KERJA, BPJS KESEHATAN */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* NOMOR KK */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Nomor KK</Label>
                <Input
                  id="nrpt-pin-textfield"
                  name="familyCertificateNumber"
                  onChange={handleChange}
                  className=""
                  value={values?.familyCertificateNumber || ""}
                />
              </div>

              {/* NOMOR IDENTITAS */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nama-lengkap-textfield">Nomor Identitas</Label>
                <Input
                  id="nama-lengkap-textfield"
                  name="identityNumber"
                  onChange={handleChange}
                  className=""
                  value={values?.identityNumber || ""}
                />
              </div>

              {/* NPWP */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">NPWP</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="npwpNumber"
                  onChange={handleChange}
                  className=""
                  value={values?.npwpNumber || ""}
                />
              </div>

              {/* BPJS TENAGA KERJA */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">BPJS Tenaga Kerja</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="bpjsOfEmployment"
                  onChange={handleChange}
                  className=""
                  value={values?.bpjsOfEmployment || ""}
                />
              </div>

              {/* BPJS KESEHATAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">BPJS Kesehatan</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="bpjsOfHealth"
                  onChange={handleChange}
                  className=""
                  value={values?.bpjsOfHealth || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 drop-shadow-lg rounded-xl mb-2">
          <div className="flex justify-between w-full bg-cyan-600 px-4 py-2 rounded-tl-lg rounded-tr-lg">
            <span className="text-base font-semibold text-white">
              Data Dokumen
            </span>
          </div>
          <div className="w-full bg-white px-4 py-4 rounded-bl-lg rounded-br-lg">
            <div className="flex flex-wrap gap-x-3 gap-y-5 flex-auto">
              {/* PAS FOTO */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Pas Foto</Label>
                {values.photograph !== undefined ? (
                  <iframe
                    src={(values.photograph as any)?.link}
                    className="object-cover"
                    seamless
                  />
                ) : (
                  <Input
                    id="nrpt-pin-textfield"
                    type="file"
                    onChange={(e) => {
                      !!e.target.files
                        ? setFieldValue("photographFile", e.target.files[0])
                        : null;
                    }}
                    className=""
                  />
                )}
              </div>

              {/* FOTO/SCAN KTP */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Foto/Scan KTP</Label>
                <Input
                  id="nrpt-pin-textfield"
                  type="file"
                  onChange={(e) => {
                    !!e.target.files
                      ? setFieldValue("identityFile", e.target.files[0])
                      : null;
                  }}
                  className=""
                />
              </div>

              {/* FOTO/SCAN KK */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Foto/Scan KK</Label>
                {values.familyCertificate !== undefined ? (
                  <iframe
                    src={(values.familyCertificate as any)?.link}
                    className="object-cover"
                    seamless
                  />
                ) : (
                  <Input
                    id="nrpt-pin-textfield"
                    type="file"
                    onChange={(e) => {
                      !!e.target.files
                        ? setFieldValue(
                            "familyCertificateFile",
                            e.target.files[0]
                          )
                        : null;
                    }}
                    className=""
                  />
                )}
              </div>

              {/* FOTO/SCAN NPWP */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Foto/Scan NPWP</Label>
                {values.npwp !== undefined ? (
                  <iframe src={(values.npwp as any)?.link} />
                ) : (
                  <Input
                    id="nrpt-pin-textfield"
                    type="file"
                    onChange={(e) => {
                      !!e.target.files
                        ? setFieldValue("npwpFile", e.target.files[0])
                        : null;
                    }}
                    className=""
                  />
                )}
              </div>

              {/* FOTO/SCAN BPJS TENAGA KERJA */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">
                  Foto/Scan BPJS Tenaga Kerja
                </Label>
                {values.bpjsOfEmploymentFile !== undefined ? (
                  <iframe src={(values.bpjsOfEmploymentFile as any)?.link} />
                ) : (
                  <Input
                    id="nrpt-pin-textfield"
                    type="file"
                    onChange={(e) => {
                      !!e.target.files
                        ? setFieldValue(
                            "bpjsOfEmploymentFile",
                            e.target.files[0]
                          )
                        : null;
                    }}
                    className=""
                  />
                )}
              </div>

              {/* FOTO/SCAN BPJS KESEHATAN */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">
                  Foto/Scan BPJS Kesehatan
                </Label>
                {values.bpjsOfHealthFile !== undefined ? (
                  <iframe src={(values.bpjsOfHealthFile as any)?.link} />
                ) : (
                  <Input
                    id="nrpt-pin-textfield"
                    type="file"
                    onChange={(e) => {
                      !!e.target.files
                        ? setFieldValue("bpjsOfHealthFile", e.target.files[0])
                        : null;
                    }}
                    className=""
                  />
                )}
              </div>

              {/* FOTO/SCAN SK */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Foto/Scan SK</Label>
                {values.decisionLetter !== undefined ? (
                  <iframe src={(values.decisionLetter as any)?.link} />
                ) : (
                  <Input
                    id="nrpt-pin-textfield"
                    type="file"
                    onChange={(e) => {
                      !!e.target.files
                        ? setFieldValue("decisionLetterFile", e.target.files[0])
                        : null;
                    }}
                    className=""
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end md:mt-4">
              <Button type="submit" className="md:w-full">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
