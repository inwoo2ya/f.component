import { render, getStyleOf, fireEvent } from "@test-utils/*";
import { Button, LinkButton } from "@components/*";

const renderButton = () => {
  const onClick = jest.fn();
  const result = render(
    <>
      <Button onClick={onClick}>Defatult Button Test</Button>

      <Button loading>
        Loading Test
        <Button.Loading>Loading Button Test</Button.Loading>
      </Button>

      <Button disabled={true}>
        Disabled HoverDisAbled Button Test
        <Button.Disabled hoverable={false} />
      </Button>

      <Button disabled={true}>
        Disabled HoverAbled Button Test
        <Button.Disabled hoverable={true} />
      </Button>

      <LinkButton href="/">LinkButton Test</LinkButton>
    </>
  );

  const DefaultButton = () => result.getByText(/Defatult Button Test/i);
  const LoadingButton = () => result.getByText(/Loading Button Test/i);
  const DefaultLinkButton = () =>
    result.getByText(/LinkButton Test/i).parentElement;
  const DisabledHoverDisabledButton = () =>
    result.getByText(/Disabled HoverDisAbled Button Test/i);
  const DisabledHoverabledButton = () =>
    result.getByText(/Disabled HoverAbled Button Test/i);

  const clickButton = async () => await fireEvent.click(DefaultButton());

  return {
    onClick,
    result,
    DefaultButton,
    DefaultLinkButton,
    LoadingButton,
    DisabledHoverDisabledButton,
    DisabledHoverabledButton,
    clickButton,
  };
};

describe("Component:Button", () => {
  it("버튼에 이벤트 핸들러가 제대로 전달되어야 한다.", async () => {
    const { onClick, clickButton } = renderButton();

    await clickButton();
    expect(onClick).toBeCalled();
  });
  it("버튼이 현재 로딩 중인가 확인해야 한다.", async () => {
    const { onClick, LoadingButton } = renderButton();

    expect(LoadingButton()).toBeVisible();
    await fireEvent.click(LoadingButton());
    expect(onClick).not.toBeCalled();
  });
  it("버튼이 Disabled되어 있는 지 확인해야 한다.", () => {
    const { DisabledHoverDisabledButton, DisabledHoverabledButton } =
      renderButton();
    expect(DisabledHoverDisabledButton()).toBeDisabled();
    expect(DisabledHoverabledButton()).toBeDisabled();
  });
  it("Disabled되어 있는 버튼이 hover 값에 따라 Hover가 되는 지 확인해야한다.", () => {
    const { DisabledHoverDisabledButton, DisabledHoverabledButton } =
      renderButton();

    expect(getStyleOf(DisabledHoverabledButton(), "cursor")).toBe("pointer");
    expect(getStyleOf(DisabledHoverDisabledButton(), "cursor")).toBe("default");
  });

  it("LinkButton 링크 연결이 되는 지 확인,target도 확인", () => {
    const { DefaultLinkButton } = renderButton();

    console.log(DefaultLinkButton()?.outerHTML);
    // expect(DefaultLinkButton()?.getAttribute("href")).toBe("/");
    expect(DefaultLinkButton()?.closest("a")).toHaveAttribute("href", "/");
  });
});
