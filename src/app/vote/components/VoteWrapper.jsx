"use client";

import React from "react";
import Vote from "./vote";
import AuthComponent from "@/components/AuthComponent";
import { useSession } from "next-auth/react";
import { Commentbox } from "./CommentBox";

export default function VoteWrapper({ id, endDate }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <AuthComponent />;
  }

  return (
    <div className="space-y-5">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <Vote id={id} endDate={endDate} />
        <div className=" space-y-5">
          <h1 className=" text-3xl font-medium">Realtime comment 😉</h1>
          <Commentbox id={id} />
        </div>
      </div>
    </div>
  );
}
