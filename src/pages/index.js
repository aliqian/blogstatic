import React from "react"
import styled from "@emotion/styled"
import SEO from "../components/seo"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 3rem 8rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 4fr 1fr;
  grid-column-gap: 2rem;

  [class^="item"] {
    color: #333;
    border: 1rem outset;
    /* box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3); */
    border-radius: 1.6rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  [class^="item"]:nth-child(even) {
    border-style: solid;
  }
  [class^="item"]:hover {
    box-shadow: 1px 1px 18px rgba(0, 0, 0, 0.3);
    border-width: 0;
  }
  [class^="item"]:active {
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
  }

  .item-one {
    grid-row: 2 / 4;
    grid-column: 1 / 2;
  }

  .item-two {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  .item-three {
    grid-row: 2 / 4;
    grid-column: 3 / 4;
  }

  .item-four {
    grid-row: 1 / 3;
    grid-column: 4 / 5;
  }
`

class BlogIndex extends React.Component {
  render() {
    return (
      <Container>
        <SEO title="Home" />
        <div className="item-one"></div>
        <div className="item-two"></div>
        <div className="item-three"></div>
        <div className="item-four"></div>
      </Container>
    )
  }
}

export default BlogIndex
