// Reusable SVG vector illustrations
// Professional medical/wellness style

export function StudentStudying({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Desk */}
      <rect x="100" y="300" width="300" height="15" rx="7" fill="#E2E8F0" />
      <rect x="130" y="315" width="15" height="100" rx="4" fill="#CBD5E1" />
      <rect x="355" y="315" width="15" height="100" rx="4" fill="#CBD5E1" />

      {/* Laptop */}
      <rect x="170" y="250" width="160" height="50" rx="5" fill="#1E3A5F" />
      <rect x="180" y="258" width="140" height="35" rx="3" fill="#3B82F6" />
      <rect x="150" y="300" width="200" height="8" rx="4" fill="#334155" />

      {/* Person body */}
      <circle cx="250" cy="180" r="35" fill="#FBBF24" /> {/* Head */}
      <rect x="225" y="215" width="50" height="85" rx="15" fill="#3B82F6" /> {/* Body */}

      {/* Arms */}
      <rect x="190" y="230" width="40" height="12" rx="6" fill="#3B82F6" transform="rotate(-15 190 230)" />
      <rect x="270" y="230" width="40" height="12" rx="6" fill="#3B82F6" transform="rotate(15 270 230)" />

      {/* Face */}
      <circle cx="240" cy="175" r="3" fill="#1E3A5F" /> {/* Left eye */}
      <circle cx="260" cy="175" r="3" fill="#1E3A5F" /> {/* Right eye */}
      <path d="M242 188 Q250 194 258 188" stroke="#1E3A5F" strokeWidth="2" fill="none" strokeLinecap="round" /> {/* Smile */}

      {/* Hair */}
      <path d="M215 170 Q220 140 250 135 Q280 140 285 170" fill="#1E3A5F" />

      {/* Coffee cup */}
      <rect x="340" y="275" width="20" height="25" rx="3" fill="#F59E0B" />
      <path d="M360 280 Q370 285 360 295" stroke="#F59E0B" strokeWidth="3" fill="none" />
      <path d="M345 270 Q350 262 355 270" stroke="#94A3B8" strokeWidth="2" fill="none" opacity="0.5" />

      {/* Book */}
      <rect x="130" y="270" width="35" height="30" rx="3" fill="#10B981" />
      <line x1="147" y1="270" x2="147" y2="300" stroke="#059669" strokeWidth="2" />

      {/* Stars/sparkles around */}
      <circle cx="150" cy="160" r="4" fill="#FBBF24" opacity="0.6" />
      <circle cx="350" cy="180" r="3" fill="#3B82F6" opacity="0.5" />
      <circle cx="170" cy="220" r="3" fill="#10B981" opacity="0.5" />
    </svg>
  )
}

export function DoctorVector({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person */}
      <circle cx="250" cy="160" r="40" fill="#FBBF24" /> {/* Head */}
      <rect x="220" y="200" width="60" height="120" rx="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" /> {/* White coat */}

      {/* Stethoscope */}
      <path d="M235 220 Q220 260 240 280" stroke="#3B82F6" strokeWidth="3" fill="none" />
      <circle cx="240" cy="283" r="6" fill="#3B82F6" />

      {/* Face */}
      <circle cx="240" cy="155" r="3" fill="#1E3A5F" />
      <circle cx="260" cy="155" r="3" fill="#1E3A5F" />
      <path d="M242 168 Q250 174 258 168" stroke="#1E3A5F" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Hair */}
      <path d="M210 150 Q215 120 250 115 Q285 120 290 150" fill="#1E3A5F" />

      {/* Clipboard */}
      <rect x="320" y="200" width="60" height="80" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
      <rect x="340" y="195" width="20" height="10" rx="3" fill="#CBD5E1" />
      <line x1="333" y1="220" x2="367" y2="220" stroke="#94A3B8" strokeWidth="2" />
      <line x1="333" y1="235" x2="367" y2="235" stroke="#94A3B8" strokeWidth="2" />
      <line x1="333" y1="250" x2="355" y2="250" stroke="#94A3B8" strokeWidth="2" />

      {/* Heart */}
      <path d="M140 200 Q140 180 155 180 Q170 180 170 200 Q170 220 155 235 Q140 220 140 200Z" fill="#EF4444" opacity="0.7" />

      {/* Cross */}
      <rect x="340" y="150" width="20" height="8" rx="2" fill="#10B981" />
      <rect x="346" y="144" width="8" height="20" rx="2" fill="#10B981" />

      {/* Floor */}
      <ellipse cx="250" cy="380" rx="120" ry="15" fill="#F1F5F9" />
    </svg>
  )
}

