import { useNavigate, useLocation } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useApp()

  // Don't show on landing/onboarding
  const hideOn = ['/', '/onboarding', '/assessment']
  if (hideOn.includes(location.pathname)) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50
                    bg-brand-900/95 backdrop-blur-md
                    border-b border-blue-900/30
                    px-4 py-3">
      <div className="max-w-md mx-auto flex items-center 
                      justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 
                     hover:opacity-80 transition">
          <Brain className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-white text-sm">
            MindWatch AI
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 
                          rounded-full animate-pulse"/>
          <span className="text-gray-400 text-xs">
            {user?.name || 'Student'}
          </span>
        </div>
      </div>
    </nav>
  )
}