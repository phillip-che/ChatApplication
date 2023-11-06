import styles from './page.module.css'
import io from "socket.io-client"

const socket = io("http://localhost:4000")

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        Socket ID: {socket.id}
      </div>
    </main>
  )
}
