import React, { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { useBudget } from '../../context/BudgetContext';
import {
  documentationEngine,
  GeneratedDocument,
  FinancialDocumentationData,
  DocEngineProgress
} from '../../services/documentationEngine';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  const budget = useBudget();
  const [documents, setDocuments] = useState<GeneratedDocument[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<DocEngineProgress | null>(null);
  const [viewMode, setViewMode] = useState<'rendered' | 'markdown'>('rendered');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearch = useDeferredValue(searchQuery);

  // Prepare data snapshot
  const financialData: FinancialDocumentationData = useMemo(() => ({
    appName: 'Pocketmitr',
    theme: budget.theme,
    monthlyBudget: budget.monthlyBudget,
    cycleLength: budget.cycleLength,
    currentDay: budget.currentDay,
    availableToSpend: budget.availableToSpend,
    dailySafeSpendProtected: budget.dailySafeSpendProtected,
    dailySafeSpendGross: budget.dailySafeSpendGross,
    healthScore: budget.healthScore,
    surplusForecast: budget.surplusForecast,
    spentTotal: budget.spentTotal,
    reservedBillsTotal: budget.reservedBillsTotal,
    emergencyFundTotal: budget.emergencyFundTotal,
    subscriptions: budget.subscriptions,
    goals: budget.goals,
    transactions: budget.transactions,
    buckets: budget.budgetBuckets
  }), [
    budget.theme,
    budget.monthlyBudget,
    budget.cycleLength,
    budget.currentDay,
    budget.availableToSpend,
    budget.dailySafeSpendProtected,
    budget.dailySafeSpendGross,
    budget.healthScore,
    budget.surplusForecast,
    budget.spentTotal,
    budget.reservedBillsTotal,
    budget.emergencyFundTotal,
    budget.subscriptions,
    budget.goals,
    budget.transactions,
    budget.budgetBuckets
  ]);

  const loadDocuments = async () => {
    setIsGenerating(true);
    setProgress({ percentage: 5, phase: 'Initializing engine...', itemsProcessed: 0, totalItems: 4 });
    try {
      const generated = await documentationEngine.generateAllDocuments(
        financialData,
        (p) => setProgress(p)
      );
      setDocuments(generated);
      if (generated.length > 0 && !activeDocId) {
        setActiveDocId(generated[0].id);
      }
    } catch (err) {
      console.error('Failed to generate documents:', err);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(null), 500);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDocuments();
    }
  }, [isOpen]);

  const activeDoc = useMemo(() => {
    return documents.find(d => d.id === activeDocId) || documents[0] || null;
  }, [documents, activeDocId]);

  const searchResults = useMemo(() => {
    if (!deferredSearch.trim()) return null;
    return documentationEngine.searchDocuments(documents, deferredSearch);
  }, [documents, deferredSearch]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    budget.showToast('Copied document content to clipboard!');
  };

  const handleDownload = (doc: GeneratedDocument) => {
    const blob = new Blob([doc.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.category}-pocketmitr-statement.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    budget.showToast(`Exported ${doc.title} as Markdown!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-surface-container rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-surface-container-high/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-[22px]">description</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Pocketmitr Documentation & Audit Engine
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Engine v2.4 Fast
                </span>
              </h2>
              <p className="text-xs text-on-surface-variant">
                Live asynchronous compilation • Hash cached • Zero blocking
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Progress Bar (if generating) */}
        {progress && (
          <div className="bg-primary/10 border-b border-primary/20 px-5 py-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-primary font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                {progress.phase}
              </span>
              <span className="text-primary font-bold">{progress.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Search & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-lowest/80 border-b border-white/5">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search statements, rules, audit items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high/90 text-sm text-white placeholder:text-on-surface-variant pl-9 pr-3 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Document Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeDoc?.id === doc.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-white'
                }`}
              >
                <span>{doc.title.split(' ')[0]}</span>
                {doc.cached && (
                  <span className="text-[10px] opacity-75">⚡</span>
                )}
              </button>
            ))}
          </div>

          {/* View Mode & Export */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode(viewMode === 'rendered' ? 'markdown' : 'rendered')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-surface-container-high text-on-surface hover:text-white border border-white/5 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">
                {viewMode === 'rendered' ? 'code' : 'visibility'}
              </span>
              <span>{viewMode === 'rendered' ? 'Raw MD' : 'Formatted'}</span>
            </button>
            {activeDoc && (
              <>
                <button
                  onClick={() => handleCopy(activeDoc.markdown)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-surface-container-high text-on-surface hover:text-white border border-white/5 flex items-center gap-1"
                  title="Copy Markdown"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  <span className="hidden sm:inline">Copy</span>
                </button>
                <button
                  onClick={() => handleDownload(activeDoc)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-primary/20 text-primary hover:bg-primary hover:text-on-primary border border-primary/30 transition-all flex items-center gap-1"
                  title="Export Markdown"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span className="hidden sm:inline">Export</span>
                </button>
              </>
            )}
            <button
              onClick={loadDocuments}
              disabled={isGenerating}
              className="p-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-white disabled:opacity-50"
              title="Regenerate & Recompile"
            >
              <span className={`material-symbols-outlined text-[16px] ${isGenerating ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 min-h-[300px]">
          {/* Search Results Overlay if search is active */}
          {searchResults && searchResults.length > 0 ? (
            <div className="space-y-3 mb-6 bg-primary/5 p-4 rounded-xl border border-primary/20">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">manage_search</span>
                Found {searchResults.length} Match(es) for &quot;{deferredSearch}&quot;
              </h3>
              <div className="space-y-2">
                {searchResults.map((res) => (
                  <div
                    key={res.docId}
                    onClick={() => {
                      setActiveDocId(res.docId);
                      setSearchQuery('');
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-high/80 hover:bg-surface-container-high cursor-pointer transition-colors border border-white/5 text-xs"
                  >
                    <span className="font-semibold text-white block mb-0.5">{res.docTitle}</span>
                    <span className="text-on-surface-variant line-clamp-2">{res.snippet}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : searchResults && searchResults.length === 0 ? (
            <div className="p-4 rounded-xl bg-surface-container-high/50 text-center text-xs text-on-surface-variant mb-4">
              No matching terms found in generated documentation.
            </div>
          ) : null}

          {activeDoc ? (
            <div>
              {/* Document Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{activeDoc.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{activeDoc.summary}</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    Compiled in {activeDoc.generationTimeMs}ms
                  </span>
                  {activeDoc.cached && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ⚡ Cache Hit (0ms overhead)
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-on-surface-variant/70">
                    Hash: #{activeDoc.dataHash.slice(0, 6)}
                  </span>
                </div>
              </div>

              {/* Document Body */}
              {viewMode === 'rendered' ? (
                <div
                  className="prose prose-invert max-w-none text-sm text-on-surface"
                  dangerouslySetInnerHTML={{ __html: activeDoc.html }}
                />
              ) : (
                <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {activeDoc.markdown}
                </pre>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[36px] mb-2 animate-spin">
                sync
              </span>
              <p className="text-sm">Compiling financial documentation suite...</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-surface-container-lowest/90 border-t border-white/10 flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Documentation Engine active & synchronized with reactive budget store</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-container-high hover:bg-white/10 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
