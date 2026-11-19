import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { process, policyFrequencies, services } from '../data/site'
import { Button, Photo, Reveal, SectionLabel } from './ui'
import { selectService } from '../events'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="bg-bone-2">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel n="04">Cómo trabajamos</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-8 text-[clamp(2.2rem,4.6vw,4.4rem)]">Simple, claro y con garantía.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] leading-relaxed text-ink/65">
              Sin incertidumbre: sabes quién entra a tu propiedad, qué se va a hacer y cuánto cuesta antes de empezar.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16 md:mt-24">
          <div className="absolute top-0 right-0 left-0 hidden h-px bg-ink/15 md:block" />
          <motion.div style={{ width }} className="absolute top-0 left-0 hidden h-[2px] -translate-y-[0.5px] bg-signal md:block" />
          <ol className="grid gap-px md:grid-cols-4 md:gap-10">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <li className="relative border-t border-ink/15 pt-8 md:border-t-0 md:pt-10">
                  <span className="absolute -top-[5px] left-0 hidden h-[9px] w-[9px] bg-ink md:block" />
                  <span className="display text-[clamp(3rem,5vw,4.5rem)] text-ink/10">{step.n}</span>
                  <h3 className="display-tight mt-4 text-[24px]">{step.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink/65">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Policies() {
  const [freq, setFreq] = useState(2)
  const polizas = services.find((s) => s.id === 'polizas')!

  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[380px] lg:min-h-[640px]">
          <Photo src={polizas.img} alt="Edificio de departamentos" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/40" />
          <div className="absolute bottom-6 left-5 md:left-10">
            <p className="eyebrow text-bone/80">Para casas y departamentos en renta</p>
          </div>
        </div>

        <div className="blueprint flex flex-col justify-center px-5 py-20 md:px-14 lg:py-24 xl:px-20">
          <Reveal>
            <SectionLabel n="05" tone="light">Pólizas de mantenimiento</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-8 text-[clamp(2.2rem,4.2vw,4rem)]">
              Tú decides. <br />
              <span className="text-signal">No gastes de más.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-bone/70">
              Pólizas particulares o integrales, diseñadas para tu inmueble. Mantenimiento preventivo programado para que tu propiedad
              conserve su valor y tus inquilinos, su tranquilidad.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow mt-10 text-bone/50">Frecuencia</p>
            <div className="mt-4 grid grid-cols-3 border-t border-l border-bone/15 sm:grid-cols-6">
              {policyFrequencies.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setFreq(i)}
                  aria-pressed={freq === i}
                  className={`relative border-r border-b border-bone/15 px-2 py-4 text-[13px] font-medium transition-colors duration-300 ${
                    freq === i ? 'bg-signal text-ink' : 'text-bone/70 hover:bg-bone/5 hover:text-bone'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#contacto"
                onClick={() => selectService(`Pólizas de mantenimiento (${policyFrequencies[freq].toLowerCase()})`)}
              >
                Cotizar póliza {policyFrequencies[freq].toLowerCase()}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
