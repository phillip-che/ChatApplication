// import "./page.module.css"
import ChatContainer from '@/components/ChatContainer';
import { Button } from '@mui/material';
import Link from 'next/link';

const Page = () => {

  return (
    <main>
      <div className="chat-room">
        <ChatContainer />
        <Button>
          <Link href="/">Leave Chat</Link>
        </Button>
      </div>
   </main>
  );
};

export default Page;
