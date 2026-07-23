import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Rocket,
  LineChart,
  PenTool,
  Video,
  Megaphone,
  Search,
  Palette,
  Globe,
  BarChart3,
  Users,
  Target,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_ICONS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    short: "Full-funnel content, scheduling & community care.",
    description:
      "We run your channels end to end — strategy, content calendars, publishing and community replies — so your brand shows up consistently and on-voice, every single day.",
    icon: Users,
    features: ["Content calendars", "Daily publishing", "Community management", "Monthly reporting"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
  },
  {
    slug: "meta-marketing",
    title: "Facebook, Instagram & TikTok Management",
    short: "Content, posting & growth for your social media.",
    description:
      "Manage your Facebook, Instagram, and TikTok accounts with engaging content, consistent posting, and audience growth.",
    icon: Instagram,
    features: ["Reels & carousels", "Meta Ads funnels", "Audience targeting", "Pixel & CAPI setup"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
  },
  {
    slug: "create videos",
    title: "Short Video & Production (Reels/TikTok videos)",
    short: "Trend-native content built for discovery.",
    description:
      "We script, shoot and edit short-form content designed for the For You Page — then back the winners with paid spend to compound reach.",
    icon: Video,
    features: ["Trend research", "Creator collabs", "Spark Ads", "Performance editing"],
    image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=1200&q=80",
  },
  {
    slug: "content-creation",
    title: "Content Planning & Scheduling",
    short: "Photo, video and copy that actually converts.",
    description:
      "A full in-house creative pod — photographers, editors and copywriters — producing scroll-stopping assets tailored to each platform's format.",
    icon: PenTool,
    features: ["Studio & on-location shoots", "Short-form video", "Copywriting", "Content batching"],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design & Creative Content",
    short: "Visual systems that scale across every touchpoint.",
    description:
      "From feed grids to pitch decks, our design team builds flexible visual systems so your brand looks premium everywhere it appears.",
    icon: Palette,
    features: ["Design systems", "Templates & kits", "Ad creatives", "Presentation design"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
  },
  {
    slug: "brand-identity",
    title: "Brand Growth strategy",
    short: "Positioning, voice and visual identity from zero.",
    description:
      "We define who you are before we define how you look — strategy-first branding that gives every future campaign a clear north star.",
    icon: Sparkles,
    features: ["Brand strategy", "Logo & identity", "Tone of voice", "Brand guidelines"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
  },
  {
    slug: "digital-advertising",
    title: "Paid Advertising & boosting Support",
    short: "Paid media engineered around ROAS, not vanity metrics.",
    description:
      "We plan, launch and optimise paid campaigns across every major platform with a single goal — a return on ad spend you can defend in a boardroom.",
    icon: Megaphone,
    features: ["Media planning", "Creative testing", "Budget optimisation", "Weekly ROAS reports"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
  },
  {
    slug: "seo-google-ads",
    title: "Caption writing & SEO Optimization",
    short: "Engaging captions with SEO-driven optimization.",
    description:
      "Technical SEO, content strategy and Google Ads working together so you're found at every stage of the buying journey.",
    icon: Search,
    features: ["Technical audits", "Keyword strategy", "Search & shopping ads", "Local SEO"],
    image: "https://images.unsplash.com/photo-1571677246347-5040036b95cc?w=1200&q=80",
  },
  {
    slug: "market-research",
    title: "Market Research & Competitor Analysis",
    short: "Know your market. Beat the competition.",
    description:
      "Gain valuable market insights, track competitors, and identify opportunities to create smarter marketing strategies and drive business growth.",
    icon: Globe,
    features: ["Market insights","Competitor tracking","Trend analysis","Growth opportunities",],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
  },
  {
    slug: "reporting-analytics",
    title: "Monthly Performance Reporting",
    short: "Clear reports that measure your growth.",
    description:
      "Receive detailed monthly reports with key metrics, audience insights, and performance recommendations to keep your marketing on track.",
    icon: BarChart3,
    features: ["Monthly reports","Performance insights","Growth tracking","Actionable recommendations"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
];

export const FEATURED_SERVICES = SERVICES.slice(0, 6);

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Social Growth" | "Paid Media" | "Branding" | "Content" | "Web";
  result: string;
  image: string;
  metric: { label: string; value: string };
  // Detail-page fields
  year: string;
  duration: string;
  servicesUsed: string[];
  overview: string;
  challenge: string;
  solution: string;
  gallery: string[];
  results: { label: string; value: string }[];
  testimonial: { quote: string; name: string; role: string; image: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "orbit-coffee",
    title: "Scaling a coffee brand to six cities",
    client: "Orbit Coffee Co.",
    category: "Social Growth",
    result: "Grew Instagram from 4K to 128K followers in 11 months through a reel-first content engine.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    metric: { label: "Follower Growth", value: "+3,100%" },
    year: "2025",
    duration: "11 months",
    servicesUsed: ["Social Media Management", "Content Creation", "Facebook & Instagram Marketing"],
    overview:
      "Orbit Coffee Co. came to us as a single-location roastery with a quiet Instagram and no consistent content system. Eighteen months later they had six locations and a feed that outperformed brands ten times their size.",
    challenge:
      "Orbit's content was inconsistent and purely product-focused, with no strategy for the platforms actually driving discovery. Growth had stalled below 4,000 followers for over a year.",
    solution:
      "We rebuilt the content engine around a reel-first calendar — behind-the-counter stories, city-by-city launch campaigns, and a consistent visual identity — publishing five times a week across Instagram and TikTok.",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80",
    ],
    results: [
      { label: "Follower Growth", value: "+3,100%" },
      { label: "New Locations", value: "6" },
      { label: "Avg. Reel Reach", value: "240K" },
    ],
    testimonial: {
      quote:
        "MetaCraze rebuilt how we think about content. Every post has a purpose now, and the growth numbers speak for themselves.",
      name: "Amara Silva",
      role: "Founder, Orbit Coffee Co.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    },
  },
  {
    slug: "lumen-skincare",
    title: "Launching a DTC skincare line",
    client: "Lumen Skincare",
    category: "Paid Media",
    result: "Built a full-funnel Meta & TikTok ad system that hit profitability within the first 60 days.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
    metric: { label: "Return on Ad Spend", value: "5.8x" },
    year: "2025",
    duration: "60 days to profitability",
    servicesUsed: ["Digital Advertising", "Content Creation", "Analytics & Strategy Consulting"],
    overview:
      "Lumen launched as a direct-to-consumer skincare line with zero existing audience. We were brought in pre-launch to build the entire paid acquisition funnel from scratch.",
    challenge:
      "A completely cold audience, no brand recognition, and a founder team that needed to prove unit economics within a single quarter to secure further investment.",
    solution:
      "We built a three-stage funnel — UGC-style testing creative, retargeting sequences and a loyalty-focused email flow — layering Meta and TikTok spend around the highest-performing hooks.",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80",
      "https://images.unsplash.com/photo-1522337194846-cc6b8a5a72e6?w=1200&q=80",
    ],
    results: [
      { label: "Return on Ad Spend", value: "5.8x" },
      { label: "Cost per Acquisition", value: "-42%" },
      { label: "Time to Profitability", value: "60 days" },
    ],
    testimonial: {
      quote:
        "The team treats our ad spend like it's their own money. That kind of accountability is rare in an agency partner.",
      name: "Daniel Weiss",
      role: "CMO, Lumen Skincare",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    },
  },
  {
    slug: "north-fitness",
    title: "Rebranding a fitness studio chain",
    client: "North Fitness",
    category: "Branding",
    result: "A full identity refresh and content system that repositioned the brand as premium.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    metric: { label: "Membership Growth", value: "+64%" },
    year: "2024",
    duration: "4 months",
    servicesUsed: ["Brand Identity", "Graphic Design", "Social Media Management"],
    overview:
      "North Fitness operated five studios under a dated, discount-gym identity that undersold the quality of their coaching. We led a full repositioning into a premium boutique brand.",
    challenge:
      "The brand's visual identity and social presence didn't reflect the quality of the in-studio experience, capping their ability to raise membership prices.",
    solution:
      "A ground-up rebrand — new mark, palette, photography direction and tone of voice — rolled out across every studio and every social channel simultaneously.",
    gallery: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    ],
    results: [
      { label: "Membership Growth", value: "+64%" },
      { label: "Avg. Price Increase", value: "+22%" },
      { label: "Studios Rebranded", value: "5" },
    ],
    testimonial: {
      quote:
        "Our rebrand didn't just look better — it changed how customers talk about us. MetaCraze understood the assignment.",
      name: "Priya Kapoor",
      role: "Marketing Lead, North Fitness",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    },
  },
  {
    slug: "verve-travel",
    title: "Turning a travel agency into a media brand",
    client: "Verve Travel",
    category: "Content",
    result: "Weekly destination series across YouTube and TikTok drove direct bookings from content.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    metric: { label: "Booking Leads", value: "+212%" },
    year: "2024",
    duration: "8 months",
    servicesUsed: ["Content Creation", "TikTok Marketing", "SEO & Google Ads"],
    overview:
      "Verve Travel booked trips the traditional way — inbound calls and a static website. We turned them into a destination-content brand people followed for the content alone.",
    challenge:
      "Traditional travel agents were losing ground to influencers and OTAs. Verve needed a reason for people to trust and follow them directly.",
    solution:
      "A weekly destination series — shot on location, edited for TikTok and YouTube Shorts — with every episode driving to a bookable itinerary link.",
    gallery: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
    ],
    results: [
      { label: "Booking Leads", value: "+212%" },
      { label: "YouTube Subscribers", value: "38K" },
      { label: "Avg. Video Views", value: "410K" },
    ],
    testimonial: {
      quote:
        "They turned our agency into a media brand people actually follow for fun. Bookings followed naturally.",
      name: "Owen Marsh",
      role: "CEO, Verve Travel",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
    },
  },
  {
    slug: "haven-realty",
    title: "A conversion-focused site for a realty group",
    client: "Haven Realty",
    category: "Web",
    result: "Rebuilt the site around a fast, lead-capture-first experience integrated with campaigns.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    metric: { label: "Lead Conversion", value: "+87%" },
    year: "2025",
    duration: "10 weeks",
    servicesUsed: ["Website Development", "SEO & Google Ads", "Analytics & Strategy Consulting"],
    overview:
      "Haven Realty's old website took over eight seconds to load and buried the contact form three clicks deep. We rebuilt it as a fast, lead-first funnel.",
    challenge:
      "Paid and organic traffic was arriving on a slow, cluttered site with no clear path to a booked viewing or an agent call.",
    solution:
      "A rebuilt site on a modern stack — sub-second load times, listing-first navigation, and a persistent lead-capture flow synced directly to the sales team's CRM.",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
    ],
    results: [
      { label: "Lead Conversion", value: "+87%" },
      { label: "Page Load Time", value: "0.9s" },
      { label: "Organic Traffic", value: "+58%" },
    ],
    testimonial: {
      quote:
        "The team treats our ad spend like it's their own money. That kind of accountability is rare in an agency partner.",
      name: "Daniel Weiss",
      role: "CMO, Lumen Skincare",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    },
  },
  {
    slug: "pulse-nutrition",
    title: "Building a creator-style brand voice",
    client: "Pulse Nutrition",
    category: "Social Growth",
    result: "A UGC-driven content strategy that made the brand feel like a creator, not a company.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
    metric: { label: "Engagement Rate", value: "9.4%" },
    year: "2025",
    duration: "6 months",
    servicesUsed: ["Social Media Management", "Content Creation", "Brand Identity"],
    overview:
      "Pulse Nutrition's feed looked like every other supplement brand's — clinical, product-first, and easy to scroll past. We rebuilt their voice around real people, not product shots.",
    challenge:
      "High ad spend was masking a weak organic engagement rate, and the brand had no distinct personality against a crowded supplement category.",
    solution:
      "A UGC-first content system — creator partnerships, founder-led storytelling and a more conversational caption voice — replacing polished product photography as the default post type.",
    gallery: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    ],
    results: [
      { label: "Engagement Rate", value: "9.4%" },
      { label: "UGC Submissions", value: "1,200+" },
      { label: "Organic Reach", value: "+156%" },
    ],
    testimonial: {
      quote:
        "Our rebrand didn't just look better — it changed how customers talk about us. MetaCraze understood the assignment.",
      name: "Priya Kapoor",
      role: "Marketing Lead, North Fitness",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    },
  },
  {
    slug: "atlas-finance",
    title: "Demystifying finance for a younger audience",
    client: "Atlas Finance",
    category: "Content",
    result: "Explainer-style short-form content that made a finance brand genuinely watchable.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
    metric: { label: "Video Views", value: "18.2M" },
    year: "2024",
    duration: "9 months",
    servicesUsed: ["Content Creation", "TikTok Marketing", "Social Media Management"],
    overview:
      "Atlas Finance wanted to reach a younger, first-time-investor audience but their existing content was dense, jargon-heavy and built for a much older demographic.",
    challenge:
      "Financial content is easy to make boring and risky to make wrong. Atlas needed clarity and compliance without losing any watchability.",
    solution:
      "A short-form explainer format — one concept, sixty seconds, motion graphics over talking-head delivery — published consistently across TikTok, Reels and Shorts.",
    gallery: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    ],
    results: [
      { label: "Video Views", value: "18.2M" },
      { label: "Follower Growth", value: "+890%" },
      { label: "App Sign-ups", value: "+64%" },
    ],
    testimonial: {
      quote:
        "They turned our agency into a media brand people actually follow for fun. Bookings followed naturally.",
      name: "Owen Marsh",
      role: "CEO, Verve Travel",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
    },
  },
  {
    slug: "solace-hotels",
    title: "A performance funnel for boutique hotels",
    client: "Solace Hotels",
    category: "Paid Media",
    result: "Search and social campaigns synced to seasonal occupancy targets across 5 properties.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    metric: { label: "Direct Bookings", value: "+140%" },
    year: "2025",
    duration: "12 months, ongoing",
    servicesUsed: ["Digital Advertising", "SEO & Google Ads", "Analytics & Strategy Consulting"],
    overview:
      "Solace Hotels relied almost entirely on OTA bookings, giving up 15-20% commission on every stay. We built a performance system to grow direct bookings instead.",
    challenge:
      "Seasonal occupancy swings across five properties made static ad budgets inefficient, and direct-booking traffic was a fraction of OTA-driven traffic.",
    solution:
      "A always-on search and social system with budgets that flex to seasonal occupancy targets per property, paired with retargeting for past guests.",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
    ],
    results: [
      { label: "Direct Bookings", value: "+140%" },
      { label: "OTA Commission Saved", value: "$186K/yr" },
      { label: "Return on Ad Spend", value: "6.2x" },
    ],
    testimonial: {
      quote:
        "MetaCraze rebuilt how we think about content. Every post has a purpose now, and the growth numbers speak for themselves.",
      name: "Amara Silva",
      role: "Founder, Orbit Coffee Co.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    },
  },
];

