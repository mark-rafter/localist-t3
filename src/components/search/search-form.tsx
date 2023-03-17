import { useSearchRouter } from "@/hooks/use-search-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { z } from "zod";

const searchMaxLength = 32;

const searchSchema = z.object({
  q: z.string().max(searchMaxLength, { message: "Query too long" }).default(""),
});

export type SearchSchema = z.infer<typeof searchSchema>;

function OrderBy() {
  return (
    <div>
      <Select id="orderBy" required={true}>
        <option>Newest</option>
        <option>Most Popular</option>
      </Select>
    </div>
  );
}

export function SearchForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });
  const { updateQuery, searchTerm } = useSearchRouter();
  const [parent] = useAutoAnimate();

  const submitForm = handleSubmit(updateQuery);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const subscription = watch(() => submitForm());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <form className="mx-auto flex" ref={parent} onSubmit={submitForm}>
      <div>
        <TextInput
          id="search"
          {...register("q")}
          maxLength={searchMaxLength}
          icon={HiMagnifyingGlass}
          defaultValue={searchTerm}
          placeholder="e.g. womans size 10 adidas trainers"
        />
      </div>
      <OrderBy />
      {errors.q && (
        <p id="q_error_message" className="mt-2 text-xs text-red-400">
          {errors.q.message}
        </p>
      )}
    </form>
  );
}
