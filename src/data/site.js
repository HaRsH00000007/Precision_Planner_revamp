// All site content in one place. Facts (stats, services, events, venues, vision/mission)
// come from PrecisionPlanners-CompanyProfile.pdf — edit here, not in the components.

export const CONTACT = {
  email: "consultus@precisionplanners.co.in",
  phoneDisplay: "+91 93110 48049",
  phoneHref: "tel:+919311048049",
  whatsapp: "https://wa.me/919311048049",
  instagram: "https://www.instagram.com/precision.planners/",
  brochure: "/PrecisionPlanners-CompanyProfile.pdf",
  apiUrl: "https://api.precisionplanners.co.in/api/contact",
};

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Work", href: "#work" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 800, suffix: "+", label: "Successful projects" },
  { value: 100000, suffix: "+", label: "Delegates managed" },
  { value: 100, suffix: "+", label: "Innovative concepts" },
  { value: 50, suffix: "+", label: "Clients served" },
];

export const PILLARS = [
  {
    key: "Vision",
    text: "Deliver exceptional, personalised solutions in events, conferences, exhibitions, corporate gifting and printing — exceeding expectations and building lasting client relationships.",
  },
  {
    key: "Mission",
    text: "Lead India's industry with innovative event management, exhibition setups, premium corporate gifting and high-quality printing, ensuring flawless execution and unmatched client satisfaction.",
  },
  {
    key: "Values",
    text: "Creativity, precision and client-centred service in every event, conference, exhibition, gifting and printing project — guaranteeing high quality and memorable experiences.",
  },
  {
    key: "Goals",
    text: "Consistently exceed client expectations across every service through innovation, meticulous attention to detail and seamless execution.",
  },
];

export const SERVICES = [
  {
    id: "events",
    title: "Events & Conferences",
    description:
      "We design and execute impactful events and conferences that leave a lasting impression. From strategic planning to flawless execution, every detail aligns with your vision.",
    tags: ["Summits & conclaves", "Award ceremonies", "Product launches", "Stage & AV production"],
    images: ["/images/services/events-1.webp", "/images/services/events-2.webp", "/images/services/events-3.webp"],
  },
  {
    id: "stalls",
    title: "Stalls & Exhibitions",
    description:
      "Expertly crafted stalls and exhibition setups that lift brand visibility and engagement — innovative designs, built and installed by our own team.",
    tags: ["Custom stall design", "In-house fabrication", "Modular booths", "On-site installation"],
    images: ["/images/services/stalls-1.webp", "/images/services/stalls-2.webp", "/images/services/stalls-3.webp"],
  },
  {
    id: "gifting",
    title: "Corporate Gifting",
    description:
      "Premium, customised corporate gifts that strengthen relationships and reflect your brand identity — each one thoughtfully designed to leave a meaningful impression.",
    tags: ["Curated gift sets", "Mementos & trophies", "Custom branding", "Bulk fulfilment"],
    images: ["/images/services/gifting-1.webp", "/images/services/gifting-2.webp", "/images/services/gifting-3.webp"],
  },
  {
    id: "printing",
    title: "Printing Solutions",
    description:
      "High-quality printing that brings creativity to life. Marketing material, promotional prints or custom designs — every piece reflects professionalism and brand consistency.",
    tags: ["Standees & backdrops", "Brochures & collateral", "Event signage", "Delegate kits"],
    images: ["/images/services/printing-1.webp", "/images/services/printing-2.webp", "/images/services/printing-3.webp"],
  },
  {
    id: "creative",
    title: "Creative Designing",
    description:
      "Visually stunning designs and seamless edits that elevate every project — from branding and marketing creatives to professional video editing that tells your story.",
    tags: ["Brand identity", "Marketing creatives", "Event collateral", "Video editing"],
    images: ["/images/services/creative-1.webp", "/images/services/creative-2.webp", "/images/services/creative-3.webp"],
  },
];

export const PROCESS = [
  {
    title: "Plan",
    text: "We start with your objectives, audience and budget, then map venues, timelines and logistics into one clear plan everyone can work from.",
  },
  {
    title: "Design",
    text: "Our designers shape the look and feel — stage, stalls, collateral and every branded touchpoint — aligned to your identity.",
  },
  {
    title: "Create",
    text: "In-house inventory, fabrication and production turn designs into reality. No hand-offs between vendors, no surprises.",
  },
  {
    title: "Execute",
    text: "On the day, our crew runs the show end-to-end, so you can focus on your guests while every detail lands on cue.",
  },
];

