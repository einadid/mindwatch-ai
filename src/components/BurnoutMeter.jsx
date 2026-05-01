import { getBurnoutLevel } from '../utils/burnoutCalculator'

export default function BurnoutMeter({ score, showDetail }) {
  const info = getBurnoutLevel(score)

  return (
    <div className={`rounded-2xl p-5 border 
                    ${info.borderColor} ${info.bgColor}
                    animate-fade-in`}>
      
      <p className="text-gray-400 text-xs uppercase 
                    tracking-wider mb-3">
        Your Burnout Score
      </p>

      {/* Score number */}
      <div className="flex items-end gap-2 mb-3">
        <span className={`text-5xl font-bold 
                         ${info.textColor}`}>
          {score}
        </span>
        <span className="text-gray-500 text-lg mb-1">
          / 100
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full 
                      h-3 mb-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all 
                     duration-1000"
          style={{
            width: `${score}%`,
            backgroundColor: info.barColor,
            boxShadow: `0 0 10px ${info.barColor}60`
          }}
        />
      </div>

      {/* Level badge */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{info.emoji}</span>
        <span className={`font-bold text-sm 
                         ${info.textColor}`}>
          {info.level}
        </span>
      </div>

      <p className="text-gray-400 text-sm">
        {info.message}
      </p>

      {showDetail && (
        <p className={`text-xs mt-2 ${info.textColor}`}>
          {info.advice}
        </p>
      )}
    </div>
  )
}