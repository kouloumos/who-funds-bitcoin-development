import styled from "@emotion/styled";
import { customScrollbars, flexCenter } from "../../theme/functions";

export const PageWrapper = styled.div`
  ${flexCenter};
  // display:flex;
  // justify-content: center;
  // align-items: flex-start;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

type ContentWrapperProps = {
  hide: boolean;
};

export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: flex;
  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
  opacity: ${(props) => (props.hide ? 0 : 1)};
  width: 77%;
  max-height: 70%;
  border-radius: 30px;
  padding: 20px 20px;
  background-color: rgba(30, 92, 96, 0.85);
  transition: all 2s ease;
`;

export const ContentContainer = styled.div`
  color: white;
  ${customScrollbars};
  overflow-y: scroll;
  border-radius: 5px;
`;

export const Quote = styled.div`
  font-size: 15px;
  font-style: italic;
  opacity: 0.8;
`;

export const Tagline = styled.div`
  font-size: 28px;
  font-weight: bold;
  font-family: Kaela;
`;

export const Message = styled.div`
  font-size: 16px;
`;

export const Footnote = styled.div`
  font-size: 12px;
`;
