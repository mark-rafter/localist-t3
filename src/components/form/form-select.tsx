import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormSelectProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  children: React.ReactNode;
};

export function FormSelect<T extends FieldValues>({
  label,
  register,
  error,
  children,
}: FormSelectProps<T>) {
  return (
    <>
      <label htmlFor={label} className="sr-only">
        {label} select
      </label>
      <select
        id={label}
        {...register(label)}
        aria-describedby={`${label}_error_message`}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-700 bg-primary-999 px-0 pt-2.5 text-sm text-gray-400 focus:border-gray-200 focus:outline-none focus:ring-0"
      >
        {children}
      </select>
      <p id={`${label}_error_message`} className="text-xs text-red-400">
        {error && `Please select a ${label}`}
      </p>
    </>
  );
}
