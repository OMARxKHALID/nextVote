import { getVoteById } from "@/components/actions/vote";
import EditVoteForm from "@/app/edit/[id]/form";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }) {
  const { id } = params;
  const vote = await getVoteById(id);

  if (!vote) {
    return redirect("/");
  }

  return (
    <div className="max-w-5xl mx-auto">
      {vote && <EditVoteForm vote={vote} />}
    </div>
  );
}
