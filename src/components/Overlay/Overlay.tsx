import React, { useEffect, useState } from "react";
import Letter from "./components/Letter/Letter";
import { fonts, FontsType, PageWrapper } from "./Overlay.style";

const BITCOIN_IS = "Bitcoin is";
const adjectives = [
  "truth",
  "transparency",
  "sound money",
  "so much more than money",
  "a better future",
  "opting out",
  "curiosity",
  "not trusting third parties",
  "economics",
  "math",
  "fascinating",
  "scarcity",
  "censorship-resistance",
  "equal access",
  "store of value",
  "permissionless",
  "a paradigm shift",
  "philosophy",
  "nature",
  "addictive",
  "magic internet money",
  "complicated",
  "education",
  "a rulebreaker",
];

const addPrefix = (array: string[]) => {
  return array.map((adjective, index) =>
    index === array.length - 1
      ? `${BITCOIN_IS} ${adjective}. `
      : `${BITCOIN_IS} ${adjective}.`
  );
};

// source https://stackoverflow.com/a/2450976/5800072
const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const createText = () => {
  return addPrefix(shuffle(adjectives)).join(" ");
};

const getFont = () => {
  const availableFonts = Object.keys(fonts) as FontsType[];

  return availableFonts[Math.floor(Math.random() * availableFonts.length)];
};

type OverlayProps = {
  contentAnimated: boolean;
};
const Overlay: React.FC<OverlayProps> = ({ contentAnimated }) => {
  const [renderedText, setRenderedText] = useState<string[]>([]);
  const [renderedTextHover, setRenderedTextHover] = useState<boolean[]>([]);
  const [animationActive, setAnimationActive] = useState(false);
  const [activeFont] = useState(getFont());
  const [text] = useState(createText());
  const typeSpeed = 100;
  const animationSpeed = 20;
  const times = 15;

  const typeWriter = (letterPosition = 0) => {
    if (letterPosition < text.length * times) {
      setRenderedText((currentRenderedText) => {
        return [
          ...currentRenderedText,
          text.charAt(letterPosition % text.length),
        ];
      });

      setTimeout(() => {
        typeWriter(letterPosition + 1);
      }, typeSpeed);
    }
  };

  const animateLetter = (letterPosition = 0) => {
    if (
      letterPosition <
      renderedText.length + (renderedText.length * animationSpeed) / typeSpeed
    ) {
      setRenderedTextHover(() => {
        const newHover = [];
        for (let i = 0; i < 10; i++) {
          newHover[letterPosition - i] = true;
        }
        return newHover;
      });

      setTimeout(() => {
        animateLetter(letterPosition + 1);
      }, animationSpeed);
    } else {
      setAnimationActive(false);
      setRenderedTextHover([]);
    }
  };

  useEffect(() => {
    if (animationActive === false && contentAnimated === true) {
      setAnimationActive(true);
      animateLetter();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentAnimated]);

  useEffect(() => {
    // setTimeout(() => {
    typeWriter(0);
    // }, 3000);
    //typeWriter(0);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper font={activeFont}>
      {renderedText.map((letter, index) => (
        <Letter key={index} defaultHover={renderedTextHover[index]}>
          {letter === " " ? `\u00A0` : letter}
        </Letter>
      ))}
    </PageWrapper>
  );
};

export default Overlay;
