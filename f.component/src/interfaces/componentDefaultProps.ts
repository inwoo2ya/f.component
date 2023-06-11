import {
  ElementType,
  ComponentType,
  CSSProperties,
  MouseEventHandler,
  TouchEventHandler,
  FocusEventHandler,
  UIEventHandler,
  WheelEventHandler,
  AnimationEventHandler,
  TransitionEventHandler,
  KeyboardEventHandler,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

type ClassNames = string | string[];
type Children = string | JSX.Element | string[] | JSX.Element[];

export type { ClassNames, Children };

export interface IDefaultComponentEvents {
  onClick?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onTouchCancel?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchStart?: TouchEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onScroll?: UIEventHandler;
  onWheel?: WheelEventHandler;
  onAnimationStart?: AnimationEventHandler;
  onAnimationEnd?: AnimationEventHandler;
  onAnimationIteration?: AnimationEventHandler;
  onTransitionEnd?: TransitionEventHandler;
}

export interface IDefaultInputableEvents {
  onKeyDown?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
}
export interface IDefaultComponentAttributes {
  classNames?: ClassNames;
  children?: Children | ReactNode;
  style?: CSSProperties;
}
export interface IDefaultLayoutComponentAttributes {
  as?: string;
  forDesktop?: boolean;
  forTablet?: boolean;
  forMobile?: boolean;
  forNonDesktop?: boolean;
  forNonTablet?: boolean;
  forNonMobile?: boolean;
  circle?: boolean;
  ratio?: number;
}

export interface IDefaultFormComponentAttributes<T> {
  value?: T;
  disabled?: boolean;
  onChange?: (e: T) => void;
}

export interface IDefaultComponentProps
  extends IDefaultComponentEvents,
    IDefaultComponentAttributes {}

export interface IDefaultLayoutComponentProps
  extends IDefaultComponentProps,
    IDefaultLayoutComponentAttributes {}

export interface IDefaultFormComponentProps<T>
  extends IDefaultComponentProps,
    IDefaultFormComponentAttributes<T>,
    IDefaultInputableEvents {}

//form
export interface IDefaultButtonProps<T> extends IDefaultFormComponentProps<T> {
  loading?: boolean;
}

export interface DisabledButtonProps<T> extends IDefaultFormComponentProps<T> {
  hoverable?: boolean;
}
export interface LinkButtonProps<T> extends IDefaultButtonProps<T> {
  href?: string;
  target?: string;
}
export interface IDefaultSelectProps<T> extends IDefaultFormComponentProps<T> {
  displayedValueFormatter?: (data: any) => string;
  valueFormatter?: (data: any) => any;
  onSelect?: (idx: any) => void;
  labelUnChangeable?: boolean;
  multiSelectable?: boolean;
}
export interface SelectOptionGroupOrLabelProps extends IDefaultComponentProps {
  title?: string;
}
export interface SelectLabelProps extends IDefaultComponentProps {}
export interface SelectOptionProps extends IDefaultComponentProps {
  data?: any;
  asInitial?: boolean;
}
export interface IDefaultInputComponentProps<T>
  extends IDefaultFormComponentProps<T> {
  placeholder?: string;
  multilined?: boolean;
  asEditableBox?: boolean;
  debounce?: number;
}
export interface AddonProps<T> extends IDefaultInputComponentProps<T> {
  position?: string;
}
//util
export interface DrawerProps extends IDefaultComponentProps {
  from?: string;
  query?: { [key: string]: string } | string;
  withoutQueryString?: boolean;
  darkenedBackdrop?: boolean;
  status?: boolean;
  backdropOnClick?: MouseEventHandler;
}
export interface SearcherProps extends IDefaultComponentProps {
  queryKey?: string;
  withoutQueryString?: boolean;
  disabledEnter?: boolean;
  onSearch?: (searchString: string) => void;
}

export interface IDefaultInfinityScrollerProps extends IDefaultComponentProps {
  sensitive?: number;
  onBottomHit?: () => void;
  loader?: JSX.Element;
}

// display
export interface TabsProps extends IDefaultComponentProps {
  transition?: string;
}

export interface TabsBodyProps extends IDefaultComponentProps {
  currentIdx?: number;
}
export interface TagProps extends IDefaultComponentProps {
  circle?: boolean;
  onDelete?: () => void;
}
export interface AccordionProps extends IDefaultComponentProps {
  multiSelectable?: boolean;
  onSelect?: (value: string | string[]) => void;
}
//Feedback
export interface ToastProps extends IDefaultComponentProps {
  setStatus?: (value: boolean | string) => void;
  onCloseIdx?: number;
  status?: boolean;
  position?: string;
  duration?: number;
  isMultiple?: boolean;
}
// overlay
export interface ModalProps extends IDefaultComponentProps {
  status?: boolean;
  scrollPosition?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}
export interface ModalBackdropProps extends IDefaultComponentProps {
  sleepy?: boolean;
}
export interface ModalFooterProps extends IDefaultComponentProps {
  onClose?: () => void;
  onSubmit?: () => void;
}
