import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Brain, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  phq9Questions,
  asrsQuestions,
  ociQuestions,
  answerOptions,
} from '../data/questions'

export default function Assessment() {
  const navigate = useNavigate()
  const { setBurnoutScore } = useApp()

  const [section, setSection] = useState(0)

  const [phqAnswers, setPhqAnswers] = useState(
    Array(phq9Questions.length).fill(null)
  )
  const [asrsAnswers, setAsrsAnswers] = useState(
    Array(asrsQuestions.length).fill(null)
  )
  const [ociAnswers, setOciAnswers] = useState(
    Array(ociQuestions.length).fill(null)
  )

  const sections = useMemo(
    () => [
      {
        key: 'phq',
        title: 'LUNA Screening',
        subtitle: 'Mood & low-energy pattern check',
        description:
          'These questions help us understand your recent emotional wellbeing.',
        questions: phq9Questions,
        answers: phqAnswers,
        setter: setPhqAnswers,
        color: 'purple',
        icon: '🌙',
      },
      {
        key: 'asrs',
        title: 'FOCUS Screening',
        subtitle: 'Attention & study difficulty pattern check',
        description:
          'These questions help us understand focus, organization, and attention patterns.',
        questions: asrsQuestions,
        answers: asrsAnswers,
        setter: setAsrsAnswers,
        color: 'yellow',
        icon: '⚡',
      },
      {
        key: 'oci',
        title: 'CALM Screening',
        subtitle: 'Anxiety & repetitive worry pattern check',
        description:
          'These questions help us identify stress loops and repetitive worry-related behaviors.',
        questions: ociQuestions,
        answers: ociAnswers,
        setter: setOciAnswers,
        color: 'blue',
        icon: '🔵',
      },
    ],
    [phqAnswers, asrsAnswers, ociAnswers]
  )

  const current = sections[section]
  const progress = Math.round(((section + 1) / sections.length) * 100)

  const isCurrentSectionComplete = current.answers.every(
    (item) => item !== null
  )

  const handleAnswer = (index, value) => {
    const updated = [...current.answers]
    updated[index] = value
    current.setter(updated)
  }

  const handleNext = () => {
    if (!isCurrentSectionComplete) return
    if (section < sections.length - 1) {
      setSection(section + 1)
    }
  }

  const handleBack = () => {
    if (section > 0) {
      setSection(section - 1)
    } else {
      navigate('/onboarding')
    }
  }

  const handleSubmit = () => {
    const phqTotal = phqAnswers.reduce((a, b) => a + (b ?? 0), 0)
    const asrsTotal = asrsAnswers.reduce((a, b) => a + (b ?? 0), 0)
    const ociTotal = ociAnswers.reduce((a, b) => a + (b ?? 0), 0)

    const normalizedScore = Math.round(
      (phqTotal / 27) * 40 +
        (asrsTotal / 18) * 30 +
        (ociTotal / 18) * 30
    )

    const finalScore = Math.max(12, Math.min(100, normalizedScore))

    const assessmentData = {
      phqTotal,
      asrsTotal,
      ociTotal,
      finalScore,
      completedAt: new Date().toISOString(),
    }

    localStorage.setItem('mw_assessment', JSON.stringify(assessmentData))
    localStorage.setItem('mw_score', String(finalScore))
    setBurnoutScore(finalScore)

    navigate('/dashboard')
  }

  const colorMap = {
    purple: {
      border: 'border-purple-500/30',
      bg: 'bg-purple-900/10',
      text: 'text-purple-400',
      ring: 'ring-purple-500',
    },
    yellow: {
      border: 'border-yellow-500/30',
      bg: 'bg-yellow-900/10',
      text: 'text-yellow-400',
      ring: 'ring-yellow-500',
    },
    blue: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-900/10',
      text: 'text-blue-400',
      ring: 'ring-blue-500',
    },
  }

  const theme = colorMap[current.color]

  return (
    <div className="min-h-screen bg-brand-900 px-4 py-6">
      <div className="max-w-3xl mx-auto">
        {/* top row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="text-right">
            <p className="text-xs text-gray-500">Step 2 of 3</p>
            <p className="text-sm text-blue-400 font-medium">
              Initial Screening
            </p>
          </div>
        </div>

        {/* header */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <Brain className="w-7 h-7 text-blue-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Initial Wellness Assessment
          </h1>
          <p className="text-gray-400 max-w-2xl">
            This helps MindWatch AI personalize your support. This is a{' '}
            <span className="text-white font-medium">screening tool</span>, not
            a diagnosis.
          </p>
        </div>

        {/* progress */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-400">Overall Progress</p>
            <p className="text-sm font-semibold text-white">{progress}%</p>
          </div>

          <div className="w-full h-3 bg-brand-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {sections.map((item, index) => (
              <div
                key={item.key}
                className={`rounded-xl px-3 py-2 text-center border text-xs ${
                  index === section
                    ? 'bg-blue-600/20 border-blue-500/40 text-white'
                    : index < section
                    ? 'bg-green-600/10 border-green-500/30 text-green-300'
                    : 'bg-brand-700 border-blue-900/20 text-gray-500'
                }`}
              >
                {item.icon} {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* section card */}
        <div className={`rounded-3xl p-6 md:p-8 border ${theme.border} ${theme.bg} mb-6`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">{current.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {current.title}
              </h2>
              <p className={`text-sm font-medium ${theme.text} mb-2`}>
                {current.subtitle}
              </p>
              <p className="text-sm text-gray-400">{current.description}</p>
            </div>
          </div>

          <div className="space-y-5">
            {current.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="bg-brand-800 border border-blue-900/20 rounded-2xl p-5"
              >
                <p className="text-white font-medium mb-4">
                  {qIndex + 1}. {question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {answerOptions.map((option) => {
                    const selected = current.answers[qIndex] === option.value
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => handleAnswer(qIndex, option.value)}
                        className={`text-left px-4 py-3 rounded-xl border transition ${
                          selected
                            ? `${theme.bg} ${theme.border} ${theme.text} ring-1 ${theme.ring}`
                            : 'bg-brand-700 border-blue-900/20 text-gray-300 hover:border-blue-500/40'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ethics note */}
        <div className="bg-brand-800 border border-green-700/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-semibold text-sm">
              Ethical Reminder
            </p>
          </div>
          <p className="text-gray-400 text-sm">
            These responses help the app understand patterns. They do not confirm
            any psychiatric diagnosis. A licensed doctor or psychologist must do that.
          </p>
        </div>

        {/* buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={handleBack}
            className="md:w-40 bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 py-4 rounded-2xl transition font-medium"
          >
            Back
          </button>

          {section < sections.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isCurrentSectionComplete}
              className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
                isCurrentSectionComplete
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next Section
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentSectionComplete}
              className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
                isCurrentSectionComplete
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Complete Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}