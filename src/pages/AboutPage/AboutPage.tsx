import React, { useState } from "react";

import { Overlay } from "src/components";
import {
  ContentContainer,
  PageWrapper,
  Quote,
  Message,
  Tagline,
  Footnote,
  ContentWrapper,
} from "./AboutPage.style";

const HomePage = () => {
  const [hideContent, setHideContent] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "h") {
      setHideContent((prev) => !prev);
    }
    if (event.key === "a") {
      setAnimateContent((prev) => !prev);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <PageWrapper>
      <Overlay contentAnimated={animateContent} />
      {/* <img alt="" src={Castle} height={300} /> */}
      <ContentWrapper hide={hideContent}>
        <ContentContainer>
          <Quote>
            <div>
              "Significant value is stored in Bitcoin, yet Bitcoin software is
              maintained by a relatively small group of developers.
            </div>
            <p>
              Large corporations like Google or Boeing have legions of engineers
              working on search or autopilot software, but Bitcoin has neither
              the headcount nor the central coordination.
            </p>
            <p>
              This is by design, of course. Bitcoin is open-source and
              decentralized. No single entity should control it. But equally, no
              single entity is responsible for improving it. It is easy for
              Bitcoin users and companies to free-ride without contributing to
              Bitcoin development — a classic tragedy of the commons".{" "}
              <sup>
                <a
                  style={{ color: "#f18214", textDecoration: "none" }}
                  href="https://www.paradigm.xyz/2020/07/funding-bitcoin-development-2/"
                  target="_blank"
                  rel="noreferrer"
                >
                  src
                </a>
              </sup>
            </p>
          </Quote>
          <Tagline>
            <p>
              <a
                style={{
                  color: "#f18214",
                  textDecoration: "none",
                  fontSize: 50,
                  fontFamily: "Kaela",
                }}
                href="https://roamresearch.com/#/app/kouloumos/page/VqKBlxftq"
                target="_blank"
                rel="noreferrer"
              >
                Who Funds Bitcoin Development{" "}
              </a>
              aims to be a cool website showcasing those that fund Bitcoin
              development.
            </p>
          </Tagline>
          <Message>
            <p>
              My ambition is to further develop it as the go-to resource for
              anyone eager to explore what individual Bitcoin developers are
              working on, unraveling all the cool things happenning on Bitcoin.
            </p>
            <Footnote>
              I am probably going to look for funding at some point so it is
              also a nice little project to educate myself about the
              opportunities that exist.
            </Footnote>
            <Footnote style={{ marginTop: 3 }}>
              You can follow me on{" "}
              <a
                style={{ color: "#f18214", textDecoration: "none" }}
                href="https://twitter.com/kouloumos"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>{" "}
              for updates.
            </Footnote>
          </Message>
        </ContentContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default HomePage;
