import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckSquare,
  Lightbulb,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import BurnoutMeter from '../components/BurnoutMeter'
import AgentCard from '../components/AgentCard'
import { formatDate, getGreeting } from '../utils/burnoutCalculator'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, burnoutScore, checkIns, agentStatus } = useApp()

  const displayScore = burnoutScore || 28

  return (
    <div className="min-h-screen bg-brand-900 px-4 pt-20 pb-28">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">{formatDate()}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {getGreeting()}, {user?.name || 'Student'} 👋
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Welcome to your mental wellness dashboard. Your data is private,
            your support is personalized, and your care starts early.
          </p>
        </div>

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-3xl p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">
                MindWatch AI is now active
              </p>
              <p className="text-gray-400 text-sm mb-3">
                LUNA, FOCUS, and CALM are ready to support you through daily
                check-ins, burnout scoring, and smart guidance.
              </p>
              <button
                onClick={() => navigate('/checkin')}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Start your first daily check-in
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Burnout meter */}
        <div className="mb-6">
          <BurnoutMeter score={displayScore} showDetail />
        </div>

        {/* Note if no check-in yet */}
        {checkIns.length === 0 && (
          <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-2xl p-4 mb-6">
            <p className="text-yellow-300 font-medium text-sm mb-1">
              First check-in pending
            </p>
            <p className="text-gray-400 text-sm">
              Your current score is based on initial screening only. Daily
              check-ins will make the system more accurate.
            </p>
          </div>
        )}

        {/* Quick action cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/checkin')}
            className="text-left bg-brand-800 border border-blue-900/30 hover:border-blue-500/40 rounded-3xl p-5 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/15 flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-white font-semibold mb-1">Daily Check-In</p>
            <p className="text-gray-500 text-sm">
              60-second mood, sleep, and stress update.
            </p>
          </button>

          <button
            onClick={() => navigate('/suggestions')}
            className="text-left bg-brand-800 border border-blue-900/30 hover:border-blue-500/40 rounded-3xl p-5 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-yellow-600/15 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-white font-semibold mb-1">Smart Suggestions</p>
            <p className="text-gray-500 text-sm">
              Personalized daily guidance based on your AI agents.
            </p>
          </button>

          <button
            onClick={() => navigate('/journal')}
            className="text-left bg-brand-800 border border-blue-900/30 hover:border-blue-500/40 rounded-3xl p-5 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-600/15 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-white font-semibold mb-1">Private Journal</p>
            <p className="text-gray-500 text-sm">
              Write freely and reflect on how your days are going.
            </p>
          </button>

          <button
            onClick={() => navigate('/agents')}
            className="text-left bg-brand-800 border border-blue-900/30 hover:border-blue-500/40 rounded-3xl p-5 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/15 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-white font-semibold mb-1">My AI Agents</p>
            <p className="text-gray-500 text-sm">
              View LUNA, FOCUS, and CALM insights in detail.
            </p>
          </button>
        </div>

        {/* Agent section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Agent Status</h2>
              <p className="text-gray-500 text-sm">
                Specialized early-warning support modules
              </p>
            </div>

            <button
              onClick={() => navigate('/agents')}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            <AgentCard agentKey="luna" agentData={agentStatus?.luna} />
            <AgentCard agentKey="focus" agentData={agentStatus?.focus} />
            <AgentCard agentKey="calm" agentData={agentStatus?.calm} />
          </div>
        </div>

        {/* Emergency */}
        <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/15 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">
                Need support right now?
              </p>
              <p className="text-gray-400 text-sm mb-4">
                If you're feeling overwhelmed, panicked, or unsafe, use the
                emergency support page to connect with help immediately.
              </p>

              <button
                onClick={() => navigate('/emergency')}
                className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-3 rounded-2xl transition"
              >
                Open Emergency Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}