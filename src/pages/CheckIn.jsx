import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, MoonStar, Smile } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getBurnoutLevel } from '../utils/burnoutCalculator'
import { MeditatingPerson } from '../components/Vectors'

export default function CheckIn() {
  const navigate = useNavigate()
  const { saveCheckIn } = useApp()
  const [form, setForm] = useState({ mood: 3, sleep: '7', tasks: 'partial', overwhelm: 'somewhat', symptom: '', note: '' })
  const [submittedScore, setSubmittedScore] = useState(null)

  const moodOptions = [
    { value: 1, emoji: '😭', label: 'Very bad' },
    { value: 2, emoji: '😔', label: 'Low' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Great' },
  ]

  const handleSubmit = () => {
    const score = saveCheckIn({ mood: Number(form.mood), sleep: form.sleep, tasks: form.tasks, overwhelm: form.overwhelm, symptom: form.symptom, note: form.note })
    setSubmittedScore(score)
  }

  if (submittedScore !== null) {
    const info = getBurnoutLevel(submittedScore)
    const colorStyles = {
      green: { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-600' },
      blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-600' },
      yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-600' },
      orange: { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-600' },
      red: { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-600' },
    }
    const style = colorStyles[info.color] || colorStyles.blue

    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className={`bg-white ${style.border} border rounded-3xl p-8 shadow-sm`}>
            <div className="flex justify-center mb-6">
              <MeditatingPerson className="w-48 h-48 animate-float" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-5 mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-navy-800 mb-3 text-center">Check-In Saved ✓</h1>
            <p className="text-gray-400 mb-6 text-center">Your wellness update has been recorded.</p>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6">
              <p className="text-gray-400 text-sm mb-2">Updated Burnout Score</p>
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-5xl font-bold ${style.text}`}>{submittedScore}</span>
                <span className="text-gray-300 text-lg mb-1">/100</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span>{info.emoji}</span>
                <span className={`font-semibold ${style.text}`}>{info.level}</span>
              </div>
              <p className="text-gray-400 text-sm">{info.message}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button onClick={() => navigate('/dashboard')}
                className="flex-1 gradient-navy text-white font-semibold py-4 rounded-2xl transition hover:shadow-lg">
                Back to Dashboard
              </button>
              <button onClick={() => navigate('/suggestions')}
                className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-semibold py-4 rounded-2xl transition">
                View Smart Suggestions
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-400">Daily wellness update</p>
            <p className="text-sm text-blue-600 font-semibold">~ 60 seconds</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
            <Smile className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Daily Check-In</h1>
          <p className="text-gray-500">Quick snapshot of your mood, sleep, workload, and stress.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">

          {/* Mood */}
          <div className="mb-8">
            <p className="text-navy-800 font-semibold mb-4">1. How are you feeling right now?</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {moodOptions.map((item) => (
                <button key={item.value} onClick={() => setForm((p) => ({ ...p, mood: item.value }))}
                  className={`rounded-2xl border px-4 py-4 text-center transition ${
                    Number(form.mood) === item.value
                      ? 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-200'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}>
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <p className="text-sm font-medium">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sleep */}
          <div className="mb-8">
            <p className="text-navy-800 font-semibold mb-4 flex items-center gap-2">
              <MoonStar className="w-4 h-4 text-purple-500" /> 2. Hours of sleep last night?
            </p>
            <select value={form.sleep} onChange={(e) => setForm((p) => ({ ...p, sleep: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
              <option value="3">Less than 4 hours</option>
              <option value="5">4 – 6 hours</option>
              <option value="7">6 – 8 hours</option>
              <option value="9">8+ hours</option>
            </select>
          </div>

          {/* Tasks */}
          <div className="mb-8">
            <p className="text-navy-800 font-semibold mb-4">3. Did you complete today's tasks?</p>
            <div className="grid md:grid-cols-3 gap-3">
              {['yes', 'partial', 'no'].map((v) => (
                <button key={v} onClick={() => setForm((p) => ({ ...p, tasks: v }))}
                  className={`rounded-2xl border px-4 py-4 text-center transition capitalize ${
                    form.tasks === v ? 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-200' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}>
                  {v === 'partial' ? 'Partially' : v === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Overwhelm */}
          <div className="mb-8">
            <p className="text-navy-800 font-semibold mb-4">4. Did you feel overwhelmed?</p>
            <div className="grid md:grid-cols-3 gap-3">
              {['yes', 'somewhat', 'no'].map((v) => (
                <button key={v} onClick={() => setForm((p) => ({ ...p, overwhelm: v }))}
                  className={`rounded-2xl border px-4 py-4 text-center transition capitalize ${
                    form.overwhelm === v ? 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-200' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}>
                  {v === 'somewhat' ? 'Somewhat' : v === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Symptom */}
          <div className="mb-8">
            <p className="text-navy-800 font-semibold mb-4">5. Any physical symptoms? (optional)</p>
            <input type="text" value={form.symptom} onChange={(e) => setForm((p) => ({ ...p, symptom: e.target.value }))}
              placeholder="e.g. headache, fatigue, none"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </div>

          {/* Note */}
          <div className="mb-8">
            <p className="text-navy-800 font-semibold mb-4">6. One note about today (optional)</p>
            <textarea rows="4" value={form.note} onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
              placeholder="How was your day?"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none" />
          </div>

          <button onClick={handleSubmit}
            className="w-full gradient-navy text-white font-semibold py-4 rounded-2xl transition hover:shadow-lg flex items-center justify-center gap-2">
            Submit Check-In <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}