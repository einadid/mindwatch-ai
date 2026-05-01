import { useNavigate, useLocation } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useApp()

  const hideOn = ['/', '/counselor']
  if (hideOn.includes(location.pathname)) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 hover:opacity-80 transition">
          <Brain className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-navy-800 text-sm">
            MindWatch <span className="text-blue-600">AI</span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-500 text-xs">{user?.name || 'Student'}</span>
        </div>
      </div>
    </nav>
  )
}