'use client'

import Image from "next/image"
import {
  ArrowRight,
  Wind,
  Crown,
  Flame,
  Clock,
  TrendingUp,
  Leaf,
  Users,
  Quote,
  Calendar,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* ---------- Static leaderboard data ---------- */
const leaders = [
  { rank: 1, name: "Aria K.",   minutes: 412, streak: 28, change: "+12m", hue: "from-amber-200 to-rose-200",  badge: "Crown" },
  { rank: 2, name: "Deven M.",  minutes: 388, streak: 21, change: "+8m",  hue: "from-sky-200 to-indigo-200",   badge: "Silver" },
  { rank: 3, name: "Mira S.",   minutes: 351, streak: 19, change: "+5m",  hue: "from-emerald-200 to-teal-200", badge: "Bronze" },
  { rank: 4, name: "Noah P.",   minutes: 327, streak: 15, change: "+3m",  hue: "from-violet-200 to-fuchsia-200" },
  { rank: 5, name: "Jaya R.",   minutes: 314, streak: 14, change: "+6m",  hue: "from-rose-200 to-orange-200" },
  { rank: 6, name: "Leo T.",    minutes: 298, streak: 12, change: "+2m",  hue: "from-cyan-200 to-blue-200" },
  { rank: 7, name: "Ines V.",   minutes: 281, streak: 11, change: "+9m",  hue: "from-lime-200 to-emerald-200" },
  { rank: 8, name: "Kai H.",    minutes: 264, streak: 10, change: "+4m",  hue: "from-fuchsia-200 to-pink-200" },
]

const stats = [
  { label: "Members meditating today", value: "8,214", icon: Users },
  { label: "Total quiet minutes",       value: "1.2M", icon: Clock },
  { label: "Average streak",            value: "17d",  icon: Flame },
  { label: "Longest streak",            value: "182d", icon: TrendingUp },
]

const teachers = [
  { name: "Sage Okafor",  style: "Vipassana · 12 yrs", hue: "from-amber-200 to-rose-200", initials: "SO" },
  { name: "Lena Hartwig", style: "Zen · 9 yrs",        hue: "from-sky-200 to-indigo-200", initials: "LH" },
  { name: "Ravi Menon",   style: "Pranayama · 15 yrs", hue: "from-emerald-200 to-teal-200", initials: "RM" },
  { name: "Yuki Tanaka",  style: "Mindfulness · 7 yrs", hue: "from-violet-200 to-fuchsia-200", initials: "YT" },
]

const testimonials = [
  {
    quote:
      "For the first time in years, my mornings start with breath instead of a feed. Quietude rewired what 'checking in' means.",
    name: "Maya Chen",
    role: "Product Designer, Berlin",
    hue: "from-amber-200 to-rose-200",
    initials: "MC",
  },
  {
    quote:
      "I joined for the leaderboard. I stayed because the silence was the first honest thing I'd felt in months.",
    name: "Daniel Osei",
    role: "Founder, Accra",
    hue: "from-sky-200 to-indigo-200",
    initials: "DO",
  },
  {
    quote:
      "The community doesn't perform wellness. It just is well. That distinction changed everything for me.",
    name: "Priya Iyer",
    role: "Therapist, Mumbai",
    hue: "from-emerald-200 to-teal-200",
    initials: "PI",
  },
]

const gatherings = [
  { day: "MON",  time: "06:30", title: "Sunrise Vipassana",   host: "Sage Okafor",   attending: 412 },
  { day: "WED",  time: "12:15", title: "Midday Reset (10m)",  host: "Lena Hartwig",  attending: 289 },
  { day: "THU",  time: "20:00", title: "Lunar Breathwork",    host: "Ravi Menon",    attending: 524 },
  { day: "SUN",  time: "08:00", title: "Silent Sangha",       host: "Yuki Tanaka",   attending: 367 },
]

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#E0F2FE] text-[#1E3A8A]">
      {/* Atmospheric background (shared across sections) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]" />
        <div className="absolute -left-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-[#7DD3FC] opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[40rem] w-[40rem] rounded-full bg-[#93C5FD] opacity-30 blur-3xl" />
      </div>

      {/* ================================================================== */}
      {/* NAV                                                                */}
      {/* ================================================================== */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="#" className="flex items-center gap-2.5" aria-label="Quietude home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/20">
            <Wind className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="text-[17px] font-semibold tracking-quiet text-[#1E3A8A]">QUIETUDE</span>
        </a>

        <nav className="hidden items-center gap-9 text-sm font-medium text-[#1E3A8A]/80 md:flex">
          <a href="#leaderboard" className="transition-colors hover:text-[#1E3A8A]">Leaderboard</a>
          <a href="#community"   className="transition-colors hover:text-[#1E3A8A]">Community</a>
          <a href="#" className="transition-colors hover:text-[#1E3A8A]">Teachers</a>
          <a href="#" className="transition-colors hover:text-[#1E3A8A]">Journal</a>
        </nav>

        <Button
          asChild
          variant="ghost"
          className="rounded-full border border-[#1E3A8A]/15 bg-white/50 px-5 text-[#1E3A8A] backdrop-blur-md hover:bg-white/80"
        >
          <a href="#">Sign in</a>
        </Button>
      </header>

      {/* ================================================================== */}
      {/* HERO — blueprint exact: split layout, image right, mobile stacked  */}
      {/* ================================================================== */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 pb-20 pt-6 md:px-10 md:pt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-16">
        {/* Left — text column */}
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E3A8A]/12 bg-white/55 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#1E3A8A]/70" />
            <span className="text-[11px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
              A quieter internet · est. 2026
            </span>
          </div>

          <h1
            className="mt-7 font-sans font-light leading-[1.05] tracking-quiet text-[#1E3A8A]"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Master the Art of
            <br />
            <span className="font-extrabold">Listening.</span>
          </h1>

          <p
            className="mt-6 max-w-md font-light leading-relaxed text-[#1E3A8A]/75"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.375rem)" }}
          >
            The only space where doing less puts you on top.
          </p>

          <div className="mt-9 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-[#1E3A8A] px-9 text-base font-semibold tracking-quiet text-white shadow-xl shadow-[#1E3A8A]/25 transition-all hover:bg-[#1E3A8A]/90"
            >
              <a href="#leaderboard" className="flex items-center gap-2">
                Enter the Quiet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right — meditation image (split layout desktop, stacked mobile) */}
        <div className="relative w-full max-w-xl flex-1 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-[#1E3A8A]/20 ring-1 ring-white/40 md:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/hero-meditation.png"
              alt="Yoga practitioner in meditation pose on a calm beach at sunrise"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/25 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* LEADERBOARD                                                        */}
      {/* ================================================================== */}
      <section id="leaderboard" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1E3A8A]/12 bg-white/55 px-4 py-1.5 backdrop-blur-md">
            <Crown className="h-3.5 w-3.5 text-[#1E3A8A]/70" />
            <span className="text-[11px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
              Weekly Leaderboard
            </span>
          </span>
          <h2 className="mt-5 font-sans text-3xl font-light leading-tight tracking-quiet text-[#1E3A8A] md:text-5xl">
            The quiet ones <span className="font-extrabold">on top.</span>
          </h2>
          <p className="mt-4 text-base font-light text-[#1E3A8A]/70 md:text-lg">
            Ranked by total mindful minutes this week. No likes, no clout — just breath.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/50 bg-white/45 p-5 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-[#1E3A8A]/60">
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-semibold uppercase tracking-quiet">{label}</span>
              </div>
              <p className="mt-2 font-sans text-3xl font-bold tracking-quiet text-[#1E3A8A] md:text-4xl">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Reorder for podium feel: 2nd, 1st, 3rd */}
          {[leaders[1], leaders[0], leaders[2]].map((l, idx) => {
            const isFirst = l.rank === 1
            return (
              <div
                key={l.name}
                className={`relative flex flex-col items-center rounded-3xl border p-7 text-center backdrop-blur-md transition-all ${
                  isFirst
                    ? "border-[#c8a96a]/40 bg-gradient-to-b from-white/70 to-[#fef3c7]/40 shadow-2xl shadow-[#c8a96a]/20 md:-translate-y-4"
                    : "border-white/50 bg-white/45 shadow-lg shadow-[#1E3A8A]/10"
                }`}
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
                  {l.name.split(" ").map((w) => w[0]).join("")}
                </span>

                <h3 className="mt-4 text-lg font-bold text-[#1E3A8A]">{l.name}</h3>
                <p className="text-xs font-medium text-[#1E3A8A]/60">Rank #{l.rank}</p>

                <div className="mt-5 grid w-full grid-cols-3 gap-2 border-t border-[#1E3A8A]/10 pt-4 text-center">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/50">Minutes</p>
                    <p className="text-base font-bold text-[#1E3A8A]">{l.minutes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/50">Streak</p>
                    <p className="text-base font-bold text-[#1E3A8A]">{l.streak}d</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/50">Change</p>
                    <p className="text-base font-bold text-emerald-600">{l.change}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Full table — ranks 4+ */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/50 bg-white/45 backdrop-blur-md">
          <div className="border-b border-[#1E3A8A]/10 px-6 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
              Rest of the field
            </h3>
          </div>
          <ul className="divide-y divide-[#1E3A8A]/8">
            {leaders.slice(3).map((l) => (
              <li
                key={l.name}
                className="grid grid-cols-12 items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/40 sm:px-6"
              >
                <span className="col-span-1 text-center text-sm font-bold text-[#1E3A8A]/50">
                  #{l.rank}
                </span>
                <span
                  className={`col-span-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${l.hue} text-[10px] font-bold text-[#1E3A8A] ring-2 ring-white/60`}
                >
                  {l.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <span className="col-span-4 text-sm font-semibold text-[#1E3A8A] sm:col-span-5">
                  {l.name}
                </span>
                <div className="col-span-3 hidden items-center gap-1.5 text-xs font-medium text-[#1E3A8A]/60 sm:flex">
                  <Flame className="h-3.5 w-3.5" />
                  {l.streak}d streak
                </div>
                <div className="col-span-3 flex items-center justify-end gap-3 sm:col-span-2">
                  <span className="text-sm font-bold text-[#1E3A8A]">{l.minutes}m</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    {l.change}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {/* Your row */}
          <div className="border-t-2 border-dashed border-[#1E3A8A]/20 bg-[#1E3A8A]/5 px-4 py-4 sm:px-6">
            <div className="grid grid-cols-12 items-center gap-3">
              <span className="col-span-1 text-center text-sm font-bold text-[#1E3A8A]/60">#42</span>
              <span className="col-span-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-[10px] font-bold text-[#1E3A8A] ring-2 ring-white/60">
                YOU
              </span>
              <span className="col-span-4 text-sm font-bold text-[#1E3A8A] sm:col-span-5">
                You · 17d streak
              </span>
              <div className="col-span-3 hidden items-center gap-1.5 text-xs font-medium text-[#1E3A8A]/60 sm:flex">
                <TrendingUp className="h-3.5 w-3.5" /> Up 6 places
              </div>
              <div className="col-span-3 flex items-center justify-end gap-3 sm:col-span-2">
                <span className="text-sm font-bold text-[#1E3A8A]">214m</span>
                <span className="rounded-full bg-[#1E3A8A] px-2 py-0.5 text-[10px] font-bold text-white">
                  +18m
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* COMMUNITY                                                          */}
      {/* ================================================================== */}
      <section id="community" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1E3A8A]/12 bg-white/55 px-4 py-1.5 backdrop-blur-md">
            <Users className="h-3.5 w-3.5 text-[#1E3A8A]/70" />
            <span className="text-[11px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
              The Quiet Community
            </span>
          </span>
          <h2 className="mt-5 font-sans text-3xl font-light leading-tight tracking-quiet text-[#1E3A8A] md:text-5xl">
            12,400 people <span className="font-extrabold">being still, together.</span>
          </h2>
          <p className="mt-4 text-base font-light text-[#1E3A8A]/70 md:text-lg">
            A members-only sangha. No comments. No DMs. Just shared silence and gentle accountability.
          </p>
        </div>

        {/* Gatherings / live sessions */}
        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-quiet text-[#1E3A8A]">This week's gatherings</h3>
              <p className="text-sm font-light text-[#1E3A8A]/60">Drop-in sessions hosted by senior teachers</p>
            </div>
            <a href="#" className="hidden text-sm font-semibold text-[#1E3A8A]/70 transition-colors hover:text-[#1E3A8A] sm:inline">
              View calendar →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gatherings.map((g) => (
              <div
                key={g.title}
                className="group rounded-2xl border border-white/50 bg-white/45 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/70 hover:shadow-xl hover:shadow-[#1E3A8A]/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-[#1E3A8A]/8 px-3 py-1">
                    <Calendar className="h-3 w-3 text-[#1E3A8A]/70" />
                    <span className="text-[10px] font-bold uppercase tracking-quiet text-[#1E3A8A]">{g.day} · {g.time}</span>
                  </div>
                </div>
                <h4 className="mt-4 text-base font-bold text-[#1E3A8A]">{g.title}</h4>
                <p className="text-xs font-medium text-[#1E3A8A]/60">with {g.host}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#1E3A8A]/10 pt-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#1E3A8A]/60">
                    <Users className="h-3 w-3" /> {g.attending} attending
                  </div>
                  <span className="text-[11px] font-bold text-[#1E3A8A] opacity-0 transition-opacity group-hover:opacity-100">
                    Reserve →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teachers */}
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-quiet text-[#1E3A8A]">Guided by senior teachers</h3>
              <p className="text-sm font-light text-[#1E3A8A]/60">Average 10+ years of practice lineage</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {teachers.map((t) => (
              <div
                key={t.name}
                className="group flex flex-col items-center rounded-2xl border border-white/50 bg-white/45 p-6 text-center backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/70 hover:shadow-xl hover:shadow-[#1E3A8A]/10"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${t.hue} text-sm font-bold text-[#1E3A8A] ring-4 ring-white/60`}
                >
                  {t.initials}
                </span>
                <h4 className="mt-4 text-sm font-bold text-[#1E3A8A]">{t.name}</h4>
                <p className="mt-1 text-[11px] font-medium text-[#1E3A8A]/60">{t.style}</p>
                <button className="mt-4 w-full rounded-full border border-[#1E3A8A]/15 bg-white/60 py-1.5 text-[11px] font-semibold text-[#1E3A8A] opacity-0 transition-opacity group-hover:opacity-100">
                  Follow practice
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold tracking-quiet text-[#1E3A8A]">From the sangha</h3>
            <p className="text-sm font-light text-[#1E3A8A]/60">Anonymous unless shared with consent</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative flex flex-col rounded-3xl border border-white/50 bg-white/45 p-7 backdrop-blur-md"
              >
                <Quote className="h-7 w-7 text-[#1E3A8A]/20" />
                <blockquote className="mt-3 flex-1 text-[15px] font-light leading-relaxed text-[#1E3A8A]/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#1E3A8A]/10 pt-4">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.hue} text-[10px] font-bold text-[#1E3A8A] ring-2 ring-white/60`}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#1E3A8A]">{t.name}</p>
                    <p className="text-[11px] font-medium text-[#1E3A8A]/60">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-20 overflow-hidden rounded-[2rem] border border-[#1E3A8A]/15 bg-gradient-to-br from-[#1E3A8A] to-[#3b5bb5] p-10 text-center text-white shadow-2xl shadow-[#1E3A8A]/30 md:p-16">
          <Leaf className="mx-auto h-8 w-8 text-white/70" />
          <h3 className="mt-4 font-sans text-2xl font-light leading-tight tracking-quiet md:text-4xl">
            Membership is invite-only.
            <br />
            <span className="font-extrabold">But quiet doors open weekly.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm font-light text-white/70 md:text-base">
            Request an invitation. We respond every Sunday at sunset, your local time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-white px-9 text-base font-semibold tracking-quiet text-[#1E3A8A] shadow-xl transition-all hover:bg-white/90"
            >
              <a href="#" className="flex items-center gap-2">
                Request invitation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <span className="text-xs font-light text-white/60">~ 240 invitations sent last week</span>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}
      <footer className="relative z-10 border-t border-[#1E3A8A]/10 bg-[#E0F2FE]/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A8A] text-white">
              <Wind className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-semibold tracking-quiet text-[#1E3A8A]">QUIETUDE</span>
          </div>
          <p className="text-xs font-light text-[#1E3A8A]/50">
            © 2026 Quietude · A quieter internet, one breath at a time.
          </p>
          <div className="flex items-center gap-5 text-xs font-medium text-[#1E3A8A]/60">
            <a href="#" className="hover:text-[#1E3A8A]">Privacy</a>
            <a href="#" className="hover:text-[#1E3A8A]">Sound</a>
            <a href="#" className="hover:text-[#1E3A8A]">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