export const WORK_FILTERS = [
  { id: "all", label: "All work" },
  { id: "summit", label: "Summits & Conferences" },
  { id: "awards", label: "Awards & Recognition" },
  { id: "activation", label: "Brand Activations" },
];

// `venue` is optional — when it's unknown the card back shows `scope` (what we delivered) instead.
const w = ({ slug, back = `${slug}-2`, pos, ...rest }) => ({
  slug,
  ...rest,
  pos,
  image: `/images/work/${slug}.webp`,
  imageBack: `/images/work/${back}.webp`,
});

export const WORKS = [
  w({
    slug: "brand-india-summit",
    title: "Brand India Summit",
    venue: "Hyatt Centric",
    city: "New Delhi",
    category: "summit",
    scope: "Stage, panel set, registration & print",
  }),
  w({
    slug: "iha-2026",
    title: "India Hospitality Awards 2026",
    city: "New Delhi",
    category: "awards",
    scope: "Legacy wall, 3D cube installation & branding",
    pos: "50% 40%",
  }),
  w({
    slug: "global-csr-esg-awards",
    title: "Global CSR & ESG Awards",
    category: "awards",
    scope: "Curved LED stage, set & step-and-repeat",
  }),
  w({
    slug: "blue-heaven-makeup-party",
    title: "Blue Heaven Makeup Party",
    category: "activation",
    scope: "Neon arch entry, blush pods & bar counter",
    pos: "50% 28%",
  }),
  w({
    slug: "indian-csr-awards",
    back: "indian-csr-awards",
    title: "Indian CSR Awards",
    category: "awards",
    scope: "Stage design, LED backdrop & seating",
    pos: "50% 62%",
  }),
  w({
    slug: "swiss-beauty-craze",
    title: "Swiss Beauty Craze",
    category: "activation",
    scope: "Custom stall fabrication & photo-op arch",
    pos: "50% 45%",
  }),
];

export const VENUES = [
  "The Leela Palace",
  "Taj Lands End",
  "JW Marriott",
  "Hyatt Regency",
  "The Lalit",
  "Yashobhoomi IICC",
  "The Westin",
  "Ashoka Hotel",
  "Vivanta by Taj",
  "Roseate House",
  "Radisson Blu",
  "The Leela Ambience",
  "Holiday Inn Aerocity",
  "The Eros Hotel",
];

export const CITIES = ["New Delhi", "Gurugram", "Manesar", "Mumbai", "Pune", "Bengaluru", "Hyderabad"];

export const REASONS = [
  {
    title: "In-house inventory & fabrication",
    text: "Stages, stalls and set pieces are built by our own production team, so timelines and quality stay in our hands — not a sub-contractor's.",
  },
  {
    title: "Design & planning expertise",
    text: "Every brief gets a tailored concept. We plan around your audience and objectives instead of reusing a template.",
  },
  {
    title: "Meticulous attention to detail",
    text: "From delegate kits to stage cues, the small things are checked twice. That's where flawless delivery comes from.",
  },
  {
    title: "Five capabilities, one partner",
    text: "Events, exhibitions, gifting, printing and creative under one roof means a single point of contact and a consistent brand.",
  },
];

export const FAQS = [
  {
    q: "What services does Precision Planners offer?",
    a: "Five, under one roof: events & conferences, stalls & exhibitions, corporate gifting, printing solutions and creative designing. You can engage us for one or bring us in end-to-end.",
  },
  {
    q: "Which cities do you work in?",
    a: `We've delivered events in ${CITIES.slice(0, -1).join(", ")} and ${CITIES.at(-1)} — at venues such as The Leela Palace, Taj Lands End and Yashobhoomi IICC. Planning something elsewhere? Talk to us.`,
  },
  {
    q: "Do you build exhibition stalls in-house?",
    a: "Yes. We have our own inventory, fabrication and production capability, which keeps quality and timelines under our control from design through installation.",
  },
  {
    q: "Can corporate gifts be customised with our branding?",
    a: "Absolutely. We curate premium gifts and mementos and customise them to reflect your brand identity, from the product itself to the packaging.",
  },
  {
    q: "How quickly will you get back to me?",
    a: "Share your requirement through the form below and our team responds within 24 hours. For anything urgent, call or WhatsApp us directly.",
  },
  {
    q: "How do I get a proposal?",
    a: "Tell us about your event — type, dates, city and approximate audience — via the contact form. We'll come back with ideas and a proposal. You can also download our company profile first.",
  },
];

export const EVENT_TYPES = [
  "Corporate Event",
  "Conference / Summit",
  "Exhibition / Fabrication",
  "Corporate Gifting",
  "Printing / Creative",
  "Other",
];
