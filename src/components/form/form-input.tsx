import type {
  Path,
  UseFormRegister,
  FieldValues,
  FieldError,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export const FormInput = <T extends FieldValues>({
  label,
  register,
  error,
}: FormInputProps<T>) => {
  const textColor = error
    ? "text-red-500"
    : "text-gray-400 peer-focus:text-blue-500";
  return (
    <div className="group relative z-0 w-full">
      <input
        {...register(label)}
        name={label}
        id={label}
        aria-describedby={`${label}_error_message`}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent py-2.5 px-0 text-sm focus:border-blue-500 focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label
        htmlFor={label}
        className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${textColor} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium`}
      >
        {label}
      </label>
      <p id={`${label}_error_message`} className="mt-2 text-xs text-red-400">
        {error?.message}
      </p>
    </div>
  );
};
