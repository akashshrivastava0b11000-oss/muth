import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, ChevronRight, HelpCircle, Lightbulb, Compass, Award, ExternalLink } from 'lucide-react';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import { Opportunity, Resource } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'sutra';
  text: string;
  time: string;
  actions?: { label: string; url?: string; tab?: string }[];
}

interface AskSutraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskSutraModal: React.FC<AskSutraModalProps> = ({ isOpen, onClose }) => {
  const { activeVenture } = useVenture();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: Message = {
    id: 'msg-welcome',
    sender: 'sutra',
    text: `Hello! I am **SUTRA Catalyst AI**, your venture assistant. ${
      activeVenture
        ? `I am currently analyzing context for **${activeVenture.name}** (Stage: *${activeVenture.stage.toUpperCase()}*, Sector: *${activeVenture.industry}*).`
        : 'How can I assist your startup journey today?'
    }\n\nAsk me about verified government schemes, venture readiness tips, finding mentors, or next operational steps!`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: 'Check Scheme Eligibility', tab: 'schemes' },
      { label: 'Improve Readiness Score', tab: 'readiness' },
      { label: 'Find a Co-builder or Freelancer', tab: 'freelancers' }
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialWelcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const generateContextualResponse = (query: string): { reply: string; actions?: Message['actions'] } => {
    const q = query.toLowerCase();
    const opportunities = storage.getOpportunities();
    const resources = storage.getResources();

    if (q.includes('scheme') || q.includes('grant') || q.includes('funding') || q.includes('money') || q.includes('sisfs')) {
      const match = opportunities.find(o => o.category === 'Government Scheme' || o.category === 'Grant');
      return {
        reply: `For **${activeVenture?.name || 'your venture'}** at the **${activeVenture?.stage.toUpperCase() || 'current'}** stage, the primary verified government support is the **Startup India Seed Fund Scheme (SISFS)** offering up to ₹50 Lakhs (₹20L prototype grant + ₹30L convertible debt).\n\nAdditionally, if you are developing hardware or bio-solutions, consider the **NIDHI-PRAYAS** grant (up to ₹10L non-dilutive) or **BIRAC BIG** (₹50L).`,
        actions: [
          { label: 'View Opportunities & Schemes', url: '/opportunities' },
          { label: 'Read DPIIT Recognition Guide', url: '/resources' }
        ]
      };
    }

    if (q.includes('readiness') || q.includes('score') || q.includes('assess')) {
      const currentScore = activeVenture?.latestReadinessScore;
      return {
        reply: `Your venture **${activeVenture?.name}** currently holds a readiness score of **${currentScore ? `${currentScore}/100` : 'Not yet calculated'}**.\n\nTo raise your score, the SUTRA diagnostic recommends:\n1. Formalize your DPIIT startup registration.\n2. Execute structured customer discovery interviews to quantify pain-point costs.\n3. Complete the comprehensive 9-category SUTRA assessment.`,
        actions: [
          { label: 'Start 9-Category Assessment', url: '/readiness' }
        ]
      };
    }

    if (q.includes('freelancer') || q.includes('hire') || q.includes('design') || q.includes('developer') || q.includes('mvp')) {
      return {
        reply: `Looking to build or design faster? The **SUTRA Freelancer Marketplace** connects you with vetted startup professionals offering milestone-based pricing for MVPs, Figma design systems, pitch decks, and legal contracts.`,
        actions: [
          { label: 'Explore Freelancers', url: '/freelancers' }
        ]
      };
    }

    if (q.includes('mentor') || q.includes('advisor') || q.includes('guidance')) {
      return {
        reply: `Connecting with verified ecosystem mentors can accelerate your pilot deployments. On SUTRA, you can request 1-on-1 advisory connections with experienced operators in ${activeVenture?.industry || 'your industry'}.`,
        actions: [
          { label: 'Browse Verified Mentors', url: '/mentors' }
        ]
      };
    }

    return {
      reply: `Regarding "${query}": Every venture progresses systematically from **Idea → Validate → Build → Launch → Scale**.\n\nAs part of ${activeVenture?.name || 'your journey'}, we recommend verifying customer willingness-to-pay early, securing intellectual property rights, and tapping into verified non-dilutive government schemes before diluting equity.`,
      actions: [
        { label: 'Browse Opportunity Schemes', url: '/opportunities' },
        { label: 'Founder Knowledge Hub', url: '/resources' }
      ]
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuery = input.trim();
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, actions } = generateContextualResponse(currentQuery);
      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'sutra',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickPrompt = (promptText: string) => {
    setInput(promptText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sutra-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[640px] flex flex-col border border-sutra-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sutra-navy via-sutra-royal to-blue-700 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-teal-300 border border-white/20">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg leading-none">Ask SUTRA</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/20 text-teal-200 border border-teal-400/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI Venture Co-pilot
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                Context: <span className="font-semibold">{activeVenture ? activeVenture.name : 'All Ventures'}</span> ({activeVenture?.stage.toUpperCase() || 'Startup'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-sutra-cloud/40">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-sutra-royal text-white rounded-tr-none'
                    : 'bg-white text-sutra-dark border border-sutra-border rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-sutra-border flex flex-wrap gap-2">
                    {msg.actions.map((act, i) => (
                      <a
                        key={i}
                        href={act.url || '#'}
                        onClick={() => {
                          if (act.url) onClose();
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-sutra-ice text-sutra-royal hover:bg-blue-100 transition-colors"
                      >
                        {act.label}
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-sutra-slate mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-sutra-slate text-xs italic bg-white px-3 py-2 rounded-xl border border-sutra-border w-fit">
              <Sparkles className="w-3.5 h-3.5 text-sutra-teal animate-spin" />
              SUTRA AI is synthesizing ecosystem guidance...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2 bg-white border-t border-sutra-border flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleQuickPrompt('What government schemes am I eligible for right now?')}
            className="text-xs bg-sutra-cloud hover:bg-sutra-ice text-sutra-slate hover:text-sutra-royal px-3 py-1.5 rounded-full border border-sutra-border whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Lightbulb className="w-3 h-3 text-amber-500" /> Eligible Govt Schemes
          </button>
          <button
            onClick={() => handleQuickPrompt('How do I calculate and improve my readiness score?')}
            className="text-xs bg-sutra-cloud hover:bg-sutra-ice text-sutra-slate hover:text-sutra-royal px-3 py-1.5 rounded-full border border-sutra-border whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Compass className="w-3 h-3 text-sutra-royal" /> Improve Readiness
          </button>
          <button
            onClick={() => handleQuickPrompt('What are the top 3 priorities for the Build stage?')}
            className="text-xs bg-sutra-cloud hover:bg-sutra-ice text-sutra-slate hover:text-sutra-royal px-3 py-1.5 rounded-full border border-sutra-border whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Award className="w-3 h-3 text-sutra-green" /> Build Stage Priorities
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-sutra-border flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Ask SUTRA about ${activeVenture?.name || 'your startup'}, grants, or execution...`}
            className="flex-1 bg-sutra-cloud border border-sutra-border rounded-xl px-4 py-2.5 text-sm text-sutra-dark focus:outline-none focus:ring-2 focus:ring-sutra-royal/40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-sutra-royal hover:bg-blue-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
