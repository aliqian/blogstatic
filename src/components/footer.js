import React from "react"
import { css } from "@emotion/core"
const Footer = () => (
  <div
    css={css`
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0004;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-transform: uppercase;
      background: #1e91d6;
    `}
  >
    Made with capital "hope"
  </div>
)
export default Footer
