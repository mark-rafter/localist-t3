import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type FormControllerProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
} & React.PropsWithChildren;

export function FormController<T extends FieldValues>(
  props: FormControllerProps<T>
) {
  // todo: inject register and errors to each Form component
  return <>{props.children}</>;
}
