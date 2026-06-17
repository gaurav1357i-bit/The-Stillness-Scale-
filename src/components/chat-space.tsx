'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { Send, Users, Circle, Wind, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/* ---------------- Types shared with the server ---------------- */
export interface LeaderEntry {
  rank: number
  username: string
  hue: string
  minutes: number
  streak: number
  online: boolean
  isYou?: boolean
}

interface ChatMessage {
  id: string
  username: string
  hue: string
  content: string
  timestamp: number
  type: 'user' | 'system'
}

interface SelfInfo {
  id: string
  username: string
  hue: string
}

interface ChatSpaceProps {
  /** Called whenever the server pushes a fresh leaderboard */
  onLeaderboard: (entries: LeaderEntry[]) => void
  /** Called when a "live activity" pulse should fire (e.g. a message was sent) */
  onActivity?: () => void
}

/* ---------------- Component ---------------- */
export function ChatSpace({ onLeaderboard, onActivity }: ChatSpaceProps) {
  const [connected, setConnected] = useState(false)
  const [self, setSelf] = useState<SelfInfo | null>(null)
  const [username, setUsername] = useState('')
  const [joined, setJoined] = useState(false)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [onlineCount, setOnlineCount] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<Socket | null>(null)
  const selfRef = useRef<SelfInfo | null>(null)

  /* ----- socket lifecycle (mount once) ----- */
  useEffect(() => {
    const s = io({
      path: '/',
      // Polling first so it works through Caddy without WebSocket upgrade issues
      transports: ['polling'],
      upgrade: false,
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      // Pass the port via query param so Caddy forwards to the chat service
      query: { XTransformPort: '3003' },
    })
    socketRef.current = s

    s.on('connect', () => setConnected(true))
    s.on('connect_error', () => setConnected(false))
    s.on('disconnect', () => setConnected(false))

    s.on('history', (history: ChatMessage[]) => setMessages(history))
    s.on('message', (msg: ChatMessage) => {
      setMessages((prev) => [...prev.slice(-49), msg])
      if (msg.type === 'user') onActivity?.()
    })
    s.on('self', (info: SelfInfo) => {
      selfRef.current = info
      setSelf(info)
    })
    s.on('online-count', (n: number) => setOnlineCount(n))
    s.on('leaderboard', (entries: LeaderEntry[]) => {
      const currentSelf = selfRef.current
      if (currentSelf) {
        const tagged = entries.map((e) =>
          e.username === currentSelf.username ? { ...e, isYou: true } : e
        )
        onLeaderboard(tagged)
      } else {
        onLeaderboard(entries)
      }
    })

    return () => {
      s.disconnect()
      socketRef.current = null
    }
  }, [])

  /* ----- handlers ----- */
  const handleJoin = useCallback(() => {
    const s = socketRef.current
    if (!s || !connected || !username.trim()) return
    s.emit('join', { username: username.trim() })
    setJoined(true)
  }, [connected, username])

  const handleSend = useCallback(() => {
    const s = socketRef.current
    if (!s || !input.trim()) return
    s.emit('message', { content: input.trim() })
    setInput('')
  }, [input])

  const handleMeditate = useCallback(() => {
    const s = socketRef.current
    if (!s) return
    s.emit('meditate')
  }, [])

  const fmtTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  /* ----- auto-scroll to newest ----- */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  /* ---------------- JOIN VIEW ---------------- */
  if (!joined) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-white/50 bg-white/55 p-8 text-center backdrop-blur-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/30">
          <Wind className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <h3 className="mt-5 font-sans text-2xl font-light tracking-quiet text-[#1E3A8A]">
          Enter the <span className="font-extrabold">Quiet Space</span>
        </h3>
        <p className="mt-2 text-sm font-light text-[#1E3A8A]/70">
          Pick a name. Your messages count as mindful minutes — the leaderboard updates live.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            placeholder="Your quiet name…"
            disabled={!connected}
            maxLength={24}
            className="h-12 rounded-full border-[#1E3A8A]/15 bg-white/70 text-center text-[#1E3A8A] placeholder:text-[#1E3A8A]/40"
          />
          <Button
            onClick={handleJoin}
            disabled={!connected || !username.trim()}
            className="h-12 rounded-full bg-[#1E3A8A] text-base font-semibold tracking-quiet text-white shadow-xl shadow-[#1E3A8A]/25 hover:bg-[#1E3A8A]/90"
          >
            {connected ? 'Step inside →' : 'Connecting…'}
          </Button>
          <p className="text-[11px] font-light text-[#1E3A8A]/50">
            {connected ? `${onlineCount} souls quietly online` : 'Warming up the silence…'}
          </p>
        </div>
      </div>
    )
  }

  /* ---------------- CHAT VIEW ---------------- */
  return (
    <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/55 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1E3A8A]/10 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A8A] text-white">
            <Wind className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-sm font-bold tracking-quiet text-[#1E3A8A]">QUIET SPACE</p>
            <p className="text-[10px] font-medium text-[#1E3A8A]/60">
              Be kind. Be brief. Be present.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-[#1E3A8A]/8 px-3 py-1 text-[11px] font-semibold text-[#1E3A8A]">
            <Users className="h-3 w-3" /> {onlineCount} online
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700">
            <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
            LIVE
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="scroll-quiet h-[360px] space-y-3 overflow-y-auto px-5 py-4"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-[#1E3A8A]/50">
            <Sparkles className="h-6 w-6" />
            <p className="mt-2 text-sm font-light">The space is quiet. Be the first to breathe.</p>
          </div>
        )}

        {messages.map((m) =>
          m.type === 'system' ? (
            <div key={m.id} className="flex justify-center">
              <span className="rounded-full bg-[#1E3A8A]/5 px-3 py-1 text-[10px] font-medium italic text-[#1E3A8A]/50">
                {m.content} · {fmtTime(m.timestamp)}
              </span>
            </div>
          ) : (
            <div
              key={m.id}
              className={`flex gap-2.5 ${
                self && m.username === self.username ? 'flex-row-reverse' : ''
              }`}
            >
              <span
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${m.hue} text-[9px] font-bold text-[#1E3A8A] ring-2 ring-white/60`}
              >
                {m.username
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div
                className={`flex max-w-[75%] flex-col ${
                  self && m.username === self.username ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#1E3A8A]/80">{m.username}</span>
                  <span className="text-[10px] font-light text-[#1E3A8A]/40">{fmtTime(m.timestamp)}</span>
                </div>
                <div
                  className={`mt-1 rounded-2xl px-3.5 py-2 text-sm ${
                    self && m.username === self.username
                      ? 'rounded-tr-sm bg-[#1E3A8A] text-white'
                      : 'rounded-tl-sm bg-white/70 text-[#1E3A8A]'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Input row */}
      <div className="border-t border-[#1E3A8A]/10 bg-white/40 p-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleMeditate}
            size="sm"
            variant="ghost"
            className="flex h-10 flex-shrink-0 items-center gap-1.5 rounded-full border border-[#1E3A8A]/15 bg-white/60 px-4 text-[#1E3A8A] hover:bg-white/90"
            title="Log a 5-minute sit — adds to your mindful minutes"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="text-[11px] font-semibold tracking-quiet">SIT 5m</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Say something quiet…"
            maxLength={280}
            className="h-10 flex-1 rounded-full border-[#1E3A8A]/15 bg-white/70 text-[#1E3A8A] placeholder:text-[#1E3A8A]/40"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            size="sm"
            className="h-10 flex-shrink-0 rounded-full bg-[#1E3A8A] px-4 text-white shadow-md hover:bg-[#1E3A8A]/90"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="mt-1.5 px-2 text-[10px] font-light text-[#1E3A8A]/50">
          Each message = +2 mindful minutes · Each sit = +5 minutes
        </p>
      </div>
    </div>
  )
}
