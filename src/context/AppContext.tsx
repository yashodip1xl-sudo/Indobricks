import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Responsibility, ModuleItem, DepartmentInfo, PolicyItem, User } from '../types';
import { initialResponsibilities, initialModules, initialDepartments, initialPolicies, initialTeamMembers } from '../data/mockData';

interface AppContextType {
  // Navigation & Screen
  currentScreen: 'login' | 'dashboard';
  setCurrentScreen: (screen: 'login' | 'dashboard') => void;
  activeTab: 'overview' | 'analytics' | 'executive';
  setActiveTab: (tab: 'overview' | 'analytics' | 'executive') => void;
  activeSidebarItem: string;
  setActiveSidebarItem: (item: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Auth User
  currentUser: User | null;
  login: (email?: string) => void;
  logout: () => void;

  // State Data
  teamMembers: User[];
  responsibilities: Responsibility[];
  modules: ModuleItem[];
  departments: DepartmentInfo[];
  policies: PolicyItem[];
  feedbackCount: number;
  candidatesCount: number;
  certificatesCount: number;

  // Calculated Metrics
  unownedResponsibilitiesCount: number;
  unwrittenModulesCount: number;
  needsAttentionCount: number;
  totalEmployees: number;
  trainingCompletionRate: number;
  organizationReadinessScore: number;

  // Actions
  assignResponsibilityOwner: (respId: string, owner: User) => void;
  autoAssignAllResponsibilities: () => void;
  writeModuleLesson: (moduleId: string, content: string) => void;
  autoGenerateAllLessons: () => void;
  addDepartmentHeadcount: (deptName: string, amount?: number) => void;
  activateAllPolicies: () => void;
  resetToInitialDemo: () => void;

  // Modals
  isReviewRespOpen: boolean;
  setIsReviewRespOpen: (open: boolean) => void;
  isReviewModulesOpen: boolean;
  setIsReviewModulesOpen: (open: boolean) => void;
  isAskOpen: boolean;
  setIsAskOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isSuggestionOpen: boolean;
  setIsSuggestionOpen: (open: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  isReportOpen: boolean;
  setIsReportOpen: (open: boolean) => void;
  isAddEmployeeOpen: boolean;
  setIsAddEmployeeOpen: (open: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persisted or default states
  const [currentScreen, setCurrentScreen] = useState<'login' | 'dashboard'>('dashboard');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'executive'>('overview');
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'usr-admin',
    name: 'Devon Vance',
    email: 'demo@123gmlal.com',
    role: 'Managing Director / Admin',
    department: 'Management'
  });

  const [teamMembers] = useState<User[]>(initialTeamMembers);
  const [responsibilities, setResponsibilities] = useState<Responsibility[]>(() => {
    const saved = localStorage.getItem('inducto_responsibilities');
    return saved ? JSON.parse(saved) : initialResponsibilities;
  });
  const [modules, setModules] = useState<ModuleItem[]>(() => {
    const saved = localStorage.getItem('inducto_modules');
    return saved ? JSON.parse(saved) : initialModules;
  });
  const [departments, setDepartments] = useState<DepartmentInfo[]>(() => {
    const saved = localStorage.getItem('inducto_departments');
    return saved ? JSON.parse(saved) : initialDepartments;
  });
  const [policies, setPolicies] = useState<PolicyItem[]>(() => {
    const saved = localStorage.getItem('inducto_policies');
    return saved ? JSON.parse(saved) : initialPolicies;
  });

  const [feedbackCount] = useState<number>(0);
  const [candidatesCount, setCandidatesCount] = useState<number>(0);
  const [certificatesCount, setCertificatesCount] = useState<number>(0);

  // Modals
  const [isReviewRespOpen, setIsReviewRespOpen] = useState(false);
  const [isReviewModulesOpen, setIsReviewModulesOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Save changes
  useEffect(() => {
    localStorage.setItem('inducto_responsibilities', JSON.stringify(responsibilities));
  }, [responsibilities]);

  useEffect(() => {
    localStorage.setItem('inducto_modules', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('inducto_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('inducto_policies', JSON.stringify(policies));
  }, [policies]);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsReviewRespOpen(false);
        setIsReviewModulesOpen(false);
        setIsAskOpen(false);
        setIsSuggestionOpen(false);
        setIsHelpOpen(false);
        setIsReportOpen(false);
        setIsAddEmployeeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Metrics calculations
  const unownedResponsibilitiesCount = responsibilities.filter((r) => !r.ownerId).length;
  const unwrittenModulesCount = modules.filter((m) => !m.hasLesson).length;
  const needsAttentionCount = unownedResponsibilitiesCount + unwrittenModulesCount;
  const totalEmployees = departments.reduce((acc, curr) => acc + curr.headcount, 0);

  const completedModules = modules.filter((m) => m.hasLesson).length;
  const trainingCompletionRate = Math.round((completedModules / modules.length) * 100);

  // Score calculation from 0 to 100:
  // Initial state: 0
  // Responsibilities resolved: max 40 pts
  // Modules written: max 35 pts
  // Policies active: max 15 pts
  // Employees onboarded: max 10 pts
  const respScore = Math.round(((22 - unownedResponsibilitiesCount) / 22) * 40);
  const modScore = Math.round(((22 - unwrittenModulesCount) / 22) * 35);
  const activePolCount = policies.filter((p) => p.status === 'active').length;
  const polScore = Math.round((activePolCount / Math.max(policies.length, 1)) * 15);
  const empScore = Math.min(10, totalEmployees > 0 ? 10 : 0);
  const organizationReadinessScore = Math.min(100, respScore + modScore + polScore + empScore);

  // Trigger celebration when score reaches 100
  useEffect(() => {
    if (organizationReadinessScore === 100) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [organizationReadinessScore]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const login = (email?: string) => {
    setCurrentUser({
      id: 'usr-admin',
      name: 'Devon Vance',
      email: email || 'demo@123gmlal.com',
      role: 'Managing Director / Admin',
      department: 'Management'
    });
    setCurrentScreen('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const assignResponsibilityOwner = (respId: string, owner: User) => {
    setResponsibilities((prev) =>
      prev.map((r) => (r.id === respId ? { ...r, ownerId: owner.id, ownerName: owner.name } : r))
    );
  };

  const autoAssignAllResponsibilities = () => {
    setResponsibilities((prev) =>
      prev.map((r, index) => {
        const owner = teamMembers[index % teamMembers.length];
        return {
          ...r,
          ownerId: owner.id,
          ownerName: owner.name
        };
      })
    );
  };

  const writeModuleLesson = (moduleId: string, content: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              hasLesson: true,
              lessonContent: content,
              author: currentUser?.name || 'Devon Vance'
            }
          : m
      )
    );
  };

  const autoGenerateAllLessons = () => {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        hasLesson: true,
        author: 'Inducto AI Compliance Engine',
        lessonContent: `Complete standardized curriculum and regulatory verification for ${m.title}. This verified course includes 5 modules, interactive comprehension quizzes, and instant certificate issuance.`
      }))
    );
    setCertificatesCount(18);
  };

