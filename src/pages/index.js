import React from "react"
import SEO from "../components/seo"
import styles from "../styles/index.module.css"

class BlogIndex extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <SEO title="Home" />
      </div>
    )
  }
}

export default BlogIndex
