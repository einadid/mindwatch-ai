import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

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
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
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
    <div className="min-h-screen bg-brand-900 px-4 py-6">
      <div className="max-w-2xl mx-auto">

        {/* Top */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="text-right">
            <p className="text-xs text-gray-500">Step 1 of 3</p>
            <p className="text-sm text-blue-400 font-medium">
              Setup & Consent
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
            <Shield className="w-7 h-7 text-blue-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Welcome to <span className="text-blue-400">MindWatch AI</span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Before we begin, let's set up your wellness profile and make sure
            you clearly understand how your data is used.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4">
            <p className="text-white font-semibold text-sm mb-1">Private</p>
            <p className="text-gray-500 text-xs">
              Your information stays protected and consent-based.
            </p>
          </div>

          <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4">
            <p className="text-white font-semibold text-sm mb-1">Ethical</p>
            <p className="text-gray-500 text-xs">
              We screen patterns only. We do not diagnose disorders.
            </p>
          </div>

          <div className="bg-brand-800 border border-blue-900/30 rounded-2xl p-4">
            <p className="text-white font-semibold text-sm mb-1">Fast</p>
            <p className="text-gray-500 text-xs">
              Setup takes under 2 minutes. Daily check-in takes 60 seconds.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-brand-800 border border-blue-900/30 rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-white mb-5">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full bg-brand-700 border border-blue-900/40 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                University / College
              </label>
              <input
                type="text"
                name="university"
                value={form.university}
                onChange={handleChange}
                placeholder="e.g. Chittagong Medical College"
                className="w-full bg-brand-700 border border-blue-900/40 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Study Year / Level
              </label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full bg-brand-700 border border-blue-900/40 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500"
              >
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
              <label className="block text-sm text-gray-400 mb-2">
                Trusted Contact (Optional)
              </label>
              <input
                type="text"
                name="trustedContact"
                value={form.trustedContact}
                onChange={handleChange}
                placeholder="Friend / sibling / guardian"
                className="w-full bg-brand-700 border border-blue-900/40 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Trusted Contact Relation (Optional)
            </label>
            <input
              type="text"
              name="contactRelation"
              value={form.contactRelation}
              onChange={handleChange}
              placeholder="e.g. Friend / Sister / Classmate"
              className="w-full bg-brand-700 border border-blue-900/40 rounded-2xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Consent box */}
        <div className="bg-brand-800 border border-green-700/30 rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">
              Informed Consent
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.screening}
                onChange={(e) =>
                  setConsent((prev) => ({
                    ...prev,
                    screening: e.target.checked,
                  }))
                }
                className="mt-1"
              />
              <span className="text-sm text-gray-400">
                I understand that MindWatch AI will collect my self-reported
                wellness check-in data to provide early support and pattern-based
                screening.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.privacy}
                onChange={(e) =>
                  setConsent((prev) => ({
                    ...prev,
                    privacy: e.target.checked,
                  }))
                }
                className="mt-1"
              />
              <span className="text-sm text-gray-400">
                I understand that my data will remain private, encrypted, and
                will not be shared without my permission except in serious
                emergency safety situations.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.noDiagnosis}
                onChange={(e) =>
                  setConsent((prev) => ({
                    ...prev,
                    noDiagnosis: e.target.checked,
                  }))
                }
                className="mt-1"
              />
              <span className="text-sm text-gray-400">
                I understand that this app does <span className="text-white font-medium">not diagnose</span> depression,
                ADHD, OCD, or any psychiatric disorder. It only flags possible
                patterns and encourages professional consultation.
              </span>
            </label>
          </div>

          <div className="rounded-2xl bg-brand-700 border border-blue-900/30 p-4">
            <p className="text-blue-300 text-sm font-medium mb-1">
              Ethical Promise
            </p>
            <p className="text-gray-400 text-sm">
              MindWatch AI follows one core rule:
              <span className="text-white font-medium"> “The app screens. The doctor diagnoses.”</span>
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => navigate('/')}
            className="md:w-48 bg-brand-700 hover:bg-brand-600 border border-blue-900/30 text-gray-300 py-4 rounded-2xl transition font-medium"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex-1 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-4 text-center">
          You can withdraw consent and delete your data later.
        </p>
      </div>
    </div>
  )
}