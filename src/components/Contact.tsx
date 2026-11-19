import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Check, Mail, Phone } from 'lucide-react'
import { company, ctaImg, nav, services, whatsappLink } from '../data/site'
import { SERVICE_EVENT } from '../events'
import { Logo, Photo, Reveal, SectionLabel, SocialIcon } from './ui'

const propertyTypes = ['Residencial', 'Comercial', 'Industrial'] as const

export function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState<(typeof propertyTypes)[number]>('Residencial')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  // Pre-select a service when a "Cotizar" button elsewhere is clicked
  useEffect(() => {
    const onSelect = (e: Event) => {
      setService((e as CustomEvent<string>).detail)
      setSent(false)
    }
    window.addEventListener(SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SERVICE_EVENT, onSelect)
  }, [])

  const serviceOptions = services.map((s) => s.title)
  if (service && !serviceOptions.includes(service)) serviceOptions.unshift(service)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = [
      `Hola, soy ${name.trim()}. Me gustaría solicitar una cotización.`,
      `• Servicio: ${service || 'Por definir'}`,
      `• Propiedad: ${type}`,
      phone.trim() && `• Teléfono: ${phone.trim()}`,
      message.trim() && `• Detalles: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(whatsappLink(text), '_blank', 'noopener')
    setSent(true)
  }

  const field =
    'w-full border-b border-bone/20 bg-transparent py-3.5 text-[16px] text-bone placeholder:text-bone/35 transition-colors focus:border-signal focus:outline-none'

  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0 -z-10">
        <Photo src={ctaImg} alt="" className="h-full w-full opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel n="08" tone="light">Contacto</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-8 text-[clamp(3rem,8vw,7.5rem)]">
                Hablemos<span className="text-signal">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[42ch] text-[17px] leading-relaxed text-bone/70">
                Cuéntanos qué necesita tu propiedad. Agendamos una visita y te entregamos tu presupuesto <strong className="font-semibold text-bone">sin costo</strong>.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-12 border-t border-bone/15">
                {[
                  { icon: <SocialIcon.whatsapp className="h-5 w-5" />, label: 'WhatsApp', value: 'Envíanos un mensaje', href: whatsappLink(), ext: true },
                  { icon: <Phone className="h-5 w-5" />, label: 'Teléfono', value: company.phoneDisplay, href: company.phoneHref },
                  { icon: <Mail className="h-5 w-5" />, label: 'Correo', value: company.email, href: `mailto:${company.email}` },
                ].map((c) => (
                  <li key={c.label} className="border-b border-bone/15">
                    <a
                      href={c.href}
                      {...(c.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6"
                    >
                      <span className="text-signal">{c.icon}</span>
                      <span>
                        <span className="eyebrow block text-bone/45">{c.label}</span>
                        <span className="display-tight mt-1 block text-[clamp(1.2rem,2vw,1.6rem)] break-all transition-colors group-hover:text-signal">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-bone/40 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-signal" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Quote form */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <div className="border border-bone/12 bg-ink-2/80 p-6 backdrop-blur-sm md:p-10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[460px] flex-col justify-center"
                  >
                    <span className="grid h-14 w-14 place-items-center bg-signal text-ink">
                      <Check className="h-6 w-6" />
                    </span>
                    <h3 className="display-tight mt-8 text-[32px]">¡Gracias, {name.split(' ')[0] || 'listo'}!</h3>
                    <p className="mt-4 max-w-[36ch] text-bone/70">
                      Abrimos WhatsApp con tu solicitud lista. Solo presiona enviar y te responderemos a la brevedad.
                    </p>
                    <button onClick={() => setSent(false)} className="mt-8 self-start text-[14px] font-medium text-signal underline-offset-4 hover:underline">
                      Enviar otra solicitud
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="display-tight text-[28px]">Solicitar una cotización</h3>
                    <p className="mt-2 text-[14px] text-bone/55">Respuesta rápida · Presupuesto sin costo</p>

                    <div className="mt-8 space-y-6">
                      <label className="block">
                        <span className="eyebrow text-bone/50">Nombre completo</span>
                        <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="¿Cómo te llamas?" autoComplete="name" />
                      </label>
                      <label className="block">
                        <span className="eyebrow text-bone/50">Teléfono</span>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="10 dígitos" inputMode="tel" autoComplete="tel" />
                      </label>

                      <fieldset>
                        <legend className="eyebrow text-bone/50">Tipo de propiedad</legend>
                        <div className="mt-3 grid grid-cols-3 border-t border-l border-bone/15">
                          {propertyTypes.map((p) => (
                            <button
                              type="button"
                              key={p}
                              onClick={() => setType(p)}
                              aria-pressed={type === p}
                              className={`border-r border-b border-bone/15 py-3 text-[13px] font-medium transition-colors ${
                                type === p ? 'bg-bone text-ink' : 'text-bone/65 hover:text-bone'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <label className="block">
                        <span className="eyebrow text-bone/50">Servicio</span>
                        <select value={service} onChange={(e) => setService(e.target.value)} className={`${field} appearance-none [&>option]:bg-ink`}>
                          <option value="">Selecciona un servicio</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="eyebrow text-bone/50">¿Qué necesitas?</span>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={`${field} resize-none`} placeholder="Describe brevemente el trabajo" />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="group mt-10 flex w-full items-center justify-between bg-signal px-6 py-4 font-semibold text-ink transition-colors hover:bg-bone"
                    >
                      Enviar por WhatsApp
                      <SocialIcon.whatsapp className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                    </button>
                    <p className="mt-4 text-[12px] leading-relaxed text-bone/40">
                      Al enviar se abrirá WhatsApp con tu solicitud. También puedes escribirnos a {company.email}.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-10 md:px-10">
        <div className="grid gap-12 border-t border-bone/12 pt-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-[34ch] text-[14px] leading-relaxed text-bone/55">
              Mantenimiento residencial, comercial e industrial. Preventivo y correctivo, integral y particular.
            </p>
            <div className="mt-8 flex gap-3">
              {(
                [
                  ['facebook', company.social.facebook, 'Facebook'],
                  ['instagram', company.social.instagram, 'Instagram'],
                  ['youtube', company.social.youtube, 'YouTube'],
                ] as const
              ).map(([k, href, label]) => {
                const Icon = SocialIcon[k]
                return (
                  <a key={k} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center border border-bone/15 text-bone/70 transition-colors hover:border-signal hover:bg-signal hover:text-ink">
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                )
              })}
            </div>
          </div>

          <FooterCol title="Navegación" links={nav.map((n) => ({ label: n.label, href: n.href }))} className="md:col-span-2 md:col-start-6" />
          <FooterCol title="Servicios" links={services.map((s) => ({ label: s.title, href: '#servicios' }))} className="md:col-span-3" />
          <FooterCol
            title="Clientes"
            className="md:col-span-2"
            links={[
              { label: 'Solicita tu factura', href: company.links.factura },
              { label: '¿Cómo te atendimos?', href: company.links.opinion },
              { label: 'Únete a nuestro equipo', href: company.links.equipo },
              { label: 'Ayuda', href: '#contacto' },
            ]}
          />
        </div>

        {/* Oversized wordmark */}
        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p className="display whitespace-nowrap text-[8.9vw] leading-[0.8] text-bone/[0.07] 2xl:text-[8.2rem]">
            MAN<span className="text-signal/80">-</span>TENIMIENTO
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-bone/12 pt-6 text-[12.5px] text-bone/45 sm:flex-row">
          <p>© {year} {company.name}. Todos los derechos reservados.</p>
          <p>
            <a href={company.phoneHref} className="hover:text-bone">{company.phoneDisplay}</a>
            <span className="mx-2">·</span>
            <a href={`mailto:${company.email}`} className="hover:text-bone">{company.email}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links, className = '' }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h4 className="eyebrow text-bone/40">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="text-[14px] text-bone/75 transition-colors hover:text-signal"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WhatsAppFab() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8))
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] p-4 text-ink shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] md:right-8 md:bottom-8"
        >
          <SocialIcon.whatsapp className="h-6 w-6" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-all duration-500 group-hover:max-w-[160px] md:block">
            ¡Mándanos Whats!
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
