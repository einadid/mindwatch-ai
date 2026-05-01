import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const agentConfig = {
  luna: { icon: '🌙', name: 'LUNA', role: 'Mood & Depression Risk', border: 'border-purple-100', bg: 'bg-purple-50', text: 'text-purple-600' },
  focus: { icon: '⚡', name: 'FOCUS', role: 'Attention & ADHD Patterns', border: 'border-yellow-100', bg: 'bg-yellow-50', text: 'text-yellow-600' },
  calm: { icon: '🔵', name: 'CALM', role: 'Anxiety & OCD Loops', border: 'border-blue-100', bg: 'bg-blue-50', text: 'text-blue-600' },
}

const riskDot = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-orange-400',
  critical: 'bg-red-400 animate-pulse',
}

export default function AgentCard({ agentKey, agentData }) {
  const navigate = useNavigate()
  const config = agentConfig[agentKey]

  return (
    <button onClick={() => navigate('/agents', { state: { agent: agentKey } })}
      className={`w-full text-left bg-white border ${config.border} rounded-2xl p-4 transition hover:shadow-md card-hover`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-sm ${config.text}`}>{config.name}</span>
              <div className={`w-2 h-2 rounded-full ${riskDot[agentData?.risk || 'low']}`} />
            </div>
            <p className="text-gray-400 text-xs">{config.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{agentData?.status || 'Active'}</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
      </div>
      {agentData?.message && (
        <p className="text-xs text-gray-400 mt-2 border-t border-gray-100 pt-2">{agentData.message}</p>
      )}
    </button>
  )
}