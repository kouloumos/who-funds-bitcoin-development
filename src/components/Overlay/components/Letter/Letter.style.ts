import styled from "@emotion/styled";

type StyledLetterProps = {
  hover: boolean;
};

export const StyledLetter = styled.span<StyledLetterProps>`
  ${(props) => props.hover && "color: #f18214"};
  transition: ${(props) =>
    props.hover ? "color .5s ease" : "color 5.5s ease"};
`;
