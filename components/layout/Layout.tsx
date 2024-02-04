"use client";
import MainLogo from "@/assets/images/kepri-logo.png";
import { GetSessionData } from "@/lib/actions";
import { reprocessSidebar } from "@/lib/functions";
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

const Sidebar = ({ role }: { role: string }) => {
  const { sidebarOpen, setSidebarWidth, sidebarWidth, setSidebarOpen } =
    useUiStore((state: UI) => state);
  const [sidebarW, setSidebarW] = useState(sidebarWidth);
  const pathname = usePathname();
  const router = useRouter();
  const [menuData, setMenuData] = useState(sidebarData);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const processRole = async () => {
    const menuData = await reprocessSidebar({ sidebarData: sidebarData });
    setMenuData(menuData);
  };

  useEffect(() => {
    () => {
      setSidebarWidth(sidebarRef.current?.clientWidth as number);
    };
    processRole();
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebarRef}
      onChange={() => {
        setSidebarW(sidebarRef.current?.clientWidth as number);
      }}
      className={`${
        sidebarOpen
          ? "translate-x-0 w-60 md:absolute md:left-0 md:z-50 md:m-2 md:drop-shadow-2xl"
          : "md:w-0 tab_port:w-0 md:opacity-0 tab_port:opacity-0 w-14"
      } transition-all duration-300 ease-in-out backdrop-blur-sm bg-gradient-to-tr from-blue-950 to-blue-800 rounded-xl mt-2 ml-2 mb-2 md:m-0`}
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
                <span
                  className="text-xs text-slate-100 text-center flex-1 font-bold"
                  onClick={async () => {
                    console.log(await GetSessionData());
                  }}
                >
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
              <div className="flex-1 w-full max-h-[80vh] overflow-y-auto scroll-aside">
                {menuData.map((item, index) => {
                  if (item.route === "/") {
                    return (
                      <Button
                        key={`${index}-${item.name}`}
                        className={`flex gap-2 w-full text-slate-400 text-xs justify-start items-center bg-transparent shadow-none mb-2 ${
                          pathname === "/"
                            ? "transition-all text-white bg-primary/50 hover:text-[0.9rem]"
                            : "hover:text-white hover:bg-primary/50 hover:text-[0.9rem]"
                        }`}
                        onClick={() => {
                          router.push(item.route);
                        }}
                      >
                        {item.icon}
                        <span className="">{item.name}</span>
                      </Button>
                    );
                  } else if (item.children.length < 1) {
                    return (
                      <Button
                        key={`${index}-${item.name}`}
                        className={`flex gap-2 w-full text-slate-400 justify-start items-center text-xs bg-transparent shadow-none mb-2 ${
                          pathname.includes(item.route)
                            ? "transition-all text-white bg-primary/50 hover:text-[0.9rem]"
                            : "hover:text-white hover:bg-primary/50 hover:text-[0.9rem]"
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
                            className={`w-full mb-2 hover:bg-primary/90 text-slate-400 rounded-md flex justify-start items-center gap-2 p-0 px-4 py-2 hover:no-underline ${
                              pathname.includes(item.route)
                                ? "transition-all text-white bg-primary/50 hover:text-[1.2rem]"
                                : "hover:text-white hover:bg-primary/50 hover:text-[1.2rem]"
                            }`}
                          >
                            <div className="flex gap-2 flex-1 items-center">
                              {item.icon}
                              <span className="text-xs font-medium">
                                {item.name}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-4 mt-1 w-full max-h-screen overflow-y-auto">
                            <ul className="text-slate-400 font-sm font-semibold pl-3">
                              {item.children.map((i, ind) => {
                                return (
                                  <li
                                    key={ind + 3}
                                    className={`cursor-pointer text-xs hover:bg-primary/90 w-full flex items-center justify-start pl-3 py-2 rounded-md transition-all ${
                                      pathname !== "/" &&
                                      pathname.includes(i.route)
                                        ? "transition-all text-white bg-primary/50 hover:text-[0.9rem]"
                                        : "hover:text-white hover:bg-primary/50 hover:text-[0.9rem]"
                                    } mb-1`}
                                    onClick={() => {
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
              <div className="max-h-screen overflow-y-auto flex-1 justify-center flex flex-col items-center scroll-aside">
                {menuData.map((item, index) => {
                  if (item.route === "/") {
                    return (
                      <Button
                        className={`bg-transparent shadow-none text-slate-400 mb-1 ${
                          pathname === "/"
                            ? "transition-all text-white bg-primary/50 mb-1 hover:text-[0.9rem]"
                            : "hover:text-white hover:bg-primary/50 hover:text-[0.9rem]"
                        }`}
                        onClick={() => router.push(item.route)}
                        key={index + 4}
                      >
                        {item.icon}
                      </Button>
                    );
                  } else if (item.children.length < 1) {
                    return (
                      <Button
                        className={`bg-transparent shadow-none text-slate-400 mb-1 ${
                          pathname.includes(item.route)
                            ? "text-white bg-primary/50 mb-1"
                            : "hover:text-white hover:bg-primary/50 hover:text-[0.9rem]"
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
                              pathname.includes(item.route)
                                ? "transition-all text-white bg-primary/50 mb-1 hover:text-[0.9rem]"
                                : "bg-transparent text-slate-400 hover:text-white hover:bg-primary/50 hover:text-[0.9rem]"
                            }`}
                            onClick={() => router.push(item.children[0].route)}
                          >
                            {item.icon}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="z-[99999] flex-col flex max-h-44 bg-primary/50 overflow-y-auto"
                        >
                          {item.children.map((i, ind) => {
                            return (
                              <Button
                                className={`bg-white opacity-100 z-[99999] text-slate-800 hover:text-white mb-1 ${
                                  pathname !== "/" && pathname.includes(i.route)
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
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
          </div>
        )}
      </TooltipProvider>
    </aside>
  );
};

export default Sidebar;
