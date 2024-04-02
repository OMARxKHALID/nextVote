import { listActiveVotes, listExpiredVotes } from "@/components/actions/vote";
import ListVote from "@/components/ListVote";
import ListVoteLoading from "@/components/ListVoteLoading";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <>
      <div className=" space-y-10">
        <h1 className="text-2xl font-bold text-green-500">Active Votes 📣</h1>
        <Suspense fallback={<ListVoteLoading />}>
          <ActiveVote />
        </Suspense>
        <h1 className="text-2xl font-bold text-red-400">Past Votes 🤖</h1>
        <Suspense fallback={<ListVoteLoading />}>
          <ExpiredVote />
        </Suspense>
      </div>
    </>
  );
};

export default Page;

const ActiveVote = async () => {
  const { users, votes } = await listActiveVotes();
  if (!users?.length && !votes?.length) {
    return <h1>No vote yet 😅</h1>;
  }
  return <ListVote votes={votes} users={users} />;
};

const ExpiredVote = async () => {
  const { users, votes } = await listExpiredVotes();
  if (!users?.length && !votes?.length) {
    return <h1>No vote yet 😅</h1>;
  }
  return <ListVote votes={votes} users={users} isExpire={true} />;
};
