import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DoctorVector } from '../components/Vectors'

export default function Onboarding() {
  const navigate = useNavigate()
  const { saveUser } = useApp()

  const [form, setForm] = useState({
    name: '',
    university: '',
    year: '',
    trustedContact: '',
    contactRelation: '',
  })

  const [consent, setConsent] = useState({
    screening: false,
    privacy: false,
    noDiagnosis: false,
  })

  const isFormValid =
    form.name.trim() &&
    form.university.trim() &&
    form.year.trim() &&
    consent.screening &&
    consent.privacy &&
    consent.noDiagnosis

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!isFormValid) return
    const userData = {
      ...form,
      id: 'STU-' + Date.now(),
      joinedAt: new Date().toISOString(),
    }
    saveUser(userData)
    navigate('/assessment')
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-navy-800 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="text-right">
            <p className="text-xs text-gray-400">Step 1 of 3</p>
            <p className="text-sm text-blue-600 font-semibold">Setup & Consent</p>
          </div>
        </div>

        {/* Header with vector */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-3">
              Welcome to <span className="text-blue-600">MindWatch AI</span>
            </h1>
            <p className="text-gray-500">
              Let's set up your wellness profile. This takes under 2 minutes.
              Your data stays private and encrypted.
            </p>
          </div>
          <div className="hidden md:flex justify-center animate-float">
            <DoctorVector className="w-64 h-64" />
          </div>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { title: '🔒 Private', desc: 'Your data is encrypted and consent-based.' },
            { title: '⚕️ Ethical', desc: 'We screen patterns. We never diagnose.' },
            { title: '⚡ Fast', desc: 'Setup: 2 min. Daily check-in: 60 seconds.' },
          ].map((c) => (
            <div key={c.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <p className="text-navy-800 font-semibold text-sm mb-1">{c.title}</p>
              <p className="text-gray-400 text-xs">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-navy-800 mb-5">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">First Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">University / College</label>
              <input type="text" name="university" value={form.university} onChange={handleChange}
                placeholder="e.g. Chittagong Medical College"
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Study Year</label>
              <select name="year" value={form.year} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition">
                <option value="">Select your year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Trusted Contact (Optional)</label>
              <input type="text" name="trustedContact" value={form.trustedContact} onChange={handleChange}
                placeholder="Friend / guardian name"
                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Trusted Contact Relation (Optional)</label>
            <input type="text" name="contactRelation" value={form.contactRelation} onChange={handleChange}
              placeholder="e.g. Friend / Sister / Classmate"
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-navy-800 placeholder:text-gray-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
          </div>
        </div>

        {/* Consent */}
        <div className="bg-green-50 border border-green-100 rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-navy-800">Informed Consent</h2>
          </div>

          <div className="space-y-4 mb-6">
            {[
              { key: 'screening', text: 'I understand that MindWatch AI will collect my self-reported wellness data to provide early support and pattern-based screening.' },
              { key: 'privacy', text: 'I understand that my data will remain private, encrypted, and will not be shared without my permission except in serious emergency safety situations.' },
              { key: 'noDiagnosis', text: <>I understand that this app does <span className="text-navy-800 font-semibold">not diagnose</span> any psychiatric disorder. It only flags possible patterns and encourages professional consultation.</> },
            ].map((item) => (
              <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={consent[item.key]}
                  onChange={(e) => setConsent((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-500">{item.text}</span>
              </label>
            ))}
          </div>

          <div className="rounded-2xl bg-white border border-green-100 p-4">
            <p className="text-green-700 text-sm font-semibold mb-1">Ethical Promise</p>
            <p className="text-gray-500 text-sm">
              MindWatch AI follows one core rule: <span className="text-navy-800 font-semibold">"The app screens. The doctor diagnoses."</span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <button onClick={() => navigate('/')}
            className="md:w-48 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-4 rounded-2xl transition font-medium">
            Back
          </button>
          <button onClick={handleSubmit} disabled={!isFormValid}
            className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
              isFormValid ? 'gradient-navy text-white hover:shadow-lg hover:shadow-blue-200' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}>
            Continue to Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 text-xs mt-4 text-center">
          You can withdraw consent and delete your data anytime.
        </p>
      </div>
    </div>
  )
}