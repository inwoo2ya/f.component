import { forwardRef, useMemo } from "react";

import { IDefaultLayoutComponentProps } from "@interfaces/*";

import { Box } from "./Box";

export const Section = forwardRef(
  (props: IDefaultLayoutComponentProps, ref) => {
    const processedProps = useMemo(() => {
      const result = { ...props };
      !props.as && (result.as = "section");

      return result;
    }, [props]);

    return <Box {...processedProps} />;
  }
);
