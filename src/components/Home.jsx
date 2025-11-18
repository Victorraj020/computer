import './styles/Home.css';
import Header from './Header';
import FAQ from './FAQs';
import Footer from './Dashboard comps/Footer';
import Gochatbot from './Gochatbot';
import Images from './Images';
import Services from './Services';
import About from './About';
import TeamsPatrons from './TeamsPatrons';
import { FiMessageSquare } from 'react-icons/fi';
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
import Slider from './Slider';

function Home() {
    const HardwareFaqData = [
        { 
            question: "What is the difference between Intel and AMD processors?", 
            answer: "Intel processors offer strong single-core performance, making them great for gaming. AMD Ryzen processors excel in multi-core performance, ideal for multitasking and productivity." 
        },
        { 
            question: "What does VRAM do in a graphics card?", 
            answer: "VRAM (Video RAM) stores graphics-related data. Higher VRAM allows for better rendering of high-resolution textures and improves gaming and 3D application performance." 
        },
        { 
            question: "Which power supply unit (PSU) is best for gaming PCs?", 
            answer: "A PSU with at least 80 Plus Bronze certification and sufficient wattage (600W or more for gaming rigs) is recommended. Modular PSUs help with better cable management." 
        }
    ];

    const [messages, setMessages] = useState([
        {
          message: 'Ask me anything!',
          sentTime: 'just now',
          sender: 'Gemini AI',
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
        // <div className='the-home w-[100%] min-h-screen bg-[#121212] text-white'>
        // navigation bar back to back colour //
 <div className="relative bg-gray-100 text-black text-white overflow-hidden"> 
            <Header />
            <Images />
            <Slider />
            <About />
            <Services />

            {/* Chatbot
            <div>
                <button className="chatbot-toggle flex items-center gap-2" onClick={toggleChatbot}>
                    <FiMessageSquare size={20} />
                    {isVisible ? 'Close Chat' : 'Chat Bot'}
                </button>
              
                <div className={`chatbot-popup ${isVisible ? 'visible' : 'hidden'}`}>
                    <div className="chatbot-header">
                        <h3>Gemini AI Chatbot</h3>
                        <button className="close-btn" onClick={toggleChatbot}>✖</button>
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
            </div> */}

            <TeamsPatrons />

            {/* FAQ Section with Updated Questions */}
            <div className="home-faq bg-[#181818] py-12" id='faq'>
                <FAQ faqdata={HardwareFaqData} who={"Computer Hardware"} />
            </div>

            <Footer />
        </div>
    );
}

export default Home;
