/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import _classNames from "classnames";
import { css } from "@emotion/react";
import { AddonProps, IDefaultInputComponentProps } from "@interfaces/*";

const defaultExternalInputCSS = css`
  width: auto;
  display: inline-flex;
  position: relative;
`;
const defaultInnerTextAreaCSS = css`
  &[placeholder]:empty:before {
    display: block;
    content: attr(placeholder);
    color: #a6a6a6;
  }
  display: inline-block;
  text-align: left;
  overscroll-behavior-y: auto;
  overflow-wrap: break-word;
`;
const defaultInnerInputCSS = css`
  &[placeholder]:empty:before {
    display: block;
    content: attr(placeholder);
    color: #a6a6a6;
  }
  display: inline-block;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
`;
export const Input = <T,>(props: IDefaultInputComponentProps<T>) => {
  const {
    classNames,
    children,
    onChange,
    value,
    debounce,
    placeholder,
    multilined,
    asEditableBox,
  } = props;
  const [inputedData, setInputedData] = useState<string>("");
  //입력 받아서 데이터 전송하는 요소
  const [inputedValue, setInputedValue] = useState<string>(inputedData);
  // 입력 받는 요소
  const changeDivValue = (
    // 1) input데이터 입력받기
    e: React.FormEvent<HTMLDivElement>
  ) => {
    return setInputedValue(e.currentTarget.textContent as string);
  };
  const changeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    return setInputedValue(e.target.value);
  };

  const preventLineChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // 엔터키 막음, Textarea 방지
    if (multilined) return;
    if (e.key == "Enter") {
      e.preventDefault();
      return false;
    }
  };
  useEffect(() => {
    // 3) inputData값이 들어오면 외부로 value값 전달
    onChange && onChange(inputedData as T);
  }, [inputedData]);

  useEffect(() => {
    //custom Hook 만들어보자
    // 2) Debounce
    const debounceTimeout = setTimeout(() => {
      return setInputedData(inputedValue);
    }, debounce);
    return () => clearTimeout(debounceTimeout);
  }, [inputedValue, debounce]);

  // if (inputedData) {
  //   console.log(inputedData);
  // }

  const renderedAddonsProps = useMemo(() => {
    if (!children) return;

    let filteredAddons: { left?: JSX.Element[]; right?: JSX.Element[] } = {
      left: [],
      right: [],
    };
    if (Array.isArray(children)) {
      filteredAddons = (children as JSX.Element[])
        ?.filter((child) => child.type === Input.Addon)
        .reduce(
          (_addons, addon) => {
            _addons[addon.props.position as keyof typeof _addons].push(addon);
            return _addons;
          },
          {
            left: [],
            right: [],
          } as {
            left: JSX.Element[];
            right: JSX.Element[];
          }
        );
      return filteredAddons;
    } else {
      (children as JSX.Element).props.position === "left"
        ? filteredAddons.left?.push(children as JSX.Element)
        : filteredAddons.right?.push(children as JSX.Element);

      return filteredAddons;
    }
  }, [children]);

  return (
    <div className={_classNames(classNames)} css={defaultExternalInputCSS}>
      {renderedAddonsProps?.left && <>{renderedAddonsProps.left}</>}
      {asEditableBox ? (
        <div
          css={multilined ? defaultInnerTextAreaCSS : defaultInnerInputCSS}
          className={_classNames(classNames)}
          contentEditable={true}
          onKeyDown={preventLineChange}
          suppressContentEditableWarning
          placeholder={placeholder}
          onInput={changeDivValue} // 1) inputedValue -> 2) inputedData -> 3) value
          defaultValue={value as string}
        ></div>
      ) : multilined ? (
        <textarea
          className={_classNames(classNames)}
          value={value as string}
          onChange={changeValue}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className={_classNames(classNames)}
          placeholder={placeholder}
          value={value as string}
          onChange={changeValue}
        />
      )}
      {renderedAddonsProps?.right && <>{renderedAddonsProps.right}</>}
    </div>
  );
};

Input.Addon = <T,>({
  children,
  classNames,
  position = "left",
}: AddonProps<T>) => (
  <span className={_classNames(classNames)}>{children}</span>
);