export function MeditatingPerson({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person */}
      <circle cx="250" cy="170" r="35" fill="#FBBF24" /> {/* Head */}

      {/* Body sitting */}
      <path d="M220 205 Q250 220 280 205 L290 280 Q250 300 210 280 Z" fill="#8B5CF6" />

      {/* Legs crossed */}
      <path d="M210 280 Q200 310 230 320 Q260 310 250 290" fill="#6D28D9" />
      <path d="M290 280 Q300 310 270 320 Q240 310 250 290" fill="#6D28D9" />

      {/* Arms */}
      <path d="M215 230 Q190 260 210 280" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M285 230 Q310 260 290 280" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* Face - closed eyes */}
      <path d="M237 168 Q240 164 243 168" stroke="#1E3A5F" strokeWidth="2" fill="none" />
      <path d="M257 168 Q260 164 263 168" stroke="#1E3A5F" strokeWidth="2" fill="none" />
      <path d="M245 180 Q250 184 255 180" stroke="#1E3A5F" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Aura circles */}
      <circle cx="250" cy="240" r="80" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="250" cy="240" r="100" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.2" />
      <circle cx="250" cy="240" r="120" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.1" />

      {/* Sparkles */}
      <circle cx="160" cy="180" r="4" fill="#FBBF24" opacity="0.6" />
      <circle cx="340" cy="190" r="3" fill="#3B82F6" opacity="0.5" />
      <circle cx="180" cy="280" r="3" fill="#10B981" opacity="0.5" />
      <circle cx="320" cy="270" r="4" fill="#8B5CF6" opacity="0.5" />

      {/* Mat */}
      <ellipse cx="250" cy="340" rx="100" ry="15" fill="#DDD6FE" />
    </svg>
  )
}

export function TeamWorkVector({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person 1 - left */}
      <circle cx="150" cy="180" r="30" fill="#FBBF24" />
      <rect x="130" y="210" width="40" height="80" rx="12" fill="#3B82F6" />
      <circle cx="142" cy="176" r="2.5" fill="#1E3A5F" />
      <circle cx="158" cy="176" r="2.5" fill="#1E3A5F" />
      <path d="M145 186 Q150 190 155 186" stroke="#1E3A5F" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Person 2 - center */}
      <circle cx="250" cy="170" r="32" fill="#FBBF24" />
      <rect x="228" y="202" width="44" height="85" rx="14" fill="#10B981" />
      <circle cx="241" cy="166" r="2.5" fill="#1E3A5F" />
      <circle cx="259" cy="166" r="2.5" fill="#1E3A5F" />
      <path d="M244 178 Q250 183 256 178" stroke="#1E3A5F" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Person 3 - right */}
      <circle cx="350" cy="180" r="30" fill="#FBBF24" />
      <rect x="330" y="210" width="40" height="80" rx="12" fill="#8B5CF6" />
      <circle cx="342" cy="176" r="2.5" fill="#1E3A5F" />
      <circle cx="358" cy="176" r="2.5" fill="#1E3A5F" />
      <path d="M345 186 Q350 190 355 186" stroke="#1E3A5F" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Connection lines */}
      <path d="M175 240 Q210 220 228 240" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5,5" />
      <path d="M272 240 Q310 220 330 240" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5,5" />

      {/* Center element - brain/idea */}
      <circle cx="250" cy="120" r="25" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <text x="250" y="127" textAnchor="middle" fontSize="24">🧠</text>

      {/* Floor */}
      <ellipse cx="250" cy="340" rx="180" ry="15" fill="#F1F5F9" />
    </svg>
  )
}

