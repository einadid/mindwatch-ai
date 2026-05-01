import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

const agentData = {
  luna: {
    icon: '🌙',
    name: 'LUNA',
    fullName: 'Low-mood & Emotional Pattern Agent',
    color: 'purple',
    target: 'MDD (Major Depressive Disorder) patterns',
    description: 'LUNA continuously monitors your mood patterns, sleep quality, social engagement, and energy levels over a 14-day window to detect early signs of persistent low mood.',
    monitors: [
      'Daily mood score trends (14-day window)',
      'Sleep duration and quality patterns',
      'Social withdrawal indicators',
      'Energy and motivation levels',
      'Negative sentiment in journal entries',
      'Academic disengagement signals',
    ],
    riskLevels: [
      { level: 'Green', emoji: '🟢', desc: 'Mood stable, no concerns detected' },
      { level: 'Yellow', emoji: '🟡', desc: '3+ low mood days in 14-day period' },
      { level: 'Orange', emoji: '🟠', desc: '5+ low mood days with sleep disruption' },
      { level: 'Red', emoji: '🔴', desc: '9+ low mood days with social withdrawal' },
    ],
    neverSays: 'You have depression',
    alwaysSays: "You've been feeling low for several days. This matters. Let's get you some support.",
    techniques: [
      { name: '3 Good Things', desc: 'Write 3 positive moments from today before bed' },
      { name: 'Morning Sunlight', desc: '10 minutes of natural light after waking up' },
      { name: 'Social Reconnection', desc: 'Text or call one friend today' },
      { name: 'Movement Boost', desc: 'Even a 5-minute walk can shift your mood' },
    ],
  },
  focus: {
    icon: '⚡',
    name: 'FOCUS',
    fullName: 'Attention & Study Pattern Agent',
    color: 'yellow',
    target: 'ADHD (Attention Deficit Hyperactivity Disorder) patterns',
    description: 'FOCUS tracks your task completion rates, study session consistency, deadline adherence, and focus difficulty self-reports to identify attention-related challenges early.',
    monitors: [
      'Weekly task completion rates',
      'Study session average duration',
      'Deadline adherence history',
      'Late-night activity frequency',
      'Self-reported focus difficulty',
      'Study pattern consistency',
    ],
    riskLevels: [
      { level: 'Green', emoji: '🟢', desc: 'Focus patterns within normal range' },
      { level: 'Yellow', emoji: '🟡', desc: 'Completion rate below 60%, 3+ missed deadlines' },
      { level: 'Orange', emoji: '🟠', desc: 'Completion below 40%, attention difficulty reported' },
      { level: 'Red', emoji: '🔴', desc: 'Persistent pattern for 3+ weeks with academic impact' },
    ],
    neverSays: 'You have ADHD',
    alwaysSays: 'Your focus patterns suggest structured support could help you significantly.',
    techniques: [
      { name: 'Pomodoro Timer', desc: '25 minutes focused work, 5 minutes break' },
      { name: 'Smallest Task First', desc: 'Start with what takes less than 2 minutes' },
      { name: 'Phone Face Down', desc: 'Remove visual distraction during study blocks' },
      { name: 'Study Buddy', desc: 'Work alongside someone for accountability' },
    ],
  },
  calm: {
    icon: '🔵',
    name: 'CALM',
    fullName: 'Anxiety & Repetitive Pattern Agent',
    color: 'blue',
    target: 'OCD (Obsessive Compulsive Disorder) patterns',
    description: 'CALM identifies repetitive worry patterns, anxiety spikes, checking behaviors, and stress loops — especially common during exam periods and high-pressure academic phases.',
    monitors: [
      'Repetitive behavior self-reports',
      'Checking behavior frequency',
      'Anxiety spike timing patterns',
      'Pre-exam ritual patterns',
      'Intrusive thought frequency',
      'Late-night anxiety spikes (11pm–1am)',
    ],
    riskLevels: [
      { level: 'Green', emoji: '🟢', desc: 'Anxiety within normal range' },
      { level: 'Yellow', emoji: '🟡', desc: 'Anxiety spikes 2-3x per week' },
      { level: 'Orange', emoji: '🟠', desc: 'Repetitive patterns detected with sleep disruption' },
      { level: 'Red', emoji: '🔴', desc: 'Checking + anxiety spikes + sleep disruption combined' },
    ],
    neverSays: 'You have OCD',
    alwaysSays: 'These worry patterns are intense right now. A professional conversation could bring real relief.',
    techniques: [
      { name: 'Box Breathing', desc: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s' },
      { name: '5-4-3-2-1 Grounding', desc: 'Name 5 things you see, 4 hear, 3 touch, 2 smell, 1 taste' },
      { name: 'Worry Time Limit', desc: 'Allow 15 minutes to worry, then consciously stop' },
      { name: 'Journal the Loop', desc: 'Write the worry, then write one thing you CAN control' },
    ],
  },
}

const colorMap = {
  purple: {
    border: 'border-purple-500/30',
    bg: 'bg-purple-900/10',
    text: 'text-purple-400',
    badge: 'bg-purple-900/40 text-purple-300',
    card: 'border-purple-500/20 bg-purple-900/5',
  },
  yellow: {
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-900/10',
    text: 'text-yellow-400',
    badge: 'bg-yellow-900/40 text-yellow-300',
    card: 'border-yellow-500/20 bg-yellow-900/5',
  },
  blue: {
    border: 'border-blue-500/30',
    bg: 'bg-blue-900/10',
    text: 'text-blue-400',
    badge: 'bg-blue-900/40 text-blue-300',
    card: 'border-blue-500/20 bg-blue-900/5',
  },
}

export default function Agents() {
  const navigate = useNavigate()
  const location = useLocation()
  const { agentStatus } = useApp()

  const initialAgent = location.state?.agent || 'luna'
  const [selected, setSelected] = useState(initialAgent)

  const agent = agentData[selected]
  const theme = colorMap[agent.color]
  const status = agentStatus?.[selected]

  const riskColor = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-orange-400',
    critical: 'bg-red-400 animate-pulse',
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

          <p className="text-sm text-blue-400 font-medium">AI Agents</p>
        </div>

        {/* header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Your AI Agents
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Three specialized agents continuously analyze your patterns. They screen for early warning signs — they never diagnose.
          </p>
        </div>

        {/* agent tabs */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.keys(agentData).map((key) => {
            const a = agentData[key]
            const active = selected === key
            const t = colorMap[a.color]

            return (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`rounded-2xl p-4 text-center border transition ${
                  active
                    ? `${t.border} ${t.bg}`
                    : 'bg-brand-800 border-blue-900/20 hover:border-blue-500/30'
                }`}
              >
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className={`font-bold text-sm ${active ? t.text : 'text-white'}`}>
                  {a.name}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${riskColor[agentStatus?.[key]?.risk || 'low']}`} />
                  <p className="text-xs text-gray-500">
                    {agentStatus?.[key]?.status || 'Active'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* agent detail */}
        <div className={`rounded-3xl p-6 md:p-8 border ${theme.border} ${theme.bg} mb-6`}>

          {/* agent header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{agent.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
                <span className={`text-xs px-3 py-1 rounded-full ${theme.badge}`}>
                  {agent.target}
                </span>
              </div>
              <p className={`text-sm ${theme.text} mb-2`}>{agent.fullName}</p>
              <p className="text-gray-400 text-sm">{agent.description}</p>
            </div>
          </div>

          {/* current status */}
          {status && (
            <div className="bg-brand-800 border border-blue-900/20 rounded-2xl p-5 mb-6">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                Current Status
              </p>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${riskColor[status.risk || 'low']}`} />
                <span className="text-white font-bold text-lg">{status.status}</span>
              </div>
              {status.message && (
                <p className="text-gray-400 text-sm">{status.message}</p>
              )}
            </div>
          )}

          {/* what it monitors */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-white">What {agent.name} Monitors</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {agent.monitors.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-brand-800 border border-blue-900/15 rounded-xl p-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${theme.text === 'text-purple-400' ? 'bg-purple-400' : theme.text === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* risk levels */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-white">Risk Levels</h3>
            </div>
            <div className="space-y-2">
              {agent.riskLevels.map((item) => (
                <div key={item.level} className="flex items-center gap-3 bg-brand-800 border border-blue-900/15 rounded-xl p-3">
                  <span className="text-lg">{item.emoji}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{item.level}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ethics */}
          <div className="bg-brand-800 border border-green-700/30 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <p className="text-green-400 font-semibold text-sm">Ethical Boundary</p>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-red-400 text-sm font-medium mb-1">
                  {agent.name} never says:
                </p>
                <p className="text-gray-400 text-sm italic">"{agent.neverSays}"</p>
              </div>
              <div>
                <p className="text-green-400 text-sm font-medium mb-1">
                  {agent.name} always says:
                </p>
                <p className="text-gray-400 text-sm italic">"{agent.alwaysSays}"</p>
              </div>
            </div>
          </div>

          {/* techniques */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {agent.name}'s Recommended Techniques
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {agent.techniques.map((item) => (
                <div key={item.name} className={`border rounded-2xl p-4 ${theme.card}`}>
                  <p className={`font-semibold text-sm ${theme.text} mb-1`}>{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}