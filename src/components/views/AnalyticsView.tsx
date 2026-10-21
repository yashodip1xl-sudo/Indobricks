import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReadinessRing } from '../common/ReadinessRing';
import { TrendingUp, BarChart2 } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    organizationReadinessScore,
    departments,
    responsibilities,
    modules
  } = useApp();

  const assignedCount = responsibilities.filter((r) => r.ownerId).length;
  const writtenCount = modules.filter((m) => m.hasLesson).length;

  return (
    <div className="main-content">
      {/* Header */}
      <div className="content-header">
        <nav className="breadcrumb-nav">
          <span>Management</span>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Analytics</span>
        </nav>
        <h1 className="page-title">Analytics</h1>
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

      {/* Analytics Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <TrendingUp size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Department Readiness Breakdown</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {departments.map((dept) => {
              const deptResp = responsibilities.filter((r) => r.department === dept.name);
              const deptAssigned = deptResp.filter((r) => r.ownerId).length;
              const rate = deptResp.length > 0 ? Math.round((deptAssigned / deptResp.length) * 100) : (organizationReadinessScore > 50 ? 80 : 0);

              return (
                <div key={dept.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600 }}>{dept.name}</span>
                    <span style={{ color: rate > 70 ? '#34d399' : '#f59e0b', fontWeight: 700 }}>{rate}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${rate}%`,
                        height: '100%',
                        background: rate > 70 ? '#10b981' : rate > 30 ? '#f59e0b' : '#ef4444',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart2 size={18} color="#f59e0b" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Operational Health</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>RESPONSIBILITIES COVERAGE</div>
              <div style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0', color: '#f8fafc' }}>
                {assignedCount} / {responsibilities.length}
              </div>
              <div style={{ fontSize: '12px', color: assignedCount === 22 ? '#34d399' : '#f59e0b' }}>
                {assignedCount === 22 ? '100% Accountable' : `${22 - assignedCount} awaiting designated lead`}
              </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>TRAINING CURRICULUM READY</div>
              <div style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0', color: '#f8fafc' }}>
                {writtenCount} / {modules.length}
              </div>
              <div style={{ fontSize: '12px', color: writtenCount === 22 ? '#34d399' : '#f59e0b' }}>
                {writtenCount === 22 ? 'All modules active' : `${22 - writtenCount} modules pending lesson authoring`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
