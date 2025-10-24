import React, { useState, useEffect, useRef } from 'react';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! I'm Neil's AI assistant. Need a quick tour?" },
    { from: 'bot', text: "I can show projects, send the CV, or connect you to Neil." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const quickActions = [
    { label: 'View Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Download CV', id: 'cv' },
    { label: 'Contact Neil', id: 'contact' }
  ];

  const runAction = (id) => {
    if (id === 'projects') {
      const target = document.getElementById('projects') || document.querySelector('[data-projects]');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
    if (id === 'experience') {
      const target = document.getElementById('experience') || document.querySelector('[data-experience]');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
    if (id === 'skills') {
      const target = document.getElementById('build') || document.querySelector('[data-skills]');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
    if (id === 'education') {
      const target = document.getElementById('education') || document.querySelector('[data-education]');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
    if (id === 'cv') {
      const a = document.querySelector('[data-download-cv]');
      if (a) {
        a.click();
      }
    }
    if (id === 'email') {
      const mail = document.querySelector('[data-email]')?.getAttribute('data-email') || 'narnoli.neil@gmail.com';
      window.open(`mailto:${mail}?subject=Hello%20Neil`);
      setIsOpen(false);
    }
    if (id === 'contact') {
      const c = document.getElementById('contact') || document.querySelector('[data-contact]');
      if (c) {
        c.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  const botReply = (userText) => {
    const lower = userText.toLowerCase();
    let reply = "Got it! Want me to open projects or send the CV?";
    let action = null;

    if (lower.includes('project')) {
      reply = "Opening projects…";
      action = 'projects';
    } else if (lower.includes('cv') || lower.includes('resume')) {
      reply = "Downloading CV…";
      action = 'cv';
    } else if (lower.includes('contact') || lower.includes('email')) {
      reply = "Connecting you to Neil…";
      action = 'email';
    } else if (lower.includes('experience') || lower.includes('work')) {
      reply = "Showing experience…";
      action = 'experience';
    } else if (lower.includes('skill')) {
      reply = "Showing skills…";
      action = 'skills';
    } else if (lower.includes('education')) {
      reply = "Showing education…";
      action = 'education';
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
      if (action) {
        setTimeout(() => runAction(action), 300);
      }
    }, 700);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInputValue('');
    botReply(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        className="nn-ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Neil's AI"
      >
        💬
      </button>

      {/* Chat card */}
      <div className={`nn-ai-card ${!isOpen ? 'is-closed' : ''}`}>
        <div className="nn-border"></div>
        
        {/* Particles */}
        <div className="nn-particles">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${6 + Math.random() * 8}s`,
                transform: `scale(${0.6 + Math.random() * 1.6})`
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="nn-hdr">
          <div className="nn-ava">AI</div>
          <div className="nn-titles">
            <strong>Neil's Assistant</strong>
            <div className="nn-status">
              <span className="nn-dot"></span> Available
            </div>
          </div>
          <button className="nn-x" onClick={() => setIsOpen(false)} title="Close">
            ×
          </button>
        </div>

        {/* Message log */}
        <div className="nn-body" ref={logRef} role="log" aria-live="polite">
          {messages.map((msg, i) => (
            <div key={i} className={`nn-bubble ${msg.from === 'user' ? 'nn-user' : 'nn-bot'}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isTyping && (
            <div className="nn-bubble nn-bot nn-typing">
              <span className="nn-dotty"></span>
              <span className="nn-dotty"></span>
              <span className="nn-dotty"></span>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="nn-actions" role="group" aria-label="Quick actions">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="nn-chip"
              onClick={() => runAction(action.id)}
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="nn-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about projects, CV, or contact…"
            aria-label="Message Neil's AI"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend} aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="m2 21 21-9L2 3v7l15 2-15 2v7Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChat;

