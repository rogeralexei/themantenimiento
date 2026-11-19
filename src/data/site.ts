/**
 * ───────────────────────────────────────────────────────────────
 *  The Man-Tenimiento · Site content
 *  Toda la información del sitio vive aquí. Para cambiar textos,
 *  teléfonos o fotografías, edita este archivo.
 *
 *  FOTOGRAFÍAS: se usan imágenes de Unsplash (licencia libre) como
 *  punto de partida. Se recomienda reemplazarlas por fotografías
 *  reales de trabajos de la empresa: pon los archivos en /public/img
 *  y cambia `img: unsplash('...')` por `img: '/img/archivo.jpg'`.
 * ───────────────────────────────────────────────────────────────
 */

export const unsplash = (id: string) => `https://images.unsplash.com/${id}`

export const company = {
  name: 'The Man-Tenimiento',
  tagline: 'Mantenimiento residencial, comercial e industrial',
  phoneDisplay: '(+52) 221 229 0462',
  phoneHref: 'tel:+522212290462',
  whatsappNumber: '522212290462',
  email: 'info@theman-tenimiento.com',
  social: {
    facebook: 'https://www.facebook.com/theman.tenimiento/',
    instagram: 'https://www.instagram.com/theman_tenimiento/',
    youtube: 'https://www.youtube.com/channel/UC8z2_OBG9_P6AaxyPWU7MeQ',
  },
  links: {
    factura: 'https://theman-tenimiento.com/solicita-tu-factura/',
    equipo: 'https://theman-tenimiento.com/unete-a-nuestro-equipo/',
    opinion: 'https://theman-tenimiento.com/como-te-atendimos/',
  },
}

