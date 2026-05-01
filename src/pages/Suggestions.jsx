import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sunrise, BookOpen, Moon, Brain } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { suggestionsByAgent } from '../data/suggestions'

export default function Suggestions() {
  const navigate = useNavigate()
  const { agentStatus, burnoutScore } = useApp()

  const lunaRisk = agentStatus?.luna?.risk || 'low'
  const focusRisk = agentStatus?.focus?.risk || 'low'
  const calmRisk = agentStatus?.calm?.risk || 'low'

  const getLunaLevel = () => (lunaRisk === 'high' || lunaRisk === 'critical') ? 'high' : 'low'
  const getFocusLevel = () => (focusRisk === 'high' || focusRisk === 'critical') ? 'high' : 'low'
  const getCalmLevel = () => (calmRisk === 'high' || calmRisk === 'critical') ? 'high' : 'low'

  const lunaSuggestions = suggestionsByAgent.luna[getLunaLevel()]
  const focusSuggestions = suggestionsByAgent.focus[getFocusLevel()]
  const calmSuggestions = suggestionsByAgent.calm[getCalmLevel()]

  const morningItems = [
    ...lunaSuggestions.filter((s) => s.time === 'morning'),
    ...focusSuggestions.filter((s) => s.time === 'morning'),
    ...calmSuggestions.filter((s) => s.time === 'morning'),
  ]

  const studyItems = [
    ...focusSuggestions.filter((s) => s.time === 'study'),
  ]

  const afternoonItems = [
    ...lunaSuggestions.filter((s) => s.time === 'afternoon'),
    ...calmSuggestions.filter((s) => s.time === 'afternoon'),
  ]

  const nightItems = [
    ...lunaSuggestions.filter((s) => s.time === 'night'),
    ...calmSuggestions.filter((s) => s.time === 'night'),
  ]

  const anytimeItems = [
    ...lunaSuggestions.filter((s) => s.time === 'anytime'),
    ...focusSuggestions.filter((s) => s.time === 'anytime'),
    ...calmSuggestions.filter((s) => s.time === 'anytime'),
  ]

  const renderSection = (title, icon, items, borderColor) => {
    if (!items.length) return null
    return (
      <div className={`bg-brand-800 border ${borderColor} rounded-3xl p-5 mb-4`}>
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-brand-700 border border-blue-900/20 rounded-2xl p-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-900 px-4 pt-20 pb-28">
      <div className="max-w-3xl mx-auto">

        {/* top */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </button>
          <p className="text-sm text-blue-400 font-medium">Smart Plan</p>
        </div>

        {/* header */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center mb-4">
            <Brain className="w-7 h-7 text-yellow-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Today's Smart Plan
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Personalized suggestions built by LUNA, FOCUS, and CALM based on your
            check-in data, mood patterns, and stress level.
          </p>
        </div>

        {/* score context */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Current burnout score</p>
            <p className="text-white font-bold text-lg">{burnoutScore || 28}/100</p>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <span>🌙</span>
              <span className="text-xs text-gray-400">LUNA: {agentStatus?.luna?.status || 'Stable'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span className="text-xs text-gray-400">FOCUS: {agentStatus?.focus?.status || 'Active'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔵</span>
              <span className="text-xs text-gray-400">CALM: {agentStatus?.calm?.status || 'Calm'}</span>
            </div>
          </div>
        </div>

        {/* suggestion sections */}
        {renderSection(
          'Morning Routine',
          <Sunrise className="w-5 h-5 text-orange-400" />,
          morningItems,
          'border-orange-500/20'
        )}

        {renderSection(
          'Study Time',
          <BookOpen className="w-5 h-5 text-yellow-400" />,
          studyItems,
          'border-yellow-500/20'
        )}

        {renderSection(
          'Afternoon',
          <Sunrise className="w-5 h-5 text-blue-400" />,
          afternoonItems,
          'border-blue-500/20'
        )}

        {renderSection(
          'Night Routine',
          <Moon className="w-5 h-5 text-purple-400" />,
          nightItems,
          'border-purple-500/20'
        )}

        {renderSection(
          'Anytime Support',
          <Brain className="w-5 h-5 text-green-400" />,
          anytimeItems,
          'border-green-500/20'
        )}

        {/* note */}
        <div className="bg-brand-800 border border-green-700/30 rounded-2xl p-4 mt-6">
          <p className="text-green-400 font-semibold text-sm mb-1">
            About these suggestions
          </p>
          <p className="text-gray-400 text-sm">
            These are evidence-based wellness techniques, not medical prescriptions.
            If symptoms persist or worsen, please consult a mental health professional.
          </p>
        </div>
      </div>
    </div>
  )
}