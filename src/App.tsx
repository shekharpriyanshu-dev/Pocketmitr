import React, { lazy, Suspense } from 'react';
import { BudgetProvider, useBudget } from './context/BudgetContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { AddExpenseModal } from './components/modals/AddExpenseModal';
import { AddIncomeModal } from './components/modals/AddIncomeModal';
import { DocumentationModal } from './components/modals/DocumentationModal';

// Code-splitting via React.lazy to minimize initial bundle size and boost UI responsiveness
const DashboardScreen = lazy(() =>
  import('./components/pocketwise/DashboardScreen').then((m) => ({ default: m.DashboardScreen }))
);
const SimulatorScreen = lazy(() =>
  import('./components/pocketwise/SimulatorScreen').then((m) => ({ default: m.SimulatorScreen }))
);
const ScenariosScreen = lazy(() =>
  import('./components/pocketwise/ScenariosScreen').then((m) => ({ default: m.ScenariosScreen }))
);
const GoalsBillsScreen = lazy(() =>
  import('./components/pocketwise/GoalsBillsScreen').then((m) => ({ default: m.GoalsBillsScreen }))
);

const PulseSimulatorScreen = lazy(() =>
  import('./components/pulse/PulseSimulatorScreen').then((m) => ({ default: m.PulseSimulatorScreen }))
);
const PulseCashScreen = lazy(() =>
  import('./components/pulse/PulseCashScreen').then((m) => ({ default: m.PulseCashScreen }))
);
const PulseSubsScreen = lazy(() =>
  import('./components/pulse/PulseSubsScreen').then((m) => ({ default: m.PulseSubsScreen }))
);
const PulseHealthScreen = lazy(() =>
  import('./components/pulse/PulseHealthScreen').then((m) => ({ default: m.PulseHealthScreen }))
);

const ScreenSkeleton: React.FC = () => (
  <div className="flex flex-col w-full max-w-xl mx-auto px-4 pt-4 gap-4 animate-pulse">
    <div className="h-28 w-full bg-white/5 rounded-2xl border border-white/5"></div>
    <div className="h-44 w-full bg-white/5 rounded-2xl border border-white/5"></div>
    <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/5"></div>
  </div>
);

const MainApp: React.FC = () => {
  const { theme, activePocketWiseTab, activePulseTab, isDocModalOpen, setIsDocModalOpen } = useBudget();

  return (
    <div className={`min-h-screen flex flex-col bg-surface font-body-md text-on-surface selection:bg-primary/20 ${theme === 'pulse' ? 'theme-pulse' : ''}`}>
      {/* Top Application Header */}
      <Header />

      {/* Main Viewport Content Area with Suspense boundary */}
      <main className="flex-1 flex flex-col relative w-full pt-28 pb-24 bg-surface overflow-x-hidden">
        <Suspense fallback={<ScreenSkeleton />}>
          {theme === 'pocketwise' ? (
            <>
              {activePocketWiseTab === 'dashboard' && <DashboardScreen />}
              {activePocketWiseTab === 'simulator' && <SimulatorScreen />}
              {activePocketWiseTab === 'scenarios' && <ScenariosScreen />}
              {activePocketWiseTab === 'goals-and-bills' && <GoalsBillsScreen />}
            </>
          ) : (
            <>
              {activePulseTab === 'simulator' && <PulseSimulatorScreen />}
              {activePulseTab === 'cash' && <PulseCashScreen />}
              {activePulseTab === 'subs' && <PulseSubsScreen />}
              {activePulseTab === 'health' && <PulseHealthScreen />}
            </>
          )}
        </Suspense>
      </main>

      {/* Floating Theme Quick Toggle Banner */}
      <div className="fixed top-20 right-3 z-40 hidden sm:flex items-center gap-1.5 bg-surface-container-high/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-lg border border-white/10 text-xs font-semibold">
        <span className="text-on-surface-variant">Theme:</span>
        <span className={theme === 'pocketwise' ? 'text-primary' : 'text-[#00f59b]'}>
          {theme === 'pocketwise' ? 'PocketWise (Midnight)' : 'Pulse (Obsidian)'}
        </span>
      </div>

      {/* Bottom Floating Navigation */}
      <BottomNav />

      {/* Interactive Modals */}
      <AddExpenseModal />
      <AddIncomeModal />
      <DocumentationModal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} />

      {/* Toast Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <BudgetProvider>
      <MainApp />
    </BudgetProvider>
  );
}
