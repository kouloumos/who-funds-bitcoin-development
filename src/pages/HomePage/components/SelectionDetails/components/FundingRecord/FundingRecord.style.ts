import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import theme from "src/theme/theme";
import { flexCenterVertical } from "src/theme/functions";

export const FundingRecordWrapper = styled.div`
  ${flexCenterVertical};
  padding: 5px 0px;
`;

export const EntityImage = styled.img`
  border-radius: 50%;
`;

export const NameTagWrapper = styled.div`
  ${flexCenterVertical};
`;

export const Name = styled.div`
  flex: 1.2;
  margin: 0px 5px;
  cursor: pointer;
`;

export const TagWrapper = styled.div`
  ${flexCenterVertical};
  flex-wrap: wrap;
  margin-bottom: -3px;
`;

export const FundTag = styled.div`
  //max-width: 100px;
  font-size: 9px;
  padding: 1px 4px;
  margin-left: 5px;
  margin-bottom: 3px; 
  color: ${theme.colors.white};
  background-color: rgba(247, 147, 26, 0.3);
  border-radius: 2px;
  //white-space: nowrap;
  //text-transform: uppercase;
`;

export const InfoTag = styled(FontAwesomeIcon)`
  color: rgba(247, 147, 26, 0.3);
  margin-left: 5px;
  width: 10px;
`;
