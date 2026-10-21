import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReadinessRing } from '../common/ReadinessRing';
import {
  Users,
  GraduationCap,
  Award,
  UserPlus,
  MessageSquare,
  AlertTriangle,
  GitFork,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unownedResponsibilitiesCount,
    unwrittenModulesCount,
    needsAttentionCount,
    totalEmployees,
    trainingCompletionRate,
    certificatesCount,
    candidatesCount,
    feedbackCount,
    organizationReadinessScore,
    departments,
    policies,
    setIsReviewRespOpen,
    setIsReviewModulesOpen,
    setIsAddEmployeeOpen,
    setActiveSidebarItem
  } = useApp();

  const activePoliciesCount = policies.filter((p) => p.status === 'active').length;
  const mandatoryCount = policies.filter((p) => p.isMandatory && p.status === 'active').length;
  const archivedCount = policies.filter((p) => p.status === 'archived').length;
  const reviewCount = policies.filter((p) => p.status === 'review').length;

  return (
    <div className="main-content">
      {/* Content Header & Breadcrumb */}
      <div className="content-header">
        <nav className="breadcrumb-nav">
          <span>Management</span>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>Overview</span>
        </nav>
        <h1 className="page-title">Overview</h1>
      </div>

      {/* Tabs and Circular Readiness Ring Row */}
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

      {/* Section: How the organisation is doing */}
      <div className="section-headline-group">
        <h2 className="section-headline">How the organisation is doing</h2>
        <p className="section-subheadline">
          Workforce, learning progress, compliance, and anything waiting on a decision.
        </p>
      </div>

      {/* 6 Key Metrics Grid */}
      <div className="metrics-grid-6">
        {/* 1. EMPLOYEES */}
        <div className="metric-card" onClick={() => setIsAddEmployeeOpen(true)} style={{ cursor: 'pointer' }} title="Click to manage workforce">
          <div className="metric-card-header">
            <Users size={14} className="metric-card-icon" />
            <span className="metric-card-title">Employees</span>
          </div>
          <div className="metric-card-value">{totalEmployees}</div>
          <div className="metric-card-caption">People in this organisation</div>
        </div>

        {/* 2. TRAINING COMPLETION */}
        <div className="metric-card" onClick={() => setIsReviewModulesOpen(true)} style={{ cursor: 'pointer' }} title="Click to inspect training modules">
          <div className="metric-card-header">
            <GraduationCap size={14} className="metric-card-icon" />
            <span className="metric-card-title">Training Completion</span>
          </div>
          <div className="metric-card-value">{trainingCompletionRate}%</div>
          <div className="metric-card-caption">Across all assigned learning</div>
        </div>

        {/* 3. CERTIFICATES ISSUED */}
        <div className="metric-card">
          <div className="metric-card-header">
            <Award size={14} className="metric-card-icon" />
            <span className="metric-card-title">Certificates Issued</span>
          </div>
          <div className="metric-card-value">{certificatesCount}</div>
          <div className="metric-card-caption">Verified learning evidence</div>
        </div>

        {/* 4. CANDIDATES JOINING */}
        <div className="metric-card">
          <div className="metric-card-header">
            <UserPlus size={14} className="metric-card-icon" />
            <span className="metric-card-title">Candidates Joining</span>
          </div>
          <div className="metric-card-value">{candidatesCount}</div>
          <div className="metric-card-caption">Invited, not yet started</div>
        </div>

        {/* 5. OPEN FEEDBACK */}
        <div className="metric-card">
          <div className="metric-card-header">
            <MessageSquare size={14} className="metric-card-icon" />
            <span className="metric-card-title">Open Feedback</span>
          </div>
          <div className="metric-card-value">{feedbackCount}</div>
          <div className="metric-card-caption">Raised by employees</div>
        </div>

        {/* 6. NEEDS ATTENTION (Golden Amber Alert Highlight) */}
        <div className="metric-card attention-card">
          <div className="metric-card-header">
            <AlertTriangle size={14} className="metric-card-icon" />
            <span className="metric-card-title">Needs Attention</span>
          </div>
          <div className="metric-card-value">{needsAttentionCount}</div>
          <div className="metric-card-caption">Items across all areas</div>
        </div>
      </div>

      {/* Needs Attention Section */}
      <section className="needs-attention-section">
        <h3 className="attention-section-title">
          <AlertTriangle size={15} className="alert-icon" />
          Needs attention
        </h3>
        <p className="attention-section-sub">
          Everything currently waiting on a management decision.
        </p>

        <div className="needs-attention-cards-col">
          {/* Card 1: Responsibilities needing owner */}
          <div className="attention-row-card">
            <div className="attention-card-left">
              <div className="attention-card-icon-sq">
                <GitFork size={18} />
              </div>
              <div className="attention-card-texts">
                <div className="attention-card-heading">
                  {unownedResponsibilitiesCount > 0
                    ? `${unownedResponsibilitiesCount} responsibilities have no named owner`
                    : 'All responsibilities have named owners! 🎉'}
                </div>
                <div className="attention-card-desc">
                  {unownedResponsibilitiesCount > 0
                    ? 'Nobody is currently accountable for these.'
                    : 'Accountability structure is established across departments.'}
                </div>
              </div>
            </div>

            <button
              className="review-btn"
              onClick={() => setIsReviewRespOpen(true)}
              title="Review unassigned responsibilities"
            >
              <span>{unownedResponsibilitiesCount > 0 ? 'Review' : 'View Graph'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Modules with no lesson */}
          <div className="attention-row-card">
            <div className="attention-card-left">
              <div className="attention-card-icon-sq">
                <BookOpen size={18} />
              </div>
              <div className="attention-card-texts">
                <div className="attention-card-heading">
                  {unwrittenModulesCount > 0
                    ? `${unwrittenModulesCount} modules have no lesson written`
                    : 'All 22 training modules have published lessons! 🚀'}
                </div>
                <div className="attention-card-desc">
                  {unwrittenModulesCount > 0
                    ? 'These cannot be published until someone writes the content.'
                    : 'Curriculum is live and active for employee onboarding.'}
                </div>
              </div>
            </div>

            <button
              className="review-btn"
              onClick={() => setIsReviewModulesOpen(true)}
              title="Review unwritten course modules"
            >
              <span>{unwrittenModulesCount > 0 ? 'Review' : 'View Course Catalog'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Snapshots 2-Column Row (Workforce & Compliance) */}
      <div className="snapshots-two-col">
        {/* Left: Workforce Snapshot */}
        <div className="snapshot-panel">
          <div className="snapshot-header">
            <div className="snapshot-title-row">
              <Users size={16} />
              <span>Workforce snapshot</span>
            </div>
            <div className="snapshot-subtitle">
              Headcount and learning progress by department.
            </div>
          </div>

          <div className="departments-list">
            {departments.slice(0, 4).map((dept) => (
              <div key={dept.name} className="department-row-item">
                <div className="dept-name-col">
                  <div className="dept-name">{dept.name}</div>
                  <div className="dept-learning-status">
                    {dept.learningAssigned ? `${dept.completionRate}% learning completion` : 'No learning assigned yet'}
                  </div>
                </div>
                <div className="dept-headcount-badge">
                  {dept.headcount} {dept.headcount === 1 ? 'person' : 'people'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
            <button
              style={{
                fontSize: '12.5px',
                color: '#38bdf8',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onClick={() => setIsAddEmployeeOpen(true)}
            >
              + Onboard or invite department staff
            </button>
          </div>
        </div>

        {/* Right: Compliance Snapshot */}
        <div className="snapshot-panel">
          <div className="snapshot-header">
            <div className="snapshot-title-row">
              <ShieldCheck size={16} />
              <span>Compliance snapshot</span>
            </div>
            <div className="snapshot-subtitle">
              Policies in force and changes awaiting review.
            </div>
          </div>

          <div className="compliance-metrics-grid">
            <div className="comp-metric-box">
              <div className="comp-metric-value">{activePoliciesCount}</div>
              <div className="comp-metric-label">Active policies</div>
            </div>
            <div className="comp-metric-box">
              <div className="comp-metric-value">{mandatoryCount}</div>
              <div className="comp-metric-label">Mandatory</div>
            </div>
            <div className="comp-metric-box">
              <div className="comp-metric-value">{archivedCount}</div>
              <div className="comp-metric-label">Archived</div>
            </div>
            <div className="comp-metric-box">
              <div className="comp-metric-value">{reviewCount}</div>
              <div className="comp-metric-label">Changes to review</div>
            </div>
          </div>

          <button
            className="open-compliance-link"
            onClick={() => setActiveSidebarItem('compliance')}
          >
            <span>Open Compliance</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
