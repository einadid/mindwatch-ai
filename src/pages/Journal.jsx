import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Plus, Trash2, Calendar, AlertTriangle } from 'lucide-react'

const crisisWords = ['hopeless','give up','no point','end it',"can't go on",'want to die','kill myself','better off dead',"can't take it",'suicide','self harm','hurt myself']
function checkCrisis(t) { return crisisWords.some((w) => t.toLowerCase().includes(w)) }
function getSentiment(t) {
  const neg = ['sad','tired','exhausted','stressed','anxious','overwhelmed','angry','frustrated','lonely','scared','worried','depressed','crying','pain','hate','terrible','horrible','awful','miserable','hopeless','worthless','numb','empty','broken','suffering']
  const pos = ['happy','good','great','grateful','calm','peaceful','excited','proud','hopeful','better','strong','motivated','relaxed','content','joy','wonderful','amazing','blessed','love','smile']
  const l = t.toLowerCase(); let s = 0
  neg.forEach((w) => { if (l.includes(w)) s-- }); pos.forEach((w) => { if (l.includes(w)) s++ })
  if (s <= -3) return { label: 'Very Negative', color: 'text-red-500', emoji: '😢' }
  if (s <= -1) return { label: 'Negative', color: 'text-orange-500', emoji: '😔' }
  if (s === 0) return { label: 'Neutral', color: 'text-gray-400', emoji: '😐' }
  if (s <= 2) return { label: 'Positive', color: 'text-green-500', emoji: '🙂' }
  return { label: 'Very Positive', color: 'text-emerald-500', emoji: '😊' }
}

export default function Journal() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [writing, setWriting] = useState(false)
  const [text, setText] = useState('')
  const [showCrisis, setShowCrisis] = useState(false)

  useEffect(() => { const s = localStorage.getItem('mw_journal'); if (s) setEntries(JSON.parse(s)) }, [])
  const save = (u) => { setEntries(u); localStorage.setItem('mw_journal', JSON.stringify(u)) }

  const handleSave = () => {
    if (!text.trim()) return
    if (checkCrisis(text)) { setShowCrisis(true); return }
    const e = { id: Date.now(), text: text.trim(), sentiment: getSentiment(text), date: new Date().toISOString() }
    save([e, ...entries]); setText(''); setWriting(false)
  }

  const handleCrisisClose = () => {
    setShowCrisis(false)
    const e = { id: Date.now(), text: text.trim(), sentiment: getSentiment(text), date: new Date().toISOString(), crisisFlag: true }
    save([e, ...entries]); setText(''); setWriting(false)
  }

  const fmt = (iso) => new Date(iso).toLocaleDateString('en-BD', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (showCrisis) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-navy-800 mb-3">We noticed something</h2>
          <p className="text-gray-500 mb-6">It sounds like you might be going through a difficult time. You don't have to face this alone.</p>
          <div className="space-y-3 mb-6">
            <button onClick={() => navigate('/emergency')} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-2xl transition">I need help right now</button>
            <button onClick={handleCrisisClose} className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-4 rounded-2xl transition">I'm okay — save my entry</button>
          </div>
          <p className="text-gray-300 text-xs">A wellness check-in will follow in 24 hours.</p>
        </div>
      </div>
    </div>
  )

  if (writing) return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { setWriting(false); setText('') }} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Cancel</span>
          </button>
          <p className="text-sm text-blue-600 font-semibold">New Entry</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-navy-800">Write freely</h2>
          </div>
          <p className="text-gray-400 text-sm mb-5">Private space. No one sees this without your permission.</p>

          <textarea autoFocus rows="10" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling? What happened today?"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none text-base leading-relaxed" />

          {text.trim().length > 20 && (
            <div className="mt-3 flex items-center gap-2">
              <span>{getSentiment(text).emoji}</span>
              <span className={`text-xs ${getSentiment(text).color}`}>Tone: {getSentiment(text).label}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button onClick={() => { setWriting(false); setText('') }}
              className="md:w-40 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-4 rounded-2xl transition font-medium">Cancel</button>
            <button onClick={handleSave} disabled={!text.trim()}
              className={`flex-1 py-4 rounded-2xl font-semibold transition ${text.trim() ? 'gradient-navy text-white hover:shadow-lg' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
              Save Entry
            </button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-4">
          <p className="text-green-700 font-semibold text-sm mb-1">Privacy</p>
          <p className="text-gray-500 text-sm">Stored locally. Counselors never see your writings unless you share.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">Dashboard</span>
          </button>
          <p className="text-sm text-blue-600 font-semibold">Journal</p>
        </div>

        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Private Journal</h1>
          <p className="text-gray-500">Write freely. Private and never shared without permission.</p>
        </div>

        <button onClick={() => setWriting(true)}
          className="w-full bg-white border border-blue-200 hover:border-blue-400 hover:shadow-md rounded-3xl p-5 mb-6 transition flex items-center gap-4 card-hover">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-navy-800 font-semibold">New Journal Entry</p>
            <p className="text-gray-400 text-sm">Write what's on your mind</p>
          </div>
        </button>

        {entries.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-navy-800 font-semibold mb-2">No entries yet</p>
            <p className="text-gray-400 text-sm">Start writing to track your emotional patterns.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((e) => (
              <div key={e.id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    <span className="text-gray-400 text-xs">{fmt(e.date)}</span>
                    {e.crisisFlag && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Flagged</span>}
                  </div>
                  <button onClick={() => save(entries.filter((x) => x.id !== e.id))} className="text-gray-300 hover:text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                  {e.text.length > 300 ? e.text.slice(0, 300) + '...' : e.text}
                </p>
                {e.sentiment && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <span>{e.sentiment.emoji}</span>
                    <span className={`text-xs ${e.sentiment.color}`}>{e.sentiment.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {entries.length > 0 && <p className="text-gray-300 text-xs text-center mt-4">{entries.length} entries saved locally</p>}
      </div>
    </div>
  )
}