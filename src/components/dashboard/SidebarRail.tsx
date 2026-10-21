import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  LayoutGrid,
  Clock,
  Users,
  GraduationCap,
  Search,
  Contact,
  GitFork,
  ShieldCheck,
  FileText,
  MessageSquare,
  Columns3,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  PanelLeftClose
} from 'lucide-react';

export const SidebarRail: React.FC = () => {
  const {
    activeSidebarItem,
    setActiveSidebarItem,
    setIsAskOpen,
    setIsReviewRespOpen,
    setIsReviewModulesOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp();

  const handleNavClick = (id: string) => {
    setActiveSidebarItem(id);
    setIsMobileSidebarOpen(false);
    if (id === 'ai') {
      setIsAskOpen(true);
    } else if (id === 'issues') {
      setIsReviewRespOpen(true);
    } else if (id === 'training') {
      setIsReviewModulesOpen(true);
    }
  };

  const navItems = [
    { id: 'calendar', icon: Calendar, label: 'Calendar & Schedule' },
    { id: 'overview', icon: LayoutGrid, label: 'Management Overview' },
    { id: 'history', icon: Clock, label: 'Activity & Audit Log' },
    { id: 'workforce', icon: Users, label: 'Workforce & Teams' },
    { id: 'training', icon: GraduationCap, label: 'Training Modules' },
    { id: 'knowledge', icon: Search, label: 'Knowledge Base' },
    { id: 'directory', icon: Contact, label: 'Employee Directory' },
    { id: 'graph', icon: GitFork, label: 'Live Ownership Graph' },
    { id: 'compliance', icon: ShieldCheck, label: 'Compliance & Audit' },
    { id: 'policies', icon: FileText, label: 'Policies' },
    { id: 'feedback', icon: MessageSquare, label: 'Employee Feedback' },
    { id: 'columns', icon: Columns3, label: 'Workspaces' },
    { id: 'archive', icon: Trash2, label: 'Archive' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'issues', icon: AlertTriangle, label: 'Needs Attention' },
    { id: 'ai', icon: Sparkles, label: 'Ask Inducto AI' },
  ];

  return (
    <>
      {isMobileSidebarOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar-rail ${isMobileSidebarOpen ? 'is-mobile-open' : ''}`} aria-label="Quick Navigation">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSidebarItem === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-icon-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              data-tooltip={item.label}
              aria-label={item.label}
            >
              <IconComponent size={18} />
            </button>
          );
        })}

        <div className="sidebar-divider" />

        <button
          className="sidebar-icon-btn"
          data-tooltip="Close Sidebar"
          aria-label="Close Sidebar"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <PanelLeftClose size={16} />
        </button>
      </aside>
    </>
  );
};
