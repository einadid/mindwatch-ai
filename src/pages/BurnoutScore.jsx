import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import BurnoutMeter from '../components/BurnoutMeter'
import { getBurnoutLevel } from '../utils/burnoutCalculator'

export default function BurnoutScore() {
  const navigate = useNavigate()
  const { burnoutScore, checkIns } = useApp()

  const score = burnoutScore || 28
  const info = getBurnoutLevel(score)

  // last 7 check-ins for mini history
  const recentCheckins = checkIns.slice(-7)

  // calculate factor breakdown
  const lastCheckin = checkIns[checkIns.length - 1]

  const factors = lastCheckin
    ? [
        {
          label: 'Mood',
          value: Math.round(((5 - (lastCheckin.mood || 3)) / 4) * 25),
          max: 25,
          color: 'bg-purple-500',
        },
        {
          label: 'Sleep',
          value:
            parseFloat(lastCheckin.sleep) < 4
              ? 20
              : parseFloat(lastCheckin.sleep) < 6
              ? 14
              : parseFloat(lastCheckin.sleep) < 7
              ? 7
              : 0,
          max: 20,
          color: 'bg-blue-500',
        },
        {
          label: 'Tasks',
          value:
            lastCheckin.tasks === 'no'
              ? 20
              : lastCheckin.tasks === 'partial'
              ? 10
              : 0,
          max: 20,
          color: 'bg-yellow-500',
        },
        {
          label: 'Overwhelm',
          value:
            lastCheckin.overwhelm === 'yes'
              ? 20
              : lastCheckin.overwhelm === 'somewhat'
              ? 10
              : 0,
          max: 20,
          color: 'bg-orange-500',
        },
        {
          label: 'Low Mood Streak',
          value: Math.min(
            Math.round(
              (checkIns.filter((c) => c.mood <= 2).length / 14) * 15
            ),
            15
          ),
          max: 15,
          color: 'bg-red-500',
        },
      ]
    : []

  const moodMap = {
    1: '😭',
    2: '😔',
    3: '😐',
    4: '🙂',
    5: '😊',
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
          <p className="text-sm text-blue-400 font-medium">Score Details</p>
        </div>

        {/* header */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <TrendingUp className="w-7 h-7 text-blue-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Burnout Score Details
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Your burnout score is calculated from daily check-in data including
            mood, sleep, task completion, overwhelm level, and agent risk signals.
          </p>
        </div>

        {/* main score */}
        <div className="mb-6">
          <BurnoutMeter score={score} showDetail />
        </div>

        {/* score scale */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Score Scale</h2>
          <div className="space-y-3">
            {[
              { range: '0 – 20', level: 'THRIVING', emoji: '🟢', color: 'text-green-400' },
              { range: '21 – 40', level: 'STABLE', emoji: '🔵', color: 'text-blue-400' },
              { range: '41 – 60', level: 'STRESSED', emoji: '🟡', color: 'text-yellow-400' },
              { range: '61 – 80', level: 'HIGH RISK', emoji: '🟠', color: 'text-orange-400' },
              { range: '81 – 100', level: 'CRITICAL', emoji: '🔴', color: 'text-red-400' },
            ].map((item) => {
              const isActive = info.level === item.level
              return (
                <div
                  key={item.level}
                  className={`flex items-center gap-4 rounded-2xl p-3 border ${
                    isActive
                      ? 'bg-blue-600/10 border-blue-500/30'
                      : 'bg-brand-700 border-blue-900/15'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <div className="flex-1">
                    <span className={`font-semibold text-sm ${item.color}`}>
                      {item.level}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">{item.range}</span>
                  </div>
                  {isActive && (
                    <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-1 rounded-full">
                      You are here
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* factor breakdown */}
        {factors.length > 0 && (
          <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">
              What's Contributing
            </h2>
            <div className="space-y-4">
              {factors.map((factor) => (
                <div key={factor.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">{factor.label}</span>
                    <span className="text-gray-400 text-xs">
                      +{factor.value} pts / {factor.max}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-brand-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${factor.color} transition-all duration-700`}
                      style={{ width: `${(factor.value / factor.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* recent check-in history */}
        {recentCheckins.length > 0 && (
          <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Recent Check-Ins
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {recentCheckins.map((c, i) => (
                <div
                  key={i}
                  className="bg-brand-700 border border-blue-900/15 rounded-xl p-3 text-center"
                >
                  <p className="text-2xl mb-1">{moodMap[c.mood] || '😐'}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(c.timestamp).toLocaleDateString('en-BD', {
                      weekday: 'short',
                    })}
                  </p>
                </div>
              ))}
            </div>

            {recentCheckins.length < 7 && (
              <p className="text-gray-600 text-xs mt-3 text-center">
                {7 - recentCheckins.length} more check-ins needed for a full week view
              </p>
            )}
          </div>
        )}

        {/* algorithm info */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">How It's Calculated</h2>
          </div>
          <div className="bg-brand-700 rounded-2xl p-4">
            <pre className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap font-mono">
{`Burnout Score = 
  (Mood Factor     × 25%) +
  (Sleep Factor    × 20%) +
  (Task Factor     × 20%) +
  (Overwhelm       × 20%) +
  (Low Mood Streak × 15%)

Score Range: 0 to 100
Updated: After every check-in`}
            </pre>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            This score is a wellness indicator, not a clinical diagnosis. It helps track trends over time.
          </p>
        </div>

        {/* actions */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => navigate('/checkin')}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl transition"
          >
            New Check-In
          </button>
          <button
            onClick={() => navigate('/suggestions')}
            className="flex-1 bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 font-semibold py-4 rounded-2xl transition"
          >
            View Smart Suggestions
          </button>
        </div>
      </div>
    </div>
  )
}