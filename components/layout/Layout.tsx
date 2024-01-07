"use client";
import MainLogo from "@/assets/images/kepri-logo.png";
import { sidebarData } from "@/lib/sidebarData";
import { UI, useUiStore } from "@/zustand/UI/ui";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Sidebar = () => {
  const { sidebarOpen, setSidebarWidth, sidebarWidth, setSidebarOpen } =
    useUiStore((state: UI) => state);
  const [sidebarW, setSidebarW] = useState(sidebarWidth);
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    () => {
      setSidebarWidth(sidebarRef.current?.clientWidth as number);
    };
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebarRef}
      onMouseEnter={() => console.log(sidebarRef)}
      onChange={() => {
        setSidebarW(sidebarRef.current?.clientWidth as number);
      }}
      className={`${
        sidebarOpen
          ? "translate-x-0 w-60 md:absolute md:left-0 md:z-50"
          : "md:w-0 tab_port:w-0 md:opacity-0 tab_port:opacity-0 w-14"
      } transition-all duration-300 ease-in-out rounded-tr-sm backdrop-blur-sm bg-gradient-to-tr from-blue-950 to-blue-800 min-h-screen`}
    >
      <TooltipProvider>
        {sidebarOpen ? (
          <div className="flex flex-col gap-5 justify-start w-full items-start">
            {/* MAIN MENU */}
            <div className="flex flex-col gap-2 justify-start w-full items-start px-4 py-2">
              <div className="flex flex-wrap items-center w-full mb-4">
                <div className="h-12 w-12 rounded-full">
                  <Image
                    src={MainLogo.src}
                    width={MainLogo.width}
                    height={MainLogo.height}
                    alt="axa logo"
                    className="h-12 rounded-full object-cover"
                  />
                </div>
                <span className="text-sm text-slate-200 text-center flex-1 font-bold">
                  Pena Kertas
                </span>
              </div>
              <div className="md:absolute md:right-0 lg:hidden xl:hidden 2xl:hidden">
                <Button
                  size={"icon"}
                  onClick={() => setSidebarOpen()}
                  className="md:shadow-none md:mt-1"
                >
                  <ChevronLeftIcon />
                </Button>
              </div>
              <div className="flex-1 w-full">
                {sidebarData.map((item, index) => {
                  if (item.children.length < 1) {
                    return (
                      <Button
                        key={`${index}-${item.name}`}
                        className={`flex gap-2 w-full justify-start items-center bg-transparent shadow-none ${
                          pathname.includes(item.route)
                            ? "backdrop-filter backdrop-blur-lg bg-white bg-opacity-60 hover:bg-reddish hover:brightness-125 transition-all"
                            : ""
                        }`}
                        onClick={() => {
                          router.push(item.route);
                        }}
                      >
                        {item.icon}
                        <span className="">{item.name}</span>
                      </Button>
                    );
                  } else {
                    return (
                      <Accordion
                        key={`${index}-${item.route}`}
                        type="single"
                        collapsible
                        className="w-full p-0 text-white bg-transparent shadow-none rounded-md"
                      >
                        <AccordionItem value="item-1" className="border-none">
                          <AccordionTrigger
                            className={`w-full hover:bg-reddish rounded-md flex justify-start items-center gap-2 p-0 px-4 py-2 hover:no-underline ${
                              pathname.includes(item.route)
                                ? "backdrop-filter backdrop-blur-lg bg-white bg-opacity-60"
                                : ""
                            }`}
                          >
                            <div className="flex gap-2 flex-1 items-center">
                              {item.icon}
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-4 mt-1 w-full max-h-screen overflow-y-auto">
                            <ul className="text-white font-sm font-semibold pl-3">
                              {item.children.map((i, ind) => {
                                return (
                                  <li
                                    key={ind + 3}
                                    className={`cursor-pointer hover:bg-reddish w-full flex items-center justify-start pl-3 py-2 rounded-md ${
                                      i.route.includes(pathname)
                                        ? "backdrop-filter backdrop-blur-lg bg-white bg-opacity-60"
                                        : ""
                                    } mb-1`}
                                    onClick={() => {
                                      console.log("ini route");
                                      router.push(i.route);
                                    }}
                                  >
                                    <span>{i.name}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 justify-start w-full items-start md:hidden">
            {/* MAIN MENU */}
            <div className="flex flex-col gap-2 justify-start w-full items-center">
              <div className="h-16 w-11 flex justify-center items-center">
                <Image
                  src={MainLogo.src}
                  width={MainLogo.width}
                  height={MainLogo.height}
                  alt="axa logo"
                  className="h-11 rounded-full object-cover"
                />
              </div>
              {sidebarData.map((item, index) => {
                if (item.children.length < 1) {
                  return (
                    <Button
                      className={`bg-transparent shadow-none ${
                        pathname.includes(item.route)
                          ? "backdrop-filter backdrop-blur-lg bg-white bg-opacity-60"
                          : ""
                      }`}
                      onClick={() => router.push(item.route)}
                      key={index + 4}
                    >
                      {item.icon}
                    </Button>
                  );
                } else {
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className={`shadow-none ${
                            pathname
                              .replaceAll("/", "")
                              .includes(item.route.replaceAll("/", ""))
                              ? "backdrop-filter backdrop-blur-lg bg-white bg-opacity-60"
                              : ""
                          }`}
                          onClick={() => router.push(item.children[0].route)}
                        >
                          {item.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="z-50">
                        {item.children.map((i, ind) => {
                          return (
                            <Button
                              className="bg-white opacity-100 z-50 text-slate-800 hover:text-white"
                              key={ind + 6}
                              onClick={() => router.push(i.route)}
                            >
                              {" "}
                              {i.name}
                            </Button>
                          );
                        })}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
              })}
            </div>
          </div>
        )}
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
