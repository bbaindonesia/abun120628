
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import Markdown from 'react-markdown';

interface MessageBubbleProps {
  message: ChatMessageType;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-end mb-3 sm:mb-4 animate-fade-in ${isUser ? 'justify-end ml-8 sm:ml-12' : 'justify-start mr-8 sm:mr-12'}`}>
      <div
        className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl 
          max-w-[85%] sm:max-w-[75%] md:max-w-[70%]
          ${
          isUser 
            ? 'bg-theme-accent text-white rounded-br-lg shadow-glow-accent-strong' 
            : 'bg-theme-widget-bg text-theme-text rounded-bl-lg shadow-hologram-intense' 
        }`}
      >
        {message.isTyping ? (
          <div className="flex items-center space-x-1 py-1">
            <span className={`text-sm italic ${isUser ? 'text-slate-100' : 'text-theme-text-muted'}`}>
              {isUser ? 'Typing' : 'tunggu sebentar abun siap menjawab'}
            </span>
            <div className="typing-indicator-bubble">
                <span className={`typing-dot-bubble ${isUser ? 'user-dot' : 'abun-dot'}`}></span>
                <span className={`typing-dot-bubble ${isUser ? 'user-dot' : 'abun-dot'}`}></span>
                <span className={`typing-dot-bubble ${isUser ? 'user-dot' : 'abun-dot'}`}></span>
            </div>
          </div>
        ) : (
          <Markdown
            components={{
              p: ({node, ...props}) => <p className="mb-1 last:mb-0 text-sm sm:text-base leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside pl-2 mb-1 text-sm sm:text-base" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside pl-2 mb-1 text-sm sm:text-base" {...props} />,
              li: ({node, ...props}) => <li className="mb-0.5 text-sm sm:text-base" {...props} />,
              a: ({node, ...props}) => <a className="text-sky-300 hover:text-sky-200 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />, 
              strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
              h1: ({node, ...props}) => <h1 className="text-lg font-semibold mt-2 mb-1 text-sky-300" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-md font-semibold mt-1.5 mb-0.5 text-sky-300" {...props} />,
              h3: ({node, ...props}) => <h3 className="text font-semibold mt-1 mb-0.5 text-sky-300" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-theme-accent-hover pl-3 italic my-1 text-theme-text-muted" {...props} />,
            }}
          >
            {message.text}
          </Markdown>
        )}
        {!message.isTyping && (
           <p className={`text-xs mt-1.5 ${isUser ? 'text-slate-100 text-right' : 'text-theme-text-muted text-left'}`}>
             {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
