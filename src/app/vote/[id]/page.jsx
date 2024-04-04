import React from "react";
import { redirect } from "next/navigation";
import { getVoteById } from "@/lib/actions/vote";
import Info from "../components/info";
import VoteWrapper from "../components/VoteWrapper";
import CloseForm from "../components/CloseForm";
import { DEFAUTL_DESCRIPTION } from "@/lib/constant";
import { useSession } from "next-auth/react";

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

export function useUser() {
  const { data: session } = useSession();
  return session;
}

export async function generateMetadata({ params, session }) {
  const { id } = params;
  const vote = await getVoteById(id);
  const url = "https://nextjsxvote.vercel.app/";

  return {
    title: vote?.title,
    authors: {
      name: session?.user?.name,
    },
    description: vote?.description || DEFAUTL_DESCRIPTION,
    openGraph: {
      description: vote?.description || DEFAUTL_DESCRIPTION,
      title: vote?.title,
      url: url + "vote/" + vote?._id,
      siteName: "Next Vote",
      images:
        url +
        `og?author=${session?.user?.name}&image=${session?.user?.image}&title=${vote?.title}`,
      type: "website",
    },
    keywords: ["Next Vote", session?.user?.name, "OMARxKHALID"],
  };
}
