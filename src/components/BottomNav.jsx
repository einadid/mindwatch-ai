import { useNavigate, useLocation } from 'react-router-dom'
import { Home, CheckSquare, BookOpen, 
         Lightbulb, AlertCircle } from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/checkin', icon: CheckSquare, label: 'Check In' },
  { path: '/suggestions', icon: Lightbulb, label: 'Plan' },
  { path: '/journal', icon: BookOpen, label: 'Journal' },
  { path: '/emergency', icon: AlertCircle, label: 'Help' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const hideOn = ['/', '/onboarding', '/assessment']
  if (hideOn.includes(location.pathname)) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50
                    bg-brand-900/95 backdrop-blur-md
                    border-t border-blue-900/30">
      <div className="max-w-md mx-auto flex">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          const isEmergency = path === '/emergency'

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center 
                         py-3 gap-1 transition-all
                         ${isEmergency 
                           ? 'text-red-400' 
                           : isActive 
                             ? 'text-blue-400' 
                             : 'text-gray-500 hover:text-gray-300'
                         }`}>
              <Icon className={`w-5 h-5 
                ${isEmergency && 'animate-pulse'}`} />
              <span className="text-xs">{label}</span>
              {isActive && !isEmergency && (
                <div className="w-1 h-1 bg-blue-400 
                               rounded-full"/>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}