const baseColors = {
  white: "#fafafa",
  black: "#151515",
  grey: "#424242",
  orange: "#f7931A",
};

const defaultTheme = {
  textColor: baseColors.white,

  colors: {
    ...baseColors,
    primary: baseColors.orange,
  },
};
export default defaultTheme;