export const TESTIMONIALS = [
  {
    name: "Amara Silva",
    role: "Founder, Orbit Coffee Co.",
    quote:
      "MetaCraze rebuilt how we think about content. Every post has a purpose now, and the growth numbers speak for themselves.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    rating: 5,
  },
  {
    name: "Daniel Weiss",
    role: "CMO, Lumen Skincare",
    quote:
      "The team treats our ad spend like it's their own money. That kind of accountability is rare in an agency partner.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    role: "Marketing Lead, North Fitness",
    quote:
      "Our rebrand didn't just look better — it changed how customers talk about us. MetaCraze understood the assignment.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    rating: 5,
  },
  {
    name: "Owen Marsh",
    role: "CEO, Verve Travel",
    quote:
      "They turned our agency into a media brand people actually follow for fun. Bookings followed naturally.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
    rating: 5,
  },
];

export const PROCESS_STEPS = [
  {
    title: "Discovery",
    description: "We audit your brand, audience and competitors to find where the real opportunity is.",
    icon: Search,
  },
  {
    title: "Strategy",
    description: "A content and growth roadmap built around clear, measurable business goals.",
    icon: Target,
  },
  {
    title: "Content",
    description: "Our in-house creative pod produces platform-native content at scale.",
    icon: PenTool,
  },
  {
    title: "Launch",
    description: "Campaigns go live across organic and paid channels, tracked from day one.",
    icon: Rocket,
  },
  {
    title: "Growth",
    description: "We analyse, refine and reinvest in what's working — every single month.",
    icon: LineChart,
  },
];

