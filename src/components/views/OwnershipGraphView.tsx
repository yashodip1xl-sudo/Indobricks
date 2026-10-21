import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GitFork, User, CheckCircle2, AlertTriangle, Filter, Sparkles } from 'lucide-react';

export const OwnershipGraphView: React.FC = () => {
  const { responsibilities, teamMembers, assignResponsibilityOwner, autoAssignAllResponsibilities } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const departments = ['all', 'Engineering', 'Legal', 'Finance', 'Human Resources', 'Administration'];

  const filteredResponsibilities = selectedDept === 'all'
    ? responsibilities
    : responsibilities.filter((r) => r.department === selectedDept);

  const activeResp = responsibilities.find((r) => r.id === selectedNode);

  return (
    <div className="main-content">
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <nav className="breadcrumb-nav">
            <span>Management</span>
            <span>/</span>
            <span>Governance</span>
            <span>/</span>
            <span style={{ color: 'var(--text-muted)' }}>Live Ownership Graph</span>
          </nav>
          <h1 className="page-title">Live Ownership Graph</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '4px' }}>
            Interactive real-time accountability network. See exactly who owns what across the organization.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-gold" onClick={autoAssignAllResponsibilities}>
            <Sparkles size={14} />
            Auto-Link All Owners
          </button>
        </div>
      </div>

      {/* Filter toolbar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', alignItems: 'center' }}>
        <Filter size={14} color="var(--text-dim)" />
        <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>FILTER DEPARTMENT:</span>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 500,
              background: selectedDept === dept ? '#2563eb' : 'var(--bg-card)',
              color: selectedDept === dept ? '#ffffff' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {dept === 'all' ? 'All Departments' : dept}
          </button>
        ))}
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="ownership-graph-canvas">
        <div className="graph-watermark">
          <GitFork size={16} />
          <span>LIVE ACCOUNTABILITY TOPOLOGY (ACTIVE)</span>
        </div>

        <div className="graph-stats-chip">
          <span>{filteredResponsibilities.filter((r) => r.ownerId).length} / {filteredResponsibilities.length} Assigned</span>
        </div>

        {/* Visual SVG Connections and Nodes */}
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'auto', padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {filteredResponsibilities.map((resp) => {
              const isAssigned = !!resp.ownerId;
              const isSelected = selectedNode === resp.id;

              return (
                <div
                  key={resp.id}
                  onClick={() => setSelectedNode(resp.id)}
                  style={{
                    background: isSelected ? '#1e293b' : 'rgba(15, 23, 42, 0.85)',
                    border: `1.5px solid ${isSelected ? '#38bdf8' : isAssigned ? '#1e293b' : 'rgba(245, 158, 11, 0.4)'}`,
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 0 15px rgba(56, 189, 248, 0.3)' : '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {resp.department}
                    </span>
                    {isAssigned ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#34d399' }}>
                        <CheckCircle2 size={12} /> Assigned
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#fbbf24' }}>
                        <AlertTriangle size={12} /> Unowned
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: '#f8fafc', marginBottom: '6px', lineHeight: 1.3 }}>
                    {resp.title}
                  </h4>

                  <p style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.4, marginBottom: '10px' }}>
                    {resp.description}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={12} color="var(--text-dim)" />
                      <span style={{ fontSize: '11.5px', fontWeight: 500, color: isAssigned ? '#f1f5f9' : '#f59e0b' }}>
                        {resp.ownerName || 'No named owner'}
                      </span>
                    </div>

                    {!isAssigned && (
                      <button
                        style={{
                          fontSize: '11px',
                          color: '#38bdf8',
                          fontWeight: 600,
                          background: 'rgba(56, 189, 248, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const candidate = teamMembers[Math.floor(Math.random() * teamMembers.length)];
                          assignResponsibilityOwner(resp.id, candidate);
                        }}
                      >
                        Quick Assign
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {activeResp && (
        <div style={{ marginTop: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
              Node Inspection: {activeResp.title}
            </h3>
            <button className="btn-secondary" onClick={() => setSelectedNode(null)} style={{ padding: '4px 10px', fontSize: '12px' }}>
              Close
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', fontSize: '13px' }}>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '11px', fontWeight: 600 }}>DEPARTMENT</span>
              <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{activeResp.department}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '11px', fontWeight: 600 }}>CURRENT ACCOUNTABLE OWNER</span>
              <span style={{ color: activeResp.ownerName ? '#34d399' : '#f59e0b', fontWeight: 600 }}>
                {activeResp.ownerName || 'UNASSIGNED (Management decision pending)'}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '11px', fontWeight: 600 }}>URGENCY</span>
              <span style={{ color: '#fbbf24', textTransform: 'uppercase', fontWeight: 700 }}>{activeResp.urgency}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
