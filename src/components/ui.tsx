import { useState, type ReactNode, type ComponentProps } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

/* ───────────── Photo ─────────────
   Responsive image with Unsplash srcset and a graceful fallback
   (charcoal blueprint surface) if a photo fails to load. */
const isUnsplash = (src: string) => src.startsWith('https://images.unsplash.com/')
const withParams = (src: string, w: number) =>
  `${src}?auto=format&fit=crop&w=${w}&q=${w > 1600 ? 75 : 80}`

export function Photo({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <div role="img" aria-label={alt} className={`blueprint bg-ink-3 ${className}`} />
  }
  const srcSet = isUnsplash(src)
    ? [640, 1024, 1600, 2400].map((w) => `${withParams(src, w)} ${w}w`).join(', ')
    : undefined
  return (
    <img
      src={isUnsplash(src) ? withParams(src, 1600) : src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`bg-ink-3 object-cover ${className}`}
    />
  )
}

/* ───────────── Logo ─────────────
   Modernised wordmark: the hyphen in "Man-Tenimiento" becomes the
   brand's signal bar — the one place the pun lives visually. */
export function Logo({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const text = tone === 'light' ? 'text-bone' : 'text-ink'
  return (
    <span className={`inline-flex flex-col leading-none ${text} ${className}`} aria-label="The Man-Tenimiento">
      <span className="eyebrow !text-[9px] !tracking-[0.42em] opacity-70" aria-hidden>
        The
      </span>
      <span className="display !leading-none text-[19px] !tracking-[-0.02em]" aria-hidden>
        MAN
        <span className="mx-[3px] inline-block h-[4px] w-[12px] translate-y-[-5px] bg-signal" />
        TENIMIENTO
      </span>
    </span>
  )
}

/* ───────────── Buttons ───────────── */
type BtnProps = ComponentProps<'a'> & { variant?: 'signal' | 'ghost-light' | 'ghost-dark' | 'ink'; icon?: boolean }

export function Button({ variant = 'signal', icon = true, className = '', children, ...rest }: BtnProps) {
  const styles = {
    signal: 'bg-signal text-ink hover:bg-bone',
    ink: 'bg-ink text-bone hover:bg-signal hover:text-ink',
    'ghost-light': 'border border-bone/35 text-bone hover:border-bone hover:bg-bone hover:text-ink',
    'ghost-dark': 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone',
  }[variant]
  return (
    <a
      className={`group inline-flex items-center justify-between gap-6 px-6 py-4 text-[14px] font-semibold tracking-[-0.005em] transition-colors duration-300 ${styles} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span className="relative h-4 w-4 overflow-hidden">
          <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-hover:translate-x-full" />
          <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </a>
  )
}

/* ───────────── Reveal ─────────────
   Subtle fade-and-rise as content enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 28,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Section label: "— 02 / Servicios" */
export function SectionLabel({ n, children, tone = 'dark' }: { n: string; children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${tone === 'dark' ? 'text-ink' : 'text-bone'}`}>
      <span className="h-px w-8 bg-signal" />
      <span className="text-signal">{n}</span>
      <span className="opacity-60">/</span>
      <span>{children}</span>
    </div>
  )
}

/* ───────────── Social icons (brand marks aren't in Lucide) ───────────── */
export const SocialIcon = {
  facebook: (p: ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.55V4.63A20.6 20.6 0 0 0 14.25 4.5c-2.24 0-3.77 1.37-3.77 3.88v2.18H7.95v2.94h2.53V21z" />
    </svg>
  ),
  instagram: (p: ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (p: ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8M10 15V9l5.2 3z" />
    </svg>
  ),
  whatsapp: (p: ComponentProps<'svg'>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.97L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2m0 18.06a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.07.89.9-3-.2-.31a8.17 8.17 0 1 1 6.84 3.74m4.48-6.12c-.24-.12-1.45-.72-1.68-.8s-.39-.12-.55.12-.63.8-.78.97-.29.18-.53.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.1-.5.11-.11.25-.29.37-.43a1.7 1.7 0 0 0 .25-.41.45.45 0 0 0-.02-.43c-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c.58.25 1.04.4 1.4.51a3.37 3.37 0 0 0 1.54.1 2.53 2.53 0 0 0 1.66-1.17 2.05 2.05 0 0 0 .14-1.17c-.06-.1-.22-.16-.46-.28" />
    </svg>
  ),
}
