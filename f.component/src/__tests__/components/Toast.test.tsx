import { Toast } from "@components/*";
import { getStyleOf } from "@test-utils/*";
import { render, fireEvent } from "@testing-library/react";
import React, { useState as useStateMock } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const RenderToast = () => {
  const setToastTestStatus = jest.fn();

  const result = render(
    <>
      <Toast duration={8000} status={true}>
        Default Toast
      </Toast>
      <Toast position={"topLeft"} status={true}>
        topLeft Toast
      </Toast>
      <Toast position={"topCenter"} status={true}>
        topCenter Toast
      </Toast>
      <Toast position={"topRight"} status={true}>
        topRight Toast
      </Toast>
      <Toast position={"bottomLeft"} status={true}>
        bottomLeft Toast
      </Toast>
      <Toast position={"bottomCenter"} status={true}>
        bottomCenter Toast
      </Toast>
      <Toast position={"bottomRight"} status={true}>
        bottomRight Toast
      </Toast>
    </>
  );

  const DefaultToast = () => result.getByText(/Default Toast/i);
  const topLeftToast = () => result.getByText(/topLeft Toast/i);
  const topCenterToast = () => result.getByText(/topCenter Toast/i);
  const topRightToast = () => result.getByText(/topRight Toast/i);
  const bottomLeftToast = () => result.getByText(/bottomLeft Toast/i);
  const bottomCenterToast = () => result.getByText(/bottomCenter Toast/i);
  const bottomRightToast = () => result.getByText(/bottomRight Toast/i);
  return {
    result,
    DefaultToast,
    topLeftToast,
    topCenterToast,
    topRightToast,
    bottomLeftToast,
    bottomCenterToast,
    bottomRightToast,
  };
};
jest.useFakeTimers();
describe("Component:Toast", () => {
  it("status가 True 일 때, 기본 필드에 렌더링되어야 한다.", () => {
    const { DefaultToast } = RenderToast();

    expect(DefaultToast()).toBeInTheDocument();
  });
  it("position이 topLeft면 top: 0 left : 0 이어야 한다.", () => {
    const { topLeftToast } = RenderToast();

    expect(getStyleOf(topLeftToast(), "top")).toBe("0px");
    expect(getStyleOf(topLeftToast(), "left")).toBe("0px");
  });
  it("position이 topRight면 top: 0 right: 0 이어야 한다.", () => {
    const { topRightToast } = RenderToast();
    expect(getStyleOf(topRightToast(), "top")).toBe("0px");
    expect(getStyleOf(topRightToast(), "right")).toBe("0px");
  });
  it("position이 topCenter면 top: 0 left:50% transform:translate(-50%) 이어야한다.", () => {
    const { topCenterToast } = RenderToast();
    expect(getStyleOf(topCenterToast(), "top")).toBe("0px");
    expect(getStyleOf(topCenterToast(), "left")).toBe("50%");
    expect(getStyleOf(topCenterToast(), "transform")).toBe("translate(-50%)");
  });
  it("position이 bottomLeft면 bottom: 0 left: 0이어야한다.", () => {
    const { bottomLeftToast } = RenderToast();

    console.log(getStyleOf(bottomLeftToast(), "bottom"));
    expect(getStyleOf(bottomLeftToast(), "bottom")).toBe("0px");
    expect(getStyleOf(bottomLeftToast(), "left")).toBe("0px");
  });
  it("position이 bottomRight면 bottom: 0 right:0 이어야한다.", () => {
    const { bottomRightToast } = RenderToast();

    expect(getStyleOf(bottomRightToast(), "bottom")).toBe("0px");
    expect(getStyleOf(bottomRightToast(), "right")).toBe("0px");
  });
  it("position이 bottomCenter면 bottom:0 left:50% transform:translate(-50%) 이어야한다.", () => {
    const { bottomCenterToast } = RenderToast();

    expect(getStyleOf(bottomCenterToast(), "bottom")).toBe("0px");
    expect(getStyleOf(bottomCenterToast(), "left")).toBe("50%");
    expect(getStyleOf(bottomCenterToast(), "transform")).toBe(
      "translate(-50%)"
    );
  });
  it("duration이 8000이라면 Toast컴포넌트는 8초 뒤에 비활성화되어야한다.", () => {
    const { DefaultToast } = RenderToast();

    expect(DefaultToast()).toBeInTheDocument();
    jest.advanceTimersByTime(8000);
    expect(DefaultToast()).toBeNull();
  });
});
