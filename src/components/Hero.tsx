import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { hero } from '../data/site'
import { Button, Photo } from './ui'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="inicio" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-bone">
      {/* Photography */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease }}
          className="h-full w-full"
        >
          <Photo src={hero.img} alt="Residencia moderna iluminada al atardecer" priority className="h-full w-full" />
        </motion.div>
      </motion.div>
      {/* Overlays for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
      <div className="grain absolute inset-0 -z-10" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pt-32 pb-8 md:px-10 md:pb-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="eyebrow mb-7 flex items-center gap-3 text-bone/80"
        >
          <span className="h-px w-10 bg-signal" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="display max-w-[15ch] text-[clamp(2.3rem,9.4vw,8.6rem)]">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease }}
              >
                {i === hero.titleLines.length - 1 ? (
                  <>
                    en buenas <span className="text-signal">manos.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-bone/15 pt-8 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease }}
            className="max-w-[46ch] text-[16px] leading-relaxed text-bone/80 md:col-span-5 md:text-[17px]"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
            className="flex flex-col gap-3 sm:flex-row md:col-span-7 md:justify-end"
          >
            <Button href="#contacto" className="sm:min-w-[260px]">Solicitar una cotización</Button>
            <Button href="#servicios" variant="ghost-light" className="sm:min-w-[260px]">Conocer nuestros servicios</Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 hidden items-center justify-between text-[12px] text-bone/55 md:flex"
        >
          <div className="flex items-center gap-8">
            {['Residencial', 'Comercial', 'Industrial'].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="font-semibold text-bone/40">0{i + 1}</span>
                <span className="eyebrow !tracking-[0.18em] text-bone/75">{s}</span>
              </span>
            ))}
          </div>
          <a href="#por-que" className="group flex items-center gap-3 text-bone/70 hover:text-bone">
            <span className="eyebrow !tracking-[0.18em]">Descubre más</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-bone/25 transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
              <ArrowDown className="h-3.5 w-3.5" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
