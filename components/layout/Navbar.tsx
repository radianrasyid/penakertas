"use client";
import { GetSessionData, SigningOut } from "@/lib/actions";
import { nameInitials } from "@/lib/functions";
import { UI, useUiStore } from "@/zustand/UI/ui";
// import { deleteCookie, getCookie, getCookies } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const { setSidebarOpen, sidebarOpen, sidebarWidth } = useUiStore(
    (state: UI) => state
  );
  const [currentUser, setCurrentUser] = useState<{
    user: {
      email: string;
      image: string | null;
      name: string;
    };
  }>({
    user: {
      email: "",
      image: null,
      name: "",
    },
  });

  async function getUserData() {
    let res = await GetSessionData();

    setCurrentUser({
      ...currentUser,
      user: {
        ...currentUser.user,
        email: res?.user?.email as string,
        image: res?.user?.image as string | null,
        name: res?.user?.name as string,
      },
    });
  }

  useEffect(() => {
    getUserData();
  }, []);

  const processData = async () => {
    let res = await GetSessionData();
    // setUserData(res as any);
  };

  useEffect(() => {
    processData();
  }, []);

  return (
    <header
      className={`h-7 flex text-slate-100 items-center justify-between px-3 py-7 md:px-3 transition-all duration-300 ease-in-out bg-transparent md:bg-white md:rounded-xl md:drop-shadow-2xl md:m-2 backdrop-blur-sm bg-gradient-to-l from-blue-950 to-blue-800 mt-2 mr-2 rounded-xl ml-3`}
      style={
        {
          // marginLeft: `${sidebarWidth}px`,
        }
      }
    >
      {/* LOGO */}
      <div className="flex flex-row gap-2 items-center">
        <Button
          size={"icon"}
          className="bg-transparent hover:bg-transparent shadow-none"
          onClick={() => {
            setSidebarOpen();
          }}
        >
          {sidebarOpen ? (
            <HiDotsVertical className="text-slate-100" />
          ) : (
            <MdMenu className="text-slate-100" />
          )}
        </Button>
      </div>

      {/* SEARCH FIELD */}
      <div className="w-1/2 px-3 rounded-lg flex items-center justify-centerbg-blue-900 bg-opacity-30">
        {/* <div className="flex items-center w-full">
          <BsSearch />
          <Input className="w-full bg-transparent outline-none ring-transparent border-none focus:ring-0 active:ring-0 focus-visible:ring-0" />
        </div>
        <div>
          <kbd>
            <span className="text-xs">⌘K</span>
          </kbd>
        </div> */}
      </div>

      {/* PROFILE */}
      <div className="flex gap-1 justify-between items-center md:hidden">
        <Button
          size={"icon"}
          className="bg-black bg-opacity-50 object-cover relative"
        >
          {!!currentUser.user.image ? (
            <Image
              src={currentUser.user.image}
              alt="user image"
              fill
              className="object-cover h-9 w-9 rounded-lg"
            />
          ) : (
            nameInitials(currentUser.user.name)
          )}
        </Button>
        <div className="flex flex-col">
          <span className="text-xs font-semibold">{currentUser.user.name}</span>
          <span className="text-xs font-light">Company</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="bg-transparent hover:bg-transparent shadow-none">
              <IoIosArrowDown className="text-slate-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-sm font-semibold text-gray-500">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-xs font-semibold text-slate-800"
              onMouseEnter={() => {
                GetSessionData();
              }}
              onClick={async (e: any) => {
                e.preventDefault();
                SigningOut();
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="md:block hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size={"icon"} className="bg-black bg-opacity-50">
              {!!currentUser.user.image ? (
                <Image
                  src={currentUser.user.image}
                  width={20}
                  height={20}
                  alt="user image"
                  className="object-cover"
                />
              ) : (
                nameInitials(currentUser.user.name)
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-sm font-semibold text-gray-500">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-xs font-semibold text-slate-800"
              onMouseEnter={() => {
                GetSessionData();
              }}
              onClick={async (e: any) => {
                e.preventDefault();
                SigningOut();
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
