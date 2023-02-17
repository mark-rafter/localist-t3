import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "flowbite-react";
import Head from "next/head";
import { DraftFeedItem } from "@/components/feed/feed-item";
import { FormInput, FormNumberInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";

const sizes = z.enum(["xs", "small", "medium", "large", "xl"]);

const schema = z
  .object({
    title: z.string().min(3).max(16),
    size: sizes,
    brand: z.string().max(25),
    price: z.coerce.number(),
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
        className="hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-t-lg border-2 border-dashed border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <HiOutlineCloudArrowUp className="mb-3 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-400">PNG or JPG (max. 4000x4000px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </>
  );

  return (
    <>
      <Head>
        <title>New Post | Localist</title>
        <meta name="description" content="Localist - create a new post" />
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
          <FormNumberInput
            label="price"
            register={register}
            error={errors.price}
          />
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
