"use client";

import { useSession } from "next-auth/react";
import { createComment, getComment } from "../../lib/actions/vote";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useComment(voteId) {
  const { data: session } = useSession();
  const sendBy = session?.user?.userId;
  const user = session?.user;
  const queryClient = useQueryClient();

  const {
    data: commentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", voteId],
    queryFn: () => getComment(voteId),
    enabled: !!voteId,
    onSuccess: (commentData) => {
      setComments(commentData);
    },
  });

  const [comments, setComments] = useState(null);

  if (commentData && !comments) {
    setComments(commentData);
  }

  const mutation = useMutation({
    mutationFn: (text) => handleComment(text),
    onSuccess: (data) => {
      console.log("🚀 ~ useComment ~ data:", data);
      queryClient.setQueryData(["comments", voteId], (oldData) => {
        // Update comments locally instead of waiting for refetch
        return [...oldData, data.comment];
      });
      queryClient.invalidateQueries(["comments", voteId]);
      setComments((prevComments) => [...prevComments, data.comment]);
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const handleComment = async (text) => {
    try {
      const data = await createComment({ text, voteId, sendBy });
      return data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Failed to create comment");
    }
  };

  return {
    comments,
    mutation,
    isLoading,
    error,
    user,
  };
}
