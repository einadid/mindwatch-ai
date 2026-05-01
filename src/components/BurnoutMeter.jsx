import { useNavigate } from 'react-router-dom'
import { getBurnoutLevel } from '../utils/burnoutCalculator'

export default function BurnoutMeter({ score, showDetail }) {
  const navigate = useNavigate()
  const info = getBurnoutLevel(score)

  return (
    <button
      onClick={() => navigate('/burnout')}
      className={`w-full text-left rounded-3xl p-5 border
                 ${info.borderColor} ${info.bgColor}
                 transition hover:brightness-110`}
    >
      <p className="text-gray-400 text-xs uppercase
                    tracking-wider mb-3">
        Your Burnout Score
      </p>

      <div className="flex items-end gap-2 mb-3">
        <span className={`text-5xl font-bold ${info.textColor}`}>
          {score}
        </span>
        <span className="text-gray-500 text-lg mb-1">/ 100</span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-3 mb-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-1000"
          style={{
            width: `${score}%`,
            backgroundColor: info.barColor,
            boxShadow: `0 0 10px ${info.barColor}60`,
          }}
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{info.emoji}</span>
        <span className={`font-bold text-sm ${info.textColor}`}>
          {info.level}
        </span>
      </div>

      <p className="text-gray-400 text-sm">{info.message}</p>

      {showDetail && (
        <p className={`text-xs mt-2 ${info.textColor}`}>{info.advice}</p>
      )}

      <p className="text-blue-400 text-xs mt-3">
        Tap for full score details →
      </p>
    </button>
  )
}