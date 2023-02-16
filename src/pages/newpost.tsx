import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Label, Select, TextInput } from "flowbite-react";
import Head from "next/head";

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
  } = useForm<NewPostSchema>({
    defaultValues: {
      title: "",
      size: "medium",
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
        <h1 className="mb-3 text-3xl">New Post</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((d) => console.log(d))}
        >
          <>
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              placeholder="Plain white tee"
              required={true}
              {...register("title")}
              // color="failure"
              // helperText={<>Title too long!</>}
            />
            {errors.title?.message && <p>{errors.title?.message}</p>}
          </>
          <>
            <Label htmlFor="size" value="Size" />
            <Select id="size" required={true} {...register("size")}>
              <option value="xs">XS</option>
              <option value="small">Small</option>
              <option value="medium" defaultValue="medium">
                Medium
              </option>
              <option>Large</option>
              <option>XL</option>
            </Select>
            {errors.size?.message && <p>{errors.size?.message}</p>}
          </>
          <Button outline={true} gradientDuoTone="cyanToBlue" type="submit">
            Create Post
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
