import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  // DO NOT change the path — Caddy uses it for routing
  path: '/',
  cors: { origin: '*', methods: ['GET', 'POST'] },
  pingTimeout: 60000,
  pingInterval: 25000,
})

/* ---------------- Types ---------------- */
interface ChatUser {
  id: string          // socket.id
  username: string
  hue: string         // gradient hue for avatar
  minutes: number     // mindful minutes — driven by chat activity
  streak: number      // current streak (random on join)
  joinedAt: number
  online: boolean
}

interface ChatMessage {
  id: string
  username: string
  hue: string
  content: string
  timestamp: number
  type: 'user' | 'system'
}

/* ---------------- State ---------------- */
// Seeded baseline members so the leaderboard always looks alive
const seedMembers: ChatUser[] = [
  { id: 'seed-1', username: 'Aria K.',   hue: 'from-amber-200 to-rose-200',    minutes: 412, streak: 28, joinedAt: 0, online: false },
  { id: 'seed-2', username: 'Deven M.',  hue: 'from-sky-200 to-indigo-200',    minutes: 388, streak: 21, joinedAt: 0, online: false },
  { id: 'seed-3', username: 'Mira S.',   hue: 'from-emerald-200 to-teal-200',  minutes: 351, streak: 19, joinedAt: 0, online: false },
  { id: 'seed-4', username: 'Noah P.',   hue: 'from-violet-200 to-fuchsia-200',minutes: 327, streak: 15, joinedAt: 0, online: false },
  { id: 'seed-5', username: 'Jaya R.',   hue: 'from-rose-200 to-orange-200',   minutes: 314, streak: 14, joinedAt: 0, online: false },
  { id: 'seed-6', username: 'Leo T.',    hue: 'from-cyan-200 to-blue-200',     minutes: 298, streak: 12, joinedAt: 0, online: false },
  { id: 'seed-7', username: 'Ines V.',   hue: 'from-lime-200 to-emerald-200',  minutes: 281, streak: 11, joinedAt: 0, online: false },
  { id: 'seed-8', username: 'Kai H.',    hue: 'from-fuchsia-200 to-pink-200',  minutes: 264, streak: 10, joinedAt: 0, online: false },
]

// All users (seed + live) keyed by id
const users = new Map<string, ChatUser>()
seedMembers.forEach((u) => users.set(u.id, u))

// Recent messages (capped)
const messages: ChatMessage[] = []
const MAX_MESSAGES = 50

const HUES = [
  'from-amber-200 to-rose-200',
  'from-sky-200 to-indigo-200',
  'from-emerald-200 to-teal-200',
  'from-violet-200 to-fuchsia-200',
  'from-rose-200 to-orange-200',
  'from-cyan-200 to-blue-200',
  'from-lime-200 to-emerald-200',
  'from-fuchsia-200 to-pink-200',
]

const genId = () => Math.random().toString(36).slice(2, 11)
const pickHue = () => HUES[Math.floor(Math.random() * HUES.length)]

const sortedLeaderboard = () =>
  Array.from(users.values())
    .sort((a, b) => b.minutes - a.minutes)
    .map((u, i) => ({
      rank: i + 1,
      username: u.username,
      hue: u.hue,
      minutes: u.minutes,
      streak: u.streak,
      online: u.online,
      isYou: false, // client sets this for its own row
    }))

const broadcastLeaderboard = () => {
  io.emit('leaderboard', sortedLeaderboard())
}

const pushMessage = (msg: ChatMessage) => {
  messages.push(msg)
  if (messages.length > MAX_MESSAGES) messages.shift()
  io.emit('message', msg)
}

/* ---------------- Connection handling ---------------- */
io.on('connection', (socket) => {
  console.log(`[socket] connected: ${socket.id}`)

  // Send current state to the new client immediately
  socket.emit('leaderboard', sortedLeaderboard())
  socket.emit('history', messages.slice(-30))
  socket.emit('online-count', io.engine.clientsCount)

  socket.on('join', (data: { username: string }) => {
    const username = (data?.username || 'Anonymous').trim().slice(0, 24)
    const hue = pickHue()

    const user: ChatUser = {
      id: socket.id,
      username,
      hue,
      minutes: 180 + Math.floor(Math.random() * 40), // start near the middle of the pack
      streak: 5 + Math.floor(Math.random() * 12),
      joinedAt: Date.now(),
      online: true,
    }
    users.set(socket.id, user)

    const sysMsg: ChatMessage = {
      id: genId(),
      username: 'System',
      hue: 'from-slate-200 to-slate-300',
      content: `${username} entered the quiet space`,
      timestamp: Date.now(),
      type: 'system',
    }
    pushMessage(sysMsg)

    // Tell this client who they are
    socket.emit('self', { id: user.id, username: user.username, hue: user.hue })

    // Tell everyone about updated presence + leaderboard
    io.emit('online-count', io.engine.clientsCount)
    broadcastLeaderboard()
  })

  socket.on('message', (data: { content: string }) => {
    const user = users.get(socket.id)
    if (!user) return
    const content = (data?.content || '').trim().slice(0, 280)
    if (!content) return

    // Each chat message = +2 mindful minutes (presence counts)
    user.minutes += 2
    if (user.minutes % 10 === 0) user.streak += 1 // small streak bump every 5 messages

    const msg: ChatMessage = {
      id: genId(),
      username: user.username,
      hue: user.hue,
      content,
      timestamp: Date.now(),
      type: 'user',
    }
    pushMessage(msg)
    broadcastLeaderboard()
  })

  socket.on('meditate', () => {
    // A user can tap "Sit 5 min" to log a focused session — bumps minutes by 5
    const user = users.get(socket.id)
    if (!user) return
    user.minutes += 5
    user.streak += 1

    const msg: ChatMessage = {
      id: genId(),
      username: 'System',
      hue: 'from-slate-200 to-slate-300',
      content: `${user.username} just sat for 5 mindful minutes`,
      timestamp: Date.now(),
      type: 'system',
    }
    pushMessage(msg)
    broadcastLeaderboard()
  })

  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (user) {
      user.online = false
      const sysMsg: ChatMessage = {
        id: genId(),
        username: 'System',
        hue: 'from-slate-200 to-slate-300',
        content: `${user.username} stepped away`,
        timestamp: Date.now(),
        type: 'system',
      }
      pushMessage(sysMsg)
      users.delete(socket.id)
    }
    io.emit('online-count', io.engine.clientsCount)
    broadcastLeaderboard()
    console.log(`[socket] disconnected: ${socket.id}`)
  })

  socket.on('error', (err) => {
    console.error(`[socket] error (${socket.id}):`, err)
  })
})

const PORT = 3003
httpServer.listen(PORT, () => {
  console.log(`[quietude] chat service running on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('[quietude] SIGTERM, shutting down...')
  httpServer.close(() => process.exit(0))
})
process.on('SIGINT', () => {
  console.log('[quietude] SIGINT, shutting down...')
  httpServer.close(() => process.exit(0))
})
