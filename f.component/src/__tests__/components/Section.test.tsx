import { render } from "@test-utils/*";
import { Box, Section } from "@components/*";

const renderSection = () => {
  const result = render(
    <Box>
      <Section>Section Box</Section>
      <Section as="p">P Section Box</Section>
    </Box>
  );

  const SectionBox = () => result.getByText(/^(?!P )Section Box/i);
  const PSectionBox = () => result.getByText(/P Section Box/i);

  return {
    result,
    SectionBox,
    PSectionBox,
  };
};

describe("Component:Section", () => {
  it("Section 박스의 태그명은 section이어야 한다.", () => {
    const { SectionBox } = renderSection();

    expect(SectionBox().tagName.toLowerCase()).toBe("section");
  });

  it("as가 정의된 Section 박스의 태그명은 as 속성과 같아야 한다.", () => {
    const { PSectionBox } = renderSection();

    expect(PSectionBox().tagName.toLowerCase()).toBe("p");
  });
});