export const whatsappLink = (text = 'Hola, quiero ponerme en contacto con ustedes.') =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(text)}`

export const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Por qué elegirnos', href: '#por-que' },
  { label: 'Contacto', href: '#contacto' },
]

export const hero = {
  eyebrow: 'Preventivo y correctivo · Integral y particular',
  titleLines: ['El mantenimiento', 'de tu propiedad,', 'en buenas manos.'],
  body: 'Soluciones integrales de mantenimiento residencial, comercial e industrial. Calidad, confianza y atención profesional en cada proyecto.',
  img: unsplash('photo-1757524492552-d47a66a2b63e'),
}

export const values = [
  { title: 'Precios competitivos', text: 'Cotizaciones claras y justas. Pagas por lo que tu propiedad realmente necesita, sin sorpresas.' },
  { title: 'Garantía en los trabajos', text: 'Todos nuestros trabajos cuentan con garantía. Respondemos por la calidad de lo que entregamos.' },
  { title: 'Atención amable', text: 'Personal formal, puntual y capacitado en cada una de sus áreas. Trato respetuoso en tu hogar o negocio.' },
  { title: 'Respuesta rápida', text: 'Atendemos tu solicitud con prontitud para que un problema pequeño no se convierta en uno grande.' },
  { title: 'Presupuestos sin costo', text: 'Agenda una visita, revisamos tu espacio y te entregamos un presupuesto sin compromiso.' },
]

export const origin =
  'Nacimos de la necesidad tangible y constante de servicios de calidad: trabajos con garantía, sin la incertidumbre ni la inseguridad de tratar con extraños o con personal que no está capacitado y pone en riesgo tu patrimonio o a tu familia.'

export type Service = {
  id: string
  n: string
  title: string
  short: string
  description: string
  includes: string[]
  img: string
}

export const services: Service[] = [
  {
    id: 'pintura',
    n: '01',
    title: 'Pintura',
    short: 'Interiores, exteriores e impermeabilización.',
    description:
      'Dale color a tus espacios, desde esa habitación desocupada hasta el negocio de tus sueños. Preparamos superficies, aplicamos acabados duraderos y protegemos tu inmueble de la humedad.',
    includes: ['Interiores y exteriores', 'Impermeabilizantes', 'Fachadas y locales comerciales'],
    img: unsplash('photo-1717281234297-3def5ae3eee1'),
  },
  {
    id: 'plomeria',
    n: '02',
    title: 'Plomería',
    short: 'Instalaciones, fugas y equipos hidroneumáticos.',
    description:
      '¿Cubeta bajo el lavabo? ¿Hidroneumático en tu negocio? Detectamos y reparamos fugas, renovamos instalaciones y colocamos solo los mejores equipos, instalados por expertos.',
    includes: ['Reparación de fugas', 'Equipos hidroneumáticos', 'Instalaciones nuevas'],
    img: unsplash('photo-1749532125405-70950966b0e5'),
  },
  {
    id: 'jardineria',
    n: '03',
    title: 'Jardinería',
    short: 'Diseño de ambientes y riego automático.',
    description:
      'Deja de soñar con ese riego automático en tu jardín y hazlo realidad. Te asesoramos en el diseño de ambientes y damos mantenimiento constante a tus áreas verdes.',
    includes: ['Riego automático', 'Diseño de ambientes', 'Mantenimiento de áreas verdes'],
    img: unsplash('photo-1597201278257-3687be27d954'),
  },
  {
    id: 'electricidad',
    n: '04',
    title: 'Electricidad',
    short: 'Instalaciones seguras para hogar y negocio.',
    description:
      'No arriesgues tus equipos electrónicos, electrodomésticos o equipos comerciales con instalaciones defectuosas. Diagnosticamos, corregimos y te asesoramos.',
    includes: ['Diagnóstico de instalaciones', 'Tableros y cableado', 'Instalaciones comerciales'],
    img: unsplash('photo-1621905251189-08b45d6a269e'),
  },
  {
    id: 'construccion',
    n: '05',
    title: 'Construcción y remodelación',
    short: 'Del plano a la obra terminada.',
    description:
      '¿Te preocupa alguna grieta, quieres levantar muros colindantes o remodelar tu negocio? Plasmamos tu idea en papel y la materializamos en concreto.',
    includes: ['Remodelación de espacios', 'Reparación de grietas', 'Muros y obra civil'],
    img: unsplash('photo-1618832515490-e181c4794a45'),
  },
  {
    id: 'piscinas',
    n: '06',
    title: 'Piscinas e hidromasajes',
    short: 'Construcción, equipamiento y mantenimiento.',
    description:
      'Tener tu propia piscina o mantener la que ya tienes. Equipamos y renovamos tu cuarto de máquinas, con pólizas de mantenimiento a tu medida.',
    includes: ['Cuarto de máquinas', 'Mantenimiento periódico', 'Renovación y equipamiento'],
    img: unsplash('photo-1613977257365-aaae5a9817ff'),
  },
  {
    id: 'polizas',
    n: '07',
    title: 'Pólizas de mantenimiento',
    short: 'Planes a la medida, sin gastar de más.',
    description:
      'Si tienes un departamento o casa en renta, tenemos la póliza de mantenimiento a tu medida: particular o integral, con la frecuencia que tú decidas.',
    includes: ['Particular o integral', 'Para casas y departamentos en renta', 'Frecuencia flexible'],
    img: unsplash('photo-1545324418-cc1a3fa10c00'),
  },
  {
    id: 'otros',
    n: '08',
    title: 'Otros servicios',
    short: 'Trabajos de oficio convencionales y no convencionales.',
    description:
      '¿No encuentras lo que necesitas? Atendemos trabajos de oficio convencionales y no convencionales. Escríbenos y te decimos cómo podemos ayudarte.',
    includes: ['Reparaciones generales', 'Proyectos especiales', 'Asesoría sin costo'],
    img: unsplash('photo-1581783898377-1c85bf937427'),
  },
]

export const policyFrequencies = ['Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual', 'Multianual']

/**
 * GALERÍA DE PROYECTOS
 * Ejemplos ilustrativos por tipo de trabajo. Sustituir por proyectos
 * reales de la empresa (foto, categoría, título y descripción).
 */
export type Project = {
  title: string
  category: 'Residencial' | 'Comercial' | 'Industrial'
  service: string
  text: string
  img: string
}

export const projects: Project[] = [
  { title: 'Remodelación de cocina', category: 'Residencial', service: 'Construcción y remodelación', text: 'Renovación integral de cocina: instalaciones, muebles y acabados.', img: unsplash('photo-1556911220-bff31c812dba') },
  { title: 'Mantenimiento de alberca', category: 'Residencial', service: 'Piscinas e hidromasajes', text: 'Limpieza, equipo de filtrado y póliza de mantenimiento periódico.', img: unsplash('photo-1613152184920-bc1c4ab7fd1d') },
  { title: 'Fachada y pintura exterior', category: 'Comercial', service: 'Pintura', text: 'Preparación de muros, impermeabilización y pintura de fachada.', img: unsplash('photo-1479839672679-a46483c0e7c8') },
  { title: 'Tablero eléctrico', category: 'Industrial', service: 'Electricidad', text: 'Diagnóstico y corrección de instalaciones para equipos de trabajo.', img: unsplash('photo-1758101755915-462eddc23f57') },
  { title: 'Muros y acabados', category: 'Comercial', service: 'Construcción y remodelación', text: 'Reparación de grietas, aplanados y acabados en local comercial.', img: unsplash('photo-1768839725085-829e6ac7ac26') },
  { title: 'Jardín y riego automático', category: 'Residencial', service: 'Jardinería', text: 'Diseño de ambiente, áreas verdes y sistema de riego automático.', img: unsplash('photo-1784293449032-200db587788c') },
]

export const process = [
  { n: '01', title: 'Contáctanos', text: 'Escríbenos por WhatsApp, llámanos o envía el formulario. Cuéntanos qué necesitas.' },
  { n: '02', title: 'Visita y presupuesto', text: 'Agendamos una visita, revisamos tu espacio y te entregamos un presupuesto sin costo.' },
  { n: '03', title: 'Ejecución', text: 'Personal capacitado y puntual realiza el trabajo con materiales y equipos de calidad.' },
  { n: '04', title: 'Garantía', text: 'Entregamos con garantía y recomendaciones para que el problema no se repita.' },
]

export const about = {
  mission:
    'Brindar certidumbre a nuestros clientes en los trabajos de oficio convencionales y no convencionales, con garantía, calidad y profesionalismo en cada contrato. De esta forma, clientes y colaboradores generan una sinergia positiva.',
  vision:
    'Ser la empresa referente en mantenimiento preventivo y correctivo, con una red de colaboradores continuamente capacitados y certificados en todas las áreas, alcanzando un alto nivel competitivo en tecnología, procesos y seguridad a nivel nacional.',
  values: ['Seguridad', 'Confianza', 'Lealtad', 'Profesionalismo', 'Honestidad'],
  img: unsplash('photo-1772442198624-4fc4d7281e89'),
  img2: unsplash('photo-1580587771525-78b9dba3b914'),
}

export const testimonials = [
  {
    title: 'Muy bien hechos',
    quote: 'Repararon todo a la perfección y me dieron recomendaciones para evitar que me suceda nuevamente. Me dieron garantía de sus trabajos.',
    name: 'Ricardo C.',
    role: 'Abogado',
    rating: 5,
  },
  {
    title: 'Muy formales y amables',
    quote: 'La atención que nos brindaron fue estupenda. ¡Llegaron puntuales, que es muy importante para nosotros! 100% recomendados.',
    name: 'Elba F.',
    role: 'Contadora',
    rating: 5,
  },
  {
    title: 'Calidad, precio y seriedad',
    quote: 'Valoro mucho la calidad y la seriedad del personal. Superaron mis expectativas al 100%. Se nota la capacitación que tienen en sus áreas.',
    name: 'Virgilio S.',
    role: 'Bienes raíces',
    rating: 4,
  },
]

export const ctaImg = unsplash('photo-1748063578185-3d68121b11ff')
