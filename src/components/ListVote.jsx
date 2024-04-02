import { emojis, rings } from "@/lib/constant";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function ListVote({ votes, users, isExpire }) {
  return (
    <div className=" w-full mx-auto py-10 px-10 md:p-5 grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-dense gap-y-20 gap-10 ">
      {votes?.map((vote, index) => {
        const { ring, bg } = rings[Math.floor(Math.random() * rings.length)];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const user = users.find((user) => user._id === vote.created_by);

        if (!user) return null;

        const { title, end_date, _id } = vote;

        return (
          <Link href={"/vote/" + _id} key={index} className=" w-full md:w-96  ">
            <div className="relative group">
              <div className=" border border-zinc-600 rounded-md p-5 space-y-3 bg-zinc-800 group-hover:translate-x-3 group-hover:translate-y-3 transition-all relative">
                <div className="flex items-center gap-2">
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={40}
                    height={40}
                    className={`rounded-full ring-2 ${ring}`}
                  />
                  <div>
                    <h1 className=" text-base">{user?.name}</h1>
                  </div>
                </div>
                <h1 className="text-2xl font-medium line-clamp-2">{title}</h1>
                {isExpire ? (
                  <Badge>Expired</Badge>
                ) : (
                  <p className="tex-sm text-gray-400">
                    Until {new Date(end_date).toDateString()}
                  </p>
                )}
                <span className=" absolute -top-8 right-0 text-3xl">
                  {emoji}
                </span>
              </div>
              <div
                className={` -z-10 absolute top-0 right-0 translate-x-3 translate-y-3 w-full h-full ring-1  rounded-md ${ring} ${bg} bg-opacity-10`}
              ></div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
