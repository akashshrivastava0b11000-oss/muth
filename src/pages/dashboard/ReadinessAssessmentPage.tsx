import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { storage } from '../../services/storageService';
import {
  ASSESSMENT_QUESTIONS,
  evaluateAssessment
} from '../../services/assessmentEngine';
import { AssessmentResult } from '../../types';
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  FileText,
  Clock,
  Compass,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReadinessAssessmentPage: React.FC = () => {
  const { activeVenture, updateVenture } = useVenture();

  // Load existing assessment for active venture if present
  const allAssessments = storage.getAssessments().filter(a => a.ventureId === activeVenture?.id);
  const latestAssessment = allAssessments[0] || null;

  // View state: 'view_result' | 'taking'
  const [mode, setMode] = useState<'view_result' | 'taking'>(
    latestAssessment ? 'view_result' : 'taking'
  );

  // Questionnaire state
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(latestAssessment);

  if (!activeVenture) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-sutra-border max-w-lg mx-auto">
        <BrainCircuit className="w-12 h-12 text-sutra-royal mx-auto mb-3" />
        <h3 className="text-lg font-bold text-sutra-navy">No Active Venture Selected</h3>
        <p className="text-xs text-sutra-slate mt-1">
          Select or create a venture to run the 9-pillar readiness diagnostic.
        </p>
      </div>
    );
  }

  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);

  const handleSelectOption = (score: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: score
    });
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate assessment results
      finishAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishAssessment = () => {
    setIsAiProcessing(true);

    setTimeout(() => {
      const result = evaluateAssessment(activeVenture, answers, true);
      storage.saveAssessment(result);

      // Update active venture in context
      updateVenture({
        ...activeVenture,
        latestReadinessScore: result.overallScore,
        latestAssessmentDate: result.createdAt
      });

      setCurrentResult(result);
      setIsAiProcessing(false);
      setMode('view_result');

      // Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentStep(0);
    setMode('taking');
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sutra-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-sutra-navy">
              AI Venture Readiness Diagnostic
            </h1>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-50 text-sutra-teal border border-teal-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 9-Pillar Diagnostic
            </span>
          </div>
          <p className="text-xs sm:text-sm text-sutra-slate mt-1">
            Evaluating operational readiness, grant eligibility, customer validation, and execution moats for <strong className="text-sutra-navy">{activeVenture.name}</strong>.
          </p>
        </div>

        {mode === 'view_result' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-sutra-border rounded-xl text-xs font-semibold text-sutra-navy hover:bg-sutra-cloud transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
            <button
              onClick={handlePrintReport}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sutra-royal text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sutra-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        )}
      </div>

      {/* --- MODE 1: TAKING THE QUESTIONNAIRE --- */}
      {mode === 'taking' && (
        <div className="max-w-2xl mx-auto">
          {isAiProcessing ? (
            <div className="bg-white rounded-2xl p-12 border border-sutra-border text-center shadow-sutra-md space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-sutra-teal mx-auto flex items-center justify-center animate-spin-slow">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-sutra-navy">Analyzing Venture Readiness...</h3>
              <p className="text-xs text-sutra-slate max-w-sm mx-auto">
                Synthesizing diagnostic responses against verified government schemes and stage benchmarks for {activeVenture.name}.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-sutra-border shadow-sutra-md">
              {/* Progress Header */}
              <div className="flex items-center justify-between text-xs font-bold text-sutra-slate mb-2">
                <span className="uppercase text-sutra-royal">
                  Question {currentStep + 1} of {totalQuestions}
                </span>
                <span>{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-sutra-cloud h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-sutra-royal h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Question Content */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sutra-teal bg-teal-50 px-2 py-0.5 rounded-md">
                  {currentQuestion.categoryLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-sutra-navy mt-3">
                  {currentQuestion.question}
                </h3>
                <p className="text-xs text-sutra-slate mt-1.5 leading-relaxed">
                  {currentQuestion.description}
                </p>

                {/* Options List */}
                <div className="mt-6 space-y-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = answers[currentQuestion.id] === opt.score;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(opt.score)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-sutra-royal bg-blue-50/70 shadow-xs'
                            : 'border-sutra-border bg-white hover:border-gray-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold text-sutra-navy leading-snug">
                            {opt.label}
                          </div>
                          {opt.feedbackTip && (
                            <div className="text-[11px] text-sutra-slate mt-1 italic">
                              💡 {opt.feedbackTip}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-sutra-royal text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-sutra-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-sutra-border rounded-xl text-xs font-semibold text-sutra-slate hover:bg-sutra-cloud disabled:opacity-30 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[currentQuestion.id] === undefined}
                  className="px-6 py-2.5 bg-sutra-royal hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 shadow-sutra-sm flex items-center gap-2"
                >
                  <span>{currentStep === totalQuestions - 1 ? 'Generate Report' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- MODE 2: RESULTS REPORT VIEW --- */}
      {mode === 'view_result' && currentResult && (
        <div className="space-y-8" id="printable-assessment-report">
          {/* Top Score Banner */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sutra-border shadow-sutra-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sutra-royal bg-sutra-ice px-2.5 py-0.5 rounded-full">
                  Diagnostic Report
                </span>
                <span className="text-xs text-sutra-slate">
                  Calculated for {activeVenture.name} ({activeVenture.stage} stage)
                </span>
              </div>
              <h2 className="text-2xl font-black text-sutra-navy">
                Overall Venture Readiness: {currentResult.overallScore}/100
              </h2>
              <p className="text-xs text-sutra-slate leading-relaxed">
                {currentResult.summary}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-center flex flex-col items-center justify-center">
              <div className="text-xs font-bold text-sutra-slate uppercase">Readiness Index</div>
              <div className="text-5xl font-black text-sutra-royal mt-1">
                {currentResult.overallScore}
                <span className="text-base text-sutra-slate font-normal">/100</span>
              </div>
              <span className="text-[11px] font-semibold text-sutra-green mt-2 bg-green-100 px-2.5 py-0.5 rounded-full">
                {currentResult.overallScore >= 75
                  ? 'Strong Grant & Seed Candidate'
                  : currentResult.overallScore >= 50
                  ? 'Active Validation Stage'
                  : 'Early Conceptual Phase'}
              </span>
            </div>
          </div>

          {/* 9 Categories Visual Breakdown */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sutra-border shadow-sutra-sm">
            <h3 className="text-base font-bold text-sutra-navy mb-4">
              Category-Wise Preparedness Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Problem & Solution', score: currentResult.categoryScores.problemSolution },
                { label: 'Target Customers', score: currentResult.categoryScores.targetCustomers },
                { label: 'Market & Moat', score: currentResult.categoryScores.marketCompetition },
                { label: 'Business Model', score: currentResult.categoryScores.businessModel },
                { label: 'Financial Runway', score: currentResult.categoryScores.financialPlanning },
                { label: 'Team Capabilities', score: currentResult.categoryScores.teamCapabilities },
                { label: 'Product / MVP', score: currentResult.categoryScores.productDev },
                { label: 'Execution Traction', score: currentResult.categoryScores.executionTraction },
                { label: 'Legal & DPIIT', score: currentResult.categoryScores.legalCompliance },
              ].map((cat, idx) => (
                <div key={idx} className="p-4 bg-sutra-cloud rounded-xl border border-sutra-border space-y-2">
                  <div className="flex justify-between text-xs font-bold text-sutra-navy">
                    <span>{cat.label}</span>
                    <span className="text-sutra-royal">{cat.score}%</span>
                  </div>
                  <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-sutra-border/60">
                    <div
                      className={`h-full rounded-full ${
                        cat.score >= 80
                          ? 'bg-sutra-green'
                          : cat.score >= 60
                          ? 'bg-sutra-royal'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${cat.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths vs Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm space-y-3">
              <h3 className="text-sm font-bold text-sutra-navy flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sutra-green" />
                <span>Identified Competitive Strengths</span>
              </h3>
              <ul className="space-y-2 text-xs text-sutra-slate">
                {currentResult.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 bg-green-50/50 p-2.5 rounded-xl border border-green-200">
                    <span className="text-sutra-green font-bold">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Identified Risks */}
            <div className="bg-white rounded-2xl p-6 border border-sutra-border shadow-sutra-sm space-y-3">
              <h3 className="text-sm font-bold text-sutra-navy flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Potential Vulnerabilities & Risks</span>
              </h3>
              <ul className="space-y-2 text-xs text-sutra-slate">
                {currentResult.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Next Steps */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sutra-border shadow-sutra-sm">
            <h3 className="text-base font-bold text-sutra-navy mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sutra-royal" />
              <span>Recommended Next Operational Steps</span>
            </h3>
            <div className="space-y-2.5">
              {currentResult.nextSteps.map((step, idx) => (
                <div key={idx} className="p-3 bg-sutra-cloud rounded-xl border border-sutra-border flex items-center gap-3 text-xs">
                  <span className="w-6 h-6 rounded-full bg-sutra-royal text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="text-sutra-navy font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
