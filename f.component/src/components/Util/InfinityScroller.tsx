/** @jsxImportSource @emotion/react */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import _classNames from "classnames";
import { css } from "@emotion/react";
import { IDefaultInfinityScrollerProps } from "@interfaces/*";

const infinityScrollBackDrop = css`
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

export const InfinityScroller = (props: IDefaultInfinityScrollerProps) => {
  const { children, classNames, style, sensitive, onBottomHit, loader } = props;
  const [bottom, setBottom] = useState(null);
  const root = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const checkIntersect = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      //교차되었을 때 실행하는 함수
      //IntersectionObserverEntry 객체의 리스트 (ex. entries,[entry]), 콜백함수가 호출되는 IntersectionObserver
      // console.log(entry, observer);
      if (entry.isIntersecting && !loading) {
        // rootElement에 교차되었는지 확인
        observer.unobserve(entry.target);
        setLoading(true);
        // 데이터를 불러오는 함수 작성

        onBottomHit && onBottomHit();

        setLoading(false);
        observer.observe(entry.target);
      }
    },
    [onBottomHit]
  );
  useEffect(() => {
    let observer: IntersectionObserver;
    if (bottom) {
      observer = new IntersectionObserver(checkIntersect, {
        //options 브라우저의 viewport
        root: root.current,
        threshold: sensitive ? sensitive : 0.5,
      });
      observer.observe(bottom);
    }
    return () => observer && observer.disconnect();
  }, [bottom, checkIntersect]);

  return (
    <div className={_classNames(classNames)} ref={root} style={style}>
      <div css={infinityScrollBackDrop}>{children} </div>

      {loading ? (
        loader
      ) : (
        <div
          ref={(e: any) => {
            setBottom(e);
          }}
        />
      )}
    </div>
  );
};
// observe , unobserve 를 생성하여 대상에 대한 관찰, 관찰해제
// IntersectionObserver 훅
// export const useIntersectionObserver = (callback: () => void) => {
//   const observer = useRef(
//     new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             callback();
//           }
//         });
//       },
//       { threshold: 0.5 }
//     )
//   );
//   const observe = (element: any) => {
//     observer.current.observe(element);
//   };
//   const unobserve = (element: any) => {
//     observer.current.unobserve(element);
//   };
//   return [observe, unobserve];
// };
