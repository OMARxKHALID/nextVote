import { redirect } from "next/navigation";
import ProfileTable from "./table";
import { getVote } from "../../lib/actions/vote";

const ProfilePage = async ({ searchParams }) => {
  const votes = await getVote(searchParams.id);

  if (!searchParams?.id) {
    return redirect("/");
  }

  return <>{votes && <ProfileTable data={votes} />}</>;
};

export default ProfilePage;
