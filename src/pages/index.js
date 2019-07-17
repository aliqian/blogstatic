import React from "react"
import styled from "@emotion/styled"
import SEO from "../components/seo"

const Container = styled.div`
  background: #1e91d6;
  width: 100vw;
  height: 100vh;
  padding: 3rem 8rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 4fr 1fr 0.5fr;
  grid-column-gap: 4rem;

  [class^="item"] {
    color: #1e91d6;
    background: #0072bb22;
    border-radius: 0.5rem;
    border: 0 solid #0072bb;
    cursor: pointer;
    transition: all 0.1s;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  }
  [class^="item"]:hover {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    border-width: 0;
    border-radius: 0.8rem;
    border-width: 0.1rem;
    /* border-right-color: #fff4;
    border-bottom-color: #fff2;
    border-left-color: #0072bb99; */
  }
  [class^="item"]:active {
    background: #0072bb66;
    border-width: 0.3rem;
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
