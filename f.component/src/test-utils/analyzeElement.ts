export const getStyleOf = (element: Element, property: string) =>
  window.getComputedStyle(element).getPropertyValue(property);
