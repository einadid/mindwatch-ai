import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Clock, Users, TrendingUp, ShieldCheck, CheckCircle2, Brain } from 'lucide-react'
import { DoctorVector } from '../components/Vectors'

const students = [
  { id: 'STU-001', score: 89, level: 'CRITICAL', status: 'Emergency triggered', time: '11:34 PM', luna: 'Critical', focus: 'Alert', calm: 'High', emoji: '🔴' },
  { id: 'STU-002', score: 76, level: 'HIGH RISK', status: '5 low mood days', time: '2:15 PM', luna: 'Alert', focus: 'Stable', calm: 'Alert', emoji: '🟠' },
  { id: 'STU-003', score: 72, level: 'HIGH RISK', status: 'Focus dropped 40%', time: '9:20 AM', luna: 'Stable', focus: 'Critical', calm: 'Stable', emoji: '🟠' },
  { id: 'STU-004', score: 65, level: 'HIGH RISK', status: 'Anxiety 5x/week', time: '8:45 AM', luna: 'Watch', focus: 'Stable', calm: 'Critical', emoji: '🟠' },
  { id: 'STU-005', score: 48, level: 'STRESSED', status: 'Moderate stress', time: '7:30 AM', luna: 'Watch', focus: 'Watch', calm: 'Stable', emoji: '🟡' },
]

const appts = [
  { time: '10:00 AM', student: 'STU-002', type: 'Follow-up' },
  { time: '2:00 PM', student: 'STU-003', type: 'First session' },
  { time: '4:00 PM', student: '—', type: 'Open slot' },
]

export default function Counselor() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">

        {/* Navbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-navy-800">MindWatch <span className="text-blue-600">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-600 text-sm font-semibold">Counselor Mode</span>
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-navy-800 text-sm ml-4">← Back</button>
          </div>
        </div>

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">Counselor Dashboard</h1>
            <p className="text-gray-500">Monitor student wellness alerts and manage appointments. All data is anonymized.</p>
          </div>
          <div className="hidden md:flex justify-center animate-float">
            <DoctorVector className="w-56 h-56" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Urgent', value: '1', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
            { label: 'High Risk', value: '3', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
            { label: 'Stressed', value: '1', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
            { label: 'Total Active', value: '47', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4 text-center`}>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Urgent */}
        <div className="bg-red-50 border border-red-100 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-navy-800">Urgent Alert</h2>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">1 pending</span>
          </div>
          <div className="bg-white border border-red-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span>🔴</span>
                <div>
                  <p className="text-navy-800 font-semibold text-sm">STU-001</p>
                  <p className="text-red-600 text-xs">Score: 89/100 — Emergency triggered</p>
                </div>
              </div>
              <span className="text-gray-400 text-xs">11:34 PM</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition">Respond Now</button>
              <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl transition">Schedule Call</button>
              <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl transition">Send Resource</button>
            </div>
          </div>
        </div>

        {/* At Risk */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-navy-800">At-Risk Students</h2>
          </div>
          <div className="space-y-3">
            {students.slice(1).map((s) => (
              <div key={s.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span>{s.emoji}</span>
                    <div>
                      <p className="text-navy-800 font-semibold text-sm">{s.id}</p>
                      <p className="text-gray-400 text-xs">{s.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-navy-800 font-bold text-sm">{s.score}/100</p>
                    <p className="text-gray-400 text-xs">{s.time}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">🌙 {s.luna}</span>
                  <span className="text-xs text-gray-400">⚡ {s.focus}</span>
                  <span className="text-xs text-gray-400">🔵 {s.calm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-navy-800">Today's Appointments</h2>
          </div>
          <div className="space-y-2">
            {appts.map((a, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 font-mono text-sm font-medium w-20">{a.time}</span>
                  <div>
                    <p className="text-navy-800 text-sm font-medium">{a.student}</p>
                    <p className="text-gray-400 text-xs">{a.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-navy-800">Campus Overview</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { val: '58', label: 'Avg Burnout Score', sub: '↑ Exam week', color: 'text-yellow-600' },
              { val: '34', label: 'Emergency Responses', sub: 'This month', color: 'text-gray-500' },
              { val: '4.2h', label: 'Avg Response Time', sub: 'Under SLA', color: 'text-green-600' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-navy-800">{s.val}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
                <p className={`text-xs mt-1 ${s.color}`}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <p className="text-green-700 font-semibold text-sm">Data Privacy</p>
          </div>
          <p className="text-gray-500 text-sm">Anonymized data only. Journal entries and conversations are never accessible.</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <p className="text-blue-700 font-semibold text-sm">Reminder</p>
          </div>
          <p className="text-gray-500 text-sm">MindWatch AI flags patterns — it does not diagnose. The app screens; the doctor diagnoses.</p>
        </div>
      </div>
    </div>
  )
}