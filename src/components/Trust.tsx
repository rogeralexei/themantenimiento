import { values, origin } from '../data/site'
import { Reveal, SectionLabel } from './ui'

function Marquee() {
  const row = [...values, ...values]
  return (
    <div className="relative overflow-hidden border-y border-ink bg-signal py-5 text-ink md:py-6" aria-hidden>
      <div className="flex w-max animate-marquee items-center">
        {row.map((v, i) => (
          <span key={i} className="flex items-center">
            <span className="display-tight whitespace-nowrap px-8 text-[clamp(1.6rem,3.4vw,2.8rem)]">{v.title}</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden>
              <path d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Trust() {
  return (
    <section id="por-que" className="bg-bone">
      <Marquee />

      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel n="01">Por qué elegirnos</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-8 text-[clamp(2.4rem,5vw,4.6rem)]">
                Motivos por los que nos vas a <span className="italic font-light">preferir.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[44ch] text-[16.5px] leading-relaxed text-ink/70">{origin}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-5 border-l-2 border-signal pl-5">
                <p className="text-[14px] leading-snug text-ink/80">
                  <strong className="font-semibold text-ink">Preventivo y correctivo.</strong>
                  <br />
                  Integral y particular.
                </p>
              </div>
            </Reveal>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <li className="group grid grid-cols-[3.2rem_1fr] items-baseline gap-x-4 border-t border-ink/15 py-7 transition-colors duration-500 last:border-b hover:border-ink md:grid-cols-[5rem_1fr_1fr] md:py-9">
                  <span className="font-display text-[14px] font-semibold text-ink/35 transition-colors duration-500 group-hover:text-signal">
                    0{i + 1}
                  </span>
                  <h3 className="display-tight text-[clamp(1.6rem,2.6vw,2.4rem)] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                    {v.title}
                  </h3>
                  <p className="col-start-2 mt-3 max-w-[38ch] text-[15px] leading-relaxed text-ink/65 md:col-start-3 md:mt-0">{v.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
