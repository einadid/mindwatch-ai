import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sunrise, BookOpen, Moon, Brain } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { suggestionsByAgent } from '../data/suggestions'

export default function Suggestions() {
  const navigate = useNavigate()
  const { agentStatus, burnoutScore } = useApp()

  const getLevel = (risk) => (risk === 'high' || risk === 'critical') ? 'high' : 'low'
  const luna = suggestionsByAgent.luna[getLevel(agentStatus?.luna?.risk)]
  const focus = suggestionsByAgent.focus[getLevel(agentStatus?.focus?.risk)]
  const calm = suggestionsByAgent.calm[getLevel(agentStatus?.calm?.risk)]

  const byTime = (time) => [...luna, ...focus, ...calm].filter((s) => s.time === time)

  const Section = ({ title, icon, items, border }) => {
    if (!items.length) return null
    return (
      <div className={`bg-white border ${border} rounded-3xl p-5 mb-4 shadow-sm`}>
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h2 className="text-lg font-bold text-navy-800">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-navy-800 font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Dashboard</span>
          </button>
          <p className="text-sm text-blue-600 font-semibold">Smart Plan</p>
        </div>

        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center mb-4">
            <Brain className="w-7 h-7 text-yellow-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Today's Smart Plan</h1>
          <p className="text-gray-500">Personalized suggestions from LUNA, FOCUS, and CALM.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Burnout score</p>
            <p className="text-navy-800 font-bold text-lg">{burnoutScore || 28}/100</p>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-gray-400">🌙 {agentStatus?.luna?.status || 'Stable'}</span>
            <span className="text-xs text-gray-400">⚡ {agentStatus?.focus?.status || 'Active'}</span>
            <span className="text-xs text-gray-400">🔵 {agentStatus?.calm?.status || 'Calm'}</span>
          </div>
        </div>

        <Section title="Morning Routine" icon={<Sunrise className="w-5 h-5 text-orange-500" />} items={byTime('morning')} border="border-orange-100" />
        <Section title="Study Time" icon={<BookOpen className="w-5 h-5 text-yellow-500" />} items={byTime('study')} border="border-yellow-100" />
        <Section title="Afternoon" icon={<Sunrise className="w-5 h-5 text-blue-500" />} items={byTime('afternoon')} border="border-blue-100" />
        <Section title="Night Routine" icon={<Moon className="w-5 h-5 text-purple-500" />} items={byTime('night')} border="border-purple-100" />
        <Section title="Anytime Support" icon={<Brain className="w-5 h-5 text-green-500" />} items={byTime('anytime')} border="border-green-100" />

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-6">
          <p className="text-green-700 font-semibold text-sm mb-1">About these suggestions</p>
          <p className="text-gray-500 text-sm">Evidence-based wellness techniques, not medical prescriptions. Consult a professional if symptoms persist.</p>
        </div>
      </div>
    </div>
  )
}