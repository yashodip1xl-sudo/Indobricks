import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, LogIn, Sparkles, RotateCcw } from 'lucide-react';

export const DemoBar: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    organizationReadinessScore,
    autoAssignAllResponsibilities,
    autoGenerateAllLessons,
    addDepartmentHeadcount,
    activateAllPolicies,
    resetToInitialDemo
  } = useApp();

  const handleSolveEverything = () => {
    autoAssignAllResponsibilities();
    autoGenerateAllLessons();
    addDepartmentHeadcount('Engineering', 12);
    addDepartmentHeadcount('Administration', 4);
    addDepartmentHeadcount('Finance', 5);
    addDepartmentHeadcount('Human Resources', 3);
    activateAllPolicies();
  };

  return (
    <div className="demo-top-banner">
      <div className="demo-banner-left">
        <span className="demo-pill">Inducto Interactive Demo</span>
        <span>
          Current Readiness:{' '}
          <strong style={{ color: organizationReadinessScore > 50 ? '#34d399' : '#fbbf24' }}>
            {organizationReadinessScore}/100
          </strong>
        </span>
      </div>

      <div className="demo-btn-group">
        <button
          className={`demo-switch-btn ${currentScreen === 'login' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('login')}
          title="Switch to Landing & Login View"
        >
          <LogIn size={13} />
          Screen 1: Login View
        </button>

        <button
          className={`demo-switch-btn ${currentScreen === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('dashboard')}
          title="Switch to Management Overview Dashboard"
        >
          <LayoutDashboard size={13} />
          Screen 2: Management Overview
        </button>

        <button
          className="demo-action-btn"
          onClick={handleSolveEverything}
          title="Simulate resolving all 44 action items to see score hit 100!"
        >
          <Sparkles size={13} style={{ display: 'inline', marginRight: 4 }} />
          Simulate 100% Readiness
        </button>

        <button
          className="demo-switch-btn"
          onClick={resetToInitialDemo}
          title="Reset to initial 0/100 state with 44 items needing attention"
        >
          <RotateCcw size={12} />
          Reset to 0/100
        </button>
      </div>
    </div>
  );
};