export const FAQS = [
  {
    q: "How soon will I see results?",
    a: "Most clients see engagement shifts within the first 30 days and measurable growth in leads or sales within 60–90 days, depending on the channel mix.",
  },
  {
    q: "Do you work with businesses outside a specific industry?",
    a: "We work across e-commerce, hospitality, fitness, finance, real estate and B2B — our process adapts to the platform and audience, not the other way around.",
  },
  {
    q: "Who actually creates the content?",
    a: "An in-house pod dedicated to your account: a strategist, a content creator and a designer, backed by our paid media and analytics teams.",
  },
  {
    q: "Can I see the ad spend and performance data?",
    a: "Yes — every client gets a live dashboard plus a monthly report that breaks down spend, results and next steps in plain language.",
  },
  {
    q: "What's the minimum commitment?",
    a: "We recommend a 3-month minimum so strategy has time to compound, but contracts run month-to-month after that with no lock-in.",
  },
];

export const PRICING = [
  {
    id: "platinum",
    name: "Platinum Package",
    price: "96,000 LKR",
    period: "/month",
    featured: false,
    description: "Designed for businesses that want maximun brand growth, high engagement and a powerful digital presence.",
    featureGroups: [
      {
        title: "Content Creation",
        items: [
          "8 relevant and engaging posts",
          "8 relevant engaging short videos/reels",
          "1 special day post",
          "1 professional cover photo",
          "Professional graphics and creative captions included",
          "Content optimized for Facebook, Instagram & TikTok",
        ],
      },
      {
        title: "Advertising & Growth",
        items: [
          "Unlimited boosting support",
          "Campaign setup, management & optimization",
          "Facebook, Instagram & TikTok page growth",
          "Social media marketing strategy & content planning",
          "Market research & audience targeting",
        ],
      },
      {
        title: "Analysis & Optimization",
        items: [
          "Social media competitor analysis",
          "Monthly reporting & performance analysis",
          "Page growth report",
          "Cover photo & page optimization",
          "SEO-optimized captions & content strategy",
        ],
      },
    ],
  },
  {
    id: "gold",
    name: "Gold Package",
    price: "75,000 LKR",
    period: "/month",
    featured: true,
    description: "Ideal for growing brands that need more engaging content and stronger audience interaction.",
    featureGroups: [
      {
        title: "Content Creation",
        items: [
          "06 relevant and engaging posts",
          "06 engaging Short Videos/Reels",
          "01 Special Day Post",
          "01 Professional Cover Photo",
          "Professional graphics and creative captions included",
          "Content optimized for Facebook, Instagram & TikTok",
        ],
      },
      {
        title: "Advertising & Growth",
        items: [
          "Unlimited boosting support",
          "Campaign setup, management & optimization",
          "Facebook, Instagram & TikTok page growth",
          "Social media marketing strategy & content planning",
          "Market research & audience targeting",
        ],
      },
      {
        title: "Analysis & Optimization",
        items: [
          "Social media competitor analysis",
          "Cover photo & page optimization",
          "SEO-optimized captions & content strategy",
        ],
      },
    ],
  },
  {
    id: "silver",
    name: "SILVER PACKAGE",
    price: "55,000 LKR",
    period: "/month",
    description: "Perfect for small businesses looking to build a professional and consistent social media presence.",
    featured: false,
    featureGroups: [
      {
        title: "Content Creation",
        items: [
          "04 relevant and engaging posts",
          "04 engaging Short Videos/Reels",
          "01 Special Day Post",
          "01 Professional Cover Photo",
          "Professional graphics and creative captions included",
          "Content optimized for Facebook, Instagram & TikTok",
        ],
      },
      {
        title: "Advertising & Growth",
        items: [
          "Unlimited boosting support",
          "Campaign setup, management & optimization",
          "Facebook, Instagram & TikTok page growth",
        ],
      },
      {
        title: "Analysis & Optimization",
        items: [
          "Social media competitor analysis",
          "Cover photo & page optimization",
          "SEO-optimized captions & content strategy",
        ],
      },
    ],
  },
];



