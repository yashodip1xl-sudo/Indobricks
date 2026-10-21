import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sampleQA } from '../../data/mockData';
import { X, Sparkles, Search, ShieldCheck, ArrowRight } from 'lucide-react';

export const AskAiModal: React.FC = () => {
  const { isAskOpen, setIsAskOpen, setActiveSidebarItem } = useApp();
  const [query, setQuery] = useState('');
  const [activeQA, setActiveQA] = useState(sampleQA[0]);
  const [isSearching, setIsSearching] = useState(false);

  if (!isAskOpen) return null;

  const handleSelectQuestion = (qa: typeof sampleQA[0]) => {
    setIsSearching(true);
    setQuery(qa.question);
    setTimeout(() => {
      setActiveQA(qa);
      setIsSearching(false);
    }, 250);
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setTimeout(() => {
      const matched = sampleQA.find((q) =>
        q.question.toLowerCase().includes(query.toLowerCase()) ||
        q.category.toLowerCase().includes(query.toLowerCase())
      );
      if (matched) {
        setActiveQA(matched);
      } else {
        setActiveQA({
          question: query,
          answer: `According to enterprise governance policy, this responsibility is maintained under centralized administrative review. All relevant SOP documents are indexed and subject to annual compliance recertification.`,
          sourcePolicy: 'Enterprise Standard Operating Procedure SOP-101',
          verifiedBy: 'Devon Vance (Admin Sign-off)',
          confidence: 95,
          category: 'General Governance'
        });
      }
      setIsSearching(false);
    }, 350);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAskOpen(false)}>
      <div className="modal-dialog wide-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="modal-title">Ask Inducto — Verified Organizational Knowledge</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Guaranteed verified answers backed by source policies and accountable owners.
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={() => setIsAskOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Search Input Box */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card-hover)' }}>
          <form onSubmit={handleCustomSearch} style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Ask any question... e.g., 'Who owns encryption key rotation?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingLeft: '38px', background: 'var(--bg-app)', color: 'var(--text-main)', border: '1px solid var(--border-light)' }}
              />
              <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button type="submit" className="btn-primary" disabled={isSearching}>
              {isSearching ? 'Verifying...' : 'Ask Inducto'}
            </button>
          </form>

          {/* Quick Prompts */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              POPULAR QUESTIONS:
            </span>
            {sampleQA.map((qa, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectQuestion(qa)}
                style={{
                  background: activeQA.question === qa.question ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${activeQA.question === qa.question ? '#38bdf8' : 'var(--border-subtle)'}`,
                  color: activeQA.question === qa.question ? '#38bdf8' : 'var(--text-muted)',
                  fontSize: '11.5px',
                  padding: '3px 10px',
                  borderRadius: '999px'
                }}
              >
                {qa.question}
              </button>
            ))}
          </div>
        </div>

        {/* Answer Display */}
        <div className="modal-body">
          {activeQA && (
            <div
              style={{
                background: 'radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 60%), var(--bg-app)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8'
                  }}
                >
                  {activeQA.category}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12.5px', fontWeight: 600 }}>
                  <ShieldCheck size={16} />
                  <span>{activeQA.confidence}% Confidence Verified</span>
                </div>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
                {activeQA.question}
              </h3>

              <div
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  borderLeft: '4px solid #3b82f6',
                  marginBottom: '20px'
                }}
              >
                {activeQA.answer}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', fontSize: '12.5px' }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '11px', fontWeight: 600 }}>CITATION & SOURCE POLICY</span>
                  <span style={{ color: '#93c5fd', fontWeight: 600 }}>{activeQA.sourcePolicy}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '11px', fontWeight: 600 }}>VERIFIED BY ACCOUNTABLE OFFICER</span>
                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{activeQA.verifiedBy}</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn-gold"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={() => {
                    setIsAskOpen(false);
                    setActiveSidebarItem('graph');
                  }}
                >
                  Inspect in Live Ownership Graph <ArrowRight size={13} style={{ display: 'inline', marginLeft: 4 }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
