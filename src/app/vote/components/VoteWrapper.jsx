"use client";

import React from "react";
import Vote from "./vote";
// import Vote from "./Vote";
// import Comment from "./Comment";
// import { useComment, useUser } from "@/lib/hook";
// import Pressence from "./Pressence";
// import CommentListener from "./CommentListener";

export default function VoteWrapper({ id, endDate }) {
  //   const { isFetching, data } = useUser();

  //   useComment(id);

  //   if (isFetching) {
  //     return <div className=" h-70vh"></div>;
  //   }

  //   if (!data?.user?.id) {
  //     return <AuthComponent />;
  //   }

  return (
    <div className="space-y-5">
      {/* <Pressence id={id} /> */}
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <Vote id={id} endDate={endDate} />
        {/* <div className=" space-y-5"> */}
        {/* <h1 className=" text-3xl font-medium">Realtime comment 😉</h1> */}
        {/* <Comment voteId={id} /> */}
        {/* <CommentListener voteId={id} /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
