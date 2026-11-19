import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { services, whatsappLink, type Service } from '../data/site'
import { Photo, Reveal, SectionLabel, SocialIcon } from './ui'
import { selectService } from '../events'

const ease = [0.16, 1, 0.3, 1] as const

function ServiceCTAs({ s }: { s: Service }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#contacto"
        onClick={() => selectService(s.title)}
        className="group inline-flex items-center gap-3 bg-signal px-5 py-3 text-[13.5px] font-semibold text-ink transition-colors hover:bg-bone"
      >
        Cotizar {s.title.toLowerCase()}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
      </a>
      <a
        href={whatsappLink(`Hola, me interesa el servicio de ${s.title}.`)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 border border-bone/25 px-5 py-3 text-[13.5px] font-medium text-bone transition-colors hover:border-bone"
      >
        <SocialIcon.whatsapp className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  )
}

export default function Services() {
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState<number | null>(0)
  const s = services[active]

  return (
    <section id="servicios" className="blueprint relative bg-ink text-bone">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel n="02" tone="light">Servicios</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-8 text-[clamp(2.6rem,6.4vw,6.2rem)]">
                Qué <span className="text-signal">hacemos.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] text-[16px] leading-relaxed text-bone/65">
              Ocho especialidades bajo un mismo equipo. Una sola llamada para cuidar tu casa, tu negocio o tus instalaciones.
            </p>
          </Reveal>
        </div>

        {/* ── Desktop: editorial index + sticky visual ── */}
        <div className="mt-20 hidden gap-12 lg:grid lg:grid-cols-12">
          <div className="col-span-6">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={s.id}
                    initial={{ clipPath: 'inset(0 0 0 100%)' }}
                    animate={{ clipPath: 'inset(0 0 0 0%)' }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.9, ease }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.4, ease }}
                      className="h-full w-full"
                    >
                      <Photo src={s.img} alt={s.title} sizes="50vw" className="h-full w-full" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

                <div className="absolute top-6 right-6 left-6 flex items-start justify-between">
                  <span className="eyebrow bg-ink/70 px-3 py-2 text-bone backdrop-blur-sm">Servicio {s.n} / 08</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, ease }}
                    className="absolute right-0 bottom-0 left-0 p-8 xl:p-10"
                  >
                    <h3 className="display-tight text-[clamp(2rem,3vw,3rem)]">{s.title}</h3>
                    <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-bone/80">{s.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {s.includes.map((x) => (
                        <li key={x} className="flex items-center gap-2 text-[13px] text-bone/85">
                          <Check className="h-3.5 w-3.5 text-signal" /> {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <ServiceCTAs s={s} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <ul className="col-span-6" role="tablist" aria-label="Servicios">
            {services.map((item, i) => {
              const on = i === active
              return (
                <li key={item.id}>
                  <button
                    role="tab"
                    aria-selected={on}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t py-7 text-left transition-colors duration-500 ${
                      on ? 'border-signal' : 'border-bone/12 hover:border-bone/40'
                    } ${i === services.length - 1 ? 'border-b border-b-bone/12' : ''}`}
                  >
                    <span className={`font-display text-[13px] font-semibold transition-colors ${on ? 'text-signal' : 'text-bone/35'}`}>
                      {item.n}
                    </span>
                    <span>
                      <span
                        className={`display-tight block text-[clamp(1.6rem,2.5vw,2.5rem)] transition-all duration-500 ease-out-expo ${
                          on ? 'translate-x-2 text-bone' : 'text-bone/45 group-hover:text-bone/80'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`mt-1 block text-[14px] transition-all duration-500 ${
                          on ? 'translate-x-2 text-bone/60' : 'text-bone/0'
                        }`}
                      >
                        {item.short}
                      </span>
                    </span>
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 ${
                        on ? 'rotate-0 border-signal bg-signal text-ink' : 'rotate-45 border-bone/20 text-bone/50'
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ── Mobile / tablet: expandable editorial list ── */}
        <ul className="mt-14 lg:hidden">
          {services.map((item, i) => {
            const on = openMobile === i
            return (
              <li key={item.id} className="border-t border-bone/12 last:border-b">
                <button
                  onClick={() => setOpenMobile(on ? null : i)}
                  aria-expanded={on}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-6 text-left"
                >
                  <span className={`font-display text-[12px] font-semibold ${on ? 'text-signal' : 'text-bone/40'}`}>{item.n}</span>
                  <span className="display-tight text-[26px] sm:text-[32px]">{item.title}</span>
                  <Plus className={`h-5 w-5 transition-transform duration-500 ${on ? 'rotate-45 text-signal' : 'text-bone/60'}`} />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        <div className="aspect-[16/10] overflow-hidden">
                          <Photo src={item.img} alt={item.title} sizes="100vw" className="h-full w-full" />
                        </div>
                        <p className="mt-6 text-[15.5px] leading-relaxed text-bone/75">{item.description}</p>
                        <ul className="mt-5 space-y-2">
                          {item.includes.map((x) => (
                            <li key={x} className="flex items-center gap-2 text-[14px] text-bone/85">
                              <Check className="h-3.5 w-3.5 text-signal" /> {x}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-7">
                          <ServiceCTAs s={item} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
