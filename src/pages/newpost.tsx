import { Label, TextInput } from "flowbite-react";

const NewPost = () => {
  return (
    <div className="container mx-auto w-2/5">
      <h1 className="mb-3 text-3xl">New Post</h1>
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Post title" />
          </div>
          <TextInput
            id="title"
            placeholder="Plain white tee"
            required={true}
            // color="failure"
            // helperText={<>Title too long!</>}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
