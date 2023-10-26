import { Image } from "antd"

import styles from "../styles/Layouts/AuthLayout.module.css"
import quark from "../assets/Quark.png"
import AuthLayoutTabs from "../components/AuthLayoutTabs"

const AuthLayout = () => {
  return (
    <main className={styles.container}>
      <section className={styles.layoutSection}>
        <Image width={400} src={quark} />
        <AuthLayoutTabs />
      </section>
    </main>
  )
}

export default AuthLayout