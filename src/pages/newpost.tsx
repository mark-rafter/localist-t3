import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "flowbite-react";
import Head from "next/head";
import { DraftFeedItem } from "@/components/feed/feed-item";
import { TextInput } from "@/components/text-input";

const schema = z
  .object({
    title: z.string().min(3).max(16),
    size: z.enum(["xs", "small", "medium", "large", "xl"]),
    brand: z.string().max(25),
    price: z.number(),
  })
  .required();

type NewPostSchema = z.infer<typeof schema>;

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPostSchema>({
    resolver: zodResolver(schema),
  });

  const DropUpload = (
    <>
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-t-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="mb-3 h-10 w-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG or JPG (MAX. 4000x4000px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </>
  );

  return (
    <>
      <Head>
        <title>New Post | Localist</title>
      </Head>
      <div className="container mx-auto max-w-sm pl-2">
        <h1 className="mb-2 text-center text-3xl">New Post</h1>
        <form
          className="flex flex-col gap-4"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((d) => console.log(d))}
        >
          <TextInput label="brand" register={register} error={errors.brand} />
          <>
            <div className="group relative z-0 mt-6 w-full">
              <input
                {...register("title")}
                name="title"
                id="title"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="title"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Title
              </label>
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.title?.message}
              </p>
            </div>
          </>
          <>
            <label htmlFor="size" className="sr-only">
              Size select
            </label>
            <select
              id="size"
              {...register("size")}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-primary-999 py-2.5 px-0 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
            >
              <option selected>Choose a size</option>
              <option value="xs">XS</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xl">XL</option>
            </select>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.size?.message}
            </p>
          </>
          <>
            <div className="mx-auto max-w-sm">
              {DropUpload}
              <DraftFeedItem
                title={watch("title")}
                size={watch("size")}
                brand="nike"
                price={watch("price")}
              />
            </div>
          </>
          <Button
            outline={true}
            className="mx-auto mb-2"
            gradientDuoTone="cyanToBlue"
            type="submit"
          >
            Create Post
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
