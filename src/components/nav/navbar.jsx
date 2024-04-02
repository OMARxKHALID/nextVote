"use client";

import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LoginForm from "./login";
import Profile from "./profile";
import { useSession } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" passHref>
        <h1 className="text-3xl font-bold ">NextVote</h1>
        <RocketIcon className="w-5 h-5 animate-lanuch transition-all transform text-green-500" />
      </Link>
      <div>
        <RenderProfile />
      </div>
    </nav>
  );
}

function RenderProfile() {
  const { data: session, status } = useSession();

  if (typeof window !== "undefined" && status === "loading") return null;

  return session?.user ? <Profile user={session.user} /> : <LoginForm />;
}
