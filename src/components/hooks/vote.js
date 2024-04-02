import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { castVoteLogs, getVoteLogs, getVoteOptionsById } from "../actions/vote";
import { getHightValueObjectKey } from "@/lib/utils";

export function useGetVote(id) {
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const queryClient = useQueryClient();

  const {
    data: optionsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["options", id],
    queryFn: () => getVoteOptionsById(id),
    enabled: !!id,
  });

  const {
    data: voteLogData,
    isLoading: isLogLoading,
    error: logError,
  } = useQuery({
    queryKey: ["option", id, userId],
    queryFn: () => getVoteLogs(id, userId),
    enabled: !!optionsData && !!userId,
  });

  const [voteLog, setVoteLog] = useState(null);

  if (voteLogData && !voteLog) {
    setVoteLog(voteLogData);
  }

  const castVoteMutation = useMutation({
    mutationFn: (option) => castVote(option),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["options", id]);
      setVoteLog(data);
    },
    onError: (error) => {
      console.error("Error casting vote:", error);
    },
  });

  const castVote = async (option) => {
    try {
      const data = await castVoteLogs(id, option, userId);
      return data;
    } catch (error) {
      console.error("Error casting vote:", error);
      throw new Error("Failed to cast vote");
    }
  };

  const totalVote = useMemo(() => {
    if (optionsData?.options) {
      return Object.values(optionsData?.options).reduce(
        (acc, value) => acc + value,
        0
      );
    }
  }, [optionsData?.options]);

  const highestKey = useMemo(() => {
    if (optionsData?.options) {
      return getHightValueObjectKey(optionsData?.options);
    }
  }, [optionsData?.options]);

  return {
    highestKey,
    totalVote,
    optionsData,
    voteLog,
    castVoteMutation,
    isLoading,
    isLogLoading,
    error,
    logError,
  };
}
