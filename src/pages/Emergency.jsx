import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, MessageCircle, Users, Wind, ShieldCheck, Clock } from 'lucide-react'

export default function Emergency() {
  const navigate = useNavigate()
  const [view, setView] = useState('main')

  // ──────── BREATHING GUIDE ────────
  if (view === 'breathe') {
    return (
      <div className="min-h-screen bg-brand-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">

          <h2 className="text-2xl font-bold text-white mb-2">Box Breathing</h2>
          <p className="text-gray-400 mb-8">Follow the circle. Breathe slowly and deeply.</p>

          {/* breathing circle */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-48 h-48 rounded-full border-4 border-blue-500/50 flex items-center justify-center breathe">
              <div>
                <p className="text-blue-400 text-xl font-bold">BREATHE</p>
                <p className="text-gray-400 text-sm mt-1">Inhale... Hold... Exhale...</p>
              </div>
            </div>
          </div>

          <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-5 mb-6 text-left">
            <p className="text-white font-semibold mb-3">How to do box breathing:</p>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Inhale slowly for 4 seconds', color: 'text-blue-400' },
                { step: '2', text: 'Hold your breath for 4 seconds', color: 'text-purple-400' },
                { step: '3', text: 'Exhale slowly for 4 seconds', color: 'text-green-400' },
                { step: '4', text: 'Hold empty for 4 seconds', color: 'text-yellow-400' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center ${item.color} font-bold text-sm`}>
                    {item.step}
                  </div>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4">Repeat 4 times for best effect.</p>
          </div>

          {/* grounding */}
          <div className="bg-brand-800 border border-purple-500/20 rounded-2xl p-5 mb-6 text-left">
            <p className="text-purple-400 font-semibold mb-3">5-4-3-2-1 Grounding Exercise</p>
            <div className="space-y-2">
              {[
                '👀 Name 5 things you can SEE',
                '👂 Name 4 things you can HEAR',
                '✋ Name 3 things you can TOUCH',
                '👃 Name 2 things you can SMELL',
                '👅 Name 1 thing you can TASTE',
              ].map((item) => (
                <p key={item} className="text-gray-300 text-sm">{item}</p>
              ))}
            </div>
          </div>

          <button
            onClick={() => setView('main')}
            className="w-full bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 py-4 rounded-2xl transition font-medium"
          >
            ← Back to help options
          </button>
        </div>
      </div>
    )
  }

  // ──────── COUNSELOR CONNECT ────────
  if (view === 'counselor') {
    return (
      <div className="min-h-screen bg-brand-900 px-4 py-8">
        <div className="max-w-lg mx-auto">

          <h2 className="text-2xl font-bold text-white mb-2">Connect with Counselor</h2>
          <p className="text-gray-400 mb-6">A counselor has been notified of your request.</p>

          {/* available counselor */}
          <div className="bg-green-900/10 border border-green-500/30 rounded-3xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-semibold">1 counselor available</span>
            </div>

            <div className="bg-brand-800 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                  <span className="text-lg">👩‍⚕️</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Campus Counselor</p>
                  <p className="text-green-400 text-xs">Available now</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Start Chat Now
            </button>
          </div>

          {/* book appointment */}
          <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-400" />
              <p className="text-white font-semibold">Or book an appointment</p>
            </div>

            <div className="space-y-2">
              {['Today 3:00 PM', 'Today 5:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM'].map((time) => (
                <button
                  key={time}
                  className="w-full bg-brand-700 hover:bg-brand-600 border border-blue-900/20 rounded-2xl py-3 text-gray-300 text-sm transition hover:border-blue-500/30"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* callback */}
          <div className="bg-brand-800 border border-yellow-500/20 rounded-2xl p-4 mb-6">
            <p className="text-yellow-300 font-semibold text-sm mb-1">
              Can't find a time?
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Request a callback and a counselor will reach you within 24 hours.
            </p>
            <button className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 text-yellow-300 py-3 rounded-2xl transition text-sm font-medium">
              Request Callback
            </button>
          </div>

          {/* privacy note */}
          <div className="bg-brand-800 border border-green-700/30 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <p className="text-green-400 font-semibold text-sm">Privacy</p>
            </div>
            <p className="text-gray-400 text-sm">
              The counselor will only see your burnout score trend and agent flags. They will NOT see your private journal entries.
            </p>
          </div>

          <button
            onClick={() => setView('main')}
            className="w-full bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 py-4 rounded-2xl transition font-medium"
          >
            ← Back to help options
          </button>
        </div>
      </div>
    )
  }

  // ──────── MAIN EMERGENCY SCREEN ────────
  return (
    <div className="min-h-screen bg-brand-900 px-4 pt-20 pb-28">
      <div className="max-w-lg mx-auto">

        {/* back */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </button>

        {/* hero */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🫂</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            We're here.
          </h1>
          <p className="text-gray-400 text-lg">
            You're not alone. What do you need right now?
          </p>
        </div>

        {/* options */}
        <div className="space-y-3 mb-8">

          {/* counselor */}
          <button
            onClick={() => setView('counselor')}
            className="w-full bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 rounded-3xl p-5 text-left transition flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Talk to a Counselor</p>
              <p className="text-blue-300 text-sm">Connect with campus mental health support</p>
            </div>
          </button>

          {/* breathe */}
          <button
            onClick={() => setView('breathe')}
            className="w-full bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 rounded-3xl p-5 text-left transition flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
              <Wind className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Help me breathe</p>
              <p className="text-purple-300 text-sm">Guided breathing and grounding exercises</p>
            </div>
          </button>

          {/* trusted contact */}
          <button
            onClick={() => {
              alert('Alerting your trusted contact...\n\nMessage sent:\n"Your friend may need support right now. Please check on them."\n\nNo health details were shared.')
            }}
            className="w-full bg-green-600/10 hover:bg-green-600/20 border border-green-500/30 rounded-3xl p-5 text-left transition flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-600/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Alert my trusted contact</p>
              <p className="text-green-300 text-sm">Send a private alert to someone you trust</p>
            </div>
          </button>

          {/* helpline */}
          <a
            href="tel:01779554391"
            className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 rounded-3xl p-5 text-left transition flex items-center gap-4 block"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Call a Helpline</p>
              <p className="text-red-300 text-sm">Kaan Pete Roi — 24/7 mental health support</p>
            </div>
          </a>

        </div>

        {/* privacy */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <p className="text-green-400 font-semibold text-sm">Your Privacy</p>
          </div>
          <p className="text-gray-400 text-sm">
            All emergency actions are private and confidential. No information is shared with professors, parents, or anyone else without your explicit permission.
          </p>
        </div>

        <p className="text-gray-600 text-xs text-center">
          If you are in immediate danger, please call 999 (Bangladesh Emergency) or go to the nearest hospital.
        </p>
      </div>
    </div>
  )
}