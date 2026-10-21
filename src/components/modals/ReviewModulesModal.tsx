import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const ReviewModulesModal: React.FC = () => {
  const {
    isReviewModulesOpen,
    setIsReviewModulesOpen,
    modules,
    writeModuleLesson,
    autoGenerateAllLessons
  } = useApp();

  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [editorText, setEditorText] = useState('');

  if (!isReviewModulesOpen) return null;

  const unwrittenCount = modules.filter((m) => !m.hasLesson).length;

  const handleStartAuthoring = (id: string, currentContent?: string) => {
    setActiveEditingId(id);
    setEditorText(currentContent || 'Standard Operating Procedure & Verification Matrix:\n1. Verify operational compliance.\n2. Complete checklist and log audit trace.\n3. Escalate high severity deviations within 15 minutes.');
  };

  const handleSaveLesson = (id: string) => {
    writeModuleLesson(id, editorText);
    setActiveEditingId(null);
  };

  const handleGenerateSingle = (id: string, title: string) => {
    writeModuleLesson(
      id,
      `Comprehensive Course Content for ${title}:\n\nSection 1: Statutory Obligations & Security Baselines\nSection 2: Step-by-Step Incident & Decision Matrix\nSection 3: Verification & Ongoing Compliance Audit Checklist.`
    );
  };

  return (
    <div className="modal-overlay" onClick={() => setIsReviewModulesOpen(false)}>
      <div className="modal-dialog wide-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="attention-card-icon-sq" style={{ width: 32, height: 32 }}>
              <BookOpen size={16} />
            </div>
            <div>
              <h2 className="modal-title">Review Training Modules & Lessons</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {unwrittenCount > 0
                  ? `${unwrittenCount} modules have no lesson content written and cannot be published`
                  : 'All 22 training modules have active verified lesson content!'}
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={() => setIsReviewModulesOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Curriculum Status: <strong>{modules.length - unwrittenCount} / {modules.length} Published</strong>
          </span>

          {unwrittenCount > 0 && (
            <button className="btn-gold" onClick={autoGenerateAllLessons}>
              <Sparkles size={14} />
              AI Generate All 22 Lessons
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '480px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {modules.map((mod) => {
            const isEditing = activeEditingId === mod.id;

            return (
              <div
                key={mod.id}
                style={{
                  background: 'var(--bg-app)',
                  border: `1px solid ${mod.hasLesson ? 'var(--border-subtle)' : 'rgba(245, 158, 11, 0.3)'}`,
                  borderRadius: '8px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8'
                        }}
                      >
                        {mod.department}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-dim)' }}>
                        <Clock size={12} /> {mod.duration}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {mod.title}
                    </h4>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {mod.hasLesson ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34d399', fontSize: '12px', fontWeight: 600 }}>
                        <CheckCircle2 size={14} /> Published
                      </span>
                    ) : (
                      <span style={{ color: '#fbbf24', fontSize: '12px', fontWeight: 600 }}>
                        No Lesson Written
                      </span>
                    )}

                    {!mod.hasLesson ? (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn-secondary"
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleStartAuthoring(mod.id)}
                        >
                          Write
                        </button>
                        <button
                          className="btn-gold"
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleGenerateSingle(mod.id, mod.title)}
                        >
                          <Sparkles size={12} /> Auto AI
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleStartAuthoring(mod.id, mod.lessonContent)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div style={{ marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      Lesson Syllabus & Instruction Content:
                    </label>
                    <textarea
                      rows={4}
                      value={editorText}
                      onChange={(e) => setEditorText(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '6px',
                        padding: '10px',
                        color: 'var(--text-main)',
                        fontSize: '13px',
                        resize: 'vertical',
                        outline: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                      <button className="btn-secondary" onClick={() => setActiveEditingId(null)} style={{ padding: '4px 10px', fontSize: '12px' }}>
                        Cancel
                      </button>
                      <button className="btn-primary" onClick={() => handleSaveLesson(mod.id)} style={{ padding: '4px 12px', fontSize: '12px' }}>
                        Save & Publish Lesson
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => setIsReviewModulesOpen(false)}>
            Close
          </button>
          {unwrittenCount > 0 && (
            <button className="btn-primary" onClick={autoGenerateAllLessons}>
              Publish All ({unwrittenCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
