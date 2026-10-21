import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReadinessRing } from '../common/ReadinessRing';
import { ShieldAlert, Award, FileCheck, Download } from 'lucide-react';

export const ExecutiveView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    organizationReadinessScore,
    needsAttentionCount,
    totalEmployees,
    policies
  } = useApp();

  const handleExportReport = () => {
    alert('Enterprise Governance & SOC 2 Readiness Dossier exported to PDF successfully.');
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <nav className="breadcrumb-nav">
            <span>Management</span>
            <span>/</span>
            <span style={{ color: 'var(--text-muted)' }}>Executive View</span>
          </nav>
          <h1 className="page-title">Executive View</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginTop: '4px' }}>
            Board-level governance metrics, audit readiness status, and institutional liability exposure.
          </p>
        </div>

        <button className="btn-primary" onClick={handleExportReport}>
          <Download size={14} />
          Export Executive Report
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-and-score-row">
        <div className="sub-tabs-list">
          <button
            className={`sub-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`sub-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`sub-tab-btn ${activeTab === 'executive' ? 'active' : ''}`}
            onClick={() => setActiveTab('executive')}
          >
            Executive View
          </button>
        </div>

        <ReadinessRing score={organizationReadinessScore} />
      </div>

      {/* Executive Heatmap / Risk Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShieldAlert size={16} color={needsAttentionCount > 0 ? '#f59e0b' : '#10b981'} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)' }}>RISK EXPOSURE</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: needsAttentionCount > 0 ? '#fbbf24' : '#34d399' }}>
            {needsAttentionCount > 0 ? 'Elevated Governance Gaps' : 'Low Institutional Risk'}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {needsAttentionCount > 0 ? `${needsAttentionCount} unmitigated decisions pending leadership sign-off.` : 'All statutory positions assigned and verified.'}
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FileCheck size={16} color="#38bdf8" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)' }}>STATUTORY COMPLIANCE</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>
            {policies.filter((p) => p.status === 'active').length} / {policies.length} Policies Active
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            SOC 2 Type II, ISO 27001, and GDPR governance framework status.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Award size={16} color="#a855f7" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)' }}>TOTAL WORKFORCE REACH</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>
            {totalEmployees} Verified Staff
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Onboarded across core administrative and operational units.
          </p>
        </div>
      </div>
    </div>
  );
};
