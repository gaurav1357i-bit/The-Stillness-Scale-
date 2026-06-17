'use client'

import { useEffect, useRef, useState } from 'react'
import { Crown, Flame, TrendingUp, Radio } from 'lucide-react'
import type { LeaderEntry } from './chat-space'

interface LiveLeaderboardProps {
  entries: LeaderEntry[]
  /** When true, shows a pulsing "LIVE" indicator near the heading */
  pulsing: boolean
}

/* ---------- Static stats (not driven by socket — for the marketing feel) ---------- */
const stats = [
  { label: 'Members meditating today', value: '8,214' },
  { label: 'Total quiet minutes',       value: '1.2M' },
  { label: 'Average streak',            value: '17d'  },
  { label: 'Longest streak',            value: '182d' },
]

export function LiveLeaderboard({ entries, pulsing }: LiveLeaderboardProps) {
  // Track which entries changed rank to trigger a subtle flash
  const prevMinutesRef = useRef<Record<string, number>>({})
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const flashed = new Set<string>()
    entries.forEach((e) => {
      const prev = prevMinutesRef.current[e.username]
      if (prev !== undefined && prev !== e.minutes) {
        flashed.add(e.username)
      }
    })
    // update prev map
    const next: Record<string, number> = {}
    entries.forEach((e) => (next[e.username] = e.minutes))
    prevMinutesRef.current = next

    if (flashed.size > 0) {
      // Defer setState to avoid synchronous setState-in-effect cascading renders
      const t1 = setTimeout(() => setFlashIds(flashed), 0)
      const t2 = setTimeout(() => setFlashIds(new Set()), 800)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [entries])

  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3, 10)

  // Podium display order: rank 2, rank 1, rank 3
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean)

  return (
    <div>
      {/* Section heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#1E3A8A]/12 bg-white/55 px-4 py-1.5 backdrop-blur-md">
          <Crown className="h-3.5 w-3.5 text-[#1E3A8A]/70" />
          <span className="text-[11px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
            Live Leaderboard
          </span>
          {pulsing && (
            <span className="ml-1 flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <Radio className="h-2.5 w-2.5 animate-pulse" />
              updating
            </span>
          )}
        </span>
        <h2 className="mt-5 font-sans text-3xl font-light leading-tight tracking-quiet text-[#1E3A8A] md:text-5xl">
          The quiet ones <span className="font-extrabold">on top.</span>
        </h2>
        <p className="mt-4 text-base font-light text-[#1E3A8A]/70 md:text-lg">
          Ranked by total mindful minutes. Updates in real time as the community chats &amp; sits below.
        </p>
      </div>

      {/* Stats strip */}
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/50 bg-white/45 p-5 backdrop-blur-md"
          >
            <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/60">
              {label}
            </p>
            <p className="mt-2 font-sans text-3xl font-bold tracking-quiet text-[#1E3A8A] md:text-4xl">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Podium */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {podiumOrder.map((l) => {
          if (!l) return null
          const isFirst = l.rank === 1
          const isFlashing = flashIds.has(l.username)
          return (
            <div
              key={l.username}
              className={`relative flex flex-col items-center rounded-3xl border p-7 text-center backdrop-blur-md transition-all duration-500 ${
                isFirst
                  ? 'border-[#c8a96a]/40 bg-gradient-to-b from-white/70 to-[#fef3c7]/40 shadow-2xl shadow-[#c8a96a]/20 md:-translate-y-4'
                  : 'border-white/50 bg-white/45 shadow-lg shadow-[#1E3A8A]/10'
              } ${isFlashing ? 'ring-2 ring-emerald-400/60' : ''}`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                {isFirst ? (
                  <span className="flex items-center gap-1 rounded-full bg-[#c8a96a] px-3 py-1 text-[10px] font-bold uppercase tracking-quiet text-white shadow-md">
                    <Crown className="h-3 w-3" /> Champion
                  </span>
                ) : (
                  <span className="rounded-full bg-[#1E3A8A] px-3 py-1 text-[10px] font-bold uppercase tracking-quiet text-white shadow-md">
                    Rank {l.rank}
                  </span>
                )}
              </div>

              <span
                className={`mt-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${l.hue} font-sans text-lg font-bold text-[#1E3A8A] ring-4 ring-white/70`}
              >
                {l.username
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#1E3A8A]">
                {l.username}
                {l.isYou && <span className="ml-1.5 text-[10px] font-bold text-emerald-700">(you)</span>}
              </h3>
              <p className="text-xs font-medium text-[#1E3A8A]/60">Rank #{l.rank}</p>

              <div className="mt-5 grid w-full grid-cols-2 gap-2 border-t border-[#1E3A8A]/10 pt-4 text-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/50">Minutes</p>
                  <p className={`text-base font-bold text-[#1E3A8A] transition-colors ${isFlashing ? 'text-emerald-600' : ''}`}>
                    {l.minutes}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/50">Streak</p>
                  <p className="text-base font-bold text-[#1E3A8A]">{l.streak}d</p>
                </div>
              </div>

              {l.online && (
                <span className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> online now
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Rest of the field */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-white/50 bg-white/45 backdrop-blur-md">
        <div className="border-b border-[#1E3A8A]/10 px-6 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
            Rest of the field
          </h3>
        </div>
        <ul className="divide-y divide-[#1E3A8A]/8">
          {rest.map((l) => {
            const isFlashing = flashIds.has(l.username)
            return (
              <li
                key={l.username}
                className={`grid grid-cols-12 items-center gap-3 px-4 py-3.5 transition-colors sm:px-6 ${
                  isFlashing ? 'bg-emerald-400/10' : 'hover:bg-white/40'
                } ${l.isYou ? 'bg-[#1E3A8A]/5' : ''}`}
              >
                <span className="col-span-1 text-center text-sm font-bold text-[#1E3A8A]/50">
                  #{l.rank}
                </span>
                <span
                  className={`col-span-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${l.hue} text-[10px] font-bold text-[#1E3A8A] ring-2 ring-white/60`}
                >
                  {l.username
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span className="col-span-5 text-sm font-semibold text-[#1E3A8A]">
                  {l.username}
                  {l.isYou && <span className="ml-1.5 text-[10px] font-bold text-emerald-700">(you)</span>}
                  {l.online && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
                  )}
                </span>
                <div className="col-span-2 hidden items-center gap-1.5 text-xs font-medium text-[#1E3A8A]/60 sm:flex">
                  <Flame className="h-3.5 w-3.5" />
                  {l.streak}d
                </div>
                <div className="col-span-4 flex items-center justify-end gap-2 sm:col-span-2">
                  <span className={`text-sm font-bold transition-colors ${isFlashing ? 'text-emerald-600' : 'text-[#1E3A8A]'}`}>
                    {l.minutes}m
                  </span>
                  {isFlashing && (
                    <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                      <TrendingUp className="h-2.5 w-2.5" />+2
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
