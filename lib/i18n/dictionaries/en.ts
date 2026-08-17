import type { Dictionary } from "./es";

/**
 * Copy en inglés.
 *
 * No es una traducción literal del español. Dos cosas se adaptaron a
 * propósito para un lector de fuera de Chile:
 *
 * - Las referencias a la UF y a la boleta de honorarios se explican en vez de
 *   nombrarse, porque fuera de Chile no significan nada.
 * - Los montos de ejemplo en pesos se dejan en dólares, que es la moneda que
 *   ve este visitante.
 *
 * Lo que NO se adaptó: el servicio sigue siendo remoto y con base en
 * Santiago. Prometer cobertura mundial sería una afirmación que el negocio
 * no puede sostener.
 */
export const en: Dictionary = {
  nav: {
    services: "Services",
    howWeWork: "How we work",
    plans: "Plans",
    faq: "FAQ",
    cta: "Book an assessment",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    switchTo: "Español",
  },

  hero: {
    sectionLabel: "Introduction",
    eyebrow: "Remote IT support for small businesses in Santiago, Chile",
    h1: "Your business shouldn't stop because a computer went down.",
    lead: "We provide remote IT support to small and mid-sized companies in Santiago: we connect and fix it, with no waiting for a technician to show up. One number to write to, and people who already know your business when they answer.",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See plans",
    stats: [
      { value: "2 hours", label: "Response time during business hours" },
      { value: "100% remote", label: "No waiting for an on-site visit" },
      { value: "Month to month", label: "No minimum term, no exit penalty" },
    ],
  },

  problem: {
    title: "The problem",
    pains: [
      "Our system went down Friday at six and the vendor got back to us on Monday.",
      "Nobody knows which password belongs to what, or where the licences ended up.",
      "I pay for maintenance every month and I'm still the one calling the technician.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Four ways to stop putting out fires.",
    lead: "We work remotely, so you're never waiting for someone to show up. Take one or all of them: the plan is built around what your company actually needs.",
    linkPrefix: "View",
  },

  howWeWork: {
    eyebrow: "How we work",
    title: "Three steps, no surprises along the way.",
    steps: [
      {
        number: "01",
        title: "Free assessment",
        description:
          "We review your systems in a 30-minute video call. We tell you what's failing and what you're exposed to, with no strings attached.",
      },
      {
        number: "02",
        title: "A plan built for you",
        description:
          "We put together a proposal with a fixed monthly price, built for your company rather than pulled from a template. You only pay for what you'll use.",
      },
      {
        number: "03",
        title: "Ongoing support",
        description:
          "We connect to your machines and fix things remotely. A fixed team knows your business, so you're not explaining your problem to someone new every time.",
      },
    ],
  },

  pricing: {
    eyebrow: "Plans",
    title: "You pay for the computers we look after.",
    lead: "A fixed monthly fee plus a rate per machine. Move the slider to the size of your company and you'll see the exact price: no brackets where you end up paying for machines you don't have.",
    sliderLabel: "How many computers does your company have?",
    sliderHelp: "Count laptops, desktops and servers.",
    sliderAria: "Number of computers",
    unitsSuffix: "computers",
    maxSuffix: "or more",
    recommended: "Recommended",
    perMonth: "/month",
    // Los nombres de los planes no se traducen: son nombres de producto y el
    // contrato, la factura y el correo con el cliente van a decir "Negocio".
    plans: {
      esencial: {
        name: "Esencial",
        description:
          "For starting to get IT in order, with the essentials covered.",
        features: [
          "Help desk during business hours, by phone and email",
          "Response within 4 business hours",
          "Daily backup of your files",
          "Security review once a month",
        ],
      },
      negocio: {
        name: "Negocio",
        description:
          "The one we recommend for companies of 15 to 40 people in Santiago.",
        features: [
          "Everything in the Esencial plan",
          "Response within 2 business hours",
          "Automatic monitoring of your systems, with alerts on failure",
          "A fixed point of contact who knows your business",
          "We manage your licences and their renewals",
        ],
      },
      integral: {
        name: "Integral",
        description:
          "For when IT is already part of the business and can't go down.",
        features: [
          "Everything in the Negocio plan",
          "Out-of-hours emergency cover, through the agreed channels",
          "Maintenance of your website or online store included",
          "Cybersecurity review and backup restore test every quarter",
          "Monthly review meeting with your point of contact",
        ],
      },
    },
    clpEquivalent: "About ${amount} CLP per month for {units} machines",
    usdEquivalent: "About US${amount} per month for {units} machines",
    breakdown: "{base} UF fixed + {perUnit} UF per machine",
    planCta: "Book an assessment",
    planCtaSr: "plan",
    extrasTitle: "What's billed separately, said before you sign.",
    extras: {
      licensesStrong:
        "Licences are not included in the plan and don't go through us.",
      licensesBody1: "Microsoft 365, antivirus, cloud backup and any software you use are purchased",
      licensesStrong2: "directly in your company's name",
      licensesBody2:
        ", on your payment method. We tell you what you need, help you buy it and manage it, but the vendor bills you directly: that way we add no markup, and the day you leave the licence is already yours. It usually runs between US$9 and US$15 per person per month.",
      projectsStrong: "Projects are quoted separately.",
      projectsBody:
        "Building your website, setting up an online store or automating a process are jobs with a beginning and an end: they're quoted once, at a fixed price. We don't fold them into the monthly fee, because that would force you into a long contract, and we don't work that way.",
      ownershipBody1: "Everything stays",
      ownershipStrong: "in your company's name",
      ownershipBody2:
        ", not ours. If you ever leave, it leaves with you. No forced annual contract.",
    },
    disclaimer:
      "Prices are set in UF, the Chilean inflation-indexed unit. The peso figure is indicative, using the UF value as of {date}. The service is provided by a sole trader and documented with an electronic fee receipt, which is exempt from Chilean VAT. Below {min} machines, hourly support usually works out better: we'll tell you so in the assessment.",
    disclaimerUsd:
      "Prices are set in UF, the Chilean inflation-indexed unit that keeps the fee level in real terms. The US dollar figure is indicative, converted using the UF value as of {date} and the exchange rate for the same day; billing is in Chilean pesos. The service is provided by a sole trader and documented with an electronic fee receipt, which is exempt from Chilean VAT. Below {min} machines, hourly support usually works out better: we'll tell you so in the assessment.",
  },

  commitments: {
    eyebrow: "Our commitment",
    title: "Three things we put in writing.",
    items: [
      {
        title: "The accounts are yours",
        body: "Domains, licences and accounts are registered in your company's name from day one. If you leave, you take everything with you, documented and at no exit cost.",
      },
      {
        title: "No minimum term",
        body: "The service is month to month. You end it with 30 days' notice and there's no penalty for leaving before any deadline.",
      },
      {
        title: "The price is published",
        body: "What you see in the calculator is what you're charged. You buy licences directly and projects are quoted separately, at a fixed price.",
      },
    ],
    clientsTitle: "Clients",
  },

  faq: {
    eyebrow: "FAQ",
    title: "The questions people actually ask.",
    items: [
      {
        question: "Do you handle everything, or just the website?",
        answer:
          "Whatever you need. The monthly plan covers your company's IT support, networks and security. Building your website or automating a process are projects with a beginning and an end: they're quoted separately, once, at a fixed price.",
      },
      {
        question: "Am I locked in?",
        answer:
          "No. Domains, licences, email accounts and access credentials are always registered in your company's name, not TechFlow's. If you ever decide to work with another provider, we hand everything over organised and documented, at no cost.",
      },
      {
        question: "Are licences included in the plan price?",
        answer:
          "No, and we say so before you sign. The plan covers our work. Licences (Microsoft 365, antivirus, cloud backup) are billed separately, at the same price they cost us, with no markup. They usually run between US$9 and US$15 per person per month, and in the assessment we give you the exact figure for your case.",
      },
      {
        question: "What happens if something breaks on a Sunday?",
        answer:
          "The Negocio and Integral plans include automatic monitoring that watches your systems outside business hours too, and alerts as soon as something fails. On the Integral plan we handle weekend emergencies, through the channels we agree with you. On the other plans the alert is logged and handled first thing the next business day: we'd rather tell you that and keep to it than promise 24-hour cover you'd have no way of holding us to.",
      },
      {
        question: "If you work remotely, how do you fix a computer?",
        answer:
          "We connect to the machine over the internet and work on it as if we were sitting next to it, with permission and only when you authorise it. That way we solve in minutes what used to wait days for someone to arrive. If there's something physical to do, like swapping a machine or running cable, we coordinate a technician and supervise the work.",
      },
      {
        question: "We don't have anyone in IT. Can we still hire you?",
        answer:
          "Yes. The service is designed precisely for companies with no IT department of their own: we explain everything in plain language and make the technical decisions for you.",
      },
      {
        question: "Why do you charge in UF instead of pesos?",
        answer:
          "So we don't have to raise your price every year. The UF is a Chilean unit that adjusts automatically with inflation, so the real value of what you pay stays level and you never get a price increase letter in January. On each plan we show you what that comes to today in your currency.",
      },
      {
        question: "Why charge per computer instead of a flat price?",
        answer:
          "Because looking after 30 computers costs twice what looking after 15 does, and a flat bracket price ends up charging both the same. With a per-machine price you pay for what you actually have: if you hire two more people next month, that's two more machines and nothing else. And if someone leaves, it goes down.",
      },
      {
        question: "Do you issue an invoice?",
        answer:
          "The service is provided by a sole trader and documented with a Chilean electronic fee receipt (boleta de honorarios), which is exempt from VAT. For your company the expense is just as deductible, and since there's no VAT there's no tax credit to recover either. If your company is a Chilean first-category taxpayer, it must apply the corresponding withholding when paying the receipt. We note it on every document so you don't have to work it out.",
      },
      {
        question: "How do we start working together?",
        answer:
          "We schedule a free 30-minute assessment over video call. Within a week you have a clear proposal, with a fixed monthly price and no commitment to sign anything.",
      },
    ],
  },

  finalCta: {
    title: "Let's talk before something breaks.",
    lead: "Book a free 30-minute assessment over video call. No commitment and no fine print.",
    primary: "Book an assessment",
    whatsapp: "Message us on WhatsApp",
  },

  contact: {
    eyebrow: "Contact",
    title: "Tell us what's going wrong.",
    lead: "Fill in the form and we'll get back to you within one business day to schedule your free assessment over video call. If you'd rather get straight to it, email us directly.",
  },

  form: {
    name: "Name",
    company: "Company",
    units: "Number of machines",
    unitsPlaceholder: "Choose a range",
    phone: "Phone",
    phonePlaceholder: "+1 555 123 4567",
    email: "Email",
    emailPlaceholder: "name@company.com",
    message: "Message",
    messagePlaceholder: "Tell us what's breaking or what you need solved.",
    submit: "Book a free assessment",
    submitting: "Sending…",
    successTitle: "We've got your request.",
    successBody: "We'll write to you within 1 business day to arrange the free assessment.",
    successAgain: "Send another request",
  },

  whatsapp: {
    floatingAria: "Message us on WhatsApp",
    floatingLabel: "Message us on WhatsApp",
    prefilled: "Hi, I'd like to book the free assessment for my company.",
  },

  footer: {
    tagline:
      "Remote IT support, web development and automation for small businesses in Santiago, Chile.",
    services: "Services",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy policy",
    terms: "Terms of service",
    rights: "All rights reserved.",
    legalLine: "{trade} is the trading name of {full}, Chilean tax ID {rut}.",
  },

  servicePage: {
    backToServices: "Back to services",
    detailLabel: "In detail",
    whereTitle: "Where we work",
    whereBody:
      "We work remotely with companies across the Santiago metropolitan area, including {list} and {last}. Since we don't depend on travelling to you, the district you're in doesn't change the response time.",
    faqTitle: "Questions about this service",
    otherServices: "Other services",
    ctaPrimary: "Book a free assessment",
    ctaSecondary: "See plans and pricing",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
  },

};
