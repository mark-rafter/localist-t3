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
import { useRouter } from "next/router";
import { api } from "@/utils/api";

const sizes = z.enum(["xs", "small", "medium", "large", "xl"]);

const clientFile = () =>
  typeof window === "undefined" ? z.undefined() : z.instanceof(File);

export const postSchema = z
  .object({
    title: z.string().min(3).max(16),
    size: sizes,
    brand: z.string().max(25).optional(),
    image1: clientFile(),
    image2: clientFile().optional(),
    image3: clientFile().optional(),
    image4: clientFile().optional(),
    image5: clientFile().optional(),
    price: z.number({ invalid_type_error: "Please enter a price" }).max(9999),
  })
  .required();

const optionalImagesKeys = postSchema
  .pick({ image2: true, image3: true, image4: true, image5: true })
  .keyof();

export type PostSchema = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const router = useRouter();
  const { mutateAsync, isLoading, isSuccess } = api.post.create.useMutation();
  const [uploadedImageCount, setUploadedImageCount] = useState(4);

  const onSubmit = handleSubmit(async (formData) => {
    const result = await mutateAsync(formData);
    if (result) {
      await router.push(`/post/${result.id}`);
    } else {
      console.error("result was empty");
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
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
            <FormDropUpload
              label="image1"
              register={register}
              error={errors.image1}
              height={64}
              className="w-full rounded-t-lg"
            />
            <DraftFeedItem
              title={watch("title")}
              size={watch("size")}
              brand={watch("brand")}
              price={watch("price")}
            />
            {/* Optional images upload */}
            <div className="flex justify-between pt-2">
              {uploadedImageCount > 0 &&
                uploadedImageCount < 5 &&
                optionalImagesKeys.options.map((label) => (
                  <FormDropUpload
                    key={label}
                    label={label}
                    register={register}
                    error={errors[label]}
                    height={32}
                    className="rounded-lg"
                  />
                ))}
            </div>
            {/* Optional images upload error messages */}
            {optionalImagesKeys.options.map(
              (label) =>
                errors[label]?.message && (
                  <p
                    key={label}
                    id={`image2to5_error_message`}
                    className="mt-2 text-xs text-red-400"
                  >
                    {label}: {errors[label]?.message}
                  </p>
                )
            )}
          </div>
          <Button
            outline={true}
            disabled={isLoading || isSuccess}
            className="mx-auto mb-2"
            gradientDuoTone="greenToBlue"
            type="submit"
          >
            Create Post
          </Button>
        </form>
      </div>
    </>
  );
}
