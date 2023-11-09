'use client';

import ChatRoom from '@/components/ChatRoom';
import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  );

  return (
    <main>
      <h1>Chat Room</h1>
      <h3>Username: {username}</h3>
      <ChatRoom socket="socket" username="username" />
      <Button>
        <Link href="/">Quit Chatroom</Link>
      </Button>
    </main>
  );
};

export default Page;
