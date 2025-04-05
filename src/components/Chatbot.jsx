import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, X, Minimize2, Maximize2, Mic, Globe } from "lucide-react";
import "../styles/chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en-US");
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize SpeechRecognition with English as default
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true; // Enable continuous listening
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US"; // Set default to English
      recognitionRef.current.maxAlternatives = 1; // Set maximum alternatives

      // Set timeout to 10 seconds
      recognitionRef.current.onstart = () => {
        setTimeout(() => {
          if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
          }
        }, 10000); // 10 seconds timeout
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage((prev) => prev + " " + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []); // Remove currentLanguage dependency to keep English as default

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
        const welcomeMessage = {
          text: "Hello! I'm T-One Assistant. How can I help you today?",
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

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "en-US" ? "vi-VN" : "en-US"));
    if (recognitionRef.current) {
      recognitionRef.current.lang = "en-US"; // Always set back to English for speech recognition
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser doesn't support speech recognition");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: inputMessage,
      });

      const botMessage = {
        text: response.data.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, I'm having some issues. Please try again later.",
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

      <div
        className={`chat-window ${isOpen ? "open" : ""} ${
          isMinimized ? "minimized" : ""
        }`}
      >
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

        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isTyping}
          />
          <button
            type="button"
            className="language-toggle"
            onClick={toggleLanguage}
            title={
              currentLanguage === "en-US"
                ? "Switch to Vietnamese"
                : "Switch to English"
            }
          >
            <Globe size={20} />
            <span>{currentLanguage === "en-US" ? "VI" : "EN"}</span>
          </button>
          <button
            type="button"
            className={`mic-button ${isListening ? "listening" : ""}`}
            onClick={toggleListening}
            disabled={isTyping}
          >
            <Mic size={20} />
          </button>
          <button type="submit" disabled={isTyping || !inputMessage.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
