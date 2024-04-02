"use client";
import React, { useTransition } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

export default function AuthComponent() {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = async () => {
    startTransition(async () => {
      await signIn("github");
    });
  };
  return (
    <div className="flex items-center justify-center text-gray-200 h-96 border border-dashed border-zinc-500">
      <div className="space-y-5 text-center ">
        <h1 className="text-3xl font-bold">Login to Vote</h1>
        <Button
          onClick={handleSignIn}
          className="flex items-center gap-2 mx-auto"
        >
          <GitHubLogoIcon className={cn({ "animate-spin": isPending })} />
          Login with Github
        </Button>
      </div>
    </div>
  );
}
