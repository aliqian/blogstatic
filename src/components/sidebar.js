import React, { useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const green = "#dbeedd"
const white = "#ffffff"
const bg_square_border_width = "0.1rem"

const BgSquare = styled.div`
  background: #bcdf;
  border: ${bg_square_border_width} solid #fff;
`

const SideBar = ({ location, setTheme: _setTheme }) => {
  const data = useStaticQuery(graphql`
    query SideQuery {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const [theme, setTheme] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("theme-color")) ||
      white
  )
  const ColorSquare = ({ color }) => (
    <div
      css={css`
        background: ${color};
        height: 1.5rem;
        width: 1.5rem;
        border: 0.2rem solid;
        border-color: ${color === theme ? "black" : "lightgray"};
        border-radius: 100%;
        margin: 0 0.5rem;
        cursor: pointer;
      `}
      onClick={() => {
        setTheme(color)
        _setTheme && _setTheme(color)
        typeof window !== "undefined" &&
          window.localStorage.setItem("theme-color", color)
      }}
    ></div>
  )

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        background: #fff;
        position: relative;
        z-index: 1;
      `}
    >
      <div
        css={css`
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          display: grid;
          padding: 0.05rem 0 0 0.05rem;
          grid-template-columns: repeat(auto-fill, 1rem);
          grid-template-rows: repeat(auto-fill, 1rem);
          background-size: 1rem 1rem;
          background-image: linear-gradient(
              to right,
              #fafafa ${bg_square_border_width},
              transparent ${bg_square_border_width}
            ),
            linear-gradient(
              to bottom,
              #fafafa ${bg_square_border_width},
              transparent ${bg_square_border_width}
            );
        `}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <BgSquare key={index} />
        ))}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-flow: column nowrap;
          padding-top: ${rhythm(5)};
          width: ${rhythm(11)};
        `}
      >
        <div
          css={css`
            width: 10rem;
            height: 10rem;
            border: 1px solid lightgray;
            border-radius: 100%;
            position: relative;
            overflow: hidden;
          `}
        >
          <Image
            fluid={data.logo.childImageSharp.fluid}
            alt="BIG LOGO"
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              borderRadius: `100%`,
              width: "100%",
              height: "100%",
            }}
          />
          {location.pathname !== `${__PATH_PREFIX__}/` && (
            <Link
              to="/"
              css={css`
                display: flex;
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: #fffd;
                box-shadow: none;
                font-size: 2rem;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.2s;

                :hover {
                  opacity: 1;
                }
              `}
            >
              &larr; HOME
            </Link>
          )}
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
        <p
          css={css`
            margin-top: 1rem;
            font-size: 0.85rem;
            font-family: "Courier New", Courier, monospace;
            color: gray;
          `}
        >
          Know a little byte of programming.
        </p>
      </div>
    </div>
  )
}

export default SideBar
