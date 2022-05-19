import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem, InputBase } from "@mui/material";

import theme from "src/theme/theme";
import { flex, flexCenterVertical } from "src/theme/functions";

export const NavbarWrapper = styled.div`
  position: absolute;
  width: 100%;
  ${flex};
  flex-wrap: wrap;
  color: ${theme.colors.primary};

  justify-content: space-between;
  align-content: flex-end;
  font-size: 16px;
  box-sizing: border-box;

  padding-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  pointer-events: none;
`;

export const Title = styled.div`
  font-family: Kaela;
  font-size: 24px;
  @media (min-width: 1000px) {
    font-size: 28px;
  }
`;

export const TotalFundingWrapper = styled.div`
  margin-left: 5px;
  ${flexCenterVertical};
  color: ${theme.colors.primary};
  font-size: 18px;
  pointer-events: auto;
`;

export const OptionsChevron = styled(FontAwesomeIcon)`
  margin-left: 7px;
  cursor: pointer;
  transition: opacity 1s;
  width: 16px;
`;

export const SettingsButton = styled(FontAwesomeIcon)`
  margin-left: 18px;
  padding-bottom: 6px;
  cursor: pointer;
  transition: opacity 1s;
`;

export const FundingOutlinedInput = styled(InputBase)`
  opacity: 0.9;
  font-family: Kaela;
  font-size: 24px;
  color: ${theme.colors.primary};
  padding: 0px;
  & input {
    padding: 0px;
    color: ${theme.colors.primary};
  }
  transition: opacity 1s;
  &:hover {
    opacity: 1;
  }
`;

type FundingMenuItemProps = {
  selected?: boolean;
};
export const FundingMenuItem = styled(MenuItem)<FundingMenuItemProps>`
  && {
    font-family: Kaela;
    font-size: 24px;
    color: ${theme.colors.primary};
    padding: 0px 5px;
    background-color: ${theme.colors.black};
    font-weight: normal;
    ${(props) => props.selected && "display: none"};
  }
`;

