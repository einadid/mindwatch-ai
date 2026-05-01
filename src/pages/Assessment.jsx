import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Brain, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { phq9Questions, asrsQuestions, ociQuestions, answerOptions } from '../data/questions'

export default function Assessment() {
  const navigate = useNavigate()
  const { setBurnoutScore } = useApp()
  const [section, setSection] = useState(0)
  const [phqAnswers, setPhqAnswers] = useState(Array(phq9Questions.length).fill(null))
  const [asrsAnswers, setAsrsAnswers] = useState(Array(asrsQuestions.length).fill(null))
  const [ociAnswers, setOciAnswers] = useState(Array(ociQuestions.length).fill(null))

  const sections = useMemo(() => [
    { key: 'phq', title: 'LUNA Screening', subtitle: 'Mood & low-energy patterns', description: 'These help us understand your recent emotional wellbeing.', questions: phq9Questions, answers: phqAnswers, setter: setPhqAnswers, color: 'purple', icon: '🌙' },
    { key: 'asrs', title: 'FOCUS Screening', subtitle: 'Attention & study difficulty', description: 'These help us understand focus and attention patterns.', questions: asrsQuestions, answers: asrsAnswers, setter: setAsrsAnswers, color: 'yellow', icon: '⚡' },
    { key: 'oci', title: 'CALM Screening', subtitle: 'Anxiety & repetitive worry', description: 'These help identify stress loops and repetitive behaviors.', questions: ociQuestions, answers: ociAnswers, setter: setOciAnswers, color: 'blue', icon: '🔵' },
  ], [phqAnswers, asrsAnswers, ociAnswers])

  const current = sections[section]
  const progress = Math.round(((section + 1) / sections.length) * 100)
  const isComplete = current.answers.every((a) => a !== null)

  const handleAnswer = (i, v) => { const u = [...current.answers]; u[i] = v; current.setter(u) }
  const handleNext = () => { if (isComplete && section < sections.length - 1) setSection(section + 1) }
  const handleBack = () => { if (section > 0) setSection(section - 1); else navigate('/onboarding') }

  const handleSubmit = () => {
    const phqT = phqAnswers.reduce((a, b) => a + (b ?? 0), 0)
    const asrsT = asrsAnswers.reduce((a, b) => a + (b ?? 0), 0)
    const ociT = ociAnswers.reduce((a, b) => a + (b ?? 0), 0)
    const score = Math.max(12, Math.min(100, Math.round((phqT / 27) * 40 + (asrsT / 18) * 30 + (ociT / 18) * 30)))
    localStorage.setItem('mw_assessment', JSON.stringify({ phqT, asrsT, ociT, score, completedAt: new Date().toISOString() }))
    localStorage.setItem('mw_score', String(score))
    setBurnoutScore(score)
    navigate('/dashboard')
  }

  const colorMap = {
    purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-600', selected: 'bg-purple-50 border-purple-300 text-purple-700 ring-2 ring-purple-200', tab: 'bg-purple-100 border-purple-200 text-purple-700' },
    yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600', selected: 'bg-yellow-50 border-yellow-300 text-yellow-700 ring-2 ring-yellow-200', tab: 'bg-yellow-100 border-yellow-200 text-yellow-700' },
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600', selected: 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-200', tab: 'bg-blue-100 border-blue-200 text-blue-700' },
  }
  const theme = colorMap[current.color]

  return (
    <div className="min-h-screen bg-white pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-400">Step 2 of 3</p>
            <p className="text-sm text-blue-600 font-semibold">Wellness Screening</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
            <Brain className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Initial Wellness Assessment</h1>
          <p className="text-gray-500">This is a <span className="text-navy-800 font-semibold">screening tool</span>, not a diagnosis. It helps personalize your support.</p>
        </div>

        {/* Progress */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-400">Progress</p>
            <p className="text-sm font-bold text-navy-800">{progress}%</p>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sections.map((s, i) => (
              <div key={s.key} className={`rounded-xl px-3 py-2 text-center border text-xs ${
                i === section ? `${theme.tab}` : i < section ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-100 text-gray-400'
              }`}>
                {s.icon} {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className={`rounded-3xl p-6 md:p-8 border ${theme.border} ${theme.bg} mb-6`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">{current.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-1">{current.title}</h2>
              <p className={`text-sm font-medium ${theme.text} mb-2`}>{current.subtitle}</p>
              <p className="text-sm text-gray-400">{current.description}</p>
            </div>
          </div>

          <div className="space-y-5">
            {current.questions.map((q, qi) => (
              <div key={qi} className="bg-white border border-gray-100 rounded-2xl p-5">
                <p className="text-navy-800 font-medium mb-4">{qi + 1}. {q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {answerOptions.map((opt) => (
                    <button key={opt.label} onClick={() => handleAnswer(qi, opt.value)}
                      className={`text-left px-4 py-3 rounded-xl border transition text-sm font-medium ${
                        current.answers[qi] === opt.value ? theme.selected : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethics */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-semibold text-sm">Ethical Reminder</p>
          </div>
          <p className="text-gray-500 text-sm">These responses help detect patterns — not confirm any diagnosis. A licensed professional must do that.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <button onClick={handleBack}
            className="md:w-40 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-4 rounded-2xl transition font-medium">
            Back
          </button>
          {section < sections.length - 1 ? (
            <button onClick={handleNext} disabled={!isComplete}
              className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
                isComplete ? 'gradient-navy text-white hover:shadow-lg' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}>
              Next Section <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!isComplete}
              className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
                isComplete ? 'gradient-navy text-white hover:shadow-lg' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}>
              Complete Assessment <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}