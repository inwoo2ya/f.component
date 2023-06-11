/** @jsxImportSource @emotion/react */
import { transform } from "@babel/core";
import { Interpolation, Theme, css } from "@emotion/react";
import { ToastProps } from "@interfaces/*";
import _classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export const Toast = (props: ToastProps) => {
  const {
    classNames,
    style,
    children,
    status,
    setStatus,
    position = "bottomCenter",
    duration = 3000,
    isMultiple,
    onCloseIdx,
  } = props;

  const [toastItems, setToastItems] = useState<number[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState(-1);
  // Toast는 버튼을 누를 때마다 렌더링 되어야 함.
  const showSingleToast = () => {
    //싱글 토스트 함수
    if (!setStatus) return;
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setStatus(false);
    }, duration);
  };

  const showMultiToast = () => {
    //멀티 토스트 함수
    if (!setStatus) return;
    let idx = Math.floor(Math.random() * 150);
    // 중복되지 않는 idx 검사
    console.log("0" + idx);
    let toast = [...toastItems, idx];
    setToastItems(toast);
    setTimeout(() => {
      console.log("1" + idx);
      setCurrentIdx(idx);
    }, duration);

    setStatus(false);
  };

  useEffect(() => {
    // 삭제 훅
    console.log("delete", toastItems);
    console.log(currentIdx, toastItems);
    if (currentIdx == -1) return;

    setToastItems(
      toastItems.filter((value) => {
        return value !== currentIdx;
      })
    );
  }, [currentIdx]);

  useEffect(() => {
    // Index에서 Toast 컴포넌트 호출했을 때 반응 훅
    if (!setStatus) return;
    if (status) {
      isMultiple ? showMultiToast() : showSingleToast();
    } else {
      console.log("false");
      setVisible(false);
    }
  }, [status]);

  useEffect(() => {
    // 클릭한 Toast 삭제
    // console.log(toastItems);
    if (onCloseIdx == undefined) return;
    setToastItems(toastItems.filter((v) => v !== onCloseIdx));
  }, [onCloseIdx]);

  const positionCSS: Interpolation<Theme> = useMemo(() => {
    if (!position) return {};
    const topCSS = {
      top: 0,
      zIndex: 999,
      position: "fixed",
    };
    const bottomCSS = {
      bottom: 0,
      zIndex: 999,
      position: "fixed",
    };
    const posDistinction =
      position?.includes("Left") || position?.includes("Right");
    const rightLeft = position?.includes("Left") ? { left: 0 } : { right: 0 };
    const topBottom = position?.includes("top")
      ? { ...topCSS }
      : { ...bottomCSS };

    return {
      ...topBottom,
      ...(posDistinction
        ? rightLeft
        : { left: "50%", transform: "translate(-50%)" }),
    };
  }, [position]);

  // console.log(position, positionCSS);
  return (
    <div css={positionCSS}>
      {isMultiple
        ? toastItems.map(
            (
              v,
              k //멀티 토스트
            ) => (
              <div
                key={k}
                id={`${v}`}
                className={_classNames(classNames)}
                style={style}
                css={css`
                  position: relative;
                `}
              >
                {children}
              </div>
            )
          )
        : visible && ( //싱글 토스트
            <div
              className={_classNames(classNames)}
              style={style}
              css={css`
                position: relative;
              `}
            >
              {children}
            </div>
          )}
    </div>
  );
};
