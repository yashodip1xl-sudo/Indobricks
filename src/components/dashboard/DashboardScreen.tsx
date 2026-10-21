import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopBar } from './TopBar';
import { SidebarRail } from './SidebarRail';
import { OverviewView } from './OverviewView';
import { OwnershipGraphView } from '../views/OwnershipGraphView';
import { AnalyticsView } from '../views/AnalyticsView';
import { ExecutiveView } from '../views/ExecutiveView';
import { WorkforceView } from '../views/WorkforceView';
import { ReviewResponsibilitiesModal } from '../modals/ReviewResponsibilitiesModal';
import { ReviewModulesModal } from '../modals/ReviewModulesModal';
import { AskAiModal } from '../modals/AskAiModal';
import { CommandPalette } from '../modals/CommandPalette';
import { UtilityModals } from '../modals/UtilityModals';

export const DashboardScreen: React.FC = () => {
  const { activeTab, activeSidebarItem } = useApp();

  const renderActiveView = () => {
    if (activeSidebarItem === 'graph') return <OwnershipGraphView />;
    if (activeSidebarItem === 'workforce' || activeSidebarItem === 'directory') return <WorkforceView />;
    if (activeTab === 'analytics' || activeSidebarItem === 'analytics') return <AnalyticsView />;
    if (activeTab === 'executive') return <ExecutiveView />;
    return <OverviewView />;
  };

  return (
    <div className="dashboard-layout">
      {/* Top Sticky Header */}
      <TopBar />

      {/* Main Body */}
      <div className="dashboard-body">
        {/* Left Vertical Rail */}
        <SidebarRail />

        {/* Dynamic Center Content */}
        {renderActiveView()}
      </div>

      {/* Modals & Drawers */}
      <ReviewResponsibilitiesModal />
      <ReviewModulesModal />
      <AskAiModal />
      <CommandPalette />
      <UtilityModals />
    </div>
  );
};
