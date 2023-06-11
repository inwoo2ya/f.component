import React, { useMemo } from "react";
import _classNames from "classnames";
import { Button } from "./Button";
import { LinkButtonProps } from "@interfaces/*";

// Button 상속

export const LinkButton = <T,>(props: LinkButtonProps<T>) => {
  const { classNames, children, style, disabled, target, href, loading } =
    props;
  const renderedButtonProps = useMemo(() => {
    if (loading) {
      return (children as JSX.Element[])?.find(
        (child) => child.type === LinkButton.Loading
      )?.props;
    } else if (disabled) {
      return (children as JSX.Element[])?.find(
        (child) => child.type === LinkButton.Disabled
      )?.props;
    } else {
      return props;
    }
  }, [props]);

  return (
    <a href={renderedButtonProps.href} target={renderedButtonProps.target}>
      <Button
        style={renderedButtonProps.style ? renderedButtonProps.style : style}
        classNames={[
          renderedButtonProps.classNames
            ? renderedButtonProps.classNames
            : classNames,
        ]}
        onClick={renderedButtonProps.onClick}
        disabled={disabled}
      >
        {renderedButtonProps.children ? renderedButtonProps.children : children}
      </Button>
    </a>
  );
};

LinkButton.Loading = Button.Loading;
LinkButton.Disabled = Button.Disabled;