export const CLIENT_LOGOS = [
  "ORBIT",
  "LUMEN",
  "NORTH",
  "VERVE",
  "HAVEN",
  "PULSE",
  "ATLAS",
  "SOLACE",
];

export const GROWTH_STATS = [
  { label: "Avg. Follower Growth", value: 280, suffix: "%" },
  { label: "Avg. Lead Increase", value: 165, suffix: "%" },
  { label: "Avg. Engagement Rate", value: 8, suffix: "%" },
  { label: "Client Retention", value: 94, suffix: "%" },
];

export const COMPANY_STATS = [
  { label: "Years in Business", value: 8 },
  { label: "Brands Grown", value: 140 },
  { label: "Campaigns Launched", value: 620 },
  { label: "Team Members", value: 32 },
];

export const TIMELINE = [
  { year: "2018", title: "MetaCraze founded", text: "Started as a two-person studio helping local businesses get online." },
  { year: "2020", title: "First 50 clients", text: "Built out paid media and content teams to match growing demand." },
  { year: "2022", title: "Regional expansion", text: "Opened a second studio and crossed 500 campaigns launched." },
  { year: "2024", title: "Award recognition", text: "Named a top digital agency for social-first brand growth." },
  { year: "2026", title: "140+ brands grown", text: "A full-service growth partner for ambitious, modern brands." },
];


export const TEAM = [
  {
    name: "Ishan Perera",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80",
    bio: "12+ years building brands across South Asia. Leads creative vision and client strategy end to end.",
  },
  {
    name: "Naomi Fernando",
    role: "Head of Strategy",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
    bio: "Turns market data into growth roadmaps. Ex-agency lead with a background in consumer research.",
  },
  {
    name: "Kavi Rajapaksa",
    role: "Head of Paid Media",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    bio: "Manages 7-figure ad budgets across Meta and Google. Obsessed with ROAS and clean funnels.",
  },
  {
    name: "Sana Wickrama",
    role: "Lead Content Producer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    bio: "Directs shoots and edits that stop the scroll. Previously produced for regional broadcast.",
  },
  {
    name: "Ruwan De Silva",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&q=80",
    bio: "Crafts visual identities and campaign assets with a sharp eye for detail and consistency.",
  },
  {
    name: "Tara Jayasuriya",
    role: "Analytics Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
    bio: "Builds dashboards clients actually read. Translates numbers into decisions, not noise.",
  },
];
