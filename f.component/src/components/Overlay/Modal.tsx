/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import _classNames from "classnames";
import {
  IDefaultButtonProps,
  IDefaultComponentProps,
  ModalBackdropProps,
  ModalFooterProps,
  ModalProps,
} from "@interfaces/*";
import { Button } from "../Form/Button";
import { css } from "@emotion/react";

interface ModalValue {
  backdrop?: JSX.Element;
  header?: JSX.Element;
  body?: JSX.Element;
  footer?: JSX.Element;
}

const darkenedBackdropCSS = css`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
const modalCSS = css`
  z-index: 2;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;
const reactCloneElement = ({
  element,
  func,
}: {
  element: JSX.Element;
  func?: () => void;
}): JSX.Element => {
  return React.cloneElement(element, {
    ...element.props,
    onClick: func,
  });
};
export const Modal = (props: ModalProps) => {
  const {
    status = false,
    scrollPosition = "right",
    onClose,
    onSubmit,
    classNames,
    children,
    style,
  } = props;
  const childrenArray = children as JSX.Element[];
  const modalLayout = useMemo(() => {
    //각 모달의 머리,몸통,다리,뒷배경 선언
    if (!children) return;
    let modalValues: ModalValue = {};

    childrenArray?.find((child) => {
      if (child.type === Modal.Footer) {
        modalValues.footer = React.cloneElement(child, {
          ...child.props,
          onClose: onClose,
          onSubmit: onSubmit,
        });
        return;
      } else if (child.type === Modal.Header) {
        modalValues.header = reactCloneElement({
          element: child,
          func: onClose,
        });
        return;
      }
      child.type === Modal.Backdrop
        ? (modalValues.backdrop = child)
        : (modalValues.body = child);
    });
    return modalValues;
  }, [children]);

  return (
    <>
      {status ? (
        <>
          {modalLayout?.backdrop}
          <div className={_classNames(classNames)} style={style} css={modalCSS}>
            {/* //모달 머리, 몸통, 발 */}
            {modalLayout?.header}
            {modalLayout?.body}
            {modalLayout?.footer}
          </div>
        </>
      ) : null}
    </>
  );
};

Modal.Backdrop = ({
  // 모달의 뒷 배경
  classNames,
  style,
  sleepy = false,
  children,
  onClick,
}: ModalBackdropProps) => {
  return (
    <div
      className={_classNames(classNames)}
      css={darkenedBackdropCSS}
      onClick={sleepy ? () => {} : onClick}
    />
  );
};

Modal.Body = ({ classNames, style, children }: IDefaultComponentProps) => (
  //Modal의 contents를 담는 몸통
  <div
    className={_classNames(classNames)}
    style={style}
    css={css`
      height: calc(100% - 20%);
      overflow-y: auto;
    `}
  >
    {children}
  </div>
);

Modal.Header = ({
  //Modal의 제목, 나가기버튼을 담는 헤더
  classNames,
  style = { position: "relative" },
  children,
  onClick,
}: IDefaultComponentProps) => {
  const childrenArray = children as JSX.Element[];

  const headerChilds = useMemo(() => {
    if (!children) return;
    let headerChildren: JSX.Element[] = [];

    childrenArray?.find((child) => {
      child.type === Modal.CloseButton
        ? headerChildren?.push(
            reactCloneElement({ element: child, func: onClick as () => void })
          )
        : headerChildren?.push(child);
    });
    return headerChildren;
  }, [children]);
  //Close 버튼이랑 Submit 버튼이랑 어떻게 구분 해야하는가?? Props를 넣어주면 된다.?
  // 둘다 같은 컴포넌트를 상속함
  // console.log(headerChilds);
  return (
    <div className={_classNames(classNames)} style={style}>
      {headerChilds?.map((v, k) => (
        <div className={"inline-block"} key={k}>
          {v}
        </div>
      ))}
    </div>
  );
};

Modal.Footer = ({
  // Modal의 submit,close 버튼을 담고 있는 바닥
  classNames,
  style,
  children,
  onClose,
  onSubmit,
}: ModalFooterProps) => {
  const childrenArray = children as JSX.Element[];
  const footerChilds = useMemo(() => {
    let footerChildren: JSX.Element[] = [];
    childrenArray?.find((child, k) => {
      if (child.type == Modal.CloseButton || child.type == Modal.SubmitButton) {
        footerChildren?.push(
          reactCloneElement({
            element: child as JSX.Element,
            func: child.type === Modal.CloseButton ? onClose : onSubmit,
          })
        );
        return;
      }
      footerChildren?.push(child);
    });
    // console.log(footerChildren);
    return footerChildren;
  }, [children]);
  return (
    <div className={_classNames(classNames)} style={style}>
      {footerChilds.map((v, k) => (
        <div className="inline-block" key={k}>
          {v}
        </div>
      ))}
    </div>
  );
};
Modal.CloseButton = <T,>(props: IDefaultButtonProps<T>) => (
  <Button {...props} />
);
Modal.SubmitButton = <T,>(props: IDefaultButtonProps<T>) => (
  <Button {...props} />
);
