import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Leaf, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateHerbalAdvice } from '../services/geminiService';
import { useShop } from '../context/ShopContext';

export const HerbalistChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Terra Mater. I am Sage, your AI Herbalist. How can I support your wellness journey today? You can ask me about sleep, digestion, skin health, or specific herbs." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useShop();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateHerbalAdvice(userMessage.text, products);

    const aiMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-moss-700 hover:bg-moss-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center space-x-2"
        >
          <Leaf size={20} />
          <span className="font-medium text-sm hidden sm:inline">Ask the Herbalist</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col border border-earth-200 overflow-hidden animate-slide-in-up">
          {/* Header */}
          <div className="bg-moss-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-moss-500 p-1.5 rounded-full">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-serif font-medium text-lg">Sage</h3>
                <p className="text-xs text-moss-200">AI Wellness Companion</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-moss-600 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-earth-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-earth-800 text-white rounded-br-none'
                      : 'bg-white border border-earth-200 text-earth-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-earth-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-moss-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-moss-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-moss-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-earth-200">
            <div className="flex items-center bg-earth-50 rounded-full px-4 py-2 border border-earth-200 focus-within:border-moss-500 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about remedies..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-earth-800 placeholder-earth-400"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="ml-2 text-moss-600 hover:text-moss-800 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
