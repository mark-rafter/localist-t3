import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Select } from "flowbite-react";
import Head from "next/head";
import { DraftFeedItem } from "@/components/feed/feed-item";

const schema = z
  .object({
    title: z.string().min(3).max(16),
    size: z.enum(["xs", "small", "medium", "large", "xl"]),
    brand: z.string().max(30),
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
    defaultValues: {
      title: "",
      brand: "",
      price: 0,
    },
    resolver: async (data, context, options) => {
      console.log("formData", data);
      console.log(
        "validation result",
        await zodResolver(schema)(data, context, options)
      );
      return await zodResolver(schema)(data, context, options);
    },
  });

  return (
    <>
      <Head>
        <title>New Post | Localist</title>
      </Head>
      <div className="container mx-auto w-2/5">
        <h1 className="mb-2 text-3xl">New Post</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((d) => console.log(d))}
        >
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
              {errors.title?.message && <p>{errors.title?.message}</p>}
            </div>
            {/* <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              {...register("title")}
              placeholder="Plain white tee"
              required={true}
              color={errors.title?.message && "failure"}
              helperText={errors.title?.message && errors.title?.message}
            /> */}
          </>
          <>
            <label htmlFor="size" className="sr-only">
              Underline select
            </label>
            <Select
              id="size"
              {...register("size")}
              color={errors.size?.message && "failure"}
              helperText={errors.size?.message && errors.size?.message}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-primary-999 py-2.5 px-0 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
            >
              <option selected>Choose a size</option>
              <option value="xs">XS</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xl">XL</option>
            </Select>
          </>
          <Button
            outline={true}
            className="mb-2"
            gradientDuoTone="cyanToBlue"
            type="submit"
          >
            Create Post
          </Button>
        </form>
        <div className="mx-auto">
          <DraftFeedItem
            title={watch("title")}
            size={watch("size")}
            brand="nike"
            price={watch("price")}
          />
        </div>
      </div>
    </>
  );
};

export default NewPost;
