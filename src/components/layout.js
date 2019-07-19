import React, { useState } from "react"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"
import SideBar from "./sidebar"

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme-color") || "white"
  )

  return (
    <div
      css={css`
        height: 100vh;
        overflow: auto;
        display: flex;
        justify-content: center;
        background: ${theme};
      `}
    >
      <SideBar setTheme={t => setTheme(t)} />
      <div
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          Code
        </footer>
      </div>
    </div>
  )
}

export default Layout
