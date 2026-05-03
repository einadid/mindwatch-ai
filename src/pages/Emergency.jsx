import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, MessageCircle, Users, Wind, ShieldCheck, Clock } from 'lucide-react'
import { MeditatingPerson } from '../components/Vectors'

export default function Emergency() {
  const navigate = useNavigate()
  const [view, setView] = useState('main')

  if (view === 'breathe') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-navy-800 mb-2">Box Breathing</h2>
          <p className="text-gray-400 mb-6">Follow the circle. Breathe slowly.</p>

          <div className="flex justify-center mb-6">
            <MeditatingPerson className="w-48 h-48 animate-float" />
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-48 h-48 rounded-full border-4 border-blue-300 flex items-center justify-center breathe bg-blue-50">
              <div>
                <p className="text-blue-600 text-xl font-bold">BREATHE</p>
                <p className="text-gray-400 text-sm mt-1">Inhale... Hold... Exhale...</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 text-left">
            <p className="text-navy-800 font-semibold mb-3">Steps:</p>
            <div className="space-y-3">
              {[
                { s: '1', t: 'Inhale slowly for 4 seconds', c: 'text-blue-600' },
                { s: '2', t: 'Hold breath for 4 seconds', c: 'text-purple-600' },
                { s: '3', t: 'Exhale slowly for 4 seconds', c: 'text-green-600' },
                { s: '4', t: 'Hold empty for 4 seconds', c: 'text-yellow-600' },
              ].map((i) => (
                <div key={i.s} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center ${i.c} font-bold text-sm`}>{i.s}</div>
                  <p className="text-gray-600 text-sm">{i.t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 mb-6 text-left">
            <p className="text-purple-700 font-semibold mb-3">5-4-3-2-1 Grounding</p>
            {['👀 5 things you SEE', '👂 4 things you HEAR', '✋ 3 things you TOUCH', '👃 2 things you SMELL', '👅 1 thing you TASTE'].map((i) => (
              <p key={i} className="text-gray-600 text-sm mb-1">{i}</p>
            ))}
          </div>

          <button onClick={() => setView('main')}
            className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-4 rounded-2xl transition font-medium">
            ← Back to help options
          </button>
        </div>
      </div>
    )
  }

  if (view === 'counselor') {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-navy-800 mb-2">Connect with Counselor</h2>
          <p className="text-gray-400 mb-6">A counselor has been notified.</p>

          <div className="bg-green-50 border border-green-100 rounded-3xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-700 font-semibold">1 counselor available</span>
            </div>
            <div className="bg-white rounded-2xl p-4 mb-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><span>👩‍⚕️</span></div>
                <div>
                  <p className="text-navy-800 font-semibold text-sm">Campus Counselor</p>
                  <p className="text-green-600 text-xs">Available now</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" /> Start Chat Now
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-navy-800 font-semibold">Book appointment</p>
            </div>
            <div className="space-y-2">
              {['Today 3:00 PM', 'Today 5:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM'].map((t) => (
                <button key={t} className="w-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl py-3 text-gray-600 text-sm transition">
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <p className="text-green-700 font-semibold text-sm">Privacy</p>
            </div>
            <p className="text-gray-500 text-sm">Counselor sees burnout trends only. Not private journal entries.</p>
          </div>

          <button onClick={() => setView('main')}
            className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-4 rounded-2xl transition font-medium">
            ← Back to help options
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white px-4 pt-20 pb-28">
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition mb-8">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Dashboard</span>
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🫂</div>
          <h1 className="text-3xl font-bold text-navy-800 mb-2">We're here.</h1>
          <p className="text-gray-400 text-lg">You're not alone. What do you need?</p>
        </div>

        <div className="space-y-3 mb-8">
          <button onClick={() => setView('counselor')}
            className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-3xl p-5 text-left transition flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-navy-800 font-bold text-lg">Talk to a Counselor</p>
              <p className="text-blue-600 text-sm">Campus mental health support</p>
            </div>
          </button>

          <button onClick={() => setView('breathe')}
            className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-3xl p-5 text-left transition flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Wind className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <p className="text-navy-800 font-bold text-lg">Help me breathe</p>
              <p className="text-purple-600 text-sm">Guided breathing & grounding</p>
            </div>
          </button>

          <button onClick={() => alert('Alert sent to your trusted contact.\n\n"Your friend may need support. Please check on them."\n\nNo health details shared.')}
            className="w-full bg-green-50 hover:bg-green-100 border border-green-200 rounded-3xl p-5 text-left transition flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-navy-800 font-bold text-lg">Alert trusted contact</p>
              <p className="text-green-600 text-sm">Private alert to someone you trust</p>
            </div>
          </button>

          <a href="tel:01779554391"
            className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-3xl p-5 text-left transition flex items-center gap-4 block">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <p className="text-navy-800 font-bold text-lg">Call a Helpline</p>
              <p className="text-red-600 text-sm">Kaan Pete Roi — 24/7 support</p>
            </div>
          </a>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <p className="text-green-700 font-semibold text-sm">Privacy</p>
          </div>
          <p className="text-gray-500 text-sm">All actions are private. Nothing shared without your permission.</p>
        </div>

        <p className="text-gray-300 text-xs text-center">
          Immediate danger? Call 999 or go to nearest hospital.
        </p>
      </div>
    </div>
  )
}