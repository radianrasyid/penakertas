// @ts-nocheck
import { Data } from "@/types/general";
import { Table } from "@tanstack/react-table";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";

function mapObjectKeys(inputObject: Data, table: Table<TData>): Data {
  return Object.keys(inputObject).reduce((acc, key) => {
    // You can perform any transformation or filtering here if needed
    switch (key) {
      case "id":
        acc[key] = `${Math.floor(Math.random() * 1000)}`;
        break;
      case "no":
        acc[key] = table.options.data.length + 1;
        break;
      default:
        acc[key] = "";
        break;
    }
    return acc;
  }, {} as Data);
}

export function FooterCell<TData>({ table }: { table: Table<TData> }) {
  return (
    <div>
      <Button
        size={"sm"}
        type="button"
        onClick={() => {
          if (table.options.data.length == 0) {
            table.options.meta?.addRow();
            return;
          }
          const dataToAdd = mapObjectKeys([...table.options.data].pop(), table);
          table.options.meta?.addRow(dataToAdd);
        }}
      >
        Add Data <FaPlus />
      </Button>
    </div>
  );
}

export default FooterCell;
