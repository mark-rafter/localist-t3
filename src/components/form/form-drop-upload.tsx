import { useAutoAnimate } from "@formkit/auto-animate/react";
import { compressAccurately } from "image-conversion";
import { useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";

type FormDropUploadProps<T extends FieldValues> = {
  height: number;
  label: Path<T>;
  register: UseFormRegister<T>;
  onFileChanged: (value: string) => void;
  error?: FieldError;
  className?: string;
};

export function FormDropUpload<T extends FieldValues>({
  height,
  label,
  register,
  onFileChanged,
  error,
  className,
}: FormDropUploadProps<T>) {
  const [parent] = useAutoAnimate();
  const [uploadedFile, setUploadedFile] = useState<string | undefined>(
    undefined
  );

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target?.files?.item(0);
    if (!selectedFile) {
      console.error("No file selected");
      debugger;
      return;
    }
    const compressedFile = await compressAccurately(selectedFile, 100);

    console.log("compressedFile", compressedFile);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedFile(reader.result);
        onFileChanged(reader.result);
      }
    };
  }

  if (uploadedFile) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="fade-in z-10"
        src={uploadedFile}
        alt="Uploaded file preview"
      />
    );
  }

  return (
    <label
      htmlFor={label}
      className={`hover:bg-bray-800 flex h-${height} w-${height} cursor-pointer flex-col items-center justify-center border-2 border-dashed ${
        error ? "border-red-700" : "border-gray-600"
      } bg-gray-700 hover:border-gray-500 hover:bg-gray-600 ${className ?? ""}`}
    >
      <div
        ref={parent}
        className={`flex flex-col items-center justify-center ${
          height > 32 ? "pb-6 pt-5" : ""
        }`}
      >
        <HiOutlineCloudArrowUp className={`h-10 w-10 text-gray-400`} />
        {height > 32 && (
          <>
            <p className="my-2 text-sm font-semibold text-gray-400">
              Click to upload
            </p>
            <p className="text-xs text-gray-400">
              PNG or JPG (max. 4000x4000px)
            </p>
            {error && (
              <p
                id={`${label}_error_message`}
                className="mt-2 text-xs text-red-400"
              >
                {error.message}
              </p>
            )}
          </>
        )}
      </div>
      <input
        id={label}
        {...register(label)}
        type="file"
        accept="image/*"
        className="hidden"
        aria-invalid={error ? "true" : "false"}
        onChange={handleFile}
      />
    </label>
  );
}
