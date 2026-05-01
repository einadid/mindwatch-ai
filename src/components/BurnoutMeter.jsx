import { useNavigate } from 'react-router-dom'
import { getBurnoutLevel } from '../utils/burnoutCalculator'

export default function BurnoutMeter({ score, showDetail }) {
  const navigate = useNavigate()
  const info = getBurnoutLevel(score)

  const colorStyles = {
    green: { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-600' },
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600' },
    yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600' },
    orange: { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-600' },
    red: { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-600' },
  }

  const style = colorStyles[info.color] || colorStyles.blue

  return (
    <button onClick={() => navigate('/burnout')}
      className={`w-full text-left bg-white ${style.border} border rounded-3xl p-6 shadow-sm transition hover:shadow-md`}>
      <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Your Burnout Score</p>
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-5xl font-bold ${style.text}`}>{score}</span>
        <span className="text-gray-300 text-lg mb-1">/ 100</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 mb-3 overflow-hidden">
        <div className="h-3 rounded-full transition-all duration-1000"
          style={{ width: `${score}%`, backgroundColor: info.barColor }} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{info.emoji}</span>
        <span className={`font-bold text-sm ${style.text}`}>{info.level}</span>
      </div>
      <p className="text-gray-400 text-sm">{info.message}</p>
      {showDetail && <p className={`text-xs mt-2 ${style.text}`}>{info.advice}</p>}
      <p className="text-blue-500 text-xs mt-3">Tap for full score details →</p>
    </button>
  )
}