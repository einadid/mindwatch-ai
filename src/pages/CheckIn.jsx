import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, MoonStar, Smile } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getBurnoutLevel } from '../utils/burnoutCalculator'

export default function CheckIn() {
  const navigate = useNavigate()
  const { saveCheckIn } = useApp()

  const [form, setForm] = useState({
    mood: 3,
    sleep: '7',
    tasks: 'partial',
    overwhelm: 'somewhat',
    symptom: '',
    note: '',
  })

  const [submittedScore, setSubmittedScore] = useState(null)

  const moodOptions = [
    { value: 1, emoji: '😭', label: 'Very bad' },
    { value: 2, emoji: '😔', label: 'Low' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Great' },
  ]

  const handleSubmit = () => {
    const score = saveCheckIn({
      mood: Number(form.mood),
      sleep: form.sleep,
      tasks: form.tasks,
      overwhelm: form.overwhelm,
      symptom: form.symptom,
      note: form.note,
    })

    setSubmittedScore(score)
  }

  if (submittedScore !== null) {
    const info = getBurnoutLevel(submittedScore)

    return (
      <div className="min-h-screen bg-brand-900 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-3xl p-8 border ${info.borderColor} ${info.bgColor}`}>
            <div className="w-16 h-16 rounded-2xl bg-green-600/15 border border-green-500/20 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-3">
              Check-In Saved
            </h1>

            <p className="text-gray-400 mb-6">
              Your latest wellness update has been recorded successfully.
            </p>

            <div className="bg-brand-800 border border-blue-900/20 rounded-2xl p-5 mb-6">
              <p className="text-gray-500 text-sm mb-2">Updated Burnout Score</p>
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-5xl font-bold ${info.textColor}`}>
                  {submittedScore}
                </span>
                <span className="text-gray-500 text-lg mb-1">/100</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span>{info.emoji}</span>
                <span className={`font-semibold ${info.textColor}`}>
                  {info.level}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{info.message}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl transition"
              >
                Back to Dashboard
              </button>

              <button
                onClick={() => navigate('/suggestions')}
                className="flex-1 bg-brand-700 hover:bg-brand-600 border border-blue-900/20 text-gray-300 font-semibold py-4 rounded-2xl transition"
              >
                View Smart Suggestions
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-900 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* top */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="text-right">
            <p className="text-xs text-gray-500">Daily wellness update</p>
            <p className="text-sm text-blue-400 font-medium">~ 60 seconds</p>
          </div>
        </div>

        {/* header */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <Smile className="w-7 h-7 text-blue-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Daily Check-In
          </h1>
          <p className="text-gray-400">
            A quick snapshot of your current mood, sleep, workload, and stress level.
          </p>
        </div>

        {/* form */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-6 md:p-8">
          {/* mood */}
          <div className="mb-8">
            <p className="text-white font-semibold mb-4">
              1. How are you feeling right now?
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {moodOptions.map((item) => {
                const active = Number(form.mood) === item.value
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, mood: item.value }))
                    }
                    className={`rounded-2xl border px-4 py-4 text-center transition ${
                      active
                        ? 'bg-blue-600/15 border-blue-500 text-blue-300'
                        : 'bg-brand-700 border-blue-900/20 text-gray-300 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* sleep */}
          <div className="mb-8">
            <p className="text-white font-semibold mb-4 flex items-center gap-2">
              <MoonStar className="w-4 h-4 text-purple-400" />
              2. How many hours did you sleep last night?
            </p>

            <select
              value={form.sleep}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, sleep: e.target.value }))
              }
              className="w-full bg-brand-700 border border-blue-900/20 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="3">Less than 4 hours</option>
              <option value="5">4 - 6 hours</option>
              <option value="7">6 - 8 hours</option>
              <option value="9">8+ hours</option>
            </select>
          </div>

          {/* tasks */}
          <div className="mb-8">
            <p className="text-white font-semibold mb-4">
              3. Did you complete today's important tasks?
            </p>

            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: 'Yes', value: 'yes' },
                { label: 'Partially', value: 'partial' },
                { label: 'No', value: 'no' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, tasks: item.value }))
                  }
                  className={`rounded-2xl border px-4 py-4 text-center transition ${
                    form.tasks === item.value
                      ? 'bg-blue-600/15 border-blue-500 text-blue-300'
                      : 'bg-brand-700 border-blue-900/20 text-gray-300 hover:border-blue-500/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* overwhelm */}
          <div className="mb-8">
            <p className="text-white font-semibold mb-4">
              4. Did you feel overwhelmed today?
            </p>

            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: 'Yes', value: 'yes' },
                { label: 'Somewhat', value: 'somewhat' },
                { label: 'No', value: 'no' },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, overwhelm: item.value }))
                  }
                  className={`rounded-2xl border px-4 py-4 text-center transition ${
                    form.overwhelm === item.value
                      ? 'bg-blue-600/15 border-blue-500 text-blue-300'
                      : 'bg-brand-700 border-blue-900/20 text-gray-300 hover:border-blue-500/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* symptom */}
          <div className="mb-8">
            <p className="text-white font-semibold mb-4">
              5. Any physical symptom today? (optional)
            </p>

            <input
              type="text"
              value={form.symptom}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, symptom: e.target.value }))
              }
              placeholder="e.g. headache, fatigue, no symptom"
              className="w-full bg-brand-700 border border-blue-900/20 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
          </div>

          {/* note */}
          <div className="mb-8">
            <p className="text-white font-semibold mb-4">
              6. One note about today (optional)
            </p>

            <textarea
              rows="4"
              value={form.note}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="How was your day? Anything important on your mind?"
              className="w-full bg-brand-700 border border-blue-900/20 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2"
          >
            Submit Check-In
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}