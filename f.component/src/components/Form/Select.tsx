/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import _classNames from "classnames";
import {
  IDefaultComponentProps,
  IDefaultSelectProps,
  SelectOptionGroupOrLabelProps,
  SelectOptionProps,
} from "@interfaces/*";
import { css } from "@emotion/react";

interface selectValue {
  label?: JSX.Element;
  options?: JSX.Element;
  chevron?: JSX.Element;
}

export const Select = <T,>(props: IDefaultSelectProps<T>) => {
  const {
    classNames,
    children,
    style,
    disabled,
    displayedValueFormatter = (data: any) => {},
    // data에 {id:1 title:'Notes'} 가 있다면 title을 뽑는 함수
    valueFormatter = (data: any) => {}, // id를 뽑는 함수
    onSelect = (e: string) => {}, // 선택된 데이터를 갖다주는 함수
    multiSelectable,
    labelUnChangeable,
  } = props;

  const findChildren = (array: JSX.Element[], element: string) => {
    //find 함수
    if (!array || !element) return;
    return array.find(
      (child) => child.type === Select[element as keyof typeof Select]
    );
  };

  const childrenArray = children as JSX.Element[]; //Children 타입 지정
  const labelTitle = useMemo(() => {
    return findChildren(childrenArray, "Label")?.props.title;
  }, []); // 라벨에 있는 값(title) 선언

  const optionsChildren = useMemo(() => {
    //Option 값 가져오기
    const optionsChild = findChildren(childrenArray, "Options")?.props.children;
    if (optionsChild.props?.title) return optionsChild?.props.children;
    return optionsChild;
  }, []);

  const initialValue = useMemo(() => {
    return optionsChildren?.find(
      // GroupOption에 따른 initialValue 선언 및 할당
      (child: JSX.Element) => child.props.asInitial === true
    )?.props.children;
  }, [children]);

  const [open, setOpen] = useState(false); // 드롭다운이 열렸을 때
  const [renderingValue, setRenderingValue] = useState(
    // Label에 보여주는 값 (단수)
    initialValue ? initialValue : labelTitle
  );
  const [renderingMultiValues, setRenderingMultiValues] = useState<string[]>([
    initialValue ? initialValue : labelTitle,
  ]); // MultiSelectable 사용 시 활용할 Value (복수)

  useEffect(() => {
    //웹페이지가 첫 렌더링 되었을 때만 실행
    onSelect(initialValue);
  }, []);

  const selectHandler = (e?: any) => {
    //Options에서 클릭 시 호출되는 함수
    const { nodeName, textContent } = e.target;

    if ("DIV|UL".includes(nodeName)) {
      //GroupOption 제목, 부모노드 클릭 방지
      return;
    }
    let multiArrayValue = renderingMultiValues.includes(labelTitle)
      ? [textContent] //labelTitle이 있다면 RenderingMultiValues에 textContent만 추가
      : [...renderingMultiValues, textContent]; //없다면 RenderingMultiValues를 포함하여 추가

    let deleteMultiArrayValue =
      renderingMultiValues.length <= 1 //renderingMultiValues 값이 0이 될 것 같다면
        ? [labelTitle]
        : [...renderingMultiValues.filter((value) => value !== textContent)];

    if (!labelUnChangeable) {
      //라벨 값 변경 여부 값에 따라 변경 방지
      if (!multiSelectable) {
        //multiSelectable 아닐 경우 하나의 값만 받음
        return setRenderingValue(textContent as string);
      }

      setRenderingMultiValues(
        renderingMultiValues.includes(textContent as string) //value가 textContent에 포함하는 지
          ? deleteMultiArrayValue //한다면 삭제
          : multiArrayValue //안한다면 추가
      );
    }
  };

  useEffect(() => {
    //Value가 변경될 때마다 렌더링

    let OptionData = optionsChildren.find((child: JSX.Element) =>
      Object.keys(child.props.data).find((key) => {
        if (
          child.props.data[key] === renderingValue ||
          child.props.data[key] ===
            renderingMultiValues[renderingMultiValues.length - 1]
        )
          return child;
      })
    )?.props.data;

    // if (renderingMultiValues !== labelTitle && renderingValue !== labelTitle) {
    //   //labelTitle이 onSelect에 들어가는 것을 방지
    //
    // }
    displayedValueFormatter(
      multiSelectable ? renderingMultiValues : renderingValue
    );
    onSelect(multiSelectable ? renderingMultiValues : renderingValue);
    valueFormatter(OptionData);
  }, [renderingMultiValues, renderingValue]);

  const selectLayout = useMemo(() => {
    // 렌더링되는 SelectLayout
    if (!children) return;
    let selectValue: selectValue = {};
    const selectLayoutArray = [
      {
        element: "Label",
        object: {
          title: multiSelectable ? renderingMultiValues : renderingValue,
        },
      },
      { element: "Options", object: { onClick: selectHandler as () => void } },
      { element: "Chevron" },
    ];

    selectLayoutArray.map((v) => {
      const child = findChildren(childrenArray, v.element);
      selectValue[v.element.toLowerCase() as keyof typeof selectValue] = child
        ? React.cloneElement(child, {
            ...child.props,
            ...v.object,
          })
        : undefined;
    });

    return selectValue;
  }, [props, open]);

  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      onBlur={() => {
        setOpen(false);
      }}
      css={css`
        display: flex;
        position: relative;
      `}
      disabled={disabled}
    >
      <div className={_classNames(classNames)} style={style}>
        {selectLayout?.label}
        {open ? <>{selectLayout?.options}</> : null}
      </div>

      <div
        className={_classNames(selectLayout?.chevron?.props.classNames)}
        style={selectLayout?.chevron?.props.style}
        css={
          open
            ? css`
                transform: rotate(180deg);
              `
            : null
        }
      >
        {selectLayout?.chevron}
      </div>
    </button>
  );
};

Select.Label = ({
  classNames,
  children,
  style,
  title,
}: SelectOptionGroupOrLabelProps) => {
  const renderingTitle = useMemo(() => {
    if ((title?.length as number) > 1) {
      return `${title}, `;
    }
    return title;
  }, [title]);
  return (
    <div className={_classNames(classNames)} style={style}>
      {children //사용자가 직접 컴포넌트 디자인 할수도 있으니 Children함수를 따로 빼놓음
        ? children
        : renderingTitle}
    </div>
  );
};

Select.Options = ({
  classNames,
  children,
  style,
  onClick,
}: IDefaultComponentProps) => {
  return (
    <ul className={_classNames(classNames)} style={style} onClick={onClick}>
      {children}
    </ul>
  );
};

Select.OptionGroup = ({
  classNames,
  children,
  style,
  title,
}: SelectOptionGroupOrLabelProps) => {
  return (
    <>
      <div
        className={_classNames(classNames)}
        style={style}
        css={css`
          font-weight: 600;
          cursor: default;
        `}
      >
        {title}
      </div>
      {children}
    </>
  );
};

Select.Option = ({
  data,
  asInitial,
  classNames,
  children,
  style,
}: SelectOptionProps) => (
  <li className={_classNames(classNames)} style={style}>
    {children}
  </li>
);

Select.Chevron = ({ classNames, children, style }: IDefaultComponentProps) => (
  <>{children}</>
);
