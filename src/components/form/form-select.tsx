import type {
  Path,
  UseFormRegister,
  FieldValues,
  FieldError,
} from "react-hook-form";

type FormSelectProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  children: React.ReactNode;
};

export const FormSelect = <T extends FieldValues>({
  label,
  register,
  error,
  children,
}: FormSelectProps<T>) => (
  <>
    <label htmlFor={label} className="sr-only">
      {label} select
    </label>
    <select
      id={label}
      {...register(label)}
      aria-describedby={`${label}_error_message`}
      className="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-primary-999 px-0 pt-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
    >
      {children}
    </select>
    <p
      id={`${label}_error_message`}
      className="text-xs text-red-600 dark:text-red-400"
    >
      {error?.message}
    </p>
  </>
);
