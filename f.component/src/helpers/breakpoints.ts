import facepaint from "facepaint";
import { ObjectWithStringKey } from "../interfaces/commons";
// export const breakpoints = Object.entries({
//   sm: 640,
//   md: 768,
//   lg: 1024,
//   xl: 1280,
//   "2xl": 1536,
// }).reduce((_breakpoints, [breakpoint, size]) => {
//   _breakpoints[breakpoint] = `@media (min-width: ${size}px)`;
//   return _breakpoints;
// }, {} as ObjectWithStringKey<string>);

/*
onMobile
@media (min-width: 640px) {
  display: none;
}

onDesktop
@media (max-width: 1023px) {
  display: none;
}

onNonTablet
@media (min-width: 768px) and (max-width: 1023px) {
  display: none;
}

onTablet
@media (max-width: 639px) {
  display: none;
}

@media (min-width: 1024px) {
  display: none;
}
*/

export const breakpoints = [640, 768, 1024, 1280];

const _stringifyBetweenedBreakpoint = ([from, to]: number[]) =>
  `@media (min-width: ${from}px) and (max-width: ${to}px)`;

const _stringifyNormalBreakpoint = (
  prefix: "min" | "max",
  breakpoint: number
) => `@media (${prefix}-width: ${breakpoint}px)`;

export const stringifyBreakpoint = (
  prefix: "min" | "max" | "between",
  breakpoint: number | number[]
) => {
  return prefix === "between"
    ? _stringifyBetweenedBreakpoint(breakpoint as number[])
    : _stringifyNormalBreakpoint(prefix, breakpoint as number);
};

export const stringifyBreakpointsGeneratorFactory = (breakpoints: number[]) => {
  return (
    breakpointDatas: ["min" | "max" | "between", number | number[]][]
  ) => {
    return breakpointDatas.map(([prefix, breakpointIdx]) => {
      if (prefix === "between") {
        return stringifyBreakpoint(
          prefix,
          (breakpointIdx as number[]).map(
            (bp, idx) => breakpoints[bp] + (idx === 0 ? 0 : 1)
          )
        );
      } else {
        return stringifyBreakpoint(
          prefix,
          prefix === "min"
            ? breakpoints[breakpointIdx as number]
            : breakpoints[breakpointIdx as number] - 1
        );
      }
    });
  };
};

export const mediaQueries = facepaint(
  breakpoints.map((breakpoint) => stringifyBreakpoint("min", breakpoint))
);
