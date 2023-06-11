import { ObjectWithStringKey } from "../interfaces/commons";
import {
  IDefaultComponentEvents,
  IDefaultLayoutComponentAttributes,
} from "../interfaces/componentDefaultProps";

export const groupDefaultEventProps = (
  props: ObjectWithStringKey<any>
): IDefaultComponentEvents => {
  const {
    onClick,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onTouchCancel,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onFocus,
    onBlur,
    onScroll,
    onWheel,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
  }: IDefaultComponentEvents = props;

  return {
    onClick,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onTouchCancel,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onFocus,
    onBlur,
    onScroll,
    onWheel,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
  };
};
export const groupDefaultBoxProps = (
  props: ObjectWithStringKey<any>
): IDefaultLayoutComponentAttributes => {
  const {
    as,
    forDesktop,
    forTablet,
    forMobile,
    forNonDesktop,
    forNonTablet,
    forNonMobile,
    circle,
    ratio,
  }: IDefaultLayoutComponentAttributes = props;

  return {
    as,
    forDesktop,
    forTablet,
    forMobile,
    forNonDesktop,
    forNonTablet,
    forNonMobile,
    circle,
    ratio,
  };
};
