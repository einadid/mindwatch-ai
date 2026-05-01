import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Brain, CheckSquare, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BurnoutMeter from '../components/BurnoutMeter'
import AgentCard from '../components/AgentCard'
import { formatDate, getGreeting } from '../utils/burnoutCalculator'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, burnoutScore, checkIns, agentStatus } = useApp()

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-1">{formatDate()}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-2">
            {getGreeting()}, {user?.name || 'Student'} 👋
          </h1>
          <p className="text-gray-500">Your mental wellness dashboard. Private, personalized, early support.</p>
        </div>

        {/* Welcome banner */}
        <div className="bg-white border border-blue-100 rounded-3xl p-5 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-navy-800 font-semibold mb-1">MindWatch AI is active</p>
              <p className="text-gray-400 text-sm mb-3">LUNA, FOCUS, and CALM are monitoring your wellness patterns.</p>
              <button onClick={() => navigate('/checkin')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition">
                Start daily check-in <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Burnout Score */}
        <div className="mb-6">
          <BurnoutMeter score={burnoutScore || 28} showDetail />
        </div>

        {checkIns.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 mb-6">
            <p className="text-yellow-700 font-medium text-sm mb-1">First check-in pending</p>
            <p className="text-gray-400 text-sm">Your score is based on initial screening. Daily check-ins improve accuracy.</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { path: '/checkin', icon: <CheckSquare className="w-6 h-6 text-blue-600" />, title: 'Daily Check-In', desc: '60-second wellness update', bg: 'bg-blue-50', border: 'border-blue-100' },
            { path: '/suggestions', icon: <Lightbulb className="w-6 h-6 text-yellow-600" />, title: 'Smart Suggestions', desc: 'Personalized daily guidance', bg: 'bg-yellow-50', border: 'border-yellow-100' },
            { path: '/journal', icon: <BookOpen className="w-6 h-6 text-green-600" />, title: 'Private Journal', desc: 'Write freely and reflect', bg: 'bg-green-50', border: 'border-green-100' },
            { path: '/agents', icon: <Sparkles className="w-6 h-6 text-purple-600" />, title: 'My AI Agents', desc: 'LUNA, FOCUS, CALM details', bg: 'bg-purple-50', border: 'border-purple-100' },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`text-left bg-white border ${item.border} hover:shadow-md rounded-3xl p-5 transition card-hover`}>
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4`}>
                {item.icon}
              </div>
              <p className="text-navy-800 font-semibold mb-1">{item.title}</p>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Agents */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-navy-800">Agent Status</h2>
              <p className="text-gray-400 text-sm">Your specialized AI support modules</p>
            </div>
            <button onClick={() => navigate('/agents')} className="text-sm text-blue-600 hover:text-blue-800 font-medium">View all</button>
          </div>
          <div className="space-y-3">
            <AgentCard agentKey="luna" agentData={agentStatus?.luna} />
            <AgentCard agentKey="focus" agentData={agentStatus?.focus} />
            <AgentCard agentKey="calm" agentData={agentStatus?.calm} />
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-navy-800 font-semibold mb-1">Need support right now?</p>
              <p className="text-gray-400 text-sm mb-4">Connect with help immediately through our emergency support page.</p>
              <button onClick={() => navigate('/emergency')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-2xl transition">
                Open Emergency Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}