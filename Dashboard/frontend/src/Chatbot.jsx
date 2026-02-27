import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Key, Loader2, Trash2 } from "lucide-react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am Alegis AI. How can I assist you with your cybersecurity needs today?" }
  ]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("alegis_ai_key");
    if (storedKey) {
      setApiKey(storedKey);
      setIsApiKeySet(true);
    }
    
    const storedMessages = localStorage.getItem("alegis_chat_history");
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error("Failed to load chat history", e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("alegis_chat_history", JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isApiKeySet || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          }
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      const errorMessage = {
        role: "assistant",
        content: `Error: ${error.response?.data?.error?.message || "Failed to get response from AI. Please check your API key and connection."}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem("alegis_ai_key", apiKey);
      setIsApiKeySet(true);
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem("alegis_ai_key");
    setApiKey("");
    setIsApiKeySet(false);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      const initialMessage = [{ role: "assistant", content: "Hello! I am Alegis AI. How can I assist you with your cybersecurity needs today?" }];
      setMessages(initialMessage);
      localStorage.setItem("alegis_chat_history", JSON.stringify(initialMessage));
    }
  };

  if (!isApiKeySet) {
    return (
      <div className="chatbot-setup-container">
        <div className="chatbot-setup-card">
          <div className="setup-icon">
            <Key size={40} />
          </div>
          <h2>AI Chatbot Setup</h2>
          <p>Please enter your OpenAI API key to start using the Alegis AI assistant. Your key is stored locally on your device.</p>
          <form onSubmit={saveApiKey} className="api-key-form">
            <input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="api-key-input"
              required
            />
            <button type="submit" className="save-key-btn">Initialize AI</button>
          </form>
          <div className="setup-footer">
            <p>Don't have a key? <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">Get one here</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="bot-info">
          <div className="bot-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h3>Alegis AI Assistant</h3>
            <span className="status-indicator">Powered by GPT-3.5</span>
          </div>
        </div>
        <div className="chatbot-actions">
          <button onClick={clearChat} className="action-btn" title="Clear History">
            <Trash2 size={18} />
          </button>
          <button onClick={resetApiKey} className="action-btn" title="Reset API Key">
            <Key size={18} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.role === "user" ? "user" : "assistant"}`}>
            <div className="message-avatar">
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="message-content">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper assistant">
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-content typing">
              <Loader2 className="animate-spin" size={16} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your security question here..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
