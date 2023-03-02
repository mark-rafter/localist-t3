import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";

type FormDropUploadProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  height: number | string;
  className?: string;
};

export const FormDropUpload = <T extends FieldValues>({
  label,
  register,
  error,
  height,
  className,
}: FormDropUploadProps<T>) => {
  return (
    <label
      htmlFor={label}
      className={`hover:bg-bray-800 flex h-${height} w-${height} cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600 ${
        className ?? ""
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center ${
          height > 32 ? "pt-5 pb-6" : ""
        }`}
      >
        <HiOutlineCloudArrowUp className={`h-10 w-10 text-gray-400`} />
        {height > 32 && (
          <>
            <p className="my-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-400">
              PNG or JPG (max. 4000x4000px)
            </p>
            <p
              id={`${label}_error_message`}
              className="mt-2 text-xs text-red-400"
            >
              {error?.message}
            </p>
          </>
        )}
      </div>
      <input id={label} {...register(label)} type="file" className="hidden" />
    </label>
  );
};
