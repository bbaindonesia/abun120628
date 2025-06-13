
import React, { useState, useRef, useEffect, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import { ChatMessage } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  handleSendMessage: (inputText: string, useGoogleSearch?: boolean) => Promise<void>;
  resetChat: () => void;
  onCloseModal?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  handleSendMessage,
  resetChat,
  onCloseModal 
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [useGoogleSearch, setUseGoogleSearch] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    handleSendMessage(inputText, useGoogleSearch);
    setInputText('');
  };

  const handlePredefinedQuestionClick = (question: string) => {
    handleSendMessage(question, useGoogleSearch);
  };

  const predefinedQuestionsPrompt = "Atau pilih pertanyaan ini:";
  const inputPlaceholder = "Assalamualaikum, ada yang bisa Abun bantu?";

  const predefinedQuestionsToDisplay = [
    "Info tentang BBA Indonesia",
    "Kasih Abun hiburan dong!",
    "Alamat Kantor BBA Indonesia di mana?"
  ];

  return (
    <div className="flex flex-col flex-grow bg-theme-bg shadow-xl rounded-b-xl overflow-hidden border-x border-b border-theme-border w-full mx-auto">
      {/* Header section of chat window (reset button) */}
      <div className="p-3.5 sm:p-4 border-b border-theme-border flex items-center justify-end bg-theme-interactive">
        <button
            onClick={resetChat}
            className="p-2 rounded-full hover:bg-theme-widget-bg text-theme-text-muted hover:text-theme-accent hover:shadow-neon-icon-glow transition-all"
            aria-label="Mulai obrolan baru"
            title="Mulai obrolan baru"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      {/* Message display area */}
      <div className="flex-grow p-3 sm:p-4 space-y-2 sm:space-y-3 overflow-y-auto min-h-[200px] sm:min-h-[300px] scrollbar-thin scrollbar-thumb-theme-accent scrollbar-track-theme-interactive">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Predefined questions for new chats */}
      {messages.length < 3 && !isLoading && (
          <div className="p-2.5 sm:p-3 border-t border-theme-border">
              <p className="text-xs text-theme-text-muted mb-2 text-center">{predefinedQuestionsPrompt}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                  {predefinedQuestionsToDisplay.map(q => (
                      <button
                          key={q}
                          onClick={() => handlePredefinedQuestionClick(q)}
                          className="bg-theme-interactive hover:bg-opacity-70 text-theme-text-muted text-xs px-3 py-1.5 rounded-full transition-all hover:text-theme-text hover:shadow-glow-interactive border border-theme-border hover:border-theme-accent"
                      >
                          {q}
                      </button>
                  ))}
              </div>
          </div>
      )}

      {/* Input area */}
      <div className="p-3 sm:p-4 border-t border-theme-border bg-theme-header-footer-bg space-y-2.5">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 sm:space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={inputPlaceholder}
            className="form-input flex-grow text-sm sm:text-base" // Global form-input style will apply
            disabled={isLoading}
            aria-label="Masukkan pesan Anda"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold p-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-glow-accent-strong focus:shadow-glow-accent-strong focus:outline-none"
            aria-label="Kirim pesan"
          >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            )}
          </button>
        </form>

        <div className="flex items-center justify-end space-x-1.5 sm:space-x-2 pt-1">
            <label htmlFor="googleSearchToggle" className="text-xs text-theme-text-muted cursor-pointer">Gunakan Google Search?</label>
            <input
                type="checkbox"
                id="googleSearchToggle"
                checked={useGoogleSearch}
                onChange={(e) => setUseGoogleSearch(e.target.checked)}
                className="form-checkbox h-3.5 w-3.5 sm:h-4 sm:w-4" // Global form-checkbox style will apply
                disabled={isLoading}
            />
        </div>
      </div>
    </div>
  );
};
