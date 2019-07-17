import React from "react"
import { css } from "@emotion/core"
import SEO from "../components/seo"
import Footer from "../components/footer"
import styles from "../styles/index.module.css"

class BlogIndex extends React.Component {
  render() {
    return (
      <div
        css={css`
          position: relative;
        `}
      >
        <div className={styles.container}>
          <SEO title="Home" />
          <section className={`${styles.sectionCard} ${styles.itemOne}`}>
            <h2 className={styles.bgTitle}>百川入海</h2>
            <h2
              css={css`
                font-size: 4rem;
                color: #343434;
              `}
            >
              Tech
            </h2>
            <p
              css={css`
                font-size: 1rem;
                color: #443e51;
                margin-top: 1rem;
              `}
            >
              Some say that teaching is the best way to learn. "Teach" is a big
              word for me, just be here to share things I learned. If you find
              something useful here, it's my pleasure.
            </p>
          </section>
          <section className={`${styles.sectionCard} ${styles.itemTwo}`}>
            <h2 className={styles.bgTitle}>休闲一刻</h2>
          </section>
          <section className={`${styles.sectionCard} ${styles.itemThree}`}>
            <h2 className={styles.bgTitle}>天马行空</h2>
          </section>
          <section className={`${styles.sectionCard} ${styles.itemFour}`}>
            <h2 className={styles.bgTitle}>敬请期待</h2>
          </section>
        </div>
        <Footer />
      </div>
    )
  }
}

export default BlogIndex
