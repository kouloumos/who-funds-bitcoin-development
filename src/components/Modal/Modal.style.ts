import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import theme from "src/theme/theme";
import { flex } from "src/theme/functions";

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  ${flex};
  justify-content: space-between;
  flex-direction: column;
  transform: translate(-50%, -50%);

  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 5px;
  background-color: ${theme.colors.black};
  color: ${theme.textColor};
  width: calc(100% - 100px);
  @media (min-width: 1000px) {
    width: 400px;
  }
`;

export const CloseButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;
