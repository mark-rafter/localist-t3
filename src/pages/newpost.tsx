import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
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
import PostSchema from "prisma/generated/zod/modelSchema/PostSchema";

export const newPostSchema = z
  .object({
    title: PostSchema.shape.title
      .min(3, { message: "Title too short" })
      .max(16, { message: "Title too long" }),
    size: PostSchema.shape.size,
    brand: z.string().max(25, { message: "Title too long" }).optional(),
    images: PostSchema.shape.images,
    price: PostSchema.shape.price
      .min(-9999)
      .max(9999, { message: "Max price is 9999" }),
  })
  .required();

export type NewPostSchema = z.infer<typeof newPostSchema>;

export default function NewPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPostSchema>({
    resolver: zodResolver(newPostSchema),
  });

  const router = useRouter();
  const { mutateAsync, isLoading, isSuccess } = api.post.create.useMutation();

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  const [uploadedImageCount, setUploadedImageCount] = useState(4);

  function getImages() {
    const images = [image1];
    images.push(image1);
    if (image2) images.push(image2);
    if (image3) images.push(image3);
    if (image4) images.push(image4);
    if (image5) images.push(image5);
    return images;
  }

  const onSubmit = handleSubmit(async (formData) => {
    const result = await mutateAsync({
      ...formData,
      images: getImages(),
    });
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
            {newPostSchema.shape.size.options.map((size) => (
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
              label="images.1"
              register={register}
              error={errors.images && errors.images[0]}
              height={64}
              className="w-full rounded-t-lg"
              onFileChanged={setImage1}
            />
            <DraftFeedItem
              title={watch("title")}
              size={watch("size")}
              price={watch("price")}
            />
            {/* Optional images upload */}
            <div className="flex justify-between pt-2">
              {uploadedImageCount > 0 &&
                uploadedImageCount < 5 &&
                [...Array(5).keys()].map((k) => (
                  <FormDropUpload
                    key={k + 1}
                    label={`images.${k + 1}`}
                    register={register}
                    error={errors.images && errors.images[k + 1]}
                    height={32}
                    className="rounded-lg"
                    // todo: will bug
                    onFileChanged={setImage2}
                  />
                ))}
            </div>
            {/* Optional images upload error messages */}
            {[...Array(5).keys()].map((k) => (
              <ErrorMessage
                key={k + 1}
                errors={errors}
                name={`images.${k + 1}`}
                render={({ message }) => (
                  <p className="mt-2 text-xs text-red-400">
                    Image {k + 1}: {message}
                  </p>
                )}
              />
            ))}
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
