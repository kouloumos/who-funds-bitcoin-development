import React from "react";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { NodeData } from "src/pages/HomePage/HomePage";
import { SocialContainer, SocialIcon } from "./SocialLinks.style";

type Props = Pick<NodeData, "twitter" | "github" | "website">;
const SocialLinks = ({ twitter, github, website }: Props) => {
  return (
    <SocialContainer>
      {github && (
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noreferrer"
        >
          <SocialIcon icon={faGithub} />
        </a>
      )}
      {twitter && (
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noreferrer"
        >
          <SocialIcon icon={faTwitter} />
        </a>
      )}
      {website && (
        <a
          href={`${website}`}
          target="_blank"
          rel="noreferrer"
        >
          <SocialIcon icon={faLink} />
        </a>
      )}
    </SocialContainer>
  );
};

export default SocialLinks;
