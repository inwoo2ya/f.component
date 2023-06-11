/** @jsxImportSource @emotion/react */

import _classNames from "classnames";
import {
  ElementType,
  forwardRef,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";

import {
  IDefaultLayoutComponentProps,
  ObjectWithStringKey,
} from "@interfaces/index";
import {
  breakpoints,
  stringifyBreakpoint,
  mediaQueries,
  stringifyBreakpointsGeneratorFactory,
  groupDefaultEventProps,
} from "@helpers/index";
import { Interpolation, Theme } from "@emotion/react";

const breakpointsGenerator = stringifyBreakpointsGeneratorFactory(breakpoints);

export const Box = forwardRef((props: IDefaultLayoutComponentProps, ref) => {
  const { classNames, children, style } = props;
  const {
    as = "div",
    forDesktop,
    forTablet,
    forMobile,
    forNonDesktop,
    forNonTablet,
    forNonMobile,
    circle,
    ratio,
  } = props;
  const defaultEvents = groupDefaultEventProps(props);

  const Tag = useMemo(
    () => `${as}` as keyof JSX.IntrinsicElements & ElementType,
    [as]
  );

  useEffect(() => {
    if (ratio && typeof children !== "object") {
      throw new Error(
        "ratio 속성을 사용하기 위해서는, children이 Element 타입이어야 합니다!"
      );
    }
  }, [children, ratio]);

  const [innerRef, setInnerRef] = useState<HTMLElement>();

  const displayDataAttribute = useMemo(() => {
    if (
      !forDesktop &&
      !forTablet &&
      !forMobile &&
      !forNonDesktop &&
      !forNonTablet &&
      !forNonMobile
    )
      return;

    const dataAttributes: ObjectWithStringKey<boolean> = {};

    !(forDesktop || forNonTablet || forNonMobile) &&
      (dataAttributes["data-not-desktop"] = true);
    !(forTablet || forNonDesktop || forNonMobile) &&
      (dataAttributes["data-not-tablet"] = true);
    !(forMobile || forNonDesktop || forNonTablet) &&
      (dataAttributes["data-not-mobile"] = true);

    return dataAttributes;
  }, [
    forDesktop,
    forTablet,
    forMobile,
    forNonDesktop,
    forNonTablet,
    forNonMobile,
  ]);

  const displayCSS: Interpolation<Theme> = useMemo(() => {
    const state: { [key: string]: { display: string } } = {};

    let hiddenPoints: string[] = [];

    forDesktop && (hiddenPoints = breakpointsGenerator([["max", 2]]));
    forTablet &&
      (hiddenPoints = breakpointsGenerator([
        ["max", 0],
        ["min", 2],
      ]));
    forMobile && (hiddenPoints = breakpointsGenerator([["min", 0]]));
    forNonDesktop && (hiddenPoints = breakpointsGenerator([["min", 2]]));
    forNonTablet &&
      (hiddenPoints = breakpointsGenerator([["between", [0, 2]]]));
    forNonMobile && (hiddenPoints = breakpointsGenerator([["max", 0]]));

    hiddenPoints.forEach((point) => (state[point] = { display: "none" }));

    return state;
  }, [
    forDesktop,
    forTablet,
    forMobile,
    forNonDesktop,
    forNonTablet,
    forNonMobile,
  ]);

  const circleCSS: Interpolation<Theme> = useMemo(() => {
    if (!circle) return {};

    return {
      borderRadius: "99999px",
      overflow: "hidden",
    };
  }, [circle]);

  const ratioCSS: Interpolation<Theme> = useMemo(() => {
    if (!ratio) return {};

    return {
      position: "relative",
      "&::before": {
        height: 0,
        content: "''",
        display: "block",
        paddingBottom: `${ratio * 100}%`,
      },
      "& > *": {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      },
    };
  }, [ratio]);

  const ratioDataAttribute = useMemo(() => {
    if (!ratio || !innerRef) return {};

    const { height, width } = innerRef.getBoundingClientRect();

    return {
      "data-rendered-size": `w${width}/h${height}`,
    };
  }, [ratio, innerRef]);

  return (
    <Tag
      ref={(node: HTMLElement) => {
        setInnerRef(node);

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      style={style}
      css={{ ...displayCSS, ...circleCSS, ...ratioCSS }}
      className={_classNames(...classNames)}
      {...{ ...defaultEvents, ...displayDataAttribute, ...ratioDataAttribute }}
    >
      {children}
    </Tag>
  );
});