export function PhoneAppVector({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone */}
      <rect x="180" y="80" width="140" height="280" rx="20" fill="#1E3A5F" />
      <rect x="190" y="110" width="120" height="220" rx="5" fill="#FFFFFF" />

      {/* Screen content */}
      <rect x="200" y="120" width="100" height="20" rx="4" fill="#EFF6FF" />
      <rect x="200" y="150" width="100" height="40" rx="8" fill="#DBEAFE" />
      <text x="250" y="175" textAnchor="middle" fontSize="14" fill="#1E3A5F" fontWeight="bold">Score: 42</text>

      {/* Agent indicators */}
      <circle cx="220" cy="210" r="10" fill="#8B5CF6" opacity="0.7" />
      <circle cx="250" cy="210" r="10" fill="#FBBF24" opacity="0.7" />
      <circle cx="280" cy="210" r="10" fill="#3B82F6" opacity="0.7" />

      <rect x="200" y="235" width="100" height="8" rx="4" fill="#F1F5F9" />
      <rect x="200" y="250" width="80" height="8" rx="4" fill="#F1F5F9" />
      <rect x="200" y="265" width="90" height="8" rx="4" fill="#F1F5F9" />

      {/* Emergency button */}
      <rect x="210" y="285" width="80" height="25" rx="12" fill="#EF4444" />
      <text x="250" y="302" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">HELP</text>

      {/* Home button */}
      <circle cx="250" cy="345" r="8" stroke="#94A3B8" strokeWidth="2" fill="none" />

      {/* Notification badges */}
      <circle cx="320" cy="130" r="15" fill="#10B981" />
      <text x="320" y="135" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">✓</text>

      {/* Person holding phone */}
      <circle cx="380" cy="200" r="25" fill="#FBBF24" />
      <rect x="363" y="225" width="34" height="70" rx="10" fill="#3B82F6" />
      <path d="M363 245 Q340 260 320 250" stroke="#3B82F6" strokeWidth="10" fill="none" strokeLinecap="round" />

      {/* Face */}
      <circle cx="373" cy="196" r="2" fill="#1E3A5F" />
      <circle cx="387" cy="196" r="2" fill="#1E3A5F" />
      <path d="M376 206 Q380 210 384 206" stroke="#1E3A5F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldVector({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield shape */}
      <path d="M250 80 L380 140 L380 280 Q380 380 250 420 Q120 380 120 280 L120 140 Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="3" />
      <path d="M250 100 L360 150 L360 270 Q360 360 250 395 Q140 360 140 270 L140 150 Z" fill="white" />

      {/* Heart inside shield */}
      <path d="M220 220 Q220 190 250 190 Q280 190 280 220 Q280 260 250 285 Q220 260 220 220Z" fill="#EF4444" opacity="0.8" />

      {/* Check mark */}
      <path d="M232 240 L245 255 L268 225" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Sparkles */}
      <circle cx="150" cy="180" r="5" fill="#FBBF24" opacity="0.6" />
      <circle cx="350" cy="200" r="4" fill="#3B82F6" opacity="0.5" />
      <circle cx="170" cy="320" r="4" fill="#10B981" opacity="0.5" />
      <circle cx="330" cy="330" r="3" fill="#8B5CF6" opacity="0.5" />

      {/* Lock */}
      <rect x="235" y="310" width="30" height="25" rx="5" fill="#1E3A5F" />
      <path d="M242 310 L242 300 Q242 288 250 288 Q258 288 258 300 L258 310" stroke="#1E3A5F" strokeWidth="3" fill="none" />
    </svg>
  )
}