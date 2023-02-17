import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "flowbite-react";
import Head from "next/head";
import { DraftFeedItem } from "@/components/feed/feed-item";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";

const sizes = z.enum(["xs", "small", "medium", "large", "xl"]);

const schema = z
  .object({
    title: z.string().min(3).max(16),
    size: sizes,
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
          <FormInput label="title" register={register} error={errors.title} />
          <FormInput label="brand" register={register} error={errors.brand} />
          <FormSelect label="size" register={register} error={errors.size}>
            <option selected>Choose a size</option>
            {sizes.options.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </FormSelect>
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
