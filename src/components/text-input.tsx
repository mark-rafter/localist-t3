import type {
  Path,
  UseFormRegister,
  FieldValues,
  FieldError,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export const TextInput = <T extends FieldValues>({
  label,
  register,
  error,
}: TextInputProps<T>) => (
  <>
    <label>{label}</label>
    <input {...register(label)} />
    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
      {error?.message}
    </p>
  </>
);
