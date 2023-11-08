import "./page.module.css"
import UsernameInput from '@/components/UsernameInput';

export default function Home() {
  return (
    <main>
      <div className="username-container">
        <UsernameInput />
      </div>
    </main>
  )
}