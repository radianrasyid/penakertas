import { Cell, Row, Table } from "@tanstack/react-table";
import { MouseEvent } from "react";
import { FaTrash } from "react-icons/fa6";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { TbPencil } from "react-icons/tb";
import { Button } from "../ui/button";

export function EditCell<TData, TValue>({
  row,
  table,
  cell,
}: {
  row: Row<TData>;
  table: Table<TData>;
  cell: Cell<TData, TValue>;
}) {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
    const elName = e.currentTarget.name;
    if (meta?.setEditedRow) {
      meta?.setEditedRow((old) => ({
        ...old,
        [row.id]: !old[row.id],
      }));
      if (elName !== "edit") {
        if (meta?.revertData) {
          elName === "cancel"
            ? meta.revertData(row.index, true)
            : meta.revertData(row.index, false);
        }
      } else {
        if (meta?.revertData) {
          meta.revertData(row.index, true);
        }
      }
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  if (meta?.editedRow) {
    return meta?.editedRow[row.id] ? (
      <div className="flex gap-x-1">
        <Button
          size={"icon"}
          variant={"outline"}
          type="button"
          onClick={setEditedRows}
          name="cancel"
        >
          <RxCross2 />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={(e) => {
            try {
              if (meta.onFinishAddData) {
                meta.onFinishAddData();
                setEditedRows(e);
                return;
              }
              setEditedRows(e);
            } catch (error) {}
          }}
          type="button"
          name="done"
        >
          <RxCheck />
        </Button>
      </div>
    ) : (
      <div className="flex gap-x-2">
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={setEditedRows}
          type="button"
          name="edit"
        >
          <TbPencil />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={async (e) => {
            if (meta?.onDeleteData) {
              await meta.onDeleteData(row.original);
              removeRow();
              return;
            }
            removeRow();
          }}
          type="button"
          name="edit"
        >
          <FaTrash />
        </Button>
      </div>
    );
  }
}
