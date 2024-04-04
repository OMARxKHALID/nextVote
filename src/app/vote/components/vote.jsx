import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
import VoteLoading from "./VoteLoading";
import { useGetVote } from "@/components/hooks/vote";

export default function Vote({ id, endDate }) {
  const {
    highestKey,
    totalVote,
    optionsData,
    voteLog,
    castVoteMutation,
    isLoading,
    isLogLoading,
    error,
    logError,
  } = useGetVote(id);

  if (isLoading || isLogLoading) return <VoteLoading />;

  if (error || logError) {
    toast.error("Error while fetching data");
  }

  const hasVoted = voteLog && Object.keys(voteLog).length > 0;

  const handleVote = (key) => {
    const toastId = toast.loading("casting...");
    castVoteMutation.mutate(key, {
      onSuccess: () => {
        toast.dismiss(toastId);
        toast.success("Vote casted successfully");
      },
    });
  };
  const isExpired = new Date(endDate) < new Date();
  const isDisabled = hasVoted || isExpired;

  return (
    <div className="space-y-10">
      <div>
        {Object.keys(optionsData?.options || {}).map((key, index) => {
          const percentage =
            Math.round(optionsData.options[key] * 100) / totalVote;
          return (
            <div
              key={index}
              className={`flex items-center w-full group ${
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => !isDisabled && handleVote(key)}
            >
              <h1 className="w-40 line-clamp-2 text-lg break-words select-none">
                {highestKey === key ? "🎉" + key : key}
              </h1>
              <div className="flex-1 flex items-center gap-2">
                <div className="py-3 pr-5 border-l border-zinc-400 flex-1">
                  <div
                    className={cn(
                      "h-16 border-y border-r rounded-e-xl relative transition-all group-hover:border-zinc-400",
                      {
                        "bg-yellow-500": highestKey === key,
                      }
                    )}
                    style={{
                      width: `${percentage}%`,
                    }}
                  >
                    <h1 className="absolute top-1/2 -right-8 -translate-y-1/2 select-none">
                      {optionsData.options[key]}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {hasVoted && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <InfoCircledIcon />
            <h1 className="text-lg">
              You voted for{" "}
              <span className="text-yellow-500 font-bold">
                {voteLog.option}
              </span>{" "}
              on {new Date(voteLog.created_at).toDateString()}{" "}
              {new Date(voteLog.created_at).toLocaleTimeString()}
            </h1>
          </div>
        </div>
      )}
      {isExpired && (
        <div className="text-red-500 text-lg font-bold">
          This vote has expired.
        </div>
      )}
    </div>
  );
}
