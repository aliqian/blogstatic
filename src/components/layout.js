import React, { useState } from "react"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"
import SideBar from "./sidebar"

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(
    (window && window.localStorage.getItem("theme-color")) || "white"
  )

  return (
    <div
      css={css`
        height: 100vh;
        overflow-y: scroll;
        display: flex;
        background: ${theme};
      `}
    >
      <div
        css={css`
          flex-grow: 3;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <SideBar setTheme={t => setTheme(t)} />
      </div>
      <div
        css={css`
          flex-grow: 4;
        `}
      >
        <div
          css={css`
            max-width: ${rhythm(24)};
            padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
          `}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            Code
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Layout
