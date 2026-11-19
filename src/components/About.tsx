import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { about, testimonials } from '../data/site'
import { Photo, Reveal, SectionLabel } from './ui'

const ease = [0.16, 1, 0.3, 1] as const

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ySmall = useTransform(scrollYProgress, [0, 1], ['18%', '-18%'])

  return (
    <section id="nosotros" ref={ref} className="bg-bone">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Image composition */}
          <div className="relative lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[4/5] w-[86%] overflow-hidden">
                <Photo src={about.img} alt="Supervisión de obra con planos" sizes="(min-width:1024px) 42vw, 86vw" className="h-full w-full" />
              </div>
            </Reveal>
            <motion.div
              style={{ y: ySmall }}
              className="absolute right-0 bottom-[-6%] w-[46%] border-[10px] border-bone"
            >
              <div className="aspect-square overflow-hidden">
                <Photo src={about.img2} alt="Residencia con mantenimiento integral" sizes="25vw" className="h-full w-full" />
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <Reveal>
              <SectionLabel n="06">Nosotros</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-8 text-[clamp(2.3rem,4.6vw,4.4rem)]">
                Certidumbre en <span className="italic font-light">cada</span> contrato.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <h3 className="eyebrow flex items-center gap-2 text-ink">
                  <span className="h-2 w-2 bg-signal" /> Misión
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{about.mission}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <h3 className="eyebrow flex items-center gap-2 text-ink">
                  <span className="h-2 w-2 bg-signal" /> Visión
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{about.vision}</p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-ink/15 pt-8">
                <h3 className="eyebrow text-ink/50">Nuestros valores</h3>
                <p className="display-tight mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[clamp(1.4rem,2.2vw,2rem)]">
                  {about.values.map((v, i) => (
                    <span key={v} className="flex items-center gap-3">
                      {v}
                      {i < about.values.length - 1 && <span className="text-signal">/</span>}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length)

  return (
    <section id="testimonios" className="border-t border-ink/10 bg-bone">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <SectionLabel n="07">Testimonios</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-8 max-w-[26ch] text-[15px] leading-relaxed text-ink/60">
                Lo que dicen quienes ya nos confiaron su propiedad.
              </p>
            </Reveal>
            <div className="mt-10 hidden gap-2 lg:flex">
              <button onClick={() => go(-1)} aria-label="Anterior" className="grid h-12 w-12 place-items-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-bone">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={() => go(1)} aria-label="Siguiente" className="grid h-12 w-12 place-items-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-bone">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="relative min-h-[340px] md:min-h-[300px]" aria-live="polite">
              <svg viewBox="0 0 48 36" className="mb-8 h-9 w-12 text-signal" aria-hidden>
                <path fill="currentColor" d="M0 36V22C0 9.6 6 2.3 18 0l2 5.4C13.4 7.4 10.2 11.3 10 17h9v19zm28 0V22C28 9.6 34 2.3 46 0l2 5.4c-6.6 2-9.8 5.9-10 11.6h9v19z"/>
              </svg>
              <AnimatePresence mode="wait">
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease }}
                  className="relative"
                >
                  <div className="flex items-center gap-1" aria-label={`Calificación: ${t.rating} de 5`}>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`h-4 w-4 ${k < t.rating ? 'fill-signal text-signal' : 'text-ink/20'}`} />
                    ))}
                    <span className="ml-3 eyebrow text-ink/50">«{t.title}»</span>
                  </div>
                  <blockquote className="display-tight mt-8 max-w-[28ch] text-[clamp(1.7rem,3.4vw,3.2rem)] !leading-[1.12]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center bg-ink font-display text-[15px] font-semibold text-bone">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-[14px] text-ink/55">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Index */}
            <div className="mt-14 grid grid-cols-3 border-t border-ink/15">
              {testimonials.map((x, k) => (
                <button
                  key={x.name}
                  onClick={() => setI(k)}
                  aria-label={`Testimonio de ${x.name}`}
                  className="group relative pt-5 text-left"
                >
                  <span className={`absolute top-[-1px] left-0 h-[2px] bg-signal transition-all duration-700 ease-out-expo ${k === i ? 'w-full' : 'w-0'}`} />
                  <span className={`font-display text-[12px] font-semibold ${k === i ? 'text-signal' : 'text-ink/35'}`}>0{k + 1}</span>
                  <span className={`mt-1 block text-[14px] font-medium transition-colors ${k === i ? 'text-ink' : 'text-ink/45 group-hover:text-ink/80'}`}>
                    {x.name} <span className="hidden font-normal text-ink/45 sm:inline">· {x.role}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
