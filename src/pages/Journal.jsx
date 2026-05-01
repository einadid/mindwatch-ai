import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Plus, Trash2, Calendar, AlertTriangle } from 'lucide-react'

const crisisWords = [
  'hopeless', 'give up', 'no point', 'end it',
  'can\'t go on', 'want to die', 'kill myself',
  'better off dead', 'can\'t take it', 'suicide',
  'self harm', 'hurt myself'
]

function checkCrisis(text) {
  const lower = text.toLowerCase()
  return crisisWords.some((word) => lower.includes(word))
}

function getSentiment(text) {
  const negativeWords = [
    'sad', 'tired', 'exhausted', 'stressed', 'anxious',
    'overwhelmed', 'angry', 'frustrated', 'lonely', 'scared',
    'worried', 'depressed', 'crying', 'pain', 'hate',
    'terrible', 'horrible', 'awful', 'miserable', 'hopeless',
    'worthless', 'numb', 'empty', 'broken', 'suffering'
  ]
  const positiveWords = [
    'happy', 'good', 'great', 'grateful', 'calm',
    'peaceful', 'excited', 'proud', 'hopeful', 'better',
    'strong', 'motivated', 'relaxed', 'content', 'joy',
    'wonderful', 'amazing', 'blessed', 'love', 'smile'
  ]

  const lower = text.toLowerCase()
  let score = 0
  negativeWords.forEach((w) => { if (lower.includes(w)) score -= 1 })
  positiveWords.forEach((w) => { if (lower.includes(w)) score += 1 })

  if (score <= -3) return { label: 'Very Negative', color: 'text-red-400', emoji: '😢' }
  if (score <= -1) return { label: 'Negative', color: 'text-orange-400', emoji: '😔' }
  if (score === 0) return { label: 'Neutral', color: 'text-gray-400', emoji: '😐' }
  if (score <= 2) return { label: 'Positive', color: 'text-green-400', emoji: '🙂' }
  return { label: 'Very Positive', color: 'text-emerald-400', emoji: '😊' }
}

