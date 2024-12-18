import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { HTMLInputTypeAttribute } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  defaultValue?: string | number | ReadonlyArray<string>;
  label: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: HTMLInputTypeAttribute;
  optional?: boolean;
};

export function FormInput<T extends FieldValues>({
  defaultValue,
  label,
  register,
  error,
  type,
  optional = false,
}: FormInputProps<T>) {
  const [parent] = useAutoAnimate();

  const textColor = error
    ? "text-red-500"
    : "text-gray-400 peer-focus:text-blue-500";
  return (
    <div ref={parent} className="group relative z-0 w-full">
      <input
        type={type}
        {...register(label, {
          required: !optional,
          valueAsNumber: type === "number",
        })}
        name={label}
        id={label}
        aria-describedby={`${label}_error_message`}
        aria-invalid={error ? "true" : "false"}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-0"
        placeholder=""
        defaultValue={defaultValue}
      />
      <label
        htmlFor={label}
        className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${textColor} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium`}
      >
        {capitalize(label)}
      </label>
      {error && (
        <p id={`${label}_error_message`} className="mt-2 text-xs text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}

export function FormNumberInput<T extends FieldValues>(
  props: FormInputProps<T>
) {
  return <FormInput type="number" {...props} />;
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
