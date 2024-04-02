import React from "react";
import { redirect } from "next/navigation";
import { getVoteById } from "@/components/actions/vote";
import Info from "../components/info";
import VoteWrapper from "../components/VoteWrapper";
import CloseForm from "../components/CloseForm";

export default async function Page({ params }) {
  const { id } = params;
  const vote = await getVoteById(id);

  if (!vote) {
    return redirect("/404");
  }

  return (
    <>
      <div className="w-full flex items-center justify-center  min-h-70vh">
        <div className="w-full space-y-20">
          <Info title={vote?.title} endDate={vote.end_date} />
          <VoteWrapper id={id} endDate={vote.end_date} />
        </div>
      </div>
      <CloseForm />
    </>
  );
}
