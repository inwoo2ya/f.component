import { render, fireEvent } from "@testing-library/react";
import { Searcher } from "@components/*";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

jest.mock("next/router", () => require("next-router-mock"));

// 테스트에서 useRouter훅을 사용할때 위에 코드를 작성해야함
// Next.js의 context로 구성되지 않았기 때문에 not mounted 오류가 발생함
const RenderSearcher = () => {
  // const [text, setText] = useState("");
  let value;
  const result = render(
    <>
      <label>
        Default Searcher
        <Searcher onSearch={(val) => (value = val)}>
          <Searcher.Input placeholder="검색하세요"></Searcher.Input>
          <Searcher.Submit>검색</Searcher.Submit>
        </Searcher>
      </label>
      <label>
        Searcher disabledEnter
        <Searcher disabledEnter={true} onSearch={(val) => (value = val)}>
          <Searcher.Input />
          <Searcher.Submit />
        </Searcher>
      </label>
      <label>
        Searcher with queryString
        <Searcher queryKey="search">
          <Searcher.Input />
          <Searcher.Submit />
        </Searcher>
      </label>
      <label>
        <Searcher></Searcher>
      </label>
      <div data-testid="result-area">{value && value}</div>
    </>
  );

  const DefaultSearcher = () => result.getByLabelText("Default Searcher");
  const DefaultSearcherInput = () => result.getByPlaceholderText(/검색하세요/i);
  const DefaultSearcherSubmit = () => result.getByText(/검색/i);
  const SearcherdisabledEnter = () =>
    result.getByLabelText("Searcher disabledEnter");
  const SearcherWithQueryString = () =>
    result.getByLabelText("Searcher with queryString");
  const ResultArea = () => result.getByTestId("result-area");
  return {
    result,
    DefaultSearcher,
    DefaultSearcherInput,
    DefaultSearcherSubmit,
    SearcherdisabledEnter,
    SearcherWithQueryString,
    ResultArea,
  };
};

describe("Component:Searcher", () => {
  it("기본 필드에 렌더링되어야 한다.", () => {
    const {
      DefaultSearcher,
      SearcherdisabledEnter,
      SearcherWithQueryString,
      ResultArea,
      DefaultSearcherSubmit,
      DefaultSearcherInput,
    } = RenderSearcher();

    expect(DefaultSearcher()).toBeInTheDocument();
    expect(SearcherdisabledEnter()).toBeInTheDocument();
    expect(SearcherWithQueryString()).toBeInTheDocument();
    expect(DefaultSearcherInput()).toBeInTheDocument();
    expect(DefaultSearcherSubmit()).toBeInTheDocument();
    expect(ResultArea()).toBeInTheDocument();
  });

  it("검색어를 입력 후,버튼 클릭 시 onSearch가 되어야한다.", async () => {
    const { DefaultSearcherInput, ResultArea, DefaultSearcherSubmit } =
      RenderSearcher();
    userEvent.type(DefaultSearcherInput(), "Test");
    fireEvent.click(DefaultSearcherSubmit());
    // expect(ResultArea().innerText).toBe("Test");
  });
  it("엔터를 누르면 onSearch가 실행되어야한다.", async () => {
    const { DefaultSearcher, DefaultSearcherInput, ResultArea } =
      RenderSearcher();
    await fireEvent.click(DefaultSearcherInput());
    await userEvent.keyboard("Test");
    fireEvent.keyDown(DefaultSearcher(), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    // console.log(ResultArea());
  });
});
