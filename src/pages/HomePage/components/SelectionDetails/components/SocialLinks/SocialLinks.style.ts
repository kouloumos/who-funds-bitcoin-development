import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import theme from "src/theme/theme";

export const SocialContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 15px;
  pointer-events: auto;
`;

export const SocialIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: ${theme.textColor};
`;
