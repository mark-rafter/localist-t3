import { useSearchRouter } from "@/hooks/use-search-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  HiClock,
  HiHeart,
  HiMagnifyingGlass,
  HiOutlineClock,
  HiOutlineHeart,
} from "react-icons/hi2";
import { z } from "zod";

const searchMaxLength = 32;

const sortSchema = z.enum(["", "new", "likes"]).default("");

export const searchSchema = z.object({
  q: z.string().max(searchMaxLength, { message: "Query too long" }).default(""),
  sort: sortSchema,
});

export type SearchSchema = z.infer<typeof searchSchema>;

export function SearchForm() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });
  const { updateQuery, searchTerm, sortTerm } = useSearchRouter();
  const [parent] = useAutoAnimate();

  const result = sortSchema.safeParse(sortTerm);
  const watchSort = watch("sort", result.success ? result.data : "");

  const submitForm = handleSubmit(updateQuery);

  // todo: enable once debounce is solved
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //   const subscription = watch(() => submitForm());
  //   return () => subscription.unsubscribe();
  // }, [handleSubmit, watch]);

  return (
    <form className="mx-auto flex" ref={parent} onSubmit={submitForm}>
      <div className="relative w-full">
        <TextInput
          id="search"
          {...register("q")}
          maxLength={searchMaxLength}
          icon={HiMagnifyingGlass}
          className="rounded-none"
          defaultValue={searchTerm}
          placeholder="e.g. womans size 10 adidas trainers"
        />
        <button
          type="submit"
          onClick={() => setValue("sort", "likes")}
          className="absolute top-0 right-10 border border-slate-600 p-2.5 hover:bg-slate-500 focus:z-20 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {watchSort === "likes" ? (
            <HiHeart className="h-5 w-5" />
          ) : (
            <HiOutlineHeart className="h-5 w-5" />
          )}
          <span className="sr-only">Popular</span>
        </button>
        <button
          type="submit"
          onClick={() => setValue("sort", "new")}
          className="absolute top-0 right-0 rounded-r-lg border border-slate-600 p-2.5 hover:bg-slate-500 focus:z-20 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {watchSort === "" || watchSort === "new" ? (
            <HiClock className="h-5 w-5" />
          ) : (
            <HiOutlineClock className="h-5 w-5" />
          )}
          <span className="sr-only">Newest</span>
        </button>
      </div>
      {errors.q && (
        <p id="q_error_message" className="mt-2 text-xs text-red-400">
          {errors.q.message}
        </p>
      )}
    </form>
  );
}
