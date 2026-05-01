import { createContext, useContext, 
         useState, useEffect } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [burnoutScore, setBurnoutScore] = useState(0)
  const [checkIns, setCheckIns] = useState([])
  const [agentStatus, setAgentStatus] = useState({
    luna: { status: 'Stable', risk: 'low', 
            daysLow: 0, message: '' },
    focus: { status: 'Active', risk: 'low', 
             completion: 85, message: '' },
    calm: { status: 'Calm', risk: 'low', 
            anxietySpikes: 0, message: '' }
  })

  // Load from localStorage on start
  useEffect(() => {
    const savedUser = localStorage.getItem('mw_user')
    const savedScore = localStorage.getItem('mw_score')
    const savedCheckIns = localStorage.getItem('mw_checkins')
    const savedAgents = localStorage.getItem('mw_agents')

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedScore) setBurnoutScore(parseInt(savedScore))
    if (savedCheckIns) setCheckIns(JSON.parse(savedCheckIns))
    if (savedAgents) setAgentStatus(JSON.parse(savedAgents))
  }, [])

  // Save user
  const saveUser = (userData) => {
    setUser(userData)
    localStorage.setItem('mw_user', JSON.stringify(userData))
  }

  // Save check-in and recalculate
  const saveCheckIn = (checkinData) => {
    const newCheckIns = [
      ...checkIns, 
      { ...checkinData, timestamp: new Date().toISOString() }
    ]
    setCheckIns(newCheckIns)
    localStorage.setItem('mw_checkins', 
                         JSON.stringify(newCheckIns))

    // Calculate new burnout score
    const score = calculateScore(checkinData, newCheckIns)
    setBurnoutScore(score)
    localStorage.setItem('mw_score', score.toString())

    // Update agents
    const agents = updateAgents(newCheckIns)
    setAgentStatus(agents)
    localStorage.setItem('mw_agents', JSON.stringify(agents))

    return score
  }

  // Clear all data
  const clearData = () => {
    localStorage.clear()
    setUser(null)
    setBurnoutScore(0)
    setCheckIns([])
  }

  return (
    <AppContext.Provider value={{
      user, saveUser,
      burnoutScore, setBurnoutScore,
      checkIns, saveCheckIn,
      agentStatus,
      clearData
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

// Score calculation
function calculateScore(latest, allCheckIns) {
  const mood = latest.mood || 3
  const sleep = parseFloat(latest.sleep) || 7
  const task = latest.tasks || 'partial'
  const overwhelm = latest.overwhelm || 'somewhat'

  // Count low mood days (last 14)
  const recent = allCheckIns.slice(-14)
  const lowMoodDays = recent.filter(c => c.mood <= 2).length

  // Mood factor (0-25)
  const moodFactor = ((5 - mood) / 4) * 25

  // Sleep factor (0-20)
  let sleepFactor = 0
  if (sleep < 4) sleepFactor = 20
  else if (sleep < 6) sleepFactor = 14
  else if (sleep < 7) sleepFactor = 7
  else sleepFactor = 0

  // Task factor (0-20)
  const taskMap = { no: 20, partial: 10, yes: 0 }
  const taskFactor = taskMap[task] ?? 10

  // Overwhelm factor (0-20)
  const overwhelmMap = { yes: 20, somewhat: 10, no: 0 }
  const overwhelmFactor = overwhelmMap[overwhelm] ?? 10

  // Streak factor (0-15)
  const streakFactor = Math.min((lowMoodDays / 14) * 15, 15)

  const total = Math.round(
    moodFactor + sleepFactor + 
    taskFactor + overwhelmFactor + streakFactor
  )

  return Math.min(Math.max(total, 0), 100)
}

// Agent status update
function updateAgents(allCheckIns) {
  const recent = allCheckIns.slice(-14)
  const lowMoodDays = recent.filter(c => c.mood <= 2).length
  const lowSleepDays = recent.filter(
    c => parseFloat(c.sleep) < 6
  ).length
  const incompleteDays = recent.filter(
    c => c.tasks === 'no'
  ).length

  // LUNA
  let luna = { status: 'Stable', risk: 'low', 
               daysLow: lowMoodDays, message: '' }
  if (lowMoodDays >= 9) {
    luna = { status: 'Critical', risk: 'critical',
             daysLow: lowMoodDays,
             message: 'Prolonged low mood detected.' }
  } else if (lowMoodDays >= 5) {
    luna = { status: 'Alert', risk: 'high',
             daysLow: lowMoodDays,
             message: 'Low mood streak detected.' }
  } else if (lowMoodDays >= 3) {
    luna = { status: 'Watch', risk: 'medium',
             daysLow: lowMoodDays,
             message: 'Monitor mood carefully.' }
  }

  // FOCUS
  let focus = { status: 'Active', risk: 'low',
                completion: 100 - (incompleteDays * 7),
                message: '' }
  if (incompleteDays >= 8) {
    focus = { status: 'Critical', risk: 'critical',
              completion: 100 - (incompleteDays * 7),
              message: 'Significant focus difficulty.' }
  } else if (incompleteDays >= 5) {
    focus = { status: 'Alert', risk: 'high',
              completion: 100 - (incompleteDays * 7),
              message: 'Attention pattern detected.' }
  }

  // CALM
  const overwhelmDays = recent.filter(
    c => c.overwhelm === 'yes'
  ).length
  let calm = { status: 'Calm', risk: 'low',
               anxietySpikes: overwhelmDays, message: '' }
  if (overwhelmDays >= 8) {
    calm = { status: 'Critical', risk: 'critical',
             anxietySpikes: overwhelmDays,
             message: 'High anxiety pattern detected.' }
  } else if (overwhelmDays >= 5) {
    calm = { status: 'Alert', risk: 'high',
             anxietySpikes: overwhelmDays,
             message: 'Worry loops detected.' }
  }

  return { luna, focus, calm }
}