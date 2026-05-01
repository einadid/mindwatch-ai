import { useNavigate } from 'react-router-dom'
import { Brain, Shield, Zap, Heart, 
         ArrowRight, Star } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-900">

      {/* Navbar */}
      <nav className="flex justify-between items-center
                      px-6 py-4 border-b border-blue-900/30">
        <div className="flex items-center gap-2">
          <Brain className="w-7 h-7 text-blue-400" />
          <span className="font-bold text-lg text-white">
            MindWatch AI
          </span>
        </div>
        <button
          onClick={() => navigate('/counselor')}
          className="text-gray-400 hover:text-white
                     text-sm transition">
          Counselor Login →
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center
                      text-center px-6 pt-16 pb-12">

        {/* Glowing brain icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full
                          bg-blue-600/20 border border-blue-500/30
                          flex items-center justify-center
                          glow-blue">
            <Brain className="w-12 h-12 text-blue-400" />
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full
                          border border-blue-500/20
                          animate-ping"/>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 mb-6
                        bg-blue-900/30 border border-blue-700/50
                        rounded-full px-4 py-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-blue-300">
            DNA Hack for Health 2026 — Chittagong
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold
                       text-white mb-4 max-w-lg leading-tight">
          We don't wait for
          <span className="text-blue-400"> students</span>
          <br />to break.
        </h1>
        <p className="text-xl text-gray-400 mb-3 max-w-md">
          We watch before they fall.
        </p>
        <p className="text-gray-500 text-sm mb-10 max-w-sm">
          AI-powered early detection for student stress,
          burnout, and mental health patterns.
          Built for Bangladeshi campuses.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full bg-blue-600 hover:bg-blue-500
                       text-white font-semibold py-4 px-8
                       rounded-2xl transition-all
                       flex items-center justify-center gap-2
                       glow-blue">
            Get Started — It's Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/counselor')}
            className="w-full bg-brand-700 hover:bg-brand-600
                       text-gray-300 font-medium py-3 px-8
                       rounded-2xl border border-blue-900/50
                       transition-all">
            I'm a Counselor / Admin
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-6 mb-12">
        {[
          { number: '1 in 3', label: 'Students face chronic stress' },
          { number: '3', label: 'AI agents monitoring you' },
          { number: '60s', label: 'Daily check-in time' },
        ].map((stat) => (
          <div key={stat.label}
               className="bg-brand-800 rounded-2xl p-4
                          border border-blue-900/30 text-center">
            <p className="text-blue-400 font-bold text-xl">
              {stat.number}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* 3 Agents */}
      <div className="px-6 mb-12">
        <h2 className="text-xl font-bold text-white mb-2">
          Meet Your AI Agents
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          Three specialized agents watch for early warning signs
        </p>

        <div className="space-y-3">
          {[
            {
              icon: '🌙',
              name: 'LUNA',
              role: 'Mood & Depression Risk Monitor',
              desc: 'Tracks emotional patterns over 14 days. Detects low mood streaks before they become crises.',
              color: 'border-purple-500/30 bg-purple-900/10',
              badge: 'MDD Patterns',
              badgeColor: 'bg-purple-900/50 text-purple-300'
            },
            {
              icon: '⚡',
              name: 'FOCUS',
              role: 'Attention & ADHD Pattern Tracker',
              desc: 'Monitors task completion, study consistency, and focus difficulty across your week.',
              color: 'border-yellow-500/30 bg-yellow-900/10',
              badge: 'ADHD Patterns',
              badgeColor: 'bg-yellow-900/50 text-yellow-300'
            },
            {
              icon: '🔵',
              name: 'CALM',
              role: 'Anxiety & OCD Loop Detector',
              desc: 'Identifies repetitive worry patterns, anxiety spikes, and stress loops.',
              color: 'border-blue-500/30 bg-blue-900/10',
              badge: 'OCD Patterns',
              badgeColor: 'bg-blue-900/50 text-blue-300'
            }
          ].map((agent) => (
            <div key={agent.name}
                 className={`rounded-2xl p-5 border
                            ${agent.color}`}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{agent.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">
                      {agent.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5
                                     rounded-full ${agent.badgeColor}`}>
                      {agent.badge}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    {agent.role}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {agent.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 mb-12">
        <h2 className="text-xl font-bold text-white mb-2">
          How It Works
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          Simple. Private. Effective.
        </p>

        <div className="space-y-3">
          {[
            {
              step: '01',
              icon: <Shield className="w-5 h-5 text-blue-400"/>,
              title: 'Private Setup',
              desc: 'Consent-based onboarding. Your data stays yours.'
            },
            {
              step: '02',
              icon: <Heart className="w-5 h-5 text-red-400"/>,
              title: 'Daily 60-sec Check-In',
              desc: 'Quick mood and wellness snapshot every day.'
            },
            {
              step: '03',
              icon: <Brain className="w-5 h-5 text-purple-400"/>,
              title: 'AI Agents Analyze',
              desc: 'LUNA, FOCUS, and CALM detect early patterns.'
            },
            {
              step: '04',
              icon: <Zap className="w-5 h-5 text-yellow-400"/>,
              title: 'Get Smart Support',
              desc: 'Personalized suggestions + counselor connection.'
            },
          ].map((item) => (
            <div key={item.step}
                 className="flex items-start gap-4
                            bg-brand-800 rounded-2xl p-4
                            border border-blue-900/30">
              <div className="flex-shrink-0 w-8 h-8
                              bg-blue-900/50 rounded-lg
                              flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400 text-xs font-mono">
                    {item.step}
                  </span>
                  <span className="font-semibold text-white text-sm">
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ethics box */}
      <div className="px-6 mb-12">
        <div className="bg-brand-800 rounded-2xl p-5
                        border border-green-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="font-bold text-green-400">
              Our Ethical Promise
            </span>
          </div>
          <div className="space-y-2">
            {[
              'We screen. Doctors diagnose.',
              'Your data is always encrypted.',
              'No sharing without your consent.',
              'You can delete everything, anytime.',
            ].map((promise) => (
              <div key={promise}
                   className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400
                               rounded-full flex-shrink-0"/>
                <span className="text-gray-400 text-sm">
                  {promise}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-12 text-center">
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-blue-600 hover:bg-blue-500
                     text-white font-semibold py-4
                     rounded-2xl transition-all glow-blue
                     flex items-center justify-center gap-2">
          Start Your Wellness Journey
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-gray-600 text-xs mt-4">
          Free for students • No credit card required •
          Delete anytime
        </p>
      </div>

    </div>
  )
}