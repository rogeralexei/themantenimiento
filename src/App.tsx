import { MotionConfig } from 'motion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trust from './components/Trust'
import Services from './components/Services'
import Showcase from './components/Showcase'
import { Process, Policies } from './components/Process'
import { About, Testimonials } from './components/About'
import { Contact, Footer, WhatsAppFab } from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#servicios" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Showcase />
        <Process />
        <Policies />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  )
}
