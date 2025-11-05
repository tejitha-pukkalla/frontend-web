import React, { useState, useRef, useEffect } from "react";

// Component for the sleek typing animation
const TypingIndicator = () => (
  <div className="flex justify-start">
    {/* Bot message border: teal-400 -> amber-400 */}
    <div className="bg-gray-800 text-gray-200 border border-amber-400/30 px-3 py-2 rounded-xl rounded-bl-none shadow-md">
      <div className="flex space-x-1">
        {/* Typing dots: teal-400 -> amber-400 */}
        <span className="h-2 w-2 bg-amber-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }}></span>
        <span className="h-2 w-2 bg-amber-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.1s' }}></span>
        <span className="h-2 w-2 bg-amber-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }}></span>
      </div>
    </div>
  </div>
);

const ChatBot = () => {
  const [visible, setVisible] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // --- Quick Action Buttons Definition ---
  const initialQuickActions = [
    { label: "Pricing & Plans", action: "Tell me about your pricing plans." },
    { label: "Platform Features", action: "What are B2LINK's main features?" },
    { label: "Contact Support", action: "I need to contact support." },
  ];
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Initial Message and Auto Scroll Logic
  useEffect(() => {
    // 1. Initial Greeting
    if (visible && messages.length === 0) {
      setIsBotTyping(true);
      
      const typingTimer = setTimeout(() => {
        setIsBotTyping(false);
        setMessages([
          { id: 1, text: "Welcome to B2LINK! 👋 How can I assist you with our platform features or pricing?", isUser: false },
        ]);
        setShowQuickActions(true); // Show quick actions after the first message
      }, 1500);

      return () => clearTimeout(typingTimer);
    }
    
    // 2. Auto scroll
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visible, messages]);

  // --- New Bot Reply Logic ---
  const sendBotReply = (userText) => {
    setShowQuickActions(false);
    setIsBotTyping(true); 

    let botResponse = "Thank you for your question. ";
    
    if (userText.includes("pricing")) {
      botResponse += "Our pricing details are available right above in the 'Pillars' section, starting with a basic tier. Which plan are you interested in?";
    } else if (userText.includes("features")) {
      botResponse += "B2LINK offers Lead Hub access, Unlimited AI Queries (Professional plan), and Custom Integrations. Can I help you compare plans?";
    } else if (userText.includes("support") || userText.includes("contact")) {
      botResponse += "Our priority support team is ready to help! Please leave your email address, and we will create a dedicated ticket for you.";
    } else {
      botResponse += "Got it! We'll make sure a specialist reviews your query shortly.";
    }

    setTimeout(() => {
      setIsBotTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        text: botResponse,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 2000); // 2 second reply delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    
    const submittedText = input;
    setInput("");
    
    sendBotReply(submittedText);
  };

  const handleQuickAction = (actionText) => {
    const userMsg = { id: Date.now(), text: actionText, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    sendBotReply(actionText);
  };


  return (
    <>
      {/* Floating Robot Trigger - ROUNDED SHAPE, SHADOW, AND PULSE ANIMATION REMOVED */}
      <img
        src="/bot.png"
        alt="Chatbot Trigger"
        onClick={() => setVisible(!visible)}
        className={`
          fixed bottom-5 right-0 
          w-28 h-14 sm:w-32 sm:h-16 md:w-60 md:h-40 
          cursor-pointer z-50 
          transition-transform duration-300 hover:scale-105
          ${!visible ? '' : 'hidden'} 
          ${visible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      />

      {/* Chat Window - Professional, Futuristic Dark Theme */}
      {visible && (
        <div
          className={`
            fixed 
            bottom-24 right-4 
            w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
            h-[65vh] sm:h-[70vh] md:h-[500px] 
            bg-gray-900 shadow-2xl rounded-2xl 
            z-50 p-4 
            flex flex-col 
            border border-gray-700 shadow-amber-400/20 shadow-xl
            transition-all duration-500 origin-bottom-right
            animate-chat-in
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                🤖 B2LINK AI Assistant
              </span>
            </h2>
            <button
              onClick={() => setVisible(false)}
              className="text-gray-400 hover:text-amber-400 text-xl sm:text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto text-sm sm:text-base space-y-3 pr-1 custom-scrollbar">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[75%] shadow-md animate-message-pop ${
                    msg.isUser
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-br-none" 
                      : "bg-gray-800 text-gray-200 border border-amber-400/30 rounded-bl-none" 
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Show Quick Action Buttons */}
            {showQuickActions && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2 animate-message-pop">
                    {initialQuickActions.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleQuickAction(item.action)}
                            className="bg-gray-700 hover:bg-gray-600 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-400/30 transition-colors" 
                            disabled={isBotTyping}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Show Typing Indicator while waiting for a response */}
            {isBotTyping && <TypingIndicator />}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Area */}
          <div className="mt-3 border-t border-gray-700 pt-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isBotTyping ? "Please wait for the reply..." : "Type your query..."}
                className={`
                  flex-1 px-3 py-2 
                  border ${isBotTyping ? 'border-gray-800' : 'border-gray-700'} rounded-lg 
                  bg-gray-800 text-white
                  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 
                  text-sm sm:text-base placeholder-gray-500
                  ${isBotTyping ? 'cursor-not-allowed opacity-60' : ''}
                `}
                disabled={isBotTyping} // Disable input while bot is replying
              />
              <button
                type="submit"
                className={`
                  bg-gradient-to-r from-amber-400 to-orange-500 
                  text-white font-bold 
                  px-4 py-2 rounded-lg 
                  text-sm sm:text-base
                  transition-all duration-200 shadow-md
                  ${isBotTyping 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-amber-300 hover:to-orange-400 hover:shadow-amber-400/50' 
                  }
                `}
                disabled={isBotTyping} // Disable button while bot is replying
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;