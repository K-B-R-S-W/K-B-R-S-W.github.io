import React, { useState } from 'react';
import FloatingChatWidget from './FloatingChatWidget';
import ChatModal from './ChatModal';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const inferredLocalChatUrl = typeof window !== 'undefined' && window.location.port === '5173'
    ? 'http://localhost:5174'
    : 'http://localhost:5173';

  // Priority: explicit env -> smart local inference -> deployed chat UI
  const chatUrl = import.meta.env.VITE_CHAT_URL || (isLocalhost ? inferredLocalChatUrl : 'https://portfolio-chat-ui.vercel.app');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      <FloatingChatWidget onClick={toggleChat} isOpen={isOpen} />
      <ChatModal isOpen={isOpen} onClose={closeChat} iframeSrc={chatUrl} />
    </>
  );
};

export default ChatBot;
