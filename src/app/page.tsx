'use client'

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#E0F2FE] text-[#1E3A8A]">
      {/* -------------------------------------------------------------- */}
      {/* Full-bleed landing page image (the user-provided visual)       */}
      {/* -------------------------------------------------------------- */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-meditation.png"
          alt="Luxury meditation community landing page — calm beach, meditation pose, glassmorphism leaderboard card"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Left-side darkening gradient so the overlaid text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E0F2FE]/85 via-[#E0F2FE]/30 to-transparent" />
        {/* Bottom fade for mobile legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/45 via-transparent to-transparent md:from-transparent" />
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Minimal top bar — brand mark + single CTA                     */}
      {/* -------------------------------------------------------------- */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a
          href="#"
          className="flex items-center gap-2 text-[17px] font-semibold tracking-quiet text-[#1E3A8A] drop-shadow-sm"
          aria-label="Quietude home"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#1E3A8A]" />
          QUIETUDE
        </a>

        <Button
          asChild
          size="sm"
          className="rounded-full border border-[#1E3A8A]/20 bg-white/50 px-5 text-[#1E3A8A] backdrop-blur-md hover:bg-white/80"
        >
          <a href="#">Sign in</a>
        </Button>
      </header>

      {/* -------------------------------------------------------------- */}
      {/* Hero text overlay — sits on the image's left negative space    */}
      {/* -------------------------------------------------------------- */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-4 md:px-10">
        <div className="max-w-xl">
          {/* Headline */}
          <h1
            className="font-sans font-light leading-[1.05] tracking-quiet text-[#1E3A8A] drop-shadow-sm"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
          >
            Master the Art of
            <br />
            <span className="font-extrabold">Listening.</span>
          </h1>

          {/* Subtext */}
          <p
            className="mt-6 max-w-md font-light leading-relaxed text-[#1E3A8A]/80 drop-shadow-sm"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
          >
            The only space where doing less puts you on top.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-[#1E3A8A] px-9 text-base font-semibold tracking-quiet text-white shadow-xl shadow-[#1E3A8A]/30 transition-all hover:bg-[#1E3A8A]/90 hover:shadow-2xl"
            >
              <a href="#" className="flex items-center gap-2">
                Enter the Quiet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
