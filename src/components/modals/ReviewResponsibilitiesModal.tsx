import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, GitFork, Sparkles, CheckCircle2, AlertTriangle, Search } from 'lucide-react';

export const ReviewResponsibilitiesModal: React.FC = () => {
  const {
    isReviewRespOpen,
    setIsReviewRespOpen,
    responsibilities,
    teamMembers,
    assignResponsibilityOwner,
    autoAssignAllResponsibilities
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unassigned' | 'assigned'>('unassigned');
  const [search, setSearch] = useState('');

  if (!isReviewRespOpen) return null;

  const unassignedCount = responsibilities.filter((r) => !r.ownerId).length;

  const filtered = responsibilities.filter((r) => {
    if (filter === 'unassigned' && r.ownerId) return false;
    if (filter === 'assigned' && !r.ownerId) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.department.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="modal-overlay" onClick={() => setIsReviewRespOpen(false)}>
      <div className="modal-dialog wide-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="attention-card-icon-sq" style={{ width: 32, height: 32 }}>
              <GitFork size={16} />
            </div>
            <div>
              <h2 className="modal-title">Review Unassigned Responsibilities</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {unassignedCount > 0
                  ? `${unassignedCount} critical roles lack a designated accountable owner`
                  : 'All responsibilities have verified designated leads'}
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={() => setIsReviewRespOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '180px' }}>
              <input
                type="text"
                placeholder="Search roles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '4px 8px 4px 26px',
                  fontSize: '12px',
                  color: 'var(--text-main)',
                  width: '100%',
                  outline: 'none'
                }}
              />
              <Search size={13} color="var(--text-dim)" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button
              onClick={() => setFilter('unassigned')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                background: filter === 'unassigned' ? '#2563eb' : 'transparent',
                color: filter === 'unassigned' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Unassigned ({unassignedCount})
            </button>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                background: filter === 'all' ? '#2563eb' : 'transparent',
                color: filter === 'all' ? '#fff' : 'var(--text-muted)'
              }}
            >
              All ({responsibilities.length})
            </button>
            <button
              onClick={() => setFilter('assigned')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                background: filter === 'assigned' ? '#2563eb' : 'transparent',
                color: filter === 'assigned' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Assigned ({responsibilities.length - unassignedCount})
            </button>
          </div>

          {unassignedCount > 0 && (
            <button className="btn-gold" onClick={autoAssignAllResponsibilities}>
              <Sparkles size={14} />
              Auto-Assign All Best Matches
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '480px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ color: 'var(--text-main)', fontSize: '16px', marginBottom: '4px' }}>No items match your filter</h3>
              <p style={{ fontSize: '13px' }}>Every responsibility in this view has an appointed owner.</p>
            </div>
          ) : (
            filtered.map((resp) => (
              <div
                key={resp.id}
                style={{
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'rgba(37, 99, 235, 0.15)',
                        color: '#60a5fa'
                      }}
                    >
                      {resp.department}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: resp.urgency === 'high' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: resp.urgency === 'high' ? '#f87171' : '#fbbf24',
                        textTransform: 'uppercase'
                      }}
                    >
                      {resp.urgency}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '3px' }}>
                    {resp.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{resp.description}</div>
                </div>

                <div style={{ minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  {resp.ownerName ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12.5px', fontWeight: 600 }}>
                      <CheckCircle2 size={14} />
                      <span>{resp.ownerName}</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '12px' }}>
                      <AlertTriangle size={13} />
                      <span>Unassigned</span>
                    </div>
                  )}

                  <select
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      color: 'var(--text-main)',
                      fontSize: '12px',
                      padding: '5px 8px',
                      width: '100%',
                      outline: 'none'
                    }}
                    value={resp.ownerId || ''}
                    onChange={(e) => {
                      const selected = teamMembers.find((m) => m.id === e.target.value);
                      if (selected) {
                        assignResponsibilityOwner(resp.id, selected);
                      }
                    }}
                  >
                    <option value="" disabled>Select Accountable Lead...</option>
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => setIsReviewRespOpen(false)}>
            Close
          </button>
          {unassignedCount > 0 && (
            <button className="btn-primary" onClick={autoAssignAllResponsibilities}>
              Assign All ({unassignedCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
