"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PUTUpdateAccess } from "@/services/account/access/api";
import { Access, AccessDataResponseType, Data } from "@/types/general";
import { useFormik } from "formik";
import { toast } from "sonner";

const AccessMainPage = ({
  accessData,
}: {
  accessData: AccessDataResponseType[];
}) => {
  const {
    values: { toBeEditData },
    setFieldValue,
    handleSubmit,
  } = useFormik({
    onSubmit: async (val) => {
      val.toBeEditData.map(async (i) => {
        const fetching = PUTUpdateAccess({ id: i._id, updatedData: i.data });
        toast.promise(fetching, {
          loading: `Updating ${i.data.title} access...`,
          success: () => `Update ${i.data.title} success!`,
          error: () => `Update ${i.data.title} failed`,
        });
      });
    },
    initialValues: {
      toBeEditData: accessData,
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold">Edit Access</span>
        <Button type="submit">Simpan Perubahan</Button>
      </div>
      <Accordion type="single" collapsible className="w-full mt-3">
        {toBeEditData.map((i, index) => (
          <AccordionItem value={`item-${index + 1}`}>
            <AccordionTrigger className="bg-primary/55 m-0 p-3 mb-1 text-slate-100 rounded-lg hover:no-underline">
              {i.data.title}
            </AccordionTrigger>
            <AccordionContent className="pl-3">
              <Accordion type="single" collapsible className="w-full">
                {i.data.access.menu.map((parentAccess, parentIndex) => (
                  <AccordionItem value={`${parentAccess._id}`}>
                    <AccordionTrigger
                      value={`parent-item-${parentIndex}`}
                      className="m-0 p-0 mb-1"
                    >
                      <Button size={"sm"} variant={"secondary"}>
                        {parentAccess.name}
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent className="pl-5">
                      {parentAccess.children.length == 0 ? (
                        Object.keys(parentAccess.access).map(
                          (accessItemParent) => {
                            let dataNew = (parentAccess.access as Data)[
                              accessItemParent
                            ];
                            return (
                              <div
                                className="flex items-center space-x-2 mb-1"
                                key={`${parentIndex}`}
                              >
                                <Checkbox
                                  id={`${parentIndex}-${dataNew}`}
                                  checked={dataNew}
                                  onCheckedChange={(checked) => {
                                    const newMenuArr = [...i.data.access.menu];
                                    let newObj: Data = {
                                      ...parentAccess.access,
                                    };
                                    newObj[accessItemParent] =
                                      !newObj[accessItemParent];
                                    newMenuArr[parentIndex] = {
                                      ...newMenuArr[parentIndex],
                                      access: newObj as Access,
                                    };
                                    const newToBeEditData = [...toBeEditData];
                                    newToBeEditData[index].data.access.menu =
                                      newMenuArr;
                                    setFieldValue(
                                      "toBeEditData",
                                      newToBeEditData
                                    );
                                  }}
                                />
                                <label
                                  htmlFor={`${parentIndex}-${dataNew}`}
                                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {accessItemParent}
                                </label>
                              </div>
                            );
                          }
                        )
                      ) : (
                        <>
                          {Object.keys(parentAccess.access).map(
                            (accessItemParent) => {
                              let dataNew = (parentAccess.access as Data)[
                                accessItemParent
                              ];
                              return (
                                <div
                                  className="flex items-center space-x-2 mb-1"
                                  key={`${parentIndex}-${accessItemParent}-children`}
                                >
                                  <Checkbox
                                    id={`${parentIndex}-${dataNew}`}
                                    checked={dataNew}
                                    onCheckedChange={(checked) => {
                                      const newMenuArr = [
                                        ...i.data.access.menu,
                                      ];
                                      let newObj: Data = {
                                        ...parentAccess.access,
                                      };
                                      newObj[accessItemParent] =
                                        !newObj[accessItemParent];
                                      newMenuArr[parentIndex] = {
                                        ...newMenuArr[parentIndex],
                                        access: newObj as Access,
                                      };
                                      const newToBeEditData = [...toBeEditData];
                                      newToBeEditData[index].data.access.menu =
                                        newMenuArr;
                                      setFieldValue(
                                        "toBeEditData",
                                        newToBeEditData
                                      );
                                    }}
                                  />
                                  <label
                                    htmlFor={`${parentIndex}-${dataNew}`}
                                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {accessItemParent}
                                  </label>
                                </div>
                              );
                            }
                          )}
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {parentAccess.children.map(
                              (childrenData, childrenIndex) => (
                                <AccordionItem
                                  value={`item-child-${childrenData._id}`}
                                >
                                  <AccordionTrigger
                                    value={`child-child-item-${parentIndex}`}
                                    className="m-0 p-0 mb-1"
                                  >
                                    <Button size={"sm"} variant={"secondary"}>
                                      {childrenData.name}
                                    </Button>
                                  </AccordionTrigger>
                                  <AccordionContent className="pl-6">
                                    {Object.keys(childrenData.access).map(
                                      (accessItemParent) => {
                                        let dataNew = (
                                          childrenData.access as Data
                                        )[accessItemParent];
                                        return (
                                          <div
                                            className="flex items-center space-x-2 mb-1"
                                            key={`${childrenData._id}-children${childrenData.name}`}
                                          >
                                            <Checkbox
                                              id={`${childrenIndex}-${accessItemParent}`}
                                              checked={dataNew}
                                              onCheckedChange={(checked) => {
                                                const newMenuArr = [
                                                  ...parentAccess.children,
                                                ];
                                                let newObj: Data = {
                                                  ...childrenData.access,
                                                };
                                                newObj[accessItemParent] =
                                                  !newObj[accessItemParent];
                                                newMenuArr[childrenIndex] = {
                                                  ...newMenuArr[childrenIndex],
                                                  access: newObj as Access,
                                                };
                                                const newToBeEditData = [
                                                  ...toBeEditData,
                                                ];
                                                newToBeEditData[
                                                  index
                                                ].data.access.menu[
                                                  parentIndex
                                                ].children = newMenuArr;
                                                setFieldValue(
                                                  "toBeEditData",
                                                  newToBeEditData
                                                );
                                              }}
                                            />
                                            <label
                                              htmlFor={`${parentIndex}-${dataNew}`}
                                              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                              {accessItemParent}
                                            </label>
                                          </div>
                                        );
                                      }
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              )
                            )}
                          </Accordion>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </form>
  );
};

export default AccessMainPage;
