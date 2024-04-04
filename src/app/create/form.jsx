"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { CalendarIcon, TrashIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn, nextWeek } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createVote } from "@/lib/actions/vote";
import { redirect, useRouter } from "next/navigation";

const FormSchema = z
  .object({
    vote_options: z
      .array(z.string())
      .refine((value) => value.length >= 2 && value.length <= 6, {
        message: "You have to select at least two items and max at six items.",
      }),
    title: z
      .string()
      .min(5, { message: "Title has a minimum characters of 5" }),
    description: z.string().optional(),
    end_date: z.date(),
  })
  .refine(
    (data) => {
      const vote_options = [...new Set([...data.vote_options])];
      return vote_options.length === data.vote_options.length;
    },
    { message: "Vote option need to be uniqe", path: ["vote_options"] }
  );

export default function VoteForm() {
  const optionRef = useRef();
  const [options, setOptions] = useState([]);
  const { data: session } = useSession();
  const { user } = session;
  const userId = user?.userId;
  const router = useRouter();

  if (session?.user === null) {
    redirect("/");
  }

  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      end_date: null,
      title: "",
      vote_options: [],
    },
  });
  const { reset } = form;

  function addOptions() {
    const newOptions = optionRef.current.value.trim();

    if (newOptions) {
      if (!form.getValues("vote_options").includes(newOptions)) {
        const updatedOptions = [
          ...options,
          {
            id: newOptions,
            label: newOptions,
          },
        ];
        setOptions(updatedOptions);
        form.setValue(
          "vote_options",
          updatedOptions.map((option) => option.id)
        );
        optionRef.current.value = "";
      } else {
        toast.error("You cannot have the same option.");
      }
    }
  }

  async function onSubmit(data) {
    const vote_options = {};
    data.vote_options.forEach((option) => {
      vote_options[option] = 0;
    });
    const insertData = { ...data, vote_options, userId };
    let loadingId;
    try {
      loadingId = toast.loading("creating...");
      const data = await createVote(insertData);
      const { _id } = data?.vote;
      toast.dismiss(loadingId);
      router.push(`/vote/${_id}`);
      toast.success("Successfully created a vote");
      reset();
      setOptions([]);
    } catch (error) {
      toast.dismiss(loadingId);
      toast.error("Failed to create a vote");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="vote for best of... " {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="(optional) your vote description.."
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>This is be for SEO description</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vote_options"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Vote Options</FormLabel>
                <FormDescription>
                  You can not edit your vote option. Please double check 📌.
                </FormDescription>
              </div>

              {options.map((item) => (
                <FormItem key={item.id}>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={form
                            .getValues("vote_options")
                            .includes(item.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const updatedOptions = checked
                              ? [...form.getValues("vote_options"), item.id]
                              : form
                                  .getValues("vote_options")
                                  .filter((value) => value !== item.id);
                            form.setValue("vote_options", updatedOptions);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-lg">
                        {item.label}
                      </FormLabel>
                    </div>
                    <TrashIcon
                      className="w-5 h-5 cursor-pointer hover:scale-115 transition-all"
                      onClick={() => {
                        const updatedOptions = options.filter(
                          (option) => option.id !== item.id
                        );
                        setOptions(updatedOptions);
                        const updatedVoteOptions = form
                          .getValues("vote_options")
                          .filter((value) => value !== item.id);
                        form.setValue("vote_options", updatedVoteOptions);
                      }}
                    />
                  </div>
                </FormItem>
              ))}
              <Input
                type="text"
                ref={optionRef}
                placeholder="Press enter to add more option"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addOptions();
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > nextWeek() || date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!(options.length >= 2)}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