  const addDepartmentHeadcount = (deptName: string, amount: number = 4) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.name.toLowerCase() === deptName.toLowerCase()
          ? { ...d, headcount: d.headcount + amount, learningAssigned: true, completionRate: 68 }
          : d
      )
    );
    setCandidatesCount((prev) => Math.max(0, prev + 2));
  };

  const activateAllPolicies = () => {
    setPolicies((prev) =>
      prev.map((p) => ({
        ...p,
        status: 'active'
      }))
    );
  };

  const resetToInitialDemo = () => {
    setResponsibilities(initialResponsibilities);
    setModules(initialModules);
    setDepartments(initialDepartments);
    setPolicies(initialPolicies);
    setCandidatesCount(0);
    setCertificatesCount(0);
    localStorage.removeItem('inducto_responsibilities');
    localStorage.removeItem('inducto_modules');
    localStorage.removeItem('inducto_departments');
    localStorage.removeItem('inducto_policies');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        activeTab,
        setActiveTab,
        activeSidebarItem,
        setActiveSidebarItem,
        isDarkMode,
        toggleTheme,
        currentUser,
        login,
        logout,
        teamMembers,
        responsibilities,
        modules,
        departments,
        policies,
        feedbackCount,
        candidatesCount,
        certificatesCount,
        unownedResponsibilitiesCount,
        unwrittenModulesCount,
        needsAttentionCount,
        totalEmployees,
        trainingCompletionRate,
        organizationReadinessScore,
        assignResponsibilityOwner,
        autoAssignAllResponsibilities,
        writeModuleLesson,
        autoGenerateAllLessons,
        addDepartmentHeadcount,
        activateAllPolicies,
        resetToInitialDemo,
        isReviewRespOpen,
        setIsReviewRespOpen,
        isReviewModulesOpen,
        setIsReviewModulesOpen,
        isAskOpen,
        setIsAskOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isSuggestionOpen,
        setIsSuggestionOpen,
        isHelpOpen,
        setIsHelpOpen,
        isReportOpen,
        setIsReportOpen,
        isAddEmployeeOpen,
        setIsAddEmployeeOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen
      }}
    >
      <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
