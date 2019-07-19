import React, { useState } from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"

const green = "#dbeedd"
const white = "#ffffff"

const SideBar = ({ setTheme: _setTheme }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme-color") || white
  )
  const ColorSquare = ({ color }) => (
    <div
      css={css`
        background: ${color};
        height: 1.5rem;
        width: 1.5rem;
        border: 0.2rem solid;
        border-color: ${color === theme ? "black" : "lightgray"};
        border-radius: 0.2rem;
        margin: 0 0.5rem;
      `}
      onClick={() => {
        setTheme(color)
        _setTheme && _setTheme(color)
        localStorage.setItem("theme-color", color)
      }}
    ></div>
  )

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        padding: ${rhythm(5)} ${rhythm(2)} 0;
      `}
    >
      <div
        css={css`
          width: 10rem;
          height: 10rem;
          border: 1px solid ${theme};
          border-radius: 0.5rem;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        `}
      >
        <Link
          to="/"
          css={css`
            display: block;
            width: 100%;
            height: 100%;
            background: transparent;
            text-indent: -999rem;
            box-shadow: none;
          `}
        >
          HOME
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: ${rhythm(1)};
        `}
      >
        <ColorSquare color={white} />
        <ColorSquare color={green} />
      </div>
    </div>
  )
}

export default SideBar
