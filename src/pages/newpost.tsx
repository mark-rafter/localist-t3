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

const sizes = z.enum(["xs", "small", "medium", "large", "xl"]);

const schema = z
  .object({
    title: z.string().min(3).max(16),
    size: sizes,
    brand: z.string().max(25).optional(),
    price: z.number({ invalid_type_error: "Please enter a price" }).max(9999),
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
          onSubmit={handleSubmit((d) => console.log(d))}
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
          <>
            <div className="mx-auto max-w-sm">
              {/* {DropUpload} */}
              <FormDropUpload height={64} className="w-full rounded-t-lg" />
              <DraftFeedItem
                title={watch("title")}
                size={watch("size")}
                brand="nike"
                price={watch("price")}
              />
              <div className="flex justify-between pt-2">
                {uploadedImageCount > 0 &&
                  [...Array(uploadedImageCount).keys()].map((k) => (
                    <FormDropUpload
                      key={k}
                      height={32}
                      className="rounded-lg"
                    />
                  ))}
              </div>
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
