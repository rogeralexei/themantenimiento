import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/site'
import { Photo, Reveal, SectionLabel } from './ui'

const filters = ['Todos', 'Residencial', 'Comercial', 'Industrial'] as const
type Filter = (typeof filters)[number]

// Asymmetric editorial rhythm: wide / narrow-offset, narrow / wide-offset…
const layout = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-28',
  'lg:col-span-5',
  'lg:col-span-7 lg:mt-28',
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-28',
]
const aspect = ['aspect-[4/3]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[4/5]']

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group col-span-12 ${layout[i % layout.length]}`}
    >
      <div className={`relative overflow-hidden bg-ink-3 ${aspect[i % aspect.length]}`}>
        <Photo
          src={p.img}
          alt={p.title}
          sizes="(min-width:1024px) 55vw, 100vw"
          className="h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
        <span className="eyebrow absolute top-5 left-5 bg-bone px-3 py-2 !text-[10px] text-ink">{p.category}</span>
        <span className="absolute right-5 bottom-5 grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-signal text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 border-t border-ink/15 pt-5">
        <span className="font-display text-[13px] font-semibold text-ink/35">{String(i + 1).padStart(2, '0')}</span>
        <div>
          <p className="eyebrow !text-[10px] text-signal-deep">{p.service}</p>
          <h3 className="display-tight mt-2 text-[clamp(1.4rem,2vw,1.9rem)]">{p.title}</h3>
          <p className="mt-2 max-w-[48ch] text-[14.5px] leading-relaxed text-ink/60">{p.text}</p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Showcase() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const list = useMemo(() => (filter === 'Todos' ? projects : projects.filter((p) => p.category === filter)), [filter])

  return (
    <section id="proyectos" className="bg-bone">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel n="03">Proyectos</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-8 text-[clamp(2.4rem,5.4vw,5.2rem)]">
                Trabajo que <br className="hidden sm:block" />
                se nota.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex flex-wrap gap-2 lg:justify-end" role="tablist" aria-label="Filtrar proyectos">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors ${
                    filter === f ? 'text-bone' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {filter === f && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 bg-ink" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-16 grid grid-cols-12 gap-x-8 gap-y-16 md:mt-20 lg:gap-x-12">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.title} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
