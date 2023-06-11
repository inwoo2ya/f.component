import userEvent from "@testing-library/user-event";

import { DeviceType, RenderResult, waitFor } from "@test-utils/index";

import { render, getStyleOf } from "@test-utils/index";

import { Box } from "@components/index";

const renderBox = (device?: DeviceType) => {
  const onClick = jest.fn();

  const result = render(
    <Box>
      <Box forDesktop>Desktop Box</Box>
      <Box forTablet>Tablet Box</Box>
      <Box forMobile>Mobile Box</Box>
      <Box forNonDesktop>NonDesktop Box</Box>
      <Box forNonTablet>NonTablet Box</Box>
      <Box forNonMobile>NonMobile Box</Box>
      <Box as="p">this is P Tag Box</Box>
      <Box circle>this is Circle Box</Box>
      <Box
        style={{
          width: "400px",
        }}
        ratio={1 / 4}
      >
        <div>Ratio Box</div>
      </Box>
      <Box onClick={onClick}>Event Box!</Box>
    </Box>,
    { device }
  );

  const DesktopBox = () => result.getByText(/^(?!Non)Desktop Box/i);
  const TabletBox = () => result.getByText(/^(?!Non)Tablet Box/i);
  const MobileBox = () => result.getByText(/^(?!Non)Mobile Box/i);
  const NonDesktopBox = () => result.getByText(/NonDesktop Box/i);
  const NonTabletBox = () => result.getByText(/NonTablet Box/i);
  const NonMobileBox = () => result.getByText(/NonMobile Box/i);
  const PBox = () => result.getByText(/P Tag Box/i);
  const CircleBox = () => result.getByText(/Circle Box/i);
  const RatioBox = () => result.getByText(/Ratio Box/i).parentElement;
  const EventBox = () => result.getByText(/Event Box/i);

  const clickBox = async () => await userEvent.click(EventBox());

  window.HTMLElement.prototype.getBoundingClientRect = jest.fn(
    () =>
      ({
        width: 400,
        height: 100,
      } as DOMRect)
  );

  return {
    onClick,
    result,
    DesktopBox,
    TabletBox,
    MobileBox,
    NonDesktopBox,
    NonTabletBox,
    NonMobileBox,
    PBox,
    CircleBox,
    RatioBox,
    EventBox,
    clickBox,
  };
};

describe("Component:Box", () => {
  it("as 속성에 입력한 값으로 태그명이 지정되어야 한다.", async () => {
    const { PBox } = renderBox();

    expect(PBox().tagName.toLowerCase()).toBe("p");
  });

  it("1024px 이상의 화면에서는 forDesktop, forNonTablet, forNonMobile 박스를 렌더링 해야 한다.", async () => {
    const { DesktopBox, NonTabletBox, NonMobileBox } = renderBox("desktop");

    expect(DesktopBox()).toBeVisible();
    expect(NonTabletBox()).toBeVisible();
    expect(NonMobileBox()).toBeVisible();
  });

  it("640px 이상 1024px 미만의 화면에서는 forTablet, forNonDesktop, forNonMobile 박스를 렌더링 해야 한다.", async () => {
    const { TabletBox, NonDesktopBox, NonMobileBox } = renderBox("tablet");

    expect(TabletBox()).toBeVisible();
    expect(NonDesktopBox()).toBeVisible();
    expect(NonMobileBox()).toBeVisible();
  });

  it("640px 미만의 화면에서는 forMobile, forNonDesktop, forNonTablet 박스를 렌더링 해야 한다.", async () => {
    const { MobileBox, NonDesktopBox, NonTabletBox } = renderBox("mobile");

    expect(MobileBox()).toBeVisible();
    expect(NonDesktopBox()).toBeVisible();
    expect(NonTabletBox()).toBeVisible();
  });

  it("Circle 박스의 border-radius: 99999px이어야 한다.", async () => {
    const { CircleBox } = renderBox();

    expect(getStyleOf(CircleBox(), "border-radius")).toBe("99999px");
  });

  it("ratio가 1/4으로 설정된 너비 400px 박스의 높이는 400 * (1/4)인 100px이어야 한다.", async () => {
    const { RatioBox } = renderBox();

    expect(RatioBox()?.dataset.renderedSize?.includes("h100")).toBe(true);
  });

  it("박스에 이벤트 핸들러가 제대로 전달되어야 한다.", async () => {
    const { onClick, clickBox } = renderBox();

    await clickBox();
    expect(onClick).toBeCalled();
  });
});
