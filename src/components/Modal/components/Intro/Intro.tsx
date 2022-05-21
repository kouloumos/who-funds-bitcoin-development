import React from "react";

import { FeedbackLink } from "src/pages/HomePage/components/Footer/Footer.style";
import { trackEvent } from "src/utils/umami";

const Intro = () => {
  return (
    <div>
      <a
        style={{
          color: "#f18214",
          textDecoration: "none",
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "Kaela",
        }}
        href="https://roamresearch.com/#/app/kouloumos/page/VqKBlxftq"
        target="_blank"
        rel="noreferrer"
      >
        Who Funds Bitcoin Development{" "}
      </a>
      {/* <Quote>
        <p>
          "Bitcoin is open-source and decentralized. No single entity should
          control it. But equally, no single entity is responsible for improving
          it. It is easy for Bitcoin users and companies to free-ride without
          contributing to Bitcoin development — a classic tragedy of the
          commons".{" "}
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
      </Quote> */}
      <div>
        <p>
          An exploration tool for the Bitcoin open-source ecosystem. Showcasing
          who funds Bitcoin development and what developers are working on.
        </p>
        <p style={{ fontSize: 12 }}>
          Zoom, drag and click around to explore further!
        </p>
        <p style={{ fontSize: 12 }}>
          Submit a PR
          <FeedbackLink
            href={`https://github.com/kouloumos/who-funds-bitcoin-development`}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("data", "click")}
          >
            to contribute data 
          </FeedbackLink>
          .
        </p>
      </div>
    </div>
  );
};

export default Intro;
