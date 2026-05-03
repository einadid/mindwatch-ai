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
  const recent = checkIns.slice(-7)
  const last = checkIns[checkIns.length - 1]

  const factors = last ? [
    { label: 'Mood', value: Math.round(((5 - (last.mood || 3)) / 4) * 25), max: 25, color: 'bg-purple-500' },
    { label: 'Sleep', value: parseFloat(last.sleep) < 4 ? 20 : parseFloat(last.sleep) < 6 ? 14 : parseFloat(last.sleep) < 7 ? 7 : 0, max: 20, color: 'bg-blue-500' },
    { label: 'Tasks', value: last.tasks === 'no' ? 20 : last.tasks === 'partial' ? 10 : 0, max: 20, color: 'bg-yellow-500' },
    { label: 'Overwhelm', value: last.overwhelm === 'yes' ? 20 : last.overwhelm === 'somewhat' ? 10 : 0, max: 20, color: 'bg-orange-500' },
    { label: 'Low Mood Streak', value: Math.min(Math.round((checkIns.filter((c) => c.mood <= 2).length / 14) * 15), 15), max: 15, color: 'bg-red-500' },
  ] : []

  const moodMap = { 1: '😭', 2: '😔', 3: '😐', 4: '🙂', 5: '😊' }

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Dashboard</span>
          </button>
          <p className="text-sm text-blue-600 font-semibold">Score Details</p>
        </div>

        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
            <TrendingUp className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Burnout Score Details</h1>
          <p className="text-gray-500">Calculated from mood, sleep, tasks, overwhelm, and agent signals.</p>
        </div>

        <div className="mb-6"><BurnoutMeter score={score} showDetail /></div>

        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-navy-800 mb-4">Score Scale</h2>
          <div className="space-y-2">
            {[
              { range: '0–20', level: 'THRIVING', emoji: '🟢', color: 'text-green-600' },
              { range: '21–40', level: 'STABLE', emoji: '🔵', color: 'text-blue-600' },
              { range: '41–60', level: 'STRESSED', emoji: '🟡', color: 'text-yellow-600' },
              { range: '61–80', level: 'HIGH RISK', emoji: '🟠', color: 'text-orange-600' },
              { range: '81–100', level: 'CRITICAL', emoji: '🔴', color: 'text-red-600' },
            ].map((i) => (
              <div key={i.level} className={`flex items-center gap-4 rounded-2xl p-3 border ${info.level === i.level ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'}`}>
                <span>{i.emoji}</span>
                <div className="flex-1">
                  <span className={`font-semibold text-sm ${i.color}`}>{i.level}</span>
                  <span className="text-gray-400 text-xs ml-2">{i.range}</span>
                </div>
                {info.level === i.level && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">You are here</span>}
              </div>
            ))}
          </div>
        </div>

        {factors.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy-800 mb-4">What's Contributing</h2>
            <div className="space-y-4">
              {factors.map((f) => (
                <div key={f.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 text-sm">{f.label}</span>
                    <span className="text-gray-400 text-xs">+{f.value} / {f.max}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${f.color} transition-all duration-700`} style={{ width: `${(f.value / f.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recent.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy-800 mb-4">Recent Check-Ins</h2>
            <div className="grid grid-cols-7 gap-2">
              {recent.map((c, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                  <p className="text-2xl mb-1">{moodMap[c.mood] || '😐'}</p>
                  <p className="text-gray-400 text-xs">{new Date(c.timestamp).toLocaleDateString('en-BD', { weekday: 'short' })}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-navy-800">How It's Calculated</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <pre className="text-gray-500 text-xs leading-relaxed whitespace-pre-wrap font-mono">
{`Burnout Score = 
  (Mood Factor     × 25%) +
  (Sleep Factor    × 20%) +
  (Task Factor     × 20%) +
  (Overwhelm       × 20%) +
  (Low Mood Streak × 15%)

Score Range: 0 to 100`}</pre>
          </div>
          <p className="text-gray-400 text-xs mt-3">Wellness indicator, not clinical diagnosis.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <button onClick={() => navigate('/checkin')} className="flex-1 gradient-navy text-white font-semibold py-4 rounded-2xl transition hover:shadow-lg">New Check-In</button>
          <button onClick={() => navigate('/suggestions')} className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-semibold py-4 rounded-2xl transition">View Suggestions</button>
        </div>
      </div>
    </div>
  )
}