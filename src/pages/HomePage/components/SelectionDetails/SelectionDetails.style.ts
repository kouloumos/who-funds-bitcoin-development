import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import theme from "src/theme/theme";
import { customScrollbars, flex, flexCenter } from "src/theme/functions";

type HeightProps = {
  height: number;
};
export const DetailsContainerWrapper = styled.div<HeightProps>`
  position: absolute;
  top: 125px; // 64px (navbar) + 35px (image) + 25px (extra space)
  max-height: ${(props) => props.height}px;
  left: 20px;
  right: 20px;
  background-color: ${theme.colors.grey};
  opacity: 0.95;
  border-radius: 10px;
  @media (min-width: 1000px) {
    max-width: 350px;
  }
  //max-height: calc(100% - 100px);
  //background-color: green;
`;

export const DetailsContainer = styled.div`
  position: relative;
  top: -35px;
  ${flex};
  flex-direction: column;
  padding: 0px 30px;
  //max-height: calc(100% - 100px);
  //background-color: red;
  pointer-events: none;
`;

export const CloseButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 45px;
  right: 15px;
  cursor: pointer;
  pointer-events: auto;
`;

export const EntityImageWrapper = styled.div`
  align-self: center;
  ${flexCenter};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: ${theme.colors.grey};
`;

export const EntityImage = styled.img`
  border-radius: 50%;
`;

export const TitleSection = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  ${flexCenter};
  flex-direction: column;
  color: ${theme.colors.white};
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

export const Description = styled.div`
  padding-top: 5px;
  // max-height: 115px;
  // ${customScrollbars};
  // overflow-y: scroll;
  pointer-events: auto;
`;

export const MissingTag = styled.div`
  font-size: 12px;
  padding: 1px 4px;
  margin-top: 5px;
  color: ${theme.colors.white};
  background-color: rgba(139, 0, 0, 0.3);
  border-radius: 2px;
  border: 1px solid rgb(139, 0, 0);
  //white-space: nowrap;
  //text-transform: uppercase;
`;

export const ToggleDetails = styled.span`
  margin-left: 4px;
  color: ${theme.colors.primary};
  cursor: pointer;
`;

export const SectionTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
  text-decoration: underline;
`;

export const FundingDetailsContainer = styled.div<HeightProps>`
  ${customScrollbars};
  overflow-y: scroll;
  max-height: ${(props) => props.height}px;
  //background-color: orange;
  pointer-events: auto;
`;
