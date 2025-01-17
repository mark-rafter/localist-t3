import { DraftFeedItem } from "@/components/feed";
import {
  FormDropUpload,
  FormInput,
  FormNumberInput,
  FormSelect,
} from "@/components/form";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import PostSchema from "prisma/generated/zod/modelSchema/PostSchema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const newPostSchema = z
  .object({
    title: PostSchema.shape.title
      .min(3, { message: "Title too short" })
      .max(16, { message: "Title too long" }),
    size: PostSchema.shape.size,
    brand: z.string().max(25, { message: "Brand too long" }).optional(),
    images: PostSchema.shape.images,
    price: PostSchema.shape.price
      .min(-999)
      .max(9999, { message: "Max price is 9999" }),
  })
  .required();

export type NewPostSchema = z.infer<typeof newPostSchema>;

export default function NewPostPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<NewPostSchema>({
    resolver: zodResolver(newPostSchema),
  });

  const router = useRouter();
  const { mutateAsync, isLoading, isSuccess } = api.post.create.useMutation();

  const submitForm = handleSubmit(async (formData) => {
    const result = await toast.promise(mutateAsync(formData), {
      loading: "Submitting...",
      success: "Post submitted! Redirecting...",
      error: "Failed to submit!",
    });
    if (result) {
      await router.push(`/myposts`);
    }
  });

  return (
    <>
      <Head>
        <title>New Post | Localist</title>
        <meta name="description" content="Localist - create a new post" />
      </Head>
      <div className="container mx-auto max-w-sm pl-2">
        <h1 className="mb-2 text-center text-3xl">New Post</h1>
        <form className="flex flex-col gap-4" onSubmit={submitForm}>
          <FormInput label="title" register={register} error={errors.title} />
          <FormInput
            label="brand"
            register={register}
            error={errors.brand}
            optional={true}
          />
          <FormSelect label="size" register={register} error={errors.size}>
            <option>Choose a size</option>
            {newPostSchema.shape.size.options.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </FormSelect>
          <FormNumberInput
            defaultValue={0}
            label="price"
            register={register}
            error={errors.price}
          />
          {/* File Upload */}
          <div className="mx-auto max-w-sm">
            <FormDropUpload
              label="images.0"
              register={register}
              error={errors.images && errors.images[0]}
              height={64}
              className="w-full rounded-t-lg"
              onFileChanged={(value) =>
                setValue("images.0", value, { shouldValidate: true })
              }
            />
            <DraftFeedItem
              title={watch("title")}
              size={watch("size")}
              price={watch("price")}
            />
            {/* Optional images upload */}
            {/* <div className="flex justify-between pt-2">
              {[2, 3, 4, 5, 6].map((k) => (
                <FormDropUpload
                  key={k}
                  label={`images.${k}`}
                  register={register}
                  error={errors.images && errors.images[k]}
                  height={32}
                  className="rounded-lg"
                  onFileChanged={(value) =>
                    setValue(`images.${k}`, value, {
                      shouldValidate: true,
                    })
                  }
                />
              ))}
            </div>
            {[2, 3, 4, 5, 6].map((k) => (
              <ErrorMessage
                key={k}
                errors={errors}
                name={`images.${k}`}
                render={({ message }) => (
                  <p className="mt-2 text-xs text-red-400">
                    Image {k}: {message}
                  </p>
                )}
              />
            ))} */}
          </div>
          <Button
            outline={true}
            disabled={isLoading || isSuccess}
            className="mx-auto mb-2 w-64"
            gradientDuoTone="greenToBlue"
            type="submit"
          >
            <span className="text-lg font-semibold sm:text-base">
              Create Post
            </span>
          </Button>
        </form>
      </div>
    </>
  );
}
