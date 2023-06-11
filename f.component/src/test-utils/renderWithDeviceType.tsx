import { Children } from "@interfaces/index";
import {
  render as defaultRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";

type DeviceType = "desktop" | "mobile" | "tablet";

const removeElements = (targetElements: NodeListOf<Element>): void => {
  targetElements.forEach((element) => {
    // element?.parentElement?.removeChild(element);
    element.setAttribute("style", "display: none");
  });
};

const generateQueryString = (devices: DeviceType[]) => {
  return devices.reduce(
    (_queryString: string, device: DeviceType, idx: number) => {
      if (idx !== 0 && idx !== device.length - 1) _queryString += ", ";
      _queryString += `[data-not-${device}]`;
      return _queryString;
    },
    ""
  );
};

const removeOtherMediaQueryDisplay = (device: DeviceType = "desktop") => {
  const targets = document.querySelectorAll(generateQueryString([device]));
  removeElements(targets);
};

type BaseRenderOptions = Omit<RenderOptions, "wrapper"> & {
  device?: DeviceType;
};
const renderWithDeviceType = (
  ui: JSX.Element,
  options?: BaseRenderOptions
): RenderResult => {
  const BaseProviders = ({ children }: { children: Children }) => {
    return <div id="root">{children}</div>;
  };

  const renderReturn = defaultRender(ui, {
    wrapper: BaseProviders,
    ...options,
  });

  options?.device && removeOtherMediaQueryDisplay(options?.device);

  return renderReturn;
};

export type { DeviceType };
export * from "@testing-library/react";
export { renderWithDeviceType as render };
