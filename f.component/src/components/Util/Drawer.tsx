/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useRef, useState } from "react";
import _classNames from "classnames";
import { DrawerProps, IDefaultComponentProps } from "@interfaces/*";
import { useRouter } from "next/router";
import { css, Interpolation, Theme } from "@emotion/react";

const darkenedBackdropCSS = css`
  position: fixed;
  /* z-index: 100; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Drawer = (props: DrawerProps) => {
  const {
    classNames,
    from,
    query,
    withoutQueryString,
    style,
    darkenedBackdrop = false,
    children,
    status = false,
    backdropOnClick,
  } = props;
  const router = useRouter();

  useEffect(() => {
    // 쿼리 스트링 생성 및 삭제
    // console.log(router);
    if (!withoutQueryString) {
      if (status) {
        if (query !== null && query !== undefined) {
          router.push({
            query: {
              ...router.query,
              ...(query as object),
            },
          });
        }
      } else {
        router.push({});
      }
    }
  }, [status]);

  const appearedDirectionCSS: Interpolation<Theme> = useMemo(() => {
    // 2) from에 따라서 drawer가 나타나는 CSS 구현
    if (!from) return {};

    if (!status) {
      // from이 top|bottom|left|right 중에 하나인가?

      return {
        transform: `translate${"top|bottom".includes(from) ? "Y" : "X"}(${
          "top|left".includes(from) ? "-" : ""
        }100%)`,
      };
    } else {
      return {
        transform: `translate${"top|bottom".includes(from) ? "Y" : "X"}(0%)`,
      };
    }
  }, [from, status]);

  const defaultCSS: Interpolation<Theme> = useMemo(() => {
    //1) from에 따른 Drawer 크기(width,height) 및 위치 설정
    if (!from) return {};

    const horizonCSS = {
      //수평 (RIGHT,LEFT)
      position: "fixed",
      top: 0,
      bottom: 0,
      height: "100vh", //h-screen
      overflowY: "auto",
      // zIndex: 200,
    };
    const verticalCSS = {
      //수직 (TOP,BOTTOM)
      position: "fixed",
      right: 0,
      left: 0,
      overflowX: "auto",
      // zIndex: 200,
    };
    if ("top|bottom".includes(from)) {
      return {
        ...verticalCSS,
        ...(from === "top" ? { top: 0 } : { bottom: 0 }),
      };
    } else {
      return {
        ...horizonCSS,
        ...(from === "left" ? { left: 0 } : { right: 0 }),
      };
    }
  }, [from]);

  return (
    <>
      <div
        css={
          //뒷 배경이 어두워지는 CSS
          darkenedBackdrop && status ? { ...darkenedBackdropCSS } : null
        }
        onClick={backdropOnClick} // 뒷 배경 클릭 시 이벤트 이름 변경 ex. backdropOnClick
      ></div>
      <div
        className={_classNames("", classNames)}
        style={style}
        css={{ ...defaultCSS, ...appearedDirectionCSS }}
      >
        {children && children}
      </div>
    </>
  );
};
