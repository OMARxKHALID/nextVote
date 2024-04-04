"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Link1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteVoteById } from "../../lib/actions/vote";

export default function ProfileTable({ data }) {
  const [animationParent] = useAutoAnimate();
  const [votes, setVotes] = useState(Array.isArray(data) ? data : []);

  const handleShare = async (id) => {
    await toast.promise(
      navigator.clipboard.writeText(location.origin + "/vote/" + id),
      {
        loading: "copying..",
        success: "Successfully copy link",
        error: (err) => "Failed to copy link " + err.toString(),
      }
    );
  };

  const toastDelete = async (id, title) => {
    deleteVoteById(id);
    const deletVote = async () => {
      setVotes((currentVote) => currentVote.filter((vote) => vote._id !== id));
    };

    await toast.promise(deletVote(), {
      loading: "deleting..",
      success: "Successfully delete vote " + title,
      error: (err) => "Failt to delete vote. " + err.toString(),
    });
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>End At</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody ref={animationParent}>
            {votes &&
              votes.map((vote, index) => (
                <TableRow key={vote._id + index}>
                  <TableCell className="font-medium cursor-pointer">
                    <Link href={`/vote/${vote._id}`}>
                      {vote.title.length > 50
                        ? vote.title.slice(0, 50) + " ..."
                        : vote.title}
                    </Link>
                  </TableCell>

                  <TableCell className="font-medium">
                    {new Date(vote.end_date) > new Date() ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge className="bg-red-300">Expired</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(vote.created_at).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(vote.end_date).toDateString()}
                  </TableCell>

                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-[200px]">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center justify-between cursor-pointer w-full"
                            >
                              Delete <TrashIcon />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your vote and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  toastDelete(vote._id, vote.title)
                                }
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Link
                          href={`/edit/${vote._id}?user=${vote.created_by}`}
                        >
                          <Button
                            variant="ghost"
                            className="flex items-center justify-between cursor-pointer w-full"
                          >
                            Edit <Pencil1Icon />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          className="flex items-center justify-between cursor-pointer w-full"
                          onClick={() => handleShare(vote._id)}
                        >
                          Share <Link1Icon />
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {votes.length === 0 && (
        <div className="text-center w-full pt-5 space-y-8">
          <h1>{"You don't have any votes. Click here to create 👇"}</h1>
          <Link href="/create">
            <Button>Create</Button>
          </Link>
        </div>
      )}
    </>
  );
}
