import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

const ListItem = styled.li``

const Header = () => (
  <header
    css={css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    `}
  >
    <ul
      css={css`
        display: flex;
        list-style: none;
        margin-left: 20vw;
        color: #35a8f3;
        font-size: 1.5rem;
      `}
    >
      <li>Item1</li>
      <li>Item2</li>
      <li>Item3</li>
      <li>Item4</li>
    </ul>
  </header>
)

export default Header
