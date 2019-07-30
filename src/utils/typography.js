import Typography from "typography"
import theme from "typography-theme-de-young"

theme.overrideThemeStyles = () => {
  return {
    a: {
      boxShadow: `none`,
    },
    body: {
      lineHeight: 1.75,
    },
  }
}

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
