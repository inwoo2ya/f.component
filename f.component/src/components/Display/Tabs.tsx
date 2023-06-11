/** @jsxImportSource @emotion/react */
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import _classNames from "classnames";
import {
  IDefaultComponentProps,
  TabsBodyProps,
  TabsProps,
} from "@interfaces/*";
import { Button } from "../Form/Button";
import { CSSTransition, Transition } from "react-transition-group";

interface tabsValue {
  body?: JSX.Element;
  head?: JSX.Element;
}
const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms`,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

// const insertKeytoBody = (
//   array: tabsValue,
//   body: JSX.Element,
//   transition?: string
// ) => {
//   array.body = React.cloneElement(body, {
//     ...body.props,
//   });
// };

export const Tabs = (props: TabsProps) => {
  const { classNames, children, transition, style } = props;
  const sortedTab = useMemo(() => {
    if (!children) return;

    let tabs: tabsValue = {};

    (children as JSX.Element[])?.filter((child) => {
      child.type === Tabs.Header ? (tabs.head = child) : (tabs.body = child);
      // : insertKeytoBody(tabs, child, transition);
    });

    return tabs;
  }, [children]);
  // console.log(sortedTab?.head?.props);
  // 의문이 든 점, 헤더 안에 버튼들에서 이벤트가 발생할 때,
  // Header에서 클릭된 버튼요소의 Key값을 어떻게 현재 아이템 인덱스 상태에 전달해 주는지
  // 클릭된 버튼요소와 클릭되지않은 버튼 요소를 어떻게 분별하는 지

  // 1. 헤더 안에 있는 버튼들에서 이벤트가 발생할 때,
  // 예를 들어 1번 버튼을 클릭하면 현재 아이템 인덱스 상태를 1번으로 지정
  // 2. 그 인덱스를 바디에 전달을 해줌
  return (
    <div className={_classNames(classNames)} style={style}>
      {sortedTab?.head}
      {sortedTab?.body}
    </div>
  );
};

Tabs.Header = ({
  classNames,
  children,
  style,
  onClick,
}: IDefaultComponentProps) => {
  onClick = (e) => {
    // console.log(e.currentTarget.children);
  };
  // const clickChildren = useMemo(() => {
  //   if (!children) return;
  //   // 클릭된 버튼 찾아서 키 값을 받고
  //   return children;
  // }, [children]);
  // console.log(clickChildren);
  return (
    //Header에 키값을 전달
    <nav className={_classNames(classNames)} style={style} onClick={onClick}>
      {children}
    </nav>
  );
};

Tabs.TabButton = Button;

Tabs.Item = ({ classNames, children, style }: IDefaultComponentProps) => (
  <div className={_classNames(classNames)} style={style}>
    {children}
  </div>
);

Tabs.Body = ({
  classNames,
  children,
  style,
  currentIdx = 0,
}: TabsBodyProps) => {
  // console.log(currentIdx);
  const [idx, setIdx] = useState<number>(0);
  const [inprop, setInprop] = useState<boolean>(false);

  useEffect(() => {
    if (idx == currentIdx) {
      setInprop(true);
    } else {
      setInprop(false);
      setIdx(currentIdx);
    }
  }, [children, idx]);
  // console.log(inprop);
  return (
    <CSSTransition classNames="fade" in={inprop} timeout={duration}>
      <div
        className={_classNames(classNames)}
        style={{ ...defaultStyle, ...transitionStyles }}
      >
        {children}
      </div>
    </CSSTransition>
  );
};
