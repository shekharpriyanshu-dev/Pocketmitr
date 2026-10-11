import React from 'react';
import { BudgetProvider, useBudget } from './context/BudgetContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { AddExpenseModal } from './components/modals/AddExpenseModal';
import { AddIncomeModal } from './components/modals/AddIncomeModal';

// PocketWise Screens
import { DashboardScreen } from './components/pocketwise/DashboardScreen';
import { SimulatorScreen } from './components/pocketwise/SimulatorScreen';
import { ScenariosScreen } from './components/pocketwise/ScenariosScreen';
import { GoalsBillsScreen } from './components/pocketwise/GoalsBillsScreen';

// Pulse Screens
import { PulseSimulatorScreen } from './components/pulse/PulseSimulatorScreen';
import { PulseCashScreen } from './components/pulse/PulseCashScreen';
import { PulseSubsScreen } from './components/pulse/PulseSubsScreen';
import { PulseHealthScreen } from './components/pulse/PulseHealthScreen';

const MainApp: React.FC = () => {
  const { theme, activePocketWiseTab, activePulseTab } = useBudget();

  return (
    <div className={`min-h-screen flex flex-col bg-surface font-body-md text-on-surface selection:bg-primary/20 ${theme === 'pulse' ? 'theme-pulse' : ''}`}>
      {/* Top Application Header */}
      <Header />

      {/* Main Viewport Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-28 pb-24 bg-surface overflow-x-hidden">
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
      </main>

      {/* Floating Theme Quick Toggle Banner (at top right / accessible) */}
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
