export function getBurnoutLevel(score) {
  if (score <= 20) return {
    level: 'THRIVING',
    emoji: '🟢',
    color: 'green',
    textColor: 'text-green-400',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-900/20',
    barColor: '#22c55e',
    message: "You're doing great. Keep it up!",
    advice: "Maintain your current routine and sleep schedule."
  }
  if (score <= 40) return {
    level: 'STABLE',
    emoji: '🔵',
    color: 'blue',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-900/20',
    barColor: '#3b82f6',
    message: "Good. Stay mindful of your patterns.",
    advice: "Keep checking in daily to maintain awareness."
  }
  if (score <= 60) return {
    level: 'STRESSED',
    emoji: '🟡',
    color: 'yellow',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-900/20',
    barColor: '#eab308',
    message: "You're under pressure. Let's act early.",
    advice: "Try the smart suggestions to ease your load."
  }
  if (score <= 80) return {
    level: 'HIGH RISK',
    emoji: '🟠',
    color: 'orange',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-900/20',
    barColor: '#f97316',
    message: "You need support. Let's connect you now.",
    advice: "Please talk to a counselor this week."
  }
  return {
    level: 'CRITICAL',
    emoji: '🔴',
    color: 'red',
    textColor: 'text-red-400',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-900/20',
    barColor: '#ef4444',
    message: "Please reach out immediately.",
    advice: "Use the emergency button to get help now."
  }
}

export function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

export function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function formatDate() {
  return new Date().toLocaleDateString('en-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}