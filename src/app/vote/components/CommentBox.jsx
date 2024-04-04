import { useComment } from "@/components/hooks/comment";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import CommentLoading from "./CommentLoading";

export function Commentbox({ id }) {
  const [text, setText] = useState("");
  const containerRef = useRef();
  const { mutation, error, user, comments, isLoading } = useComment(id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const yOffset = containerRef.current.scrollTop;
    const threshold = 50;

    // Set visibility based on the scroll position
    setIsVisible(yOffset > threshold);
  };

  const scrollToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComment = (text) => {
    if (!text.trim()) return;
    const toastId = toast.loading("posting...");
    setText("");
    mutation.mutate(text, {
      onSuccess: () => {
        toast.dismiss(toastId);
        toast.success("Comment posted successfully");
        scrollToTop();
      },
      onError: () => {
        toast.dismiss(toastId);
        toast.error("Error creating comment");
      },
    });
  };

  if (error) {
    toast.error(error.message);
  }

  return (
    <div className="w-full h-[30rem] border rounded-md p-5 flex flex-col">
      <Input
        type="text"
        placeholder="comment.."
        className=" z-20"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleComment(text);
          }
        }}
      />
      <div className="flex-1 overflow-y-auto pt-6 relative" ref={containerRef}>
        {comments &&
          comments
            .slice(0)
            .reverse()
            .map((comment) => {
              return (
                <div key={comment?._id} className="w-full p-2">
                  <div className="flex gap-2 items-start">
                    <Image
                      src={comment?.user?.image || user?.image}
                      alt={comment?.user?.name || user?.name}
                      width={55}
                      height={55}
                      className={cn("rounded-full ring-2")}
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                          <p>{comment?.user?.name || user?.name}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(comment?.createdAt).toDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">{comment?.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}

        {isLoading ? (
          <CommentLoading />
        ) : (
          <>{!comments?.length && <p>No comment 😅</p>} </>
        )}
      </div>

      <div
        className={` sticky w-full bottom-0 ${!isVisible ? "hidden" : ""}`}
        onClick={scrollToTop}
      >
        <div className="w-full flex items-center justify-center">
          <div className=" h-10 w-10 rounded-full flex items-center justify-center bg-blue-500 cursor-pointer">
            &#8593;
          </div>
        </div>
      </div>
    </div>
  );
}
