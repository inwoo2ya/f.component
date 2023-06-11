/** @jsxImportSource @emotion/react */

import { useMemo } from "react";

import { mediaQueries } from "@helpers/index";
import { IDefaultFormComponentProps } from "@interfaces/index";

export const Hello = <T,>({
  value,
  onChange,
}: IDefaultFormComponentProps<T>) => {
  const test = useMemo(() => "Hi", []);

  return (
    <button
      css={mediaQueries({
        color: ["orange", "red", "blue", "yellow"],
      })}
    >
      {test} {value as any}
    </button>
  );
};
