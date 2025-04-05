import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X, Minimize2, Maximize2 } from "lucide-react";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
      if (isFirstOpen) {
        // Thêm tin nhắn chào mừng khi mở chat lần đầu
        const welcomeMessage = {
          text: "Xin chào! Tôi là T-One Assistant. Tôi có thể giúp gì cho bạn?",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages([welcomeMessage]);
        setIsFirstOpen(false);
      }
    }
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call Flask API
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: inputMessage,
      });

      // Add bot response
      const botMessage = {
        text: response.data.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage = {
        text: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Toggle Button */}
      <button
        className="chat-toggle-btn"
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        <div className="robot-icon">
          <div className="robot-antenna"></div>
          <div className="robot-head">
            <div className="robot-eye left"></div>
            <div className="robot-eye right"></div>
          </div>
          <div className="robot-body"></div>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`chat-window ${isOpen ? "open" : ""} ${
          isMinimized ? "minimized" : ""
        }`}
      >
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-title">
            <div
              className="robot-icon"
              style={{ width: "24px", height: "24px" }}
            >
              <div className="robot-antenna"></div>
              <div className="robot-head">
                <div className="robot-eye left"></div>
                <div className="robot-eye right"></div>
              </div>
              <div className="robot-body"></div>
            </div>
            <span>T-One Assistant</span>
          </div>
          <div className="chat-controls">
            <button onClick={toggleMinimize}>
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button onClick={toggleChat}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "bot" ? "bot" : "user"}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <small>{message.timestamp}</small>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            disabled={isTyping}
          />
          <button type="submit" disabled={isTyping || !inputMessage.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
