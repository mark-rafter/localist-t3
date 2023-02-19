import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "flowbite-react";
import Head from "next/head";
import { DraftFeedItem } from "@/components/feed/feed-item";
import { FormInput, FormNumberInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormDropUpload } from "@/components/form/form-drop-upload";
import { useState } from "react";
import type { NewPostSuccessResponse } from "@/pages/api/newpost";
import useSWRMutation from "swr/mutation";

const sizes = z.enum(["xs", "small", "medium", "large", "xl"]);

export const postSchema = z
  .object({
    title: z.string().min(3).max(16),
    size: sizes,
    brand: z.string().max(25).optional(),
    price: z.number({ invalid_type_error: "Please enter a price" }).max(9999),
  })
  .required();

export type PostSchema = z.infer<typeof postSchema>;

async function newPostRequest(url: string, { arg }: { arg: PostSchema }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json() as Promise<NewPostSuccessResponse>);
}

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/newpost",
    newPostRequest
  );

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const result = await trigger(formData);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });

  const [uploadedImageCount, setUploadedImageCount] = useState(4);

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
          onSubmit={onSubmit}
        >
          <FormInput label="title" register={register} error={errors.title} />
          <FormInput
            label="brand"
            register={register}
            error={errors.brand}
            optional={true}
          />
          <FormSelect label="size" register={register} error={errors.size}>
            <option>Choose a size</option>
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
          {/* File Upload */}
          <div className="mx-auto max-w-sm">
            <FormDropUpload height={64} className="w-full rounded-t-lg" />
            <DraftFeedItem
              title={watch("title")}
              size={watch("size")}
              brand={watch("brand")}
              price={watch("price")}
            />
            <div className="flex justify-between pt-2">
              {uploadedImageCount > 0 &&
                [...Array(uploadedImageCount).keys()].map((k) => (
                  <FormDropUpload key={k} height={32} className="rounded-lg" />
                ))}
            </div>
          </div>
          <Button
            outline={true}
            disabled={isMutating}
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
