import { render, fireEvent } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { Button, Drawer } from "@components/*";

jest.mock("next/router", () => require("next-router-mock"));
const renderDrawer = () => {
  let booleantf = true;
  const result = render(
    <>
      <Drawer from={"top"} status={true}>
        Default Drawer
      </Drawer>
      <Drawer
        from={"left"}
        status={booleantf}
        onClick={() => {
          booleantf = !booleantf;
        }}
        darkenedBackdrop
      >
        Clicked Backdrop Change Status
      </Drawer>
      <Drawer
        from={"right"}
        query={{ test: "까꿍" }}
        withoutQueryString={false}
      >
        Drawer with QueryString
      </Drawer>
    </>
  );

  const DefaultDrawer = () => result.getByText(/Default Drawer/i);
  const ClickedBackdropChangeStatus = () =>
    result.getByText(/Clicked Backdrop Change Status/i);
  const DrawerWithQueryString = () =>
    result.getByText(/Drawer with QueryString/i);

  return {
    result,
    DefaultDrawer,
    ClickedBackdropChangeStatus,
    DrawerWithQueryString,
  };
};

describe("Component:Drawer", () => {
  it("기본 필드에 렌더링 되어야 한다.", () => {
    const {
      DefaultDrawer,
      ClickedBackdropChangeStatus,
      DrawerWithQueryString,
    } = renderDrawer();

    expect(DefaultDrawer()).toBeInTheDocument();
    expect(ClickedBackdropChangeStatus()).toBeInTheDocument();
    expect(DrawerWithQueryString()).toBeInTheDocument();
  });
});
