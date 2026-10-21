import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, GitFork, BookOpen, Sparkles, Moon, RotateCcw } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    responsibilities,
    modules,
    setActiveSidebarItem,
    setIsReviewRespOpen,
    setIsReviewModulesOpen,
    setIsAskOpen,
    autoAssignAllResponsibilities,
    autoGenerateAllLessons,
    resetToInitialDemo,
    toggleTheme
  } = useApp();

  const [search, setSearch] = useState('');

  if (!isCommandPaletteOpen) return null;

  const quickActions = [
    {
      id: 'action-ask',
      title: 'Ask Inducto (Verified Q&A)',
      subtitle: 'Ask questions about policies and ownership',
      icon: Sparkles,
      action: () => setIsAskOpen(true)
    },
    {
      id: 'action-resp',
      title: 'Review 22 Unowned Responsibilities',
      subtitle: 'Appoint accountable owners for statutory positions',
      icon: GitFork,
      action: () => setIsReviewRespOpen(true)
    },
    {
      id: 'action-mod',
      title: 'Review 22 Unwritten Modules',
      subtitle: 'Author or generate training course curriculum',
      icon: BookOpen,
      action: () => setIsReviewModulesOpen(true)
    },
    {
      id: 'action-solve',
      title: 'Simulate 100% Readiness (Auto-Assign & Publish)',
      subtitle: 'Resolve all 44 action items instantly',
      icon: Sparkles,
      action: () => {
        autoAssignAllResponsibilities();
        autoGenerateAllLessons();
      }
    },
    {
      id: 'action-graph',
      title: 'Open Live Ownership Graph',
      subtitle: 'View live accountability topology',
      icon: GitFork,
      action: () => setActiveSidebarItem('graph')
    },
    {
      id: 'action-theme',
      title: 'Toggle Dark / Light Theme',
      subtitle: 'Switch between light and dark display modes',
      icon: Moon,
      action: () => toggleTheme()
    },
    {
      id: 'action-reset',
      title: 'Reset Demo State (0/100 Readiness)',
      subtitle: 'Restore initial state with 44 items needing attention',
      icon: RotateCcw,
      action: () => resetToInitialDemo()
    }
  ];

  const filteredActions = quickActions.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const filteredResp = responsibilities
    .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()) || r.department.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 4);

  const filteredMods = modules
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 4);

  const executeItem = (fn: () => void) => {
    fn();
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCommandPaletteOpen(false)}>
      <div className="command-palette-box" onClick={(e) => e.stopPropagation()}>
        {/* Input */}
        <div className="command-input-row">
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            className="command-search-input"
            placeholder="Type a command or search anything across Inducto..."
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-shortcut-badge">ESC</span>
        </div>

        {/* Results */}
        <div className="command-results-list">
          {/* Quick Actions */}
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', padding: '6px 12px', letterSpacing: '0.05em' }}>
            ACTIONS
          </div>
          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="command-item"
                onClick={() => executeItem(action.action)}
              >
                <div className="command-item-left">
                  <Icon size={16} color="#38bdf8" />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{action.title}</div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{action.subtitle}</div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Jump</span>
              </div>
            );
          })}

          {/* Responsibilities Matches */}
          {filteredResp.length > 0 && (
            <>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', padding: '10px 12px 6px 12px', letterSpacing: '0.05em' }}>
                RESPONSIBILITIES
              </div>
              {filteredResp.map((resp) => (
                <div
                  key={resp.id}
                  className="command-item"
                  onClick={() => executeItem(() => setIsReviewRespOpen(true))}
                >
                  <div className="command-item-left">
                    <GitFork size={15} color="#f59e0b" />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{resp.title}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{resp.department} • {resp.ownerName || 'Unassigned'}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#f59e0b' }}>Review</span>
                </div>
              ))}
            </>
          )}

          {/* Modules Matches */}
          {filteredMods.length > 0 && (
            <>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', padding: '10px 12px 6px 12px', letterSpacing: '0.05em' }}>
                TRAINING MODULES
              </div>
              {filteredMods.map((mod) => (
                <div
                  key={mod.id}
                  className="command-item"
                  onClick={() => executeItem(() => setIsReviewModulesOpen(true))}
                >
                  <div className="command-item-left">
                    <BookOpen size={15} color="#34d399" />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{mod.title}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{mod.department} • {mod.duration}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#38bdf8' }}>Inspect</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
