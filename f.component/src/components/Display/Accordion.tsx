/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import _classNames from "classnames";
import { AccordionProps, IDefaultComponentProps } from "@interfaces/*";
import { css } from "@emotion/react";

type itemsValue = {
  head?: JSX.Element;
  detail?: JSX.Element;
};
type headValueType = {
  chevron?: JSX.Element;
  title?: JSX.Element | string;
};
type AccordionItemProps = IDefaultComponentProps & {
  disabled?: boolean;
};
const reactCloneElement = ({
  element,
  func,
}: {
  element: JSX.Element;
  func?: () => void;
}) => {
  return React.cloneElement(element, { ...element.props, onClick: func });
};

export const Accordion = (props: AccordionProps) => {
  const { classNames, children, style, onSelect, multiSelectable } = props;
  const childrenArray = children as JSX.Element[];
  const [accordionValueArray, setAccordionValueArray] = useState<string[]>([]); //multiSelectable이 true 일때
  const [accordionValue, setAccordionValue] = useState(""); //multiSelectable false 일때

  const accordionHandler = useCallback(
    // accordionValue, accordionValueArray가 수정 및 생성 될때마다 함수 재사용
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const headValue = e.currentTarget.firstChild?.textContent as string;
      if (multiSelectable) {
        if (accordionValueArray.includes(headValue)) {
          return setAccordionValueArray(
            accordionValueArray.filter((child) => child !== headValue)
          );
        }
        return setAccordionValueArray([...accordionValueArray, headValue]);
      } else {
        if (accordionValue == headValue) {
          return setAccordionValue("");
        }
        return setAccordionValue(headValue);
      }
    },
    [accordionValue, accordionValueArray, multiSelectable]
  );

  useEffect(() => {
    //사용자가 선택한 값을 전달 (accordionValue,accordionValueArray 변경때마다 호출)
    if (!onSelect) return;
    if (multiSelectable) {
      onSelect(accordionValueArray);
    } else {
      onSelect(accordionValue);
    }
  }, [accordionValue, accordionValueArray, multiSelectable]);

  const childrenWithEvent = useMemo(() => {
    //item children에게 onSelect Props를 넘겨준다.
    const childrenArr: JSX.Element[] = [];
    childrenArray.filter((child) =>
      child.type === Accordion.Item
        ? childrenArr.push(
            reactCloneElement({
              element: child,
              func: accordionHandler as () => void,
            })
          )
        : childrenArr.push(child)
    );
    return childrenArr;
  }, [children, onSelect]);
  return (
    <div className={_classNames(classNames)} style={style}>
      {childrenWithEvent}
    </div>
  );
};

Accordion.Item = ({
  classNames,
  children,
  style,
  disabled,
  onClick,
}: AccordionItemProps) => {
  const childrenArray = children as JSX.Element[];

  const itemChildrens = useMemo(() => {
    const accordionItemValue: itemsValue = {};
    childrenArray?.find((child) => {
      //head children에게 onClick prop을 넘겨준다.
      child.type === Accordion.Head
        ? (accordionItemValue.head = reactCloneElement({
            element: child,
            func: disabled ? undefined : (onClick as () => void),
          }))
        : (accordionItemValue.detail = child);
    });
    return accordionItemValue;
  }, [children]);

  return (
    <div className={_classNames(classNames)} style={style}>
      {itemChildrens.head}
      {itemChildrens.detail}
    </div>
  );
};

Accordion.Head = ({
  classNames,
  children,
  style,
  onClick,
}: IDefaultComponentProps) => {
  const childrenArray = children as JSX.Element[];
  // const [open, setOpen] = useState(false);
  const headChildrens = useMemo(() => {
    const headValue: headValueType = {};
    if (typeof childrenArray === "object") {
      // Element[] 일 때,
      childrenArray?.find((child) => {
        headValue[child.type === Accordion.Chevron ? "chevron" : "title"] =
          child;
      });
    } else {
      // Element일 때,
      headValue["title"] = children as JSX.Element;
    }
    return headValue;
  }, [children]);
  return (
    <button
      className={_classNames(classNames)}
      style={style}
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
      `}
      onClick={onClick}
    >
      {headChildrens.title}
      {headChildrens.chevron}
    </button>
  );
};

Accordion.Chevron = ({
  classNames,
  children,
  style,
  onClick,
}: IDefaultComponentProps) => {
  return (
    <div className={_classNames(classNames)} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

Accordion.Detail = ({
  classNames,
  children,
  style,
}: IDefaultComponentProps) => {
  return (
    <div className={_classNames(classNames)} style={style}>
      {children}
    </div>
  );
};
