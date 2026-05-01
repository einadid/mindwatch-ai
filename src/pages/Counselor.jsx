import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, AlertTriangle, Clock, Users,
  TrendingUp, ShieldCheck, CheckCircle2, Bell
} from 'lucide-react'

// demo data for counselor dashboard
const demoStudents = [
  {
    id: 'STU-001',
    score: 89,
    level: 'CRITICAL',
    status: 'Emergency triggered',
    time: '11:34 PM',
    luna: 'Critical',
    focus: 'Alert',
    calm: 'High',
    emoji: '🔴',
  },
  {
    id: 'STU-002',
    score: 76,
    level: 'HIGH RISK',
    status: '5 consecutive low mood days',
    time: '2:15 PM',
    luna: 'Alert',
    focus: 'Stable',
    calm: 'Alert',
    emoji: '🟠',
  },
  {
    id: 'STU-003',
    score: 72,
    level: 'HIGH RISK',
    status: 'Focus score dropped 40%',
    time: '9:20 AM',
    luna: 'Stable',
    focus: 'Critical',
    calm: 'Stable',
    emoji: '🟠',
  },
  {
    id: 'STU-004',
    score: 65,
    level: 'HIGH RISK',
    status: 'Anxiety spikes 5x this week',
    time: '8:45 AM',
    luna: 'Watch',
    focus: 'Stable',
    calm: 'Critical',
    emoji: '🟠',
  },
  {
    id: 'STU-005',
    score: 48,
    level: 'STRESSED',
    status: 'Moderate stress pattern',
    time: '7:30 AM',
    luna: 'Watch',
    focus: 'Watch',
    calm: 'Stable',
    emoji: '🟡',
  },
]

const demoAppointments = [
  { time: '10:00 AM', student: 'STU-002', type: 'Follow-up' },
  { time: '2:00 PM', student: 'STU-003', type: 'First session' },
  { time: '4:00 PM', student: '—', type: 'Open slot' },
]

export default function Counselor() {
  const navigate = useNavigate()
  const [view, setView] = useState('dashboard')

  return (
    <div className="min-h-screen bg-brand-900 px-4 pt-6 pb-12">
      <div className="max-w-4xl mx-auto">

        {/* top */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Counselor Mode
            </span>
          </div>
        </div>

        {/* header */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-green-600/20 border border-green-500/30 flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-green-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Counselor Dashboard
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Monitor student wellness alerts, manage appointments, and respond to
            emergency support requests. All data shown is anonymized.
          </p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Urgent', value: '1', color: 'text-red-400', border: 'border-red-500/30' },
            { label: 'High Risk', value: '3', color: 'text-orange-400', border: 'border-orange-500/30' },
            { label: 'Stressed', value: '1', color: 'text-yellow-400', border: 'border-yellow-500/30' },
            { label: 'Total Active', value: '47', color: 'text-blue-400', border: 'border-blue-500/30' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-brand-800 border ${stat.border} rounded-2xl p-4 text-center`}
            >
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* urgent alerts */}
        <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-white">Urgent Alerts</h2>
            <span className="text-xs bg-red-900/40 text-red-400 px-2 py-1 rounded-full">
              1 pending
            </span>
          </div>

          <div className="bg-brand-800 border border-red-500/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔴</span>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {demoStudents[0].id}
                  </p>
                  <p className="text-red-400 text-xs">
                    Score: {demoStudents[0].score}/100 — {demoStudents[0].status}
                  </p>
                </div>
              </div>
              <span className="text-gray-500 text-xs">{demoStudents[0].time}</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button className="bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                Respond Now
              </button>
              <button className="bg-brand-700 hover:bg-brand-600 border border-blue-900/20 text-gray-300 text-sm px-4 py-2 rounded-xl transition">
                Schedule Call
              </button>
              <button className="bg-brand-700 hover:bg-brand-600 border border-blue-900/20 text-gray-300 text-sm px-4 py-2 rounded-xl transition">
                Send Resource
              </button>
            </div>
          </div>
        </div>

        {/* high risk students */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold text-white">At-Risk Students</h2>
          </div>

          <div className="space-y-3">
            {demoStudents.slice(1).map((student) => (
              <div
                key={student.id}
                className="bg-brand-700 border border-blue-900/15 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span>{student.emoji}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{student.id}</p>
                      <p className="text-gray-400 text-xs">{student.status}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-bold text-sm">{student.score}/100</p>
                    <p className="text-gray-500 text-xs">{student.time}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-2 pt-2 border-t border-blue-900/15">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">🌙</span>
                    <span className="text-xs text-gray-400">{student.luna}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">⚡</span>
                    <span className="text-xs text-gray-400">{student.focus}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">🔵</span>
                    <span className="text-xs text-gray-400">{student.calm}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* appointments */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Today's Appointments</h2>
          </div>

          <div className="space-y-2">
            {demoAppointments.map((appt, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-brand-700 border border-blue-900/15 rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-mono text-sm font-medium w-20">
                    {appt.time}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">{appt.student}</p>
                    <p className="text-gray-500 text-xs">{appt.type}</p>
                  </div>
                </div>
                {appt.student !== '—' && (
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition">
                    View
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* campus stats */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold text-white">Campus Overview</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-brand-700 border border-blue-900/15 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">58</p>
              <p className="text-gray-500 text-xs">Avg Burnout Score</p>
              <p className="text-yellow-400 text-xs mt-1">↑ Exam week effect</p>
            </div>

            <div className="bg-brand-700 border border-blue-900/15 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">34</p>
              <p className="text-gray-500 text-xs">Emergency Responses</p>
              <p className="text-gray-500 text-xs mt-1">This month</p>
            </div>

            <div className="bg-brand-700 border border-blue-900/15 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">4.2h</p>
              <p className="text-gray-500 text-xs">Avg Response Time</p>
              <p className="text-green-400 text-xs mt-1">Under SLA target</p>
            </div>
          </div>
        </div>

        {/* privacy reminder */}
        <div className="bg-brand-800 border border-green-700/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <p className="text-green-400 font-semibold text-sm">Data Privacy</p>
          </div>
          <p className="text-gray-400 text-sm">
            You are viewing anonymized data only. Private journal entries and personal
            conversations are never accessible through this dashboard. Student identity
            is protected by anonymous IDs.
          </p>
        </div>

        {/* ethics */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <p className="text-blue-400 font-semibold text-sm">Reminder</p>
          </div>
          <p className="text-gray-400 text-sm">
            MindWatch AI flags patterns — it does not diagnose. All clinical decisions
            remain with you as the qualified professional. The app screens; the doctor diagnoses.
          </p>
        </div>
      </div>
    </div>
  )
}