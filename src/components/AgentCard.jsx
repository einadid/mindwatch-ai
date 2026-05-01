import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const agentConfig = {
  luna: {
    icon: '🌙',
    name: 'LUNA',
    role: 'Mood & Depression Risk',
    color: 'purple',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-900/10',
    textColor: 'text-purple-400',
    dotColor: 'bg-purple-400',
  },
  focus: {
    icon: '⚡',
    name: 'FOCUS',
    role: 'Attention & ADHD Patterns',
    color: 'yellow',
    borderColor: 'border-yellow-500/30',
    bgColor: 'bg-yellow-900/10',
    textColor: 'text-yellow-400',
    dotColor: 'bg-yellow-400',
  },
  calm: {
    icon: '🔵',
    name: 'CALM',
    role: 'Anxiety & OCD Loops',
    color: 'blue',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-900/10',
    textColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
  }
}

const riskDot = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-orange-400',
  critical: 'bg-red-400 animate-pulse'
}

export default function AgentCard({ agentKey, agentData }) {
  const navigate = useNavigate()
  const config = agentConfig[agentKey]

  return (
    <button
      onClick={() => navigate('/agents', 
                    { state: { agent: agentKey } })}
      className={`w-full text-left rounded-xl p-4 border
                 ${config.borderColor} ${config.bgColor}
                 card-hover`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-sm 
                               ${config.textColor}`}>
                {config.name}
              </span>
              <div className={`w-2 h-2 rounded-full 
                              ${riskDot[agentData?.risk] 
                                || 'bg-green-400'}`}/>
            </div>
            <p className="text-gray-500 text-xs">
              {config.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">
            {agentData?.status || 'Active'}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-600"/>
        </div>
      </div>

      {agentData?.message && (
        <p className="text-xs text-gray-500 mt-2 
                      border-t border-gray-700/50 pt-2">
          {agentData.message}
        </p>
      )}
    </button>
  )
}