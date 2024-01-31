import { RowData } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { Data } from "./general";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    addRow: (dataToAdd?: TData) => void;
    removeRow: (rowIndex: number) => void;
    removeRows: (selectedRows: number[]) => void;
    editedRow?: Data;
    setEditedRow?: Dispatch<SetStateAction<Data>>;
    revertData: (rowIndex: number, revert: boolean) => void;
  }
}
