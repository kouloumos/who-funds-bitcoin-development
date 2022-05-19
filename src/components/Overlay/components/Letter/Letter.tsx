import React, { memo, PropsWithChildren, useEffect, useState } from "react";
import { StyledLetter } from "./Letter.style";

type LetterProps = {
  defaultHover?: boolean;
};
const Letter = ({
  children,
  defaultHover = false,
}: PropsWithChildren<LetterProps>) => {
  const [hover, setHover] = useState(false);

  const startHoverEffect = () => {
    setHover(true);
    setTimeout(() => {
      setHover(false);
    }, 300);
  };

  useEffect(() => {
    setHover(defaultHover);
  }, [defaultHover]);

  return (
    <>
      <StyledLetter hover={hover} onMouseEnter={startHoverEffect}>
        {children}
      </StyledLetter>
    </>
  );
};

export default memo(Letter);
