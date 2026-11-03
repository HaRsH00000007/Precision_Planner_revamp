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
  { id: "awards", label: "Awards & Launches" },
  { id: "forum", label: "Forums & Expos" },
];

const w = (slug, title, venue, city, category) => ({
  slug,
  title,
  venue,
  city,
  category,
  image: `/images/work/${slug}.webp`,
  imageBack: `/images/work/${slug}-2.webp`,
});

export const WORKS = [
  w("genai-summit", "The GenAI Summit", "Ashoka Hotel", "New Delhi", "summit"),
  w("cfo-engage-bengaluru", "CFO Engage", "The Leela Palace", "Bengaluru", "summit"),
  w("ideaforge-ipo", "IdeaForge IPO Event", "Taj Lands End", "Mumbai", "awards"),
  w("cvf-off-highway", "CVF Off Highway", "The Eros Hotel", "New Delhi", "forum"),
  w("wire-summit", "Wire Summit — Blockchain", "Aloft Aerocity", "New Delhi", "summit"),
  w("cfo-100-awards", "CFO 100 Awards", "The Lalit", "Mumbai", "awards"),
  w("two-wheeler-forum", "Two Wheeler Forum", "Yashobhoomi IICC", "New Delhi", "forum"),
  w("esg-pdc", "ESG Professional Development Conference", "Radisson Blu, Dwarka", "New Delhi", "summit"),
  w("cfo-next-100", "CFO Next 100", "Holiday Inn Aerocity", "New Delhi", "awards"),
  w("animal-health-summit", "India Animal Health Summit", "Holiday Inn Aerocity", "New Delhi", "summit"),
  w("passenger-vehicle-forum", "Passenger Vehicle Forum", "Hyatt Regency", "Pune", "forum"),
  w("masters-india", "Masters India Finance Leaders Summit", "Roseate House Aerocity", "New Delhi", "summit"),
  w("asian-education-awards", "Asian Education Awards", "Hyatt Regency", "Manesar", "awards"),
  w("india-startup-conclave", "India Startup Conclave", "Radisson Blu Hotel", "New Delhi", "summit"),
  w("commercial-vehicle-forum", "Commercial Vehicle Forum", "JW Marriott", "Pune", "forum"),
  w("cfo-engage-hyderabad", "CFO Engage", "The Westin", "Hyderabad", "summit"),
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
