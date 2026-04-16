import React from 'react';

const FloatingChatWidget = ({ onClick, isOpen }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {!isOpen && (
        <div className="rounded-xl bg-black/80 text-white shadow-xl backdrop-blur-md border border-white/10 px-4 py-3">
          <div className="text-sm font-semibold leading-none">Chat with Digital Ravindu</div>
          <div className="text-xs text-gray-300 mt-1">Ask about projects, skills, and experience</div>
        </div>
      )}

      <button
        onClick={onClick}
        className={`relative overflow-hidden flex items-center gap-2 px-4 h-14 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 border ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 border-red-300/30'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-white/20'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-semibold text-sm">
          R
        </span>
        <span className="text-white text-sm font-semibold">{isOpen ? 'Close' : 'Chat'}</span>

        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-white/30 animate-pulse pointer-events-none"></span>
        )}
      </button>
    </div>
  );
};

export default FloatingChatWidget;
