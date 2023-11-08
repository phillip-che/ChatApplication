import './globals.css'
import NavBar from '@/components/NavBar'
import { Roboto } from 'next/font/google'
import SocketsProvider from '@/context/socket.context'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SocketsProvider>
      <html lang="en">
        <body className={roboto.className} >
          <NavBar />
          {children}
        </body>
      </html>
    </SocketsProvider>
  )
}