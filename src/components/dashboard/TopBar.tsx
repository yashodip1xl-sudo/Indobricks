import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutGrid,
  Search,
  Sparkles,
  Moon,
  Sun,
  MessageSquarePlus,
  HelpCircle,
  AlertCircle,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Check,
  Menu
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    isDarkMode,
    toggleTheme,
    currentUser,
    logout,
    setIsAskOpen,
    setIsCommandPaletteOpen,
    setIsSuggestionOpen,
    setIsHelpOpen,
    setIsReportOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp();

  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState('2X1');

  const workspaces = ['2X1', 'Acme Global Org', 'Staging Workspace'];

  return (
    <header className="topbar">
      {/* Top Left: Logo & Workspace */}
      <div className="topbar-left">
        <button
          className="mobile-hamburger-btn"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          aria-label="Toggle navigation menu"
          title="Toggle Navigation"
        >
          <Menu size={18} />
        </button>

        <div className="brand-icon-sq" title="Inducto Home">
          <LayoutGrid size={18} />
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className="workspace-badge-btn"
            onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
          >
            <span>{currentWorkspace}</span>
            <ChevronDown size={13} />
          </button>

          {workspaceMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '6px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                minWidth: '180px',
                padding: '6px',
                zIndex: 200,
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ fontSize: '11px', color: '#94a3b8', padding: '4px 8px', fontWeight: 600 }}>
                SELECT WORKSPACE
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setCurrentWorkspace(ws);
                    setWorkspaceMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '5px',
                    color: currentWorkspace === ws ? '#38bdf8' : '#e2e8f0',
                    fontSize: '12.5px',
                    textAlign: 'left'
                  }}
                >
                  <span>{ws}</span>
                  {currentWorkspace === ws && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Center: Global Search Bar */}
      <div className="topbar-center">
        <button
          className="search-command-trigger"
          onClick={() => setIsCommandPaletteOpen(true)}
          title="Search anything or press Ctrl+K"
        >
          <div className="search-left-part">
            <Search size={15} color="var(--text-dim)" />
            <span>Search everything...</span>
          </div>
          <span className="search-shortcut-badge">Ctrl K</span>
        </button>
      </div>

      {/* Top Right: Tools & Actions */}
      <div className="topbar-right">
        {/* Mobile Search Icon */}
        <button
          className="icon-only-btn mobile-search-trigger"
          onClick={() => setIsCommandPaletteOpen(true)}
          title="Search (Ctrl+K)"
        >
          <Search size={16} />
        </button>

        {/* Ask Button with sparkle */}
        <button
          className="topbar-btn ask-btn"
          onClick={() => setIsAskOpen(true)}
          title="Ask Inducto - Verified Q&A"
        >
          <Sparkles size={14} />
          <span className="topbar-btn-text">Ask</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="icon-only-btn"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Give a suggestion */}
        <button
          className="topbar-btn"
          onClick={() => setIsSuggestionOpen(true)}
          title="Give a suggestion"
        >
          <MessageSquarePlus size={14} />
          <span className="topbar-btn-text">Give a suggestion</span>
        </button>

        {/* Help */}
        <button
          className="topbar-btn"
          onClick={() => setIsHelpOpen(true)}
          title="Help & Shortcuts"
        >
          <HelpCircle size={14} />
          <span className="topbar-btn-text">Help</span>
        </button>

        {/* Report an issue */}
        <button
          className="topbar-btn"
          onClick={() => setIsReportOpen(true)}
          title="Report an issue"
        >
          <AlertCircle size={14} />
          <span className="topbar-btn-text">Report an issue</span>
        </button>

        {/* User Profile Avatar */}
        <div style={{ position: 'relative' }}>
          <button
            className="user-avatar-btn"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            title={currentUser?.name || 'Account'}
          >
            {currentUser?.name ? currentUser.name.charAt(0) : 'D'}
          </button>

          {profileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                minWidth: '220px',
                padding: '8px',
                zIndex: 200,
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #1e293b', marginBottom: '6px' }}>
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#f8fafc' }}>
                  {currentUser?.name || 'Devon Vance'}
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  {currentUser?.email || 'demo@123gmlal.com'}
                </div>
                <div style={{ fontSize: '10.5px', color: '#38bdf8', marginTop: '2px' }}>
                  {currentUser?.role || 'Managing Director'}
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Profile Settings');
                  setProfileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: '#cbd5e1',
                  fontSize: '12.5px'
                }}
              >
                <UserIcon size={14} />
                Profile & Security
              </button>

              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  logout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: '#f87171',
                  fontSize: '12.5px'
                }}
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
