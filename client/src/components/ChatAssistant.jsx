import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Groq from 'groq-sdk';

const ChatAssistant = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0 && user) {
            setMessages([
                { role: 'assistant', content: `Hi ${user.name.split(' ')[0]}! I'm your engineering mentor. How can I help you today?` }
            ]);
        }
    }, [isOpen, user]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GROQ_API_KEY;

            if (!apiKey) throw new Error("API Key is missing from configuration.");

            const groq = new Groq({
                apiKey: apiKey,
                dangerouslyAllowBrowser: true
            });

            const context = window.location.pathname.replace('/', '') || 'Dashboard';

            const systemPrompt = `You are a helpful engineering mentor named "Campus Companion".
Student: ${user.name}
Current Page: ${context}
Style: Concise, encouraging, and practical.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages.map(m => ({ role: m.role, content: m.content })),
                    { role: 'user', content: userMessage.content }
                ],
                model: 'llama-3.3-70b-versatile',
                max_tokens: 400
            });

            const reply = completion.choices[0]?.message?.content || "I'm thinking...";
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

        } catch (error) {
            console.error('Groq Error:', error);
            const detail = error.message || error.toString();
            setMessages(prev => [...prev, { role: 'assistant', content: `Debug Error: ${detail}`, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            <button className="chat-toggle" onClick={toggleChat}>
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className="chat-window glass">
                    <header className="chat-header">
                        <h4>Campus Mentor AI</h4>
                        <span className="status-dot"></span>
                    </header>

                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.role} ${msg.isError ? 'error' : ''}`}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && <div className="message assistant loading">Typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ask a doubt..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()}>➤</button>
                    </form>
                </div>
            )}

            <style jsx>{`
                .chat-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    font-family: 'Inter', sans-serif;
                }

                .chat-toggle {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: var(--primary, #2563EB);
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: transform 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .chat-toggle:hover { transform: scale(1.1); }

                .chat-window {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    width: 320px;
                    height: 450px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #e5e7eb;
                    overflow: hidden;
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .chat-header {
                    padding: 1rem;
                    background: var(--primary, #2563EB);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .chat-header h4 { margin: 0; font-size: 1rem; }
                .status-dot { width: 8px; height: 8px; background: #4ADE80; border-radius: 50%; }

                .chat-messages {
                    flex: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    background: #f9fafb;
                }

                .message {
                    max-width: 80%;
                    padding: 0.6rem 0.8rem;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
                .message.user {
                    align-self: flex-end;
                    background: var(--primary, #2563EB);
                    color: white;
                    border-bottom-right-radius: 2px;
                }
                .message.assistant {
                    align-self: flex-start;
                    background: #E5E7EB;
                    color: #1F2937;
                    border-bottom-left-radius: 2px;
                }
                .message.error {
                    background: #FEE2E2;
                    color: #DC2626;
                }
                .message.loading { font-style: italic; color: #6B7280; background: none; padding-left: 0; }

                .chat-input {
                    padding: 0.8rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 0.5rem;
                    background: white;
                }
                .chat-input input {
                    flex: 1;
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 20px;
                    outline: none;
                }
                .chat-input button {
                    background: none;
                    border: none;
                    color: var(--primary, #2563EB);
                    font-size: 1.2rem;
                    cursor: pointer;
                }
                .chat-input button:disabled { color: #d1d5db; }
            `}</style>
        </div>
    );
};

export default ChatAssistant;
