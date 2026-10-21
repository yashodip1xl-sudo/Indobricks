import React, { useState, useMemo } from 'react';
import type { Employee, Team, Candidate, EmployeeStatus } from '../../types';
import { initialEmployees, initialTeams, initialCandidates, initialDepartments } from '../../data/mockData';
import {
  Users, Building2, UserPlus, BarChart2,
  Search, Filter, Download, Columns, LayoutList, LayoutGrid as LayoutGridIcon,
  MoreHorizontal, ChevronDown, ChevronRight,
  Upload, Plus, GraduationCap, MapPin, Mail, Briefcase,
  CheckCircle2, Clock, AlertTriangle, XCircle,
  Users2, Crown, TrendingUp, ArrowUpRight, Maximize2
} from 'lucide-react';

/* ─── helpers ─────────────────────────────────────────────── */
const statusCfg: Record<EmployeeStatus, { label: string; color: string; bg: string }> = {
  active:     { label: 'Active',     color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  invited:    { label: 'Invited',    color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  'on-leave': { label: 'On Leave',  color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  offboarded: { label: 'Offboarded',color: '#94a3b8', bg: 'rgba(148,163,184,0.1)'  },
};

const candidateStatusCfg = {
  applied:   { label: 'Applied',   color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
  screening: { label: 'Screening', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  interview: { label: 'Interview', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  offer:     { label: 'Offer',     color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  hired:     { label: 'Hired',     color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  rejected:  { label: 'Rejected',  color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

const Avatar: React.FC<{ name: string; color: string; size?: number }> = ({ name, color, size = 34 }) => {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.08)'
    }}>
      {initials}
    </div>
  );
};

const StatusBadge: React.FC<{ status: EmployeeStatus }> = ({ status }) => {
  const cfg = statusCfg[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 999,
      fontSize: 11.5, fontWeight: 600,
      color: cfg.color, background: cfg.bg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.color }} />
      {cfg.label}
    </span>
  );
};

const TrainingBar: React.FC<{ pct: number }> = ({ pct }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99,
        background: pct === 100 ? '#10b981' : pct > 60 ? '#38bdf8' : pct > 30 ? '#f59e0b' : '#f87171',
        transition: 'width 0.4s ease' }} />
    </div>
    <span style={{ fontSize: 11.5, color: 'var(--text-dim)', minWidth: 28, textAlign: 'right' }}>{pct}%</span>
  </div>
);

/* ─── SUB-TABS ─────────────────────────────────────────────── */
type WorkforceTab = 'employees' | 'teams' | 'candidates' | 'reports';

/* ─── EMPLOYEES TAB ────────────────────────────────────────── */
const EmployeesTab: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('Engineering');

  const departments = ['all', ...Array.from(new Set(employees.map(e => e.department)))];

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const q = search.toLowerCase();
      if (search && !e.name.toLowerCase().includes(q) && !e.role.toLowerCase().includes(q) && !e.email.toLowerCase().includes(q)) return false;
      if (deptFilter !== 'all' && e.department !== deptFilter) return false;
      if (statusFilter !== 'all' && e.status !== statusFilter) return false;
      return true;
    });
  }, [employees, search, deptFilter, statusFilter]);

  const handleAddEmployee = () => {
    if (!newName || !newEmail) return;
    const colors = ['#6366f1','#38bdf8','#10b981','#f59e0b','#ec4899','#a78bfa'];
    const newEmp: Employee = {
      id: `emp-${Date.now()}`, name: newName, email: newEmail,
      role: newRole || 'Team Member', department: newDept,
      status: 'invited', type: 'full-time',
      startDate: new Date().toISOString().split('T')[0],
      location: 'Remote',
      trainingCompletion: 0,
      avatarColor: colors[employees.length % colors.length]
    };
    setEmployees(prev => [...prev, newEmp]);
    setShowAddModal(false); setNewName(''); setNewEmail(''); setNewRole('');
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 160, maxWidth: 320 }}>
          <input
            type="text"
            placeholder="Search employees, roles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 34px',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 8, fontSize: 13, color: 'var(--text-main)',
              outline: 'none', transition: 'border 0.15s'
            }}
          />
          <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
          style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: 'var(--text-main)', outline: 'none'
          }}
        >
          <option value="all">All Departments</option>
          {departments.filter(d => d !== 'all').map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as EmployeeStatus | 'all')}
          style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: 'var(--text-main)', outline: 'none'
          }}
        >
          <option value="all">All Statuses</option>
          {(Object.keys(statusCfg) as EmployeeStatus[]).map(s => (
            <option key={s} value={s}>{statusCfg[s].label}</option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 3 }}>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '5px 8px', borderRadius: 6, color: viewMode === 'table' ? '#fff' : 'var(--text-dim)',
              background: viewMode === 'table' ? '#2563eb' : 'transparent'
            }}
            title="Table view"
          >
            <LayoutList size={14} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '5px 8px', borderRadius: 6, color: viewMode === 'grid' ? '#fff' : 'var(--text-dim)',
              background: viewMode === 'grid' ? '#2563eb' : 'transparent'
            }}
            title="Card grid view"
          >
            <LayoutGridIcon size={14} />
          </button>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn-secondary" style={{ padding: '7px 12px', fontSize: 12.5, display: 'flex', gap: 5, alignItems: 'center' }}>
            <Download size={13} /> Export
          </button>
          <button className="btn-secondary" style={{ padding: '7px 12px', fontSize: 12.5, display: 'flex', gap: 5, alignItems: 'center' }}>
            <Upload size={13} /> Import CSV
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)} style={{ padding: '7px 14px', fontSize: 12.5, display: 'flex', gap: 5, alignItems: 'center' }}>
            <Plus size={14} /> Add Employee
          </button>
        </div>
      </div>

      {/* Count */}
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
        <strong style={{ color: 'var(--text-main)' }}>{filtered.length}</strong> employee{filtered.length !== 1 ? 's' : ''}
        {(search || deptFilter !== 'all' || statusFilter !== 'all') && ' matching filters'}
      </p>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <EmptyEmployees onAdd={() => setShowAddModal(true)} />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)' }}>
                    {['Name', 'Role', 'Department', 'Status', 'Type', 'Location', 'Training', 'Start Date', ''].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp, i) => (
                    <tr
                      key={emp.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        transition: 'background 0.12s'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '11px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={emp.name} color={emp.avatarColor} size={32} />
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-main)' }}>{emp.name}</div>
                            <div style={{ fontSize: 11.5, color: 'var(--text-dim)' }}>{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '11px 16px', fontSize: 13, color: 'var(--text-muted)' }}>{emp.role}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '2px 7px', borderRadius: 5 }}>
                          {emp.department}
                        </span>
                      </td>
                      <td style={{ padding: '11px 16px' }}><StatusBadge status={emp.status} /></td>
                      <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-dim)', textTransform: 'capitalize' }}>{emp.type}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
                          <MapPin size={12} color="var(--text-dim)" /> {emp.location}
                        </div>
                      </td>
                      <td style={{ padding: '11px 16px', minWidth: 130 }}>
                        <TrainingBar pct={emp.trainingCompletion} />
                      </td>
                      <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{formatDate(emp.startDate)}</td>
                      <td style={{ padding: '11px 16px' }}>
                        <button style={{ color: 'var(--text-dim)', padding: 4, borderRadius: 5 }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-main)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)'; }}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        filtered.length === 0
          ? <EmptyEmployees onAdd={() => setShowAddModal(true)} />
          : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 14 }}>
              {filtered.map(emp => (
                <div key={emp.id} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 12, padding: '18px', transition: 'all 0.18s',
                  cursor: 'pointer'
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <Avatar name={emp.name} color={emp.avatarColor} size={44} />
                    <StatusBadge status={emp.status} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>{emp.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 10 }}>{emp.role}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--text-dim)', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={12} /> {emp.department}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={12} /> {emp.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} /> {emp.email}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 5 }}>Training Progress</div>
                  <TrainingBar pct={emp.trainingCompletion} />
                </div>
              ))}
            </div>
          )
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <UserPlus size={18} color="#38bdf8" />
                <h2 className="modal-title">Add New Employee</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Full Name <span>*</span></label>
                <input className="form-input" type="text" placeholder="e.g. Jordan Smith" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Work Email <span>*</span></label>
                <input className="form-input" type="email" placeholder="person@yourcompany.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Role / Job Title</label>
                <input className="form-input" type="text" placeholder="e.g. Senior Engineer" value={newRole} onChange={e => setNewRole(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-input" value={newDept} onChange={e => setNewDept(e.target.value)}>
                  {['Engineering', 'Legal & Compliance', 'Human Resources', 'Finance', 'Administration', 'Operations', 'Marketing'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(56,189,248,0.08)', borderRadius: 8, border: '1px solid rgba(56,189,248,0.2)', fontSize: 12.5, color: '#93c5fd' }}>
                An invitation email will be sent to the employee to complete their profile and start onboarding.
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAddEmployee} disabled={!newName || !newEmail}>
                Send Invite & Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyEmployees: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <div style={{ textAlign: 'center', padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <div style={{
      width: 56, height: 56, borderRadius: 14,
      border: '2px solid var(--border-subtle)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <LayoutGridIcon size={24} color="var(--text-dim)" />
    </div>
    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>No employees yet</div>
    <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
      Add people one at a time, or import a spreadsheet of your workforce.
    </div>
    <button className="btn-primary" onClick={onAdd} style={{ marginTop: 4, padding: '9px 18px' }}>
      <Plus size={14} style={{ display: 'inline', marginRight: 5 }} />
      + Add Employee
    </button>
  </div>
);

/* ─── TEAMS TAB ────────────────────────────────────────────── */
const TeamsTab: React.FC = () => {
  const teams = initialTeams;
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = teams.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 150, maxWidth: 300 }}>
          <input
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 34px',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 8, fontSize: 13, color: 'var(--text-main)', outline: 'none'
            }}
          />
          <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ padding: '7px 14px', fontSize: 12.5, display: 'flex', gap: 5, alignItems: 'center', marginLeft: 'auto' }}>
          <Plus size={14} /> Create Team
        </button>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>
        <strong style={{ color: 'var(--text-main)' }}>{filtered.length}</strong> teams across {new Set(filtered.map(t => t.department)).size} departments
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(team => {
          const teamEmployees = initialEmployees.filter(e => e.department === team.department).slice(0, 5);
          return (
            <div
              key={team.id}
              style={{
                background: 'var(--bg-card)', borderRadius: 12,
                border: `1px solid var(--border-subtle)`,
                borderTop: `3px solid ${team.color}`,
                padding: 20, transition: 'all 0.2s', cursor: 'pointer'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 18px rgba(0,0,0,0.3)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: `${team.color}22`, border: `1.5px solid ${team.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Users2 size={20} color={team.color} />
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--text-dim)', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 5 }}>
                  {team.department}
                </span>
              </div>

              <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{team.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>{team.description}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                {/* Stacked avatars */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    {teamEmployees.slice(0, 4).map((emp, i) => (
                      <div key={emp.id} style={{ marginLeft: i === 0 ? 0 : -8, border: '2px solid var(--bg-card)', borderRadius: '50%' }}>
                        <Avatar name={emp.name} color={emp.avatarColor} size={28} />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>
                    {team.memberCount} member{team.memberCount !== 1 ? 's' : ''}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-dim)' }}>
                  <Crown size={12} color={team.color} />
                  <span>{team.leadName}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Team Card */}
        <div
          onClick={() => setShowCreateModal(true)}
          style={{
            background: 'transparent', borderRadius: 12,
            border: '2px dashed var(--border-subtle)',
            padding: 20, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', transition: 'all 0.15s', minHeight: 180
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#2563eb'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(37,99,235,0.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
        >
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={20} color="#60a5fa" />
          </div>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-muted)' }}>Create a new team</span>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap"><Users2 size={18} color="#38bdf8" /><h2 className="modal-title">Create Team</h2></div>
              <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group"><label className="form-label">Team Name <span>*</span></label><input className="form-input" type="text" placeholder="e.g. Infrastructure Squad" /></div>
              <div className="form-group"><label className="form-label">Department</label>
                <select className="form-input">
                  {['Engineering', 'Legal & Compliance', 'Human Resources', 'Finance', 'Administration', 'Operations'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Team Lead</label>
                <select className="form-input">
                  {initialEmployees.map(e => <option key={e.id} value={e.id}>{e.name} — {e.role}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Description</label>
                <textarea className="form-input" rows={3} placeholder="What does this team own and deliver?" style={{ resize: 'none' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowCreateModal(false)}>Create Team</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── CANDIDATES TAB ───────────────────────────────────────── */
const CandidatesTab: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [search, setSearch] = useState('');

  const filtered = candidates.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.appliedRole.toLowerCase().includes(search.toLowerCase())
  );

  const kanbanCols: { key: Candidate['status']; label: string }[] = [
    { key: 'applied', label: 'Applied' },
    { key: 'screening', label: 'Screening' },
    { key: 'interview', label: 'Interview' },
    { key: 'offer', label: 'Offer' },
    { key: 'hired', label: 'Hired' },
    { key: 'rejected', label: 'Rejected' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 150, maxWidth: 300 }}>
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 34px',
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 8, fontSize: 13, color: 'var(--text-main)', outline: 'none'
            }}
          />
          <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <button className="btn-primary" style={{ padding: '7px 14px', fontSize: 12.5, display: 'flex', gap: 5, alignItems: 'center', marginLeft: 'auto' }}>
          <Plus size={14} /> Add Candidate
        </button>
      </div>

      {/* Kanban Pipeline */}
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12, alignItems: 'flex-start' }}>
        {kanbanCols.map(col => {
          const colCandidates = filtered.filter(c => c.status === col.key);
          const cfg = candidateStatusCfg[col.key];
          return (
            <div key={col.key} style={{ minWidth: 220, flex: '0 0 220px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-main)' }}>{col.label}</span>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '2px 7px', borderRadius: 99 }}>
                  {colCandidates.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colCandidates.map(c => (
                  <div
                    key={c.id}
                    style={{
                      background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                      borderRadius: 9, padding: 12, cursor: 'pointer', transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <Avatar name={c.name} color={cfg.color} size={30} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{c.source}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{c.appliedRole}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{c.department}</span>
                      <span>{formatDate(c.appliedDate)}</span>
                    </div>
                  </div>
                ))}

                {colCandidates.length === 0 && (
                  <div style={{ border: '2px dashed var(--border-subtle)', borderRadius: 9, padding: '20px 12px', textAlign: 'center', color: 'var(--text-dim)', fontSize: 12 }}>
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── REPORTS TAB ──────────────────────────────────────────── */
const ReportsTab: React.FC = () => {
  const depts = initialDepartments;
  const totalActive = initialEmployees.filter(e => e.status === 'active').length;
  const avgTraining = Math.round(initialEmployees.reduce((s, e) => s + e.trainingCompletion, 0) / initialEmployees.length);
  const onLeave = initialEmployees.filter(e => e.status === 'on-leave').length;
  const invited = initialEmployees.filter(e => e.status === 'invited').length;

  return (
    <div>
      {/* Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Headcount', value: initialEmployees.length, icon: Users, color: '#38bdf8' },
          { label: 'Active Staff', value: totalActive, icon: CheckCircle2, color: '#34d399' },
          { label: 'Avg. Training %', value: `${avgTraining}%`, icon: GraduationCap, color: '#f59e0b' },
          { label: 'Pending Invites', value: invited, icon: Clock, color: '#a78bfa' },
          { label: 'On Leave', value: onLeave, icon: AlertTriangle, color: '#fbbf24' },
          { label: 'Candidates Pipeline', value: initialCandidates.length, icon: UserPlus, color: '#fb923c' },
        ].map(metric => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '16px 14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{metric.label.toUpperCase()}</span>
                <Icon size={14} color={metric.color} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: metric.color }}>{metric.value}</div>
            </div>
          );
        })}
      </div>

      {/* Dept Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 15, fontWeight: 700, color: 'var(--text-main)' }}>
            <TrendingUp size={16} color="#38bdf8" /> Headcount by Department
          </div>
          {['Engineering', 'Legal & Compliance', 'Human Resources', 'Finance', 'Administration', 'Operations'].map(dept => {
            const count = initialEmployees.filter(e => e.department === dept).length;
            const pct = Math.round((count / initialEmployees.length) * 100);
            const color = depts.find(d => d.name === dept)?.color || '#6366f1';
            return (
              <div key={dept} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{dept}</span>
                  <span style={{ color: 'var(--text-dim)' }}>{count} people • {pct}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 15, fontWeight: 700, color: 'var(--text-main)' }}>
            <GraduationCap size={16} color="#f59e0b" /> Training Completion by Employee
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 310, overflowY: 'auto' }}>
            {[...initialEmployees].sort((a, b) => b.trainingCompletion - a.trainingCompletion).map(emp => (
              <div key={emp.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={emp.name} color={emp.avatarColor} size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-main)', marginBottom: 3 }}>{emp.name}</div>
                  <TrainingBar pct={emp.trainingCompletion} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── MAIN WORKFORCE VIEW ──────────────────────────────────── */
export const WorkforceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkforceTab>('employees');

  const tabs: { key: WorkforceTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { key: 'employees', label: 'Employees', icon: Users },
    { key: 'teams', label: 'Departments', icon: Building2 },
    { key: 'candidates', label: 'Candidates', icon: UserPlus },
    { key: 'reports', label: 'Reports', icon: BarChart2 },
  ];

  return (
    <div className="main-content">
      {/* Breadcrumb & Header */}
      <div className="content-header">
        <nav className="breadcrumb-nav">
          <span>Management</span>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>People</span>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>{tabs.find(t => t.key === activeTab)?.label}</span>
        </nav>
        <h1 className="page-title">People</h1>
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: 'flex', gap: 0,
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: 26
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '10px 18px', fontSize: 13.5, fontWeight: 600,
                color: isActive ? 'var(--text-main)' : 'var(--text-dim)',
                background: 'transparent', borderBottom: isActive ? '2px solid #f59e0b' : '2px solid transparent',
                marginBottom: -1, transition: 'all 0.15s'
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'employees' && <EmployeesTab />}
      {activeTab === 'teams' && <TeamsTab />}
      {activeTab === 'candidates' && <CandidatesTab />}
      {activeTab === 'reports' && <ReportsTab />}
    </div>
  );
};
