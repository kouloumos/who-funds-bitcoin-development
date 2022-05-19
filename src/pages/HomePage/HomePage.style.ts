import styled from "@emotion/styled";

import theme from "src/theme/theme";
import { flex } from "src/theme/functions";

export const PageWrapper = styled.div`
  ${flex};
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  background-color: ${theme.colors.black};
  color: ${theme.textColor};
`;
