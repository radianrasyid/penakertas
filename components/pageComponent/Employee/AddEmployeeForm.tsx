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
import { createPegawaiSubmition } from "@/lib/submitFunctions";
import {
  GETDistrictList,
  GETSubdistrictList,
  GETWardList,
} from "@/services/geolocation/api";
import { AddEmployeeType, OptionsType } from "@/types/forms";
import { Autocomplete, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

const AddEmployeeForm = ({
  provinceList = [],
  educationLevelList = [],
  genderList = [],
  maritalStatusList = [],
  religionList = [],
  workGroupList = [],
  workPartList = [],
  workUnitList = [],
}: {
  provinceList: OptionsType[];
  workGroupList: OptionsType[];
  workUnitList: OptionsType[];
  workPartList: OptionsType[];
  religionList: OptionsType[];
  genderList: OptionsType[];
  educationLevelList: OptionsType[];
  maritalStatusList: OptionsType[];
}) => {
  const [provinceOptions, setProvinceOptions] =
    useState<{ id: string; name: string; value: string }[]>(provinceList);
  const [districtList, setDistrictList] = useState<
    { id: string; name: string; value: string }[]
  >([]);
  const [subdistrictList, setSubdistrictList] = useState<OptionsType[]>([]);
  const [wardList, setWardList] = useState<OptionsType[]>([]);
  const [pickedDate, setPickedDate] = useState<Date>(new Date());

  const { setFieldValue, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      address: null,
      backTitle: "",
      birthPlace: null,
      bpjsOfEmployment: null,
      bpjsOfEmploymentFile: null,
      bpjsOfHealth: null,
      bpjsOfHealthFile: null,
      dateOfBirth: null,
      decisionLetterFile: null,
      decisionLetterNumber: null,
      district: null,
      email: null,
      familyCertificateFile: null,
      familyCertificateNumber: null,
      firstname: null,
      frontTitle: "",
      gender: null,
      identityFile: null,
      identityNumber: null,
      lastname: null,
      latestEducation: null,
      maritalStatus: null,
      neighborhood: null,
      neighborhoodHead: null,
      npwpFile: null,
      npwpNumber: null,
      nrpt: null,
      phoneNumber: null,
      photographFile: null,
      placement: null,
      province: null,
      religion: null,
      startYear: null,
      subdistrict: null,
      telephone: null,
      ward: null,
      workDescription: null,
      workGroup: null,
      workPart: null,
      workUnit: null,
    } as AddEmployeeType,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(createPegawaiSubmition(values));
    },
  });

  const getDistrict = async () => {
    if (values.province === null) return null;

    const fetching = GETDistrictList({
      province: values.province.id,
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
    if (values.district === null) return null;

    const fetching = GETSubdistrictList({
      district: values.district.id,
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
    if (values.subdistrict === null) return null;

    const fetching = GETWardList({
      subdistrict: values.subdistrict.id,
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

  useMemo(() => {
    getDistrict();
  }, [values.province]);

  useMemo(() => {
    getSubdistrict();
  }, [values.district]);

  useMemo(() => {
    getWard();
  }, [values.subdistrict]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex justify-between mb-5">
          <span className="text-lg font-semibold">Tambah Pegawai</span>
        </div>

        <div className="bg-white drop-shadow-lg rounded-xl mb-2">
          <div className="flex justify-between w-full bg-cyan-600 px-4 py-2 rounded-tl-lg rounded-tr-lg">
            <span className="text-base font-semibold text-white">
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
                    setFieldValue("province", v);
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
                  onChange={(e, v) => setFieldValue("district", v)}
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
                />
              </div>

              {/* TANGGAL LAHIR */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="nrpt-pin-textfield">Tanggal Lahir</Label>
                <InputCustom
                  className="w-full"
                  inputClassname="w-full text-center"
                  id="period-search-textfield"
                  value={dayjs(new Date()).format("DD MMMM YYYY")}
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
                          selected={
                            values.dateOfBirth !== null
                              ? values.dateOfBirth
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
                />
              </div>

              {/* BPJS KESEHATAN */}
              <div className="flex flex-col gap-2 flex-1 md:basis-full">
                <Label htmlFor="gelar-depan-textfield">BPJS KESEHATAN</Label>
                <Input
                  id="gelar-depan-textfield"
                  name="bpjsOfHealth"
                  onChange={handleChange}
                  className=""
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
              </div>

              {/* FOTO/SCAN NPWP */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Foto/Scan NPWP</Label>
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
              </div>

              {/* FOTO/SCAN BPJS TENAGA KERJA */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">
                  Foto/Scan BPJS Tenaga Kerja
                </Label>
                <Input
                  id="nrpt-pin-textfield"
                  type="file"
                  onChange={(e) => {
                    !!e.target.files
                      ? setFieldValue("bpjsOfEmploymentFile", e.target.files[0])
                      : null;
                  }}
                  className=""
                />
              </div>

              {/* FOTO/SCAN BPJS KESEHATAN */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">
                  Foto/Scan BPJS Kesehatan
                </Label>
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
              </div>

              {/* FOTO/SCAN SK */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nrpt-pin-textfield">Foto/Scan SK</Label>
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

export default AddEmployeeForm;
