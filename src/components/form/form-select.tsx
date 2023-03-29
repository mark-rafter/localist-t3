import { useAutoAnimate } from "@formkit/auto-animate/react";
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
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent}>
      <label htmlFor={label} className="sr-only">
        {label} select
      </label>
      <select
        id={label}
        {...register(label)}
        aria-describedby={`${label}_error_message`}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-700 bg-gray-800 px-0 pt-2.5 text-sm text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0"
      >
        {children}
      </select>
      {error && (
        <p id={`${label}_error_message`} className="mt-2 text-xs text-red-400">
          {`Please select a ${label}`}
        </p>
      )}
    </div>
  );
}
