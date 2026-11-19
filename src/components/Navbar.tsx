import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X, Phone } from 'lucide-react'
import { company, nav } from '../data/site'
import { Logo, SocialIcon } from './ui'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 600 && y > prev && !open)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid || open ? 'border-b border-white/[0.06] bg-ink/92 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10" aria-label="Principal">
          <a href="#inicio" onClick={() => setOpen(false)} className="relative z-10">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative py-2 text-[13.5px] font-medium text-bone/75 transition-colors hover:text-bone"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={company.phoneHref}
              className="hidden items-center gap-2 px-3 py-2 text-[13px] font-medium text-bone/75 transition-colors hover:text-bone xl:flex"
            >
              <Phone className="h-3.5 w-3.5" /> {company.phoneDisplay}
            </a>
            <a
              href="#contacto"
              className="hidden bg-signal px-5 py-3 text-[13.5px] font-semibold text-ink transition-colors duration-300 hover:bg-bone sm:inline-flex"
            >
              Solicitar una cotización
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 grid h-11 w-11 place-items-center text-bone lg:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="blueprint fixed inset-0 z-40 flex flex-col bg-ink px-5 pt-28 pb-10 lg:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/10"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display-tight flex items-baseline justify-between py-4 text-[34px] text-bone"
                  >
                    {item.label}
                    <span className="font-sans text-[11px] font-medium tracking-widest text-signal">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-5">
              <a href="#contacto" onClick={() => setOpen(false)} className="block bg-signal px-6 py-4 text-center font-semibold text-ink">
                Solicitar una cotización
              </a>
              <div className="flex items-center justify-between text-sm text-bone/70">
                <a href={company.phoneHref}>{company.phoneDisplay}</a>
                <div className="flex gap-4">
                  <a href={company.social.facebook} aria-label="Facebook"><SocialIcon.facebook className="h-5 w-5" /></a>
                  <a href={company.social.instagram} aria-label="Instagram"><SocialIcon.instagram className="h-5 w-5" /></a>
                  <a href={company.social.youtube} aria-label="YouTube"><SocialIcon.youtube className="h-5 w-5" /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
