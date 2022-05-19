import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputBase } from "@mui/material";

import theme from "src/theme/theme";
import { customScrollbars, flexCenterVertical } from "src/theme/functions";

export const FooterWrapper = styled.div`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  bottom: 0px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 25px;
  pointer-events: none;

  ${flexCenterVertical};
  justify-content: space-between;
  font-size: 16px;
`;

export const SearchInput = styled(InputBase)`
  padding: 0px;
  border-radius: 5px;
  background-color: rgba(247, 147, 26, 0.4);
  & input {
    border-radius: 4px;
    color: ${theme.textColor};
    padding: 5px;
    letter-spacing: 0;
    line-height: 15px;
  }
  pointer-events: auto;
`;

export const SearchButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${theme.colors.orange};
  padding: 8.5px 0px;
  pointer-events: auto;
`;

export const SearchListBox = styled.ul`
  //color: ${theme.colors.orange};
  //background-color: ${theme.colors.black};
  ${customScrollbars};
  pointer-events: auto;
`;

export const FeedbackLink = styled.a`
  font-size: 12px;
  color: ${theme.colors.primary};
  opacity: 0.7;
  text-decoration: none;
  &:hover {
    opacity: 0.9;
  }
  margin-left: 5px;
  pointer-events: auto;
`;
