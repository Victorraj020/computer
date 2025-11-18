import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

import './ChatbotPopup.css';

function AiChatBot() {
  const [messages, setMessages] = useState([
    {
      message: 'Ask me anything!',
      sentTime: 'just now',
      sender: 'Gemini Ai',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // To toggle visibility

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    await processMessageToBackend(newMessages);
  };

  const processMessageToBackend = async (chatMessages) => {
    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === 'Assistant' ? 'assistant' : 'user',
      content: messageObject.message,
    }));

    try {
      const response = await fetch('http://localhost:5002/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messagesreq: apiMessages }),
      });

      const data = await response.json();
      setMessages([
        ...chatMessages,
        {
          message: data.data,
          sender: 'Assistant',
        },
      ]);
    } catch (error) {
      console.error('Error communicating with the server:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isVisible ? 'Close Chat' : 'Chat with Gemini'}
      </button>

      <div className={`chatbot-popup ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="chatbot-header">
          <h3>Gemini AI Chatbot</h3>
          <button className="close-btn" onClick={toggleChatbot}>
            ✖
          </button>
        </div>
        <MainContainer className="chatbot-container">
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Gemini is typing..." /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default AiChatBot;
