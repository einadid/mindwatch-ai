import { useNavigate } from 'react-router-dom'
import { Brain, Shield, Zap, Heart, ArrowRight, Star, CheckCircle2, Users, BarChart3, Lock, Phone, BookOpen } from 'lucide-react'
import { StudentStudying, DoctorVector, MeditatingPerson, TeamWorkVector, PhoneAppVector, ShieldVector } from '../components/Vectors'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════ NAVBAR ════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-blue-600" />
            <span className="font-bold text-xl text-navy-800">
              MindWatch <span className="text-blue-600">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-navy-800 text-sm font-medium transition">Features</a>
            <a href="#agents" className="text-gray-600 hover:text-navy-800 text-sm font-medium transition">AI Agents</a>
            <a href="#how" className="text-gray-600 hover:text-navy-800 text-sm font-medium transition">How It Works</a>
            <a href="#ethics" className="text-gray-600 hover:text-navy-800 text-sm font-medium transition">Ethics</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/counselor')}
              className="hidden md:block text-gray-600 hover:text-navy-800 text-sm font-medium transition"
            >
              Counselor Login
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-navy-800 hover:bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 w-fit">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-navy-800 font-medium">
                Trusted by 5+ Students
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-navy-800 mb-6 leading-tight">
              We don't wait for
              <span className="text-gradient"> students </span>
              to break.
            </h1>

            <p className="text-xl text-gray-500 mb-4">
              We watch before they fall.
            </p>

            <p className="text-gray-400 mb-8 max-w-lg">
              AI-powered early detection for student stress, burnout, and mental
              health patterns. Three specialized agents. One campus platform.
              Built for Bangladesh.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/onboarding')}
                className="gradient-navy text-white font-semibold px-8 py-4 rounded-2xl transition hover:shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
              >
                Get Started — It's Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/counselor')}
                className="bg-gray-50 hover:bg-gray-100 text-navy-800 font-medium px-8 py-4 rounded-2xl border border-gray-200 transition"
              >
                I'm a Counselor
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8">
              {[
                { num: '3', label: 'AI Agents' },
                { num: '60s', label: 'Daily Check-In' },
                { num: '24/7', label: 'Emergency Help' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-navy-800 font-bold text-lg">{s.num}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Vector */}
          <div className="flex justify-center animate-float">
            <StudentStudying className="w-80 h-80 md:w-96 md:h-96" />
          </div>
        </div>
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <section className="bg-navy-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '1 in 3', label: 'Students face chronic stress', icon: '📊' },
            { num: '50%', label: 'ADHD cases undiagnosed', icon: '⚡' },
            { num: '17-25', label: 'Peak onset age for disorders', icon: '🧠' },
            { num: '5L+', label: 'Students we aim to help', icon: '🎯' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl mb-1">{stat.icon}</p>
              <p className="text-white font-bold text-2xl">{stat.num}</p>
              <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Core Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
              Everything you need for campus<br />mental wellness
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From daily mood check-ins to emergency support, MindWatch AI provides
              a complete mental health monitoring ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6 text-red-500" />,
                title: 'Daily Check-In',
                desc: '60-second mood, sleep, and stress snapshot every day.',
                color: 'bg-red-50 border-red-100',
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
                title: 'Burnout Score',
                desc: 'AI-calculated wellness score from 0-100 with factor breakdown.',
                color: 'bg-blue-50 border-blue-100',
              },
              {
                icon: <Brain className="w-6 h-6 text-purple-600" />,
                title: '3 AI Agents',
                desc: 'LUNA, FOCUS, and CALM monitor mood, attention, and anxiety patterns.',
                color: 'bg-purple-50 border-purple-100',
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                title: 'Smart Suggestions',
                desc: 'Personalized daily plans based on your agent signals and stress level.',
                color: 'bg-yellow-50 border-yellow-100',
              },
              {
                icon: <Phone className="w-6 h-6 text-red-600" />,
                title: 'Emergency Help',
                desc: 'One-tap counselor connection, breathing guide, and helpline access.',
                color: 'bg-red-50 border-red-100',
              },
              {
                icon: <BookOpen className="w-6 h-6 text-green-600" />,
                title: 'Private Journal',
                desc: 'Write freely with AI sentiment analysis and crisis keyword detection.',
                color: 'bg-green-50 border-green-100',
              },
            ].map((f) => (
              <div key={f.title} className={`${f.color} border rounded-3xl p-6 card-hover`}>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-navy-800 font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ AI AGENTS ════════════ */}
      <section id="agents" className="gradient-light py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
                AI Technology
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
                Meet Your Three<br />AI Agents
              </h2>
              <p className="text-gray-400 mb-6">
                Each agent is specialized in detecting early warning signs for
                a specific pattern. They screen — they never diagnose.
              </p>
            </div>
            <div className="flex justify-center animate-float-delay">
              <PhoneAppVector className="w-72 h-72" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🌙',
                name: 'LUNA',
                role: 'Mood & Depression Risk',
                target: 'MDD Patterns',
                desc: 'Tracks emotional patterns over 14 days. Detects low mood streaks, sleep disruption, and social withdrawal.',
                color: 'border-purple-200 bg-white',
                badge: 'bg-purple-100 text-purple-700',
                monitors: ['Mood trends', 'Sleep quality', 'Social withdrawal', 'Energy levels'],
              },
              {
                icon: '⚡',
                name: 'FOCUS',
                role: 'Attention & ADHD Patterns',
                target: 'ADHD Patterns',
                desc: 'Monitors task completion, study consistency, and focus difficulty to identify attention-related challenges.',
                color: 'border-yellow-200 bg-white',
                badge: 'bg-yellow-100 text-yellow-700',
                monitors: ['Task completion', 'Study duration', 'Deadline adherence', 'Focus difficulty'],
              },
              {
                icon: '🔵',
                name: 'CALM',
                role: 'Anxiety & OCD Loops',
                target: 'OCD Patterns',
                desc: 'Identifies repetitive worry patterns, anxiety spikes, and stress loops common during exam periods.',
                color: 'border-blue-200 bg-white',
                badge: 'bg-blue-100 text-blue-700',
                monitors: ['Anxiety spikes', 'Repetitive behaviors', 'Worry frequency', 'Stress loops'],
              },
            ].map((agent) => (
              <div key={agent.name} className={`${agent.color} border rounded-3xl p-6 card-hover`}>
                <div className="text-4xl mb-3">{agent.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-navy-800 font-bold text-xl">{agent.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${agent.badge}`}>
                    {agent.target}
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium mb-3">{agent.role}</p>
                <p className="text-gray-400 text-sm mb-4">{agent.desc}</p>
                <div className="space-y-2">
                  {agent.monitors.map((m) => (
                    <div key={m} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-500 text-xs">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
              How MindWatch AI Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: <Shield className="w-6 h-6 text-blue-600" />,
                title: 'Private Setup',
                desc: 'Consent-based onboarding. Your data stays encrypted and yours.',
              },
              {
                step: '02',
                icon: <Heart className="w-6 h-6 text-red-500" />,
                title: '60-Sec Check-In',
                desc: 'Quick daily mood, sleep, and stress update.',
              },
              {
                step: '03',
                icon: <Brain className="w-6 h-6 text-purple-600" />,
                title: 'AI Analysis',
                desc: 'Three agents detect patterns across your data.',
              },
              {
                step: '04',
                icon: <Zap className="w-6 h-6 text-yellow-500" />,
                title: 'Smart Support',
                desc: 'Personalized suggestions + counselor connection when needed.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <p className="text-blue-600 font-mono text-sm font-bold mb-2">{item.step}</p>
                <h3 className="text-navy-800 font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ ETHICS ════════════ */}
      <section id="ethics" className="gradient-light py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center animate-float-delay-2">
            <ShieldVector className="w-72 h-72" />
          </div>

          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Our Promise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6">
              Ethics & Privacy First
            </h2>

            <div className="space-y-4">
              {[
                {
                  icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
                  title: 'We Screen. Doctors Diagnose.',
                  desc: 'MindWatch AI never tells you that you have a disorder.',
                },
                {
                  icon: <Lock className="w-5 h-5 text-blue-600" />,
                  title: 'Encrypted & Private',
                  desc: 'All data encrypted. No sharing without your permission.',
                },
                {
                  icon: <Shield className="w-5 h-5 text-purple-600" />,
                  title: 'Transparent AI',
                  desc: 'Every score and suggestion explains exactly why.',
                },
                {
                  icon: <Users className="w-5 h-5 text-orange-500" />,
                  title: 'Human Override',
                  desc: 'AI flags patterns. Humans make final decisions.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-navy-800 font-semibold text-sm">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ WHO ITS FOR ════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Built For Everyone
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
              Who Uses MindWatch AI?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎓',
                title: 'Students',
                desc: 'Daily check-ins, burnout tracking, smart suggestions, and emergency support.',
                color: 'bg-blue-50 border-blue-100',
              },
              {
                icon: '👩‍⚕️',
                title: 'Counselors',
                desc: 'Alert dashboard, student trends, appointment management, and follow-up tools.',
                color: 'bg-green-50 border-green-100',
              },
              {
                icon: '🏛️',
                title: 'Universities',
                desc: 'Campus analytics, department breakdown, wellness reports, and crisis data.',
                color: 'bg-purple-50 border-purple-100',
              },
            ].map((item) => (
              <div key={item.title} className={`${item.color} border rounded-3xl p-8 text-center card-hover`}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-navy-800 font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TEAM / ABOUT ════════════ */}
      <section className="gradient-light py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Our Vision
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6">
              From Hackathon to Impact
            </h2>
            <p className="text-gray-500 mb-6">
              MindWatch AI started at DNA Hack for Health 2026 with one goal:
              build a solution that detects student mental health risk early,
              ethically, and accessibly.
            </p>

            <div className="space-y-3">
              {[
                'Year 1: 5 universities, 5,000 students',
                'Year 3: 50+ universities, nationally',
                'Year 5: 5,00,000+ students helped',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-navy-800 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center animate-float">
            <TeamWorkVector className="w-80 h-80" />
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-navy rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to protect your<br />mental wellness?
            </h2>
            <p className="text-blue-200 mb-8 max-w-lg mx-auto">
              Join MindWatch AI today. Free for students. Private by design.
              Ethical by principle.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-white text-navy-800 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/counselor')}
                className="bg-white/10 text-white font-medium px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition"
              >
                Counselor Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-lg text-navy-800">MindWatch AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered campus mental wellness platform. Built for Bangladeshi students.
              </p>
            </div>

            <div>
              <h4 className="text-navy-800 font-semibold mb-3">Platform</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm cursor-pointer hover:text-navy-800 transition" onClick={() => navigate('/onboarding')}>Student App</p>
                <p className="text-gray-400 text-sm cursor-pointer hover:text-navy-800 transition" onClick={() => navigate('/counselor')}>Counselor Dashboard</p>
                <p className="text-gray-400 text-sm cursor-pointer hover:text-navy-800 transition" onClick={() => navigate('/emergency')}>Emergency Help</p>
              </div>
            </div>

            <div>
              <h4 className="text-navy-800 font-semibold mb-3">AI Agents</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">🌙 LUNA — Mood Agent</p>
                <p className="text-gray-400 text-sm">⚡ FOCUS — Attention Agent</p>
                <p className="text-gray-400 text-sm">🔵 CALM — Anxiety Agent</p>
              </div>
            </div>

            <div>
              <h4 className="text-navy-800 font-semibold mb-3">Hackathon</h4>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">DNA Hack for Health 2026</p>
                <p className="text-gray-400 text-sm">Chittagong Division</p>
                <p className="text-gray-400 text-sm">Digital Health & Telemedicine</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 MindWatch AI. Built with ❤️ for student mental health.
            </p>
            <p className="text-gray-400 text-sm">
              "The app screens. The doctor diagnoses."
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}