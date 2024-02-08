import { GETListWorkGroup, GETListWorkUnit } from "@/services/userInfo/api";
import { OptionsType } from "@/types/forms";
import FormLaporanPegawai from "./_components/FormLaporanPegawai";

const getData = async () => {
  const listKelompokPekerjaan = GETListWorkGroup();
  const listUnitPekerjaan = GETListWorkUnit();

  const test = await Promise.allSettled([
    listKelompokPekerjaan,
    listUnitPekerjaan,
  ]);
  const isEverythingFulfilled = test.every((e) => e.status === "fulfilled");
  if (isEverythingFulfilled) {
    const [workGroup, workUnit] = test.map((e) =>
      e.status === "fulfilled" ? (e.value.data as OptionsType[]) : []
    );

    return {
      workGroup,
      workUnit,
    };
  }

  return {
    workGroup: [],
    workUnit: [],
  };
};

const LaporanPegawai = async () => {
  const data = await getData();
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Laporan Pegawai</h1>
      <FormLaporanPegawai
        workGroupList={data.workGroup}
        workUnitList={data.workUnit}
      />
    </div>
  );
};

export default LaporanPegawai;
