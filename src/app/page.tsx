'use client'

import Image from "next/image"
import { ArrowRight, Sparkles, Wind, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ---------- Leaderboard data (static for the hero demo) ---------- */
const leaders = [
  { name: "Aria K.",  minutes: 412, streak: 28, hue: "from-amber-200 to-rose-200" },
  { name: "Deven M.", minutes: 388, streak: 21, hue: "from-sky-200 to-indigo-200" },
  { name: "Mira S.",  minutes: 351, streak: 19, hue: "from-emerald-200 to-teal-200" },
  { name: "Noah P.",  minutes: 327, streak: 15, hue: "from-violet-200 to-fuchsia-200" },
]

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#E0F2FE] text-[#1E3A8A]">
      {/* -------------------------------------------------------------- */}
      {/* Atmospheric background layers                                  */}
      {/* -------------------------------------------------------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Soft radial sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]" />
        {/* Breathing orb — top-left */}
        <div className="absolute -left-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-[#7DD3FC] opacity-40 blur-3xl animate-quiet-breathe" />
        {/* Breathing orb — bottom-right */}
        <div className="absolute -bottom-40 -right-24 h-[40rem] w-[40rem] rounded-full bg-[#93C5FD] opacity-35 blur-3xl animate-quiet-breathe" style={{ animationDelay: "1.5s" }} />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E3A8A 1px, transparent 1px), linear-gradient(to bottom, #1E3A8A 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Top navigation                                                 */}
      {/* -------------------------------------------------------------- */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a
          href="#"
          className="group flex items-center gap-2.5"
          aria-label="Quietude home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/20">
            <Wind className="h-4 w-4" strokeWidth={2.2} />
            <span className="absolute inset-0 rounded-full ring-1 ring-white/30" />
          </span>
          <span className="text-[17px] font-semibold tracking-quiet text-[#1E3A8A]">
            QUIETUDE
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-sm font-medium text-[#1E3A8A]/80 md:flex">
          <a href="#" className="transition-colors hover:text-[#1E3A8A]">Practice</a>
          <a href="#" className="transition-colors hover:text-[#1E3A8A]">Community</a>
          <a href="#" className="transition-colors hover:text-[#1E3A8A]">Teachers</a>
          <a href="#" className="transition-colors hover:text-[#1E3A8A]">Journal</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm font-medium text-[#1E3A8A]/80 transition-colors hover:text-[#1E3A8A] sm:inline"
          >
            Sign in
          </a>
          <Button
            asChild
            variant="ghost"
            className="rounded-full border border-[#1E3A8A]/15 bg-white/40 px-5 text-[#1E3A8A] backdrop-blur-md hover:bg-white/70"
          >
            <a href="#">Open app</a>
          </Button>
        </div>
      </header>

      {/* -------------------------------------------------------------- */}
      {/* Hero — split layout (desktop) / stacked (mobile)              */}
      {/* -------------------------------------------------------------- */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 pb-16 pt-6 md:px-10 md:pt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pb-24 lg:pt-16">
        {/* ----- Left: text column ----- */}
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Eyebrow chip */}
          <div className="animate-quiet-fade-up inline-flex items-center gap-2 rounded-full border border-[#1E3A8A]/12 bg-white/55 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#1E3A8A]/70" />
            <span className="text-[11px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/70">
              A quieter internet · est. 2026
            </span>
          </div>

          {/* Headline — desktop 56–64px, tablet 40–48px, mobile 32–36px */}
          <h1
            className="animate-quiet-fade-up delay-100 mt-7 font-sans font-light leading-[1.05] tracking-quiet text-[#1E3A8A]"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
            }}
          >
            Master the Art of
            <br />
            <span className="font-extrabold">Listening.</span>
          </h1>

          {/* Subtext — desktop 20–24px, tablet 18px, mobile 16px */}
          <p
            className="animate-quiet-fade-up delay-200 mt-6 max-w-md font-light leading-relaxed text-[#1E3A8A]/75"
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.375rem)",
            }}
          >
            The only space where doing less puts you on top. A members-only
            meditation community for the modern mind — no notifications, no
            noise, just breath.
          </p>

          {/* CTA cluster */}
          <div className="animate-quiet-fade-up delay-300 mt-9 flex w-full flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-[#1E3A8A] px-9 text-base font-semibold tracking-quiet text-white shadow-xl shadow-[#1E3A8A]/25 transition-all hover:bg-[#1E3A8A]/90 hover:shadow-2xl hover:shadow-[#1E3A8A]/30"
            >
              <a href="#" className="flex items-center gap-2">
                Enter the Quiet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-14 rounded-full px-6 text-base font-medium text-[#1E3A8A]/80 hover:bg-white/40 hover:text-[#1E3A8A]"
            >
              <a href="#">Take a 60-sec tour</a>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="animate-quiet-fade-up delay-400 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-6 lg:items-start lg:text-left">
            <div className="flex -space-x-2.5">
              {[
                "from-amber-200 to-rose-200",
                "from-sky-200 to-indigo-200",
                "from-emerald-200 to-teal-200",
                "from-violet-200 to-fuchsia-200",
                "from-rose-200 to-orange-200",
              ].map((hue, i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${hue} text-[10px] font-bold text-[#1E3A8A] ring-2 ring-[#E0F2FE]`}
                >
                  {["AK", "DM", "MS", "NP", "JR"][i]}
                </span>
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#c8a96a] text-[#c8a96a]" />
                ))}
                <span className="ml-1.5 text-xs font-semibold text-[#1E3A8A]">4.9</span>
              </div>
              <p className="text-xs font-medium text-[#1E3A8A]/60">
                Loved by 12,400 quiet members worldwide
              </p>
            </div>
          </div>
        </div>

        {/* ----- Right: hero image + floating glass card ----- */}
        <div className="animate-quiet-fade-up delay-200 relative w-full max-w-xl flex-1 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-[#1E3A8A]/20 ring-1 ring-white/40 sm:aspect-[5/5] md:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/hero-meditation.png"
              alt="Yoga practitioner in meditation pose on a calm beach at sunrise"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Top-down fade so text on image stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/30 via-transparent to-white/5" />
          </div>

          {/* Floating glassmorphism leaderboard card (desktop + tablet) */}
          <div className="absolute -left-6 bottom-8 w-[260px] animate-quiet-float hidden sm:block">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/60">
                    This Week
                  </p>
                  <p className="text-sm font-bold text-[#1E3A8A]">Quiet Leaders</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#1E3A8A]/10 px-2.5 py-1 text-[10px] font-semibold text-[#1E3A8A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {leaders.slice(0, 4).map((l, i) => (
                  <div key={l.name} className="flex items-center gap-3">
                    <span className="w-4 text-center text-[11px] font-bold text-[#1E3A8A]/50">
                      {i + 1}
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${l.hue} text-[9px] font-bold text-[#1E3A8A] ring-1 ring-white/60`}
                    >
                      {l.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#1E3A8A]">{l.name}</span>
                        <span className="text-[11px] font-bold text-[#1E3A8A]/70">{l.minutes}m</span>
                      </div>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[#1E3A8A]/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#60A5FA]"
                          style={{ width: `${(l.minutes / 412) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/40 pt-3">
                <span className="text-[10px] font-medium text-[#1E3A8A]/60">
                  You · <span className="font-bold text-[#1E3A8A]">214m</span>
                </span>
                <span className="text-[10px] font-semibold text-[#1E3A8A]/60">
                  Rank 42 ↑
                </span>
              </div>
            </div>
          </div>

          {/* Floating streak chip (desktop + tablet) */}
          <div className="absolute -right-3 top-8 animate-quiet-float hidden sm:block" style={{ animationDelay: "1.2s" }}>
            <div className="glass-chip flex items-center gap-2 rounded-full px-4 py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A8A] text-[11px] font-bold text-white">
                28
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/60">Day streak</p>
                <p className="text-[11px] font-bold text-[#1E3A8A]">Aria K. · still going</p>
              </div>
            </div>
          </div>

          {/* Mobile-only simplified stat chip (below the image) */}
          <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
            <div className="glass-chip flex items-center gap-2 rounded-full px-4 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E3A8A] text-[10px] font-bold text-white">12.4k</span>
              <span className="text-xs font-semibold text-[#1E3A8A]">quiet members</span>
            </div>
            <div className="glass-chip flex items-center gap-2 rounded-full px-4 py-2">
              <Star className="h-3.5 w-3.5 fill-[#c8a96a] text-[#c8a96a]" />
              <span className="text-xs font-semibold text-[#1E3A8A]">4.9 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Brand strip — subtle social proof                             */}
      {/* -------------------------------------------------------------- */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 md:px-10">
        <div className="flex flex-col items-center gap-4 border-t border-[#1E3A8A]/10 pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-quiet text-[#1E3A8A]/50">
            As practiced by teams at
          </p>
          <div className="no-scrollbar flex w-full items-center justify-center gap-8 overflow-x-auto md:justify-end">
            {["Lumen", "Northwind", "Aether", "Vela", "Calm Co.", "Studio 8"].map((brand) => (
              <span
                key={brand}
                className="whitespace-nowrap text-sm font-semibold tracking-quiet text-[#1E3A8A]/40"
              >
                {brand.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
