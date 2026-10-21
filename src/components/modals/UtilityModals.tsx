import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MessageSquarePlus, HelpCircle, AlertCircle, UserPlus, CheckCircle2 } from 'lucide-react';

export const UtilityModals: React.FC = () => {
  const {
    isSuggestionOpen,
    setIsSuggestionOpen,
    isHelpOpen,
    setIsHelpOpen,
    isReportOpen,
    setIsReportOpen,
    isAddEmployeeOpen,
    setIsAddEmployeeOpen,
    addDepartmentHeadcount,
    departments
  } = useApp();

  const [suggestionText, setSuggestionText] = useState('');
  const [issueText, setIssueText] = useState('');
  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || 'Administration');
  const [headcountToAdd, setHeadcountToAdd] = useState(3);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage('Thank you! Your feedback has been sent directly to the Inducto product team.');
    setTimeout(() => {
      setSubmittedMessage(null);
      setIsSuggestionOpen(false);
      setSuggestionText('');
    }, 1500);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage('Issue ticket generated (#IND-8429). The operations team will review within 24h.');
    setTimeout(() => {
      setSubmittedMessage(null);
      setIsReportOpen(false);
      setIssueText('');
    }, 1500);
  };

  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDepartmentHeadcount(selectedDept, Number(headcountToAdd));
    setSubmittedMessage(`Successfully added ${headcountToAdd} team members to ${selectedDept}!`);
    setTimeout(() => {
      setSubmittedMessage(null);
      setIsAddEmployeeOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* 1. GIVE A SUGGESTION MODAL */}
      {isSuggestionOpen && (
        <div className="modal-overlay" onClick={() => setIsSuggestionOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <MessageSquarePlus size={20} color="#38bdf8" />
                <h3 className="modal-title">Give a suggestion</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsSuggestionOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSuggestionSubmit}>
              <div className="modal-body">
                {submittedMessage ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#34d399' }}>
                    <CheckCircle2 size={36} style={{ margin: '0 auto 10px auto' }} />
                    <p style={{ fontWeight: 600 }}>{submittedMessage}</p>
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      How can we make Inducto more effective for your team? We review employee suggestions weekly.
                    </p>
                    <textarea
                      rows={5}
                      className="form-input"
                      placeholder="Share your idea or feedback..."
                      value={suggestionText}
                      onChange={(e) => setSuggestionText(e.target.value)}
                      required
                      style={{ width: '100%', resize: 'none' }}
                    />
                  </>
                )}
              </div>

              {!submittedMessage && (
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsSuggestionOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Send Suggestion
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 2. HELP MODAL */}
      {isHelpOpen && (
        <div className="modal-overlay" onClick={() => setIsHelpOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <HelpCircle size={20} color="#60a5fa" />
                <h3 className="modal-title">Inducto Guide & Keyboard Shortcuts</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsHelpOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '14px' }}>Overview & Core Philosophy</h4>
              <p style={{ marginBottom: '16px' }}>
                Inducto ensures every employee knows what to do next. Everything in the organization is tracked as a live graph rather than a static chart, with transparent readiness scores.
              </p>

              <h4 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '14px' }}>Keyboard Shortcuts</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-app)', borderRadius: '6px' }}>
                  <span>Open Global Command Search</span>
                  <strong style={{ color: 'var(--text-main)' }}>Ctrl + K / Cmd + K</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-app)', borderRadius: '6px' }}>
                  <span>Close any active modal or drawer</span>
                  <strong style={{ color: 'var(--text-main)' }}>Esc</strong>
                </div>
              </div>

              <h4 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '14px' }}>Readiness Score Guide</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Assigning accountable owners to responsibilities boosts readiness by up to 40 pts.</li>
                <li>Writing and publishing course lessons boosts readiness by up to 35 pts.</li>
                <li>Activating statutory policies and onboarding headcount completes the 100/100 score.</li>
              </ul>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setIsHelpOpen(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. REPORT AN ISSUE MODAL */}
      {isReportOpen && (
        <div className="modal-overlay" onClick={() => setIsReportOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <AlertCircle size={20} color="#f87171" />
                <h3 className="modal-title">Report an issue</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsReportOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleReportSubmit}>
              <div className="modal-body">
                {submittedMessage ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#34d399' }}>
                    <CheckCircle2 size={36} style={{ margin: '0 auto 10px auto' }} />
                    <p style={{ fontWeight: 600 }}>{submittedMessage}</p>
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      Notice an accountability conflict, incorrect policy citation, or system bug? Let us know.
                    </p>
                    <textarea
                      rows={4}
                      className="form-input"
                      placeholder="Describe the issue in detail..."
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      required
                      style={{ width: '100%', resize: 'none' }}
                    />
                  </>
                )}
              </div>

              {!submittedMessage && (
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsReportOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ background: '#dc2626' }}>
                    Submit Issue Report
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 4. ONBOARD / ADD EMPLOYEE MODAL */}
      {isAddEmployeeOpen && (
        <div className="modal-overlay" onClick={() => setIsAddEmployeeOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <UserPlus size={20} color="#38bdf8" />
                <h3 className="modal-title">Onboard Department Workforce</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddEmployeeOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEmployeeSubmit}>
              <div className="modal-body">
                {submittedMessage ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#34d399' }}>
                    <CheckCircle2 size={36} style={{ margin: '0 auto 10px auto' }} />
                    <p style={{ fontWeight: 600 }}>{submittedMessage}</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                        SELECT DEPARTMENT
                      </label>
                      <select
                        className="form-input"
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        style={{ width: '100%' }}
                      >
                        {departments.map((dept) => (
                          <option key={dept.name} value={dept.name}>
                            {dept.name} (Current: {dept.headcount} people)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                        HEADCOUNT TO ONBOARD
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        className="form-input"
                        value={headcountToAdd}
                        onChange={(e) => setHeadcountToAdd(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {!submittedMessage && (
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsAddEmployeeOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Confirm & Onboard
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
