import React, { useState } from "react"
import { css } from "@emotion/core"

import { rhythm } from "../utils/typography"
import SideBar from "./sidebar"
import Bio from "./bio"
import { Link } from "gatsby"

const Layout = ({ children, location }) => {
  const [theme, setTheme] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("theme-color")) ||
      "white"
  )

  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        background: ${theme};
      `}
    >
      <div
        css={css`
          flex-grow: 0;
          @media (max-width: 960px) {
            display: none;
          }
        `}
      >
        <SideBar setTheme={t => setTheme(t)} location={location} />
      </div>
      <div
        css={css`
          width: 0;
          flex-grow: 1;
          box-shadow: 0px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 2;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            max-width: ${rhythm(24)};
            padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
            overflow: auto;
            height: 100%;
          `}
        >
          <div
            css={css`
              @media (min-width: 960px) {
                display: none;
              }
            `}
          >
            {location.pathname === `${__PATH_PREFIX__}/` ? (
              <Bio />
            ) : (
              <Link to="/">Home</Link>
            )}
          </div>
          <main>{children}</main>
          <footer>
            &copy; {new Date().getFullYear()}, Built with
            {` `}
            Code
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Layout
