import { IDefaultFormComponentProps } from "@lavarwave/f.component";

export const Test = <T,>({
  value,
  onChange,
}: IDefaultFormComponentProps<T>) => {
  return (
    <button onClick={(_) => onChange && onChange(value)}>
      {value as number}
    </button>
  );
};