export default function Journal() {
  const navigate = useNavigate()

  const [entries, setEntries] = useState([])
  const [writing, setWriting] = useState(false)
  const [text, setText] = useState('')
  const [showCrisis, setShowCrisis] = useState(false)

  // load entries
  useEffect(() => {
    const saved = localStorage.getItem('mw_journal')
    if (saved) setEntries(JSON.parse(saved))
  }, [])

  // save entries
  const saveEntries = (updated) => {
    setEntries(updated)
    localStorage.setItem('mw_journal', JSON.stringify(updated))
  }

  const handleSave = () => {
    if (!text.trim()) return

    // crisis check
    if (checkCrisis(text)) {
      setShowCrisis(true)
      return
    }

    const sentiment = getSentiment(text)

    const newEntry = {
      id: Date.now(),
      text: text.trim(),
      sentiment,
      date: new Date().toISOString(),
    }

    const updated = [newEntry, ...entries]
    saveEntries(updated)
    setText('')
    setWriting(false)
  }

  const handleDelete = (id) => {
    const updated = entries.filter((e) => e.id !== id)
    saveEntries(updated)
  }

  const handleCrisisClose = () => {
    setShowCrisis(false)

    // still save the entry
    const sentiment = getSentiment(text)
    const newEntry = {
      id: Date.now(),
      text: text.trim(),
      sentiment,
      date: new Date().toISOString(),
      crisisFlag: true,
    }
    const updated = [newEntry, ...entries]
    saveEntries(updated)
    setText('')
    setWriting(false)
  }

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-BD', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // ──────── CRISIS MODAL ────────
  if (showCrisis) {
    return (
      <div className="min-h-screen bg-brand-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">

          <div className="bg-red-900/20 border border-red-500/30 rounded-3xl p-6 text-center">

            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              We noticed something
            </h2>

            <p className="text-gray-300 mb-6">
              Some of what you wrote suggests you might be going through a very difficult time. You don't have to face this alone.
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate('/emergency')}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-4 rounded-2xl transition"
              >
                I need help right now
              </button>

              <button
                onClick={handleCrisisClose}
                className="w-full bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 py-4 rounded-2xl transition"
              >
                I'm okay — save my entry
              </button>
            </div>

            <p className="text-gray-500 text-xs">
              Your journal entry has been saved. A wellness check-in will follow in 24 hours.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ──────── WRITING VIEW ────────
  if (writing) {
    return (
      <div className="min-h-screen bg-brand-900 px-4 pt-20 pb-28">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => { setWriting(false); setText('') }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Cancel</span>
            </button>
            <p className="text-sm text-blue-400 font-medium">New Entry</p>
          </div>

          <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Write freely</h2>
            </div>

            <p className="text-gray-400 text-sm mb-5">
              This is your private space. Write whatever is on your mind. No one sees this without your permission.
            </p>

            <textarea
              autoFocus
              rows="10"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How are you feeling? What happened today? What's on your mind?"
              className="w-full bg-brand-700 border border-blue-900/20 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 resize-none text-base leading-relaxed"
            />

            {/* live sentiment */}
            {text.trim().length > 20 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm">
                  {getSentiment(text).emoji}
                </span>
                <span className={`text-xs ${getSentiment(text).color}`}>
                  Tone: {getSentiment(text).label}
                </span>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <button
                onClick={() => { setWriting(false); setText('') }}
                className="md:w-40 bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 py-4 rounded-2xl transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!text.trim()}
                className={`flex-1 py-4 rounded-2xl font-semibold transition ${
                  text.trim()
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save Entry
              </button>
            </div>
          </div>

          {/* privacy */}
          <div className="bg-brand-800 border border-green-700/30 rounded-2xl p-4 mt-4">
            <p className="text-green-400 font-semibold text-sm mb-1">Privacy</p>
            <p className="text-gray-400 text-sm">
              Journal entries are stored locally on your device. Counselors never see your private writings unless you choose to share.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ──────── JOURNAL LIST VIEW ────────
  return (
    <div className="min-h-screen bg-brand-900 px-4 pt-20 pb-28">
      <div className="max-w-3xl mx-auto">

        {/* top */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </button>
          <p className="text-sm text-blue-400 font-medium">Journal</p>
        </div>

        {/* header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-green-600/20 border border-green-500/30 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Private Journal
            </h1>
            <p className="text-gray-400 max-w-xl">
              Write freely about your thoughts and feelings. Your entries are private and never shared without your permission.
            </p>
          </div>
        </div>

        {/* new entry button */}
        <button
          onClick={() => setWriting(true)}
          className="w-full bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 rounded-3xl p-5 mb-6 transition flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center">
            <Plus className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold">New Journal Entry</p>
            <p className="text-gray-400 text-sm">Write what's on your mind</p>
          </div>
        </button>

        {/* entries */}
        {entries.length === 0 ? (
          <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-white font-semibold mb-2">No entries yet</p>
            <p className="text-gray-400 text-sm">
              Start writing to track your thoughts and emotional patterns over time.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5"
              >
                {/* header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 text-xs">
                      {formatDate(entry.date)}
                    </span>

                    {entry.crisisFlag && (
                      <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full">
                        Flagged
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-gray-600 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                  {entry.text.length > 300
                    ? entry.text.slice(0, 300) + '...'
                    : entry.text}
                </p>

                {/* sentiment */}
                {entry.sentiment && (
                  <div className="flex items-center gap-2 pt-3 border-t border-blue-900/20">
                    <span>{entry.sentiment.emoji}</span>
                    <span className={`text-xs ${entry.sentiment.color}`}>
                      {entry.sentiment.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* entries count */}
        {entries.length > 0 && (
          <p className="text-gray-600 text-xs text-center mt-4">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} saved locally
          </p>
        )}
      </div>
    </div>
  )
}