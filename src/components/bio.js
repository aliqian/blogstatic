import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 56, height: 56) {
            ...GatsbyImageSharpFixed
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

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        position: "relative",
        background: "linear-gradient(to right, #2d2d2d, #808080 60%)",
        padding: "2px 50px 2px 70px",
        borderRadius: "10rem",
        display: "inline-block",
        color: "white",
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginBottom: 0,
          minWidth: 56,
          borderRadius: `100%`,
          border: "0.2rem solid white",
          position: "absolute",
          top: 2,
          left: 4,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ margin: 0, padding: 0 }}>
        Personal blog by <strong>{author}</strong>.
        <br />
        It's time to write something.
      </p>
    </div>
  )
}

export default Bio
