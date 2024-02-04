import { RowData } from "@tanstack/react-table";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
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
    onDeleteData?: (e?: TData) => void | Promise<void>;
    onFinishAddData?: (e?: TData) => void | Promise<void>;
    type?: HTMLInputTypeAttribute | string;
    options?: any[];
  }
}
