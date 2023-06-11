import React, { useEffect, useMemo, useState } from "react";

import _classNames from "classnames";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { IDefaultComponentProps, SearcherProps } from "@interfaces/*";
import { useRouter } from "next/router";

export const Searcher = (props: SearcherProps) => {
  const {
    children,
    classNames,
    onSearch,
    queryKey,
    withoutQueryString = false, //QueryString 이 있는 상태,
    disabledEnter = false, //Enter가능 상태
  } = props;

  const router = useRouter();

  const [inputedData, setInputedData] = useState<string>("");
  const [value, setValue] = useState<string>(inputedData);

  // onSearch -> Button 클릭 이벤트 or enterKey 이벤트 후 호출되는 함수

  const executeSearch = () => {
    // queryString , onSearch()
    if (!withoutQueryString) {
      if (queryKey !== null && queryKey !== undefined) {
        router.push({
          query: {
            ...router.query,
            [queryKey]: inputedData,
          },
        });
        // history.pushState(null, "./", `?${queryKey}=${inputedData}`); // query 스트링
      }
    }
    onSearch && onSearch(inputedData);
  };

  const changeValue = (value: string) => {
    setValue(value);
  };
  useEffect(() => {
    setInputedData(value);
  }, [value]);
  //뽑아내는 커스텀 훅
  const searcherButton = useMemo(() => {
    if (!children) return;
    let filteredSearcherButton: JSX.Element | undefined;

    const originButton = (children as JSX.Element[])?.find(
      (child) => child.type === Searcher.Submit
    );
    // console.log(originButton);
    if (!originButton) {
      throw new Error("no Button");
    }
    filteredSearcherButton = React.cloneElement(originButton, {
      //Button의 props를 가져와서 onClick 속성에 executeSearch() 삽입
      ...originButton.props,
      onClick: () => {
        executeSearch();
      },
    });
    return filteredSearcherButton;
  }, [onSearch, inputedData]);

  const searcherInput = useMemo(() => {
    if (!children) return;

    let filteredSearcherInput: JSX.Element | undefined;

    const originInput = (children as JSX.Element[])?.find(
      (child) => child.type === Searcher.Input
    );

    if (!originInput) {
      throw new Error("no input");
    }
    filteredSearcherInput = React.cloneElement(originInput, {
      // input의 props를 가져와서 onChange 속성에서 value 갖고옴
      ...originInput.props,
      onChange: (val: string) => changeValue(val),
    });

    return filteredSearcherInput;
  }, [children]);

  return (
    <div
      className={_classNames(" ", classNames)}
      onKeyUp={(e) => {
        if (!disabledEnter)
          if (e.key === "Enter") {
            // disabledEnter -> 그냥 여기서 처리
            executeSearch();
          }
      }}
    >
      {searcherInput} {searcherButton}
    </div>
  );
};
Searcher.Input = Input;

Searcher.Submit = Button;
