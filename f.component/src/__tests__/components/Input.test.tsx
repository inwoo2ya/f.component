import { fireEvent } from "@test-utils/*";
import React, { useState } from "react";
import { render, getStyleOf } from "@test-utils/*";
import { Input } from "@components/*";
import userEvent from "@testing-library/user-event";

const renderInput = () => {
  let text;
  const onChange = jest.fn();

  const result = render(
    <>
      <Input placeholder="Default Input" onChange={onChange}></Input>

      <Input placeholder="MultiLined Input" multilined></Input>
      <Input placeholder="Div ContentableBox" asEditableBox></Input>
      <Input placeholder="Addon Input">
        <Input.Addon position="left">에드온</Input.Addon>
      </Input>
      <Input
        placeholder="Debounce Input"
        debounce={2000}
        onChange={(val) => (text = val)}
      ></Input>

      <div aria-label="result-area">{text}</div>
    </>
  );

  const DefaultInput = () => result.getByPlaceholderText(/Default Input/i);
  const MultiLinedInput = () =>
    result.getByPlaceholderText(/MultiLined Input/i);
  const AddonInput = () => result.getByPlaceholderText(/Addon Input/i);
  const AddonElement = () => result.getByText(/에드온/i);
  const DebounceInput = () => result.getByPlaceholderText(/Debounce Input/i);
  const DivContentableBox = () =>
    result.getByPlaceholderText(/Div ContentableBox/i);
  const Value = () => result.getByLabelText("result-area");
  const ChangeInput = async () => await fireEvent.change(DefaultInput());

  return {
    onChange,
    result,
    Value,
    DivContentableBox,
    AddonElement,
    DefaultInput,
    ChangeInput,
    DebounceInput,
    MultiLinedInput,
    AddonInput,
  };
};

describe("Component:Input", () => {
  it("기본 필드에 렌더링되어야 한다.", () => {
    const { AddonElement, DefaultInput, MultiLinedInput, AddonInput } =
      renderInput();

    expect(DefaultInput()).toBeInTheDocument();
    expect(AddonElement()).toBeInTheDocument();
    expect(MultiLinedInput()).toBeInTheDocument();
    expect(AddonInput()).toBeInTheDocument();
  });
  it("Input 속성에 Change이벤트 핸들러가 제대로 전달되어야 한다.", async () => {
    const { onChange, ChangeInput } = renderInput();
    await ChangeInput;
    expect(onChange).toBeCalled();
  });

  it("Input은 input태그 여야 한다.", () => {
    const { DefaultInput } = renderInput();

    expect(DefaultInput().tagName.toLowerCase()).toBe("input");
  });
  it("DIVContentableBox의 내부Text를 편집할 수 있으며 div태그여야한다.", async () => {
    const { DivContentableBox } = renderInput();
    await userEvent.click(DivContentableBox());
    await userEvent.keyboard("test");
    expect(DivContentableBox().tagName.toLowerCase()).toBe("div");
    expect(DivContentableBox().textContent).toBe("test");
  });
  it("Multilined 속성이 true인 경우 textarea로 변경되어야한다.", () => {
    const { MultiLinedInput } = renderInput();
    expect(MultiLinedInput().tagName.toLowerCase()).toBe("textarea");
  });

  // it("Input의 children에 inputAddon이 있어야 한다.", () => {
  //   const { AddonInput } = renderInput();
  //   console.log(AddonInput().children);
  //   expect(AddonInput().getElementsByTagName("Input.Addon")).toBe(
  //     "Input.Addon"
  //   );
  // });
  {
    it("Input의 Debounce가 작동되어 value값을 몇초간의 Delay 후 받아야 한다.", async () => {
      const { DebounceInput, Value } = renderInput();
      userEvent.type(DebounceInput(), "Debounce");
      setTimeout(() => {
        expect(Value().innerHTML).toBe("Debounce");
      }, 2000);
    });
  }
});
