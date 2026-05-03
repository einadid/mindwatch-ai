import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

const agentData = {
  luna: {
    icon: '🌙', name: 'LUNA', fullName: 'Low-mood & Emotional Pattern Agent', color: 'purple',
    target: 'MDD Patterns',
    description: 'Continuously monitors mood patterns, sleep quality, social engagement, and energy levels over a 14-day window.',
    monitors: ['Daily mood score trends', 'Sleep duration patterns', 'Social withdrawal indicators', 'Energy and motivation levels', 'Negative journal sentiment', 'Academic disengagement'],
    riskLevels: [
      { level: 'Green', emoji: '🟢', desc: 'Mood stable' },
      { level: 'Yellow', emoji: '🟡', desc: '3+ low mood days' },
      { level: 'Orange', emoji: '🟠', desc: '5+ low mood days + sleep issues' },
      { level: 'Red', emoji: '🔴', desc: '9+ low mood days + withdrawal' },
    ],
    neverSays: 'You have depression',
    alwaysSays: "You've been feeling low for several days. Let's get you support.",
    techniques: [
      { name: '3 Good Things', desc: 'Write 3 positive moments before bed' },
      { name: 'Morning Sunlight', desc: '10 min of natural light after waking' },
      { name: 'Social Reconnection', desc: 'Text or call one friend today' },
      { name: 'Movement Boost', desc: '5-minute walk to shift your mood' },
    ],
  },
  focus: {
    icon: '⚡', name: 'FOCUS', fullName: 'Attention & Study Pattern Agent', color: 'yellow',
    target: 'ADHD Patterns',
    description: 'Tracks task completion, study consistency, deadline adherence, and focus difficulty self-reports.',
    monitors: ['Weekly task completion rates', 'Study session duration', 'Deadline adherence history', 'Late-night activity', 'Self-reported focus difficulty', 'Study consistency'],
    riskLevels: [
      { level: 'Green', emoji: '🟢', desc: 'Focus patterns normal' },
      { level: 'Yellow', emoji: '🟡', desc: 'Completion < 60%' },
      { level: 'Orange', emoji: '🟠', desc: 'Completion < 40%' },
      { level: 'Red', emoji: '🔴', desc: 'Persistent 3+ weeks' },
    ],
    neverSays: 'You have ADHD',
    alwaysSays: 'Structured support could help you significantly.',
    techniques: [
      { name: 'Pomodoro Timer', desc: '25 min focused, 5 min break' },
      { name: 'Smallest Task First', desc: 'Start with under 2 minutes' },
      { name: 'Phone Face Down', desc: 'Remove visual distractions' },
      { name: 'Study Buddy', desc: 'Work alongside someone' },
    ],
  },
  calm: {
    icon: '🔵', name: 'CALM', fullName: 'Anxiety & Repetitive Pattern Agent', color: 'blue',
    target: 'OCD Patterns',
    description: 'Identifies repetitive worry patterns, anxiety spikes, checking behaviors, and stress loops.',
    monitors: ['Repetitive behavior reports', 'Checking behavior frequency', 'Anxiety spike patterns', 'Pre-exam rituals', 'Intrusive thought frequency', 'Late-night anxiety spikes'],
    riskLevels: [
      { level: 'Green', emoji: '🟢', desc: 'Anxiety normal range' },
      { level: 'Yellow', emoji: '🟡', desc: 'Spikes 2-3x/week' },
      { level: 'Orange', emoji: '🟠', desc: 'Repetitive patterns found' },
      { level: 'Red', emoji: '🔴', desc: 'Combined indicators' },
    ],
    neverSays: 'You have OCD',
    alwaysSays: 'A professional conversation could bring real relief.',
    techniques: [
      { name: 'Box Breathing', desc: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s' },
      { name: '5-4-3-2-1 Grounding', desc: '5 see, 4 hear, 3 touch, 2 smell, 1 taste' },
      { name: 'Worry Time Limit', desc: 'Allow 15 min to worry then stop' },
      { name: 'Journal the Loop', desc: 'Write worry then write what you CAN control' },
    ],
  },
}

const colorMap = {
  purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700', card: 'border-purple-100 bg-purple-50/50', dot: 'bg-purple-400', tab: 'bg-purple-100 border-purple-200' },
  yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700', card: 'border-yellow-100 bg-yellow-50/50', dot: 'bg-yellow-400', tab: 'bg-yellow-100 border-yellow-200' },
  blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', card: 'border-blue-100 bg-blue-50/50', dot: 'bg-blue-400', tab: 'bg-blue-100 border-blue-200' },
}

const riskDot = { low: 'bg-green-400', medium: 'bg-yellow-400', high: 'bg-orange-400', critical: 'bg-red-400 animate-pulse' }

export default function Agents() {
  const navigate = useNavigate()
  const location = useLocation()
  const { agentStatus } = useApp()
  const [selected, setSelected] = useState(location.state?.agent || 'luna')

  const agent = agentData[selected]
  const theme = colorMap[agent.color]
  const status = agentStatus?.[selected]

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Dashboard</span>
          </button>
          <p className="text-sm text-blue-600 font-semibold">AI Agents</p>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Your AI Agents</h1>
          <p className="text-gray-500">Three specialized agents screen for early warning signs — they never diagnose.</p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.keys(agentData).map((key) => {
            const a = agentData[key]
            const active = selected === key
            const t = colorMap[a.color]
            return (
              <button key={key} onClick={() => setSelected(key)}
                className={`rounded-2xl p-4 text-center border transition ${
                  active ? `${t.tab} ${t.border}` : 'bg-white border-gray-200 hover:border-blue-300'
                }`}>
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className={`font-bold text-sm ${active ? t.text : 'text-navy-800'}`}>{a.name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${riskDot[agentStatus?.[key]?.risk || 'low']}`} />
                  <p className="text-xs text-gray-400">{agentStatus?.[key]?.status || 'Active'}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail */}
        <div className={`bg-white rounded-3xl p-6 md:p-8 border ${theme.border} shadow-sm mb-6`}>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{agent.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-navy-800">{agent.name}</h2>
                <span className={`text-xs px-3 py-1 rounded-full ${theme.badge}`}>{agent.target}</span>
              </div>
              <p className={`text-sm font-medium ${theme.text} mb-2`}>{agent.fullName}</p>
              <p className="text-gray-400 text-sm">{agent.description}</p>
            </div>
          </div>

          {status && (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Current Status</p>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${riskDot[status.risk || 'low']}`} />
                <span className="text-navy-800 font-bold text-lg">{status.status}</span>
              </div>
              {status.message && <p className="text-gray-400 text-sm">{status.message}</p>}
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-navy-800">What {agent.name} Monitors</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {agent.monitors.map((m) => (
                <div key={m} className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${theme.dot}`} />
                  <p className="text-gray-600 text-sm">{m}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-navy-800">Risk Levels</h3>
            </div>
            <div className="space-y-2">
              {agent.riskLevels.map((r) => (
                <div key={r.level} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <span className="text-lg">{r.emoji}</span>
                  <div>
                    <p className="text-navy-800 font-medium text-sm">{r.level}</p>
                    <p className="text-gray-400 text-xs">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-semibold text-sm">Ethical Boundary</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-red-500 text-sm font-medium mb-1">{agent.name} never says:</p>
                <p className="text-gray-500 text-sm italic">"{agent.neverSays}"</p>
              </div>
              <div>
                <p className="text-green-600 text-sm font-medium mb-1">{agent.name} always says:</p>
                <p className="text-gray-500 text-sm italic">"{agent.alwaysSays}"</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-navy-800 mb-4">Recommended Techniques</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {agent.techniques.map((t) => (
                <div key={t.name} className={`border rounded-2xl p-4 ${theme.card}`}>
                  <p className={`font-semibold text-sm ${theme.text} mb-1`}>{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}