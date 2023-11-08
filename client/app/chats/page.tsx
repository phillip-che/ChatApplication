"use client"

import Link from 'next/link';
import { useEffect } from 'react'
import { useSocket } from '@/context/socket.context';

const Page = () => {

  const { socket, username, setUsername } = useSocket();
  
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    console.log(socket.id);
  }, [])

  return (
    <main>
        <div>
            Chat rooms
            <div>Username: {username} </div>
            <Link href="/" > Back </Link>
        </div>
    </main>
  )
}

export default Page;