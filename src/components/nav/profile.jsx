import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GearIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Logout from "./logout";
import Link from "next/link";
// TODO: its shows squre pic in mobile fix it

export default function Profile({ user }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild id="close-popover">
          <Image
            src={user?.image}
            width={50}
            height={50}
            alt={user?.name}
            className="rounded-full ring-green-500 ring cursor-pointer hover:scale-125 transition-all animate-fade"
          />
        </PopoverTrigger>
        <PopoverContent className="w-60 space-y-2 divide-y" align="end">
          <Link href={`/profile?id=${user?.userId}`}>
            <Button
              className="w-full flex items-center justify-between rounded-none"
              variant="ghost"
              onClick={() => {
                document.getElementById("close-popover")?.click();
              }}
            >
              Profile <GearIcon />
            </Button>
          </Link>
          <Link href={"/create"}>
            <Button
              className="w-full flex items-center justify-between rounded-none "
              variant="ghost"
              onClick={() => {
                document.getElementById("close-popover")?.click();
              }}
            >
              Create <PlusIcon />
            </Button>
          </Link>
          <Logout />
        </PopoverContent>
      </Popover>
    </>
  );
}
