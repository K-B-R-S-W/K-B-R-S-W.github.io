import React, { useEffect, useState } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

const ChatModal = ({ isOpen, onClose, iframeSrc }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    setIsMaximized(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div 
        className={`relative bg-white rounded-xl shadow-2xl overflow-hidden animate-slideUp transition-all duration-300 ${
          isMaximized 
            ? 'w-[98vw] h-[98vh]' 
            : 'w-[90vw] h-[90vh]'
        }`}
      >
        {/* Header - Window Controls */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between z-10 shadow-lg">
          {/* Left - Title */}
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h2 className="text-base font-semibold">Ravindu's Digital Portfolio - Interactive Chat</h2>
          </div>

          {/* Right - Window Controls */}
          <div className="flex items-center space-x-2">
            {/* Maximize/Restore Button */}
            <button
              onClick={toggleMaximize}
              className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label={isMaximized ? "Restore" : "Maximize"}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="hover:bg-red-500 hover:bg-opacity-30 rounded-full p-2 transition-colors"
              aria-label="Close"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* iframe Container */}
        <div className="w-full h-full pt-12">
          <iframe
            src={iframeSrc}
            className="w-full h-full border-0"
            title="Chat Assistant"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
