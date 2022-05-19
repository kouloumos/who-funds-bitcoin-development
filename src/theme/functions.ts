import { css } from "@emotion/react";

export const flex = css`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
`;

/* centers flex content */
export const flexCenter = css`
  ${flex};
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
`;

export const flexCenterVertical = css`
  ${flex};
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const customScrollbars = css`
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;
