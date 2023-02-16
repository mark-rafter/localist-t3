import { Controller, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

import { Button, Label, Select, TextInput } from "flowbite-react";
import Head from "next/head";

const NewPost = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      size: "",
      brand: "",
      price: "",
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Head>
        <title>New Post | Localist</title>
      </Head>
      <div className="container mx-auto w-2/5">
        <h1 className="mb-3 text-3xl">New Post</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={void handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Label htmlFor="title" value="Title" />
                <TextInput
                  id="title"
                  placeholder="Plain white tee"
                  required={true}
                  // color="failure"
                  // helperText={<>Title too long!</>}
                />
              </>
            )}
          />
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <>
                <Label htmlFor="size" value="Size" />
                <Select id="size" required={true}>
                  <option>XS</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>XL</option>
                </Select>
              </>
            )}
          />
          <Button outline={true} gradientDuoTone="cyanToBlue" type="submit">
            Create Post
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
