import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Kaela = css`
  font-family: Kaela;
  font-size: 28px;
`;

export const fonts = { Kaela };
export type FontsType = keyof typeof fonts;
type OverlayProps = {
  font: FontsType;
};

export const PageWrapper = styled.div<OverlayProps>`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 3px;
  padding-left: 2px;
  min-height: 100vh;
  min-width: 110vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #217277;
  color: rgba(255, 255, 255, 0.3);
  cursor: default;
  ${(props) => fonts[props.font]};
  z-index: -1;
`;

