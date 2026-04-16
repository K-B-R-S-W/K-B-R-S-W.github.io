import React, { useState } from 'react';
import FloatingChatWidget from './FloatingChatWidget';
import ChatModal from './ChatModal';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use environment variable for iframe URL, fallback to localhost for development
  const chatUrl = import.meta.env.VITE_CHAT_URL || 'http://localhost:5174';

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
