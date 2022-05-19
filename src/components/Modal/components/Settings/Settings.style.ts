import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputBase, MenuItem } from "@mui/material";

import theme from "src/theme/theme";
import { flex } from "src/theme/functions";

export const SettingsOutlinedInput = styled(InputBase)`
  opacity: 0.9;

  color: ${theme.textColor};
  border: 2px solid ${theme.colors.primary};
  border-radius: 5px;
  padding: 5px;
  & input {
    padding: 0px;

    color: ${theme.textColor};
  }
  transition: opacity 1s;
  &:hover {
    opacity: 1;
  }
`;

export const SelectionWrapper = styled.div`
  ${flex};
  justify-content: space-between;
`;

export const SelectionContent = styled.div`
  ${flex};
  flex-wrap: wrap;
`;

export const SettingsMenuItem = styled(MenuItem)`
  && {
    color: ${theme.colors.black};
    padding: 0px 5px;
    // background-color: ${theme.colors.black};
    font-weight: normal;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  color: ${theme.colors.primary};
  margin-bottom: 12px;
`;

export const OptionsChevron = styled(FontAwesomeIcon)`
  padding: 2px;
  cursor: pointer;
  transition: opacity 1s;
`;