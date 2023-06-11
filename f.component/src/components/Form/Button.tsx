/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import _classNames from "classnames";
import { Interpolation, Theme } from "@emotion/react";
import {
  DisabledButtonProps,
  IDefaultButtonProps,
  IDefaultFormComponentProps,
} from "@interfaces/*";

export const Button = <T,>(props: IDefaultButtonProps<T>) => {
  const { disabled, children, classNames, loading, style, onClick } = props;

  const renderedButtonProp = useMemo(() => {
    if (loading) {
      return (children as JSX.Element[])?.find(
        (child) => child.type === Button.Loading
      )?.props;
    } else if (disabled) {
      return (children as JSX.Element[])?.find(
        (child) => child.type === Button.Disabled
      )?.props;
    } else return props;
  }, [props]);

  const defaultButtonCSS: Interpolation<Theme> = useMemo(() => {
    return {
      cursor: disabled && !renderedButtonProp.hoverable ? "default" : "pointer",
    };
  }, [disabled]);
  return (
    <button
      style={renderedButtonProp.style ? renderedButtonProp.style : style}
      css={{ ...defaultButtonCSS }}
      className={_classNames(
        renderedButtonProp.classNames
          ? renderedButtonProp.classNames
          : classNames
      )}
      onClick={renderedButtonProp.onClick}
      disabled={disabled}
    >
      {renderedButtonProp.children ? renderedButtonProp.children : children}
    </button>
  );
};

Button.Loading = <T,>({
  children,
  classNames,
}: IDefaultFormComponentProps<T>) => <></>;

Button.Disabled = <T,>({
  children,
  classNames,
  hoverable,
}: DisabledButtonProps<T>) => <></>;
