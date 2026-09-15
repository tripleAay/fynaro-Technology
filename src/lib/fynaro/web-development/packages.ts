import {
  BarChart3,
  Boxes,
  Brush,
  CreditCard,
  Database,
  Gauge,
  Globe2,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export type PackageSlug =
  | "launch"
  | "growth"
  | "custom";

export type PackageFeatureGroup = {
  title: string;
  description: string;
  features: string[];
};

export type PackageAddon = {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel?: string;
  icon: LucideIcon;
};

export type PackageFAQ = {
  question: string;
  answer: string;
};

export type WebPackage = {
  slug: PackageSlug;

  number: string;

  name: string;

  eyebrow: string;

  headline: string;

  description: string;

  summary: string;

  startingPrice: number;

  priceLabel: string;

  recommended?: boolean;

  accentLabel: string;

  idealFor: string[];

  coreFeatures: string[];

  featureGroups: PackageFeatureGroup[];

  addons: PackageAddon[];

  timeline: {
    label: string;
    value: string;
  }[];

  process: {
    number: string;
    title: string;
    description: string;
  }[];

  faqs: PackageFAQ[];
};

export const webPackages: Record<
  PackageSlug,
  WebPackage
> = {
  launch: {
    slug: "launch",

    number: "01",

    name: "Launch",

    eyebrow: "Business Website",

    headline:
      "A serious digital home for your business.",

    description:
      "Built for businesses that need more than a template — a professional, responsive website structured to explain what you do, establish trust and convert attention into enquiries.",

    summary:
      "A focused business website with everything needed to establish a credible online presence.",

    startingPrice: 350000,

    priceLabel: "Starting from",

    accentLabel: "Essential foundation",

    idealFor: [
      "Growing businesses",
      "Professional services",
      "Consultants",
      "Startups",
      "Local businesses",
    ],

    coreFeatures: [
      "Up to 5 core pages",
      "Custom interface design",
      "Mobile responsive development",
      "Contact & enquiry forms",
      "WhatsApp integration",
      "Basic SEO foundations",
      "Analytics setup",
      "Performance optimisation",
    ],

    featureGroups: [
      {
        title: "Interface",
        description:
          "A custom digital presentation built around your brand and offer.",
        features: [
          "Custom homepage",
          "Responsive layouts",
          "Typography system",
          "Brand colour implementation",
        ],
      },
      {
        title: "Conversion",
        description:
          "Clear pathways for visitors to take action.",
        features: [
          "Inquiry forms",
          "WhatsApp contact",
          "CTA architecture",
          "Contact flow",
        ],
      },
      {
        title: "Foundations",
        description:
          "The technical essentials required for a professional launch.",
        features: [
          "Metadata setup",
          "Analytics integration",
          "Performance checks",
          "Basic search optimisation",
        ],
      },
    ],

    addons: [
      {
        id: "extra-pages",
        title: "Additional Pages",
        description:
          "Expand the website beyond the included five core pages.",
        price: 45000,
        priceLabel: "from ₦45,000",
        icon: Globe2,
      },
      {
        id: "copywriting",
        title: "Website Copywriting",
        description:
          "Professional refinement and structuring of your website content.",
        price: 120000,
        icon: Brush,
      },
      {
        id: "booking",
        title: "Booking System",
        description:
          "Add consultation, appointment or service booking workflows.",
        price: 150000,
        icon: Users,
      },
      {
        id: "advanced-seo",
        title: "Advanced SEO Setup",
        description:
          "Extended search optimisation, structured metadata and page strategy.",
        price: 120000,
        icon: Search,
      },
    ],

    timeline: [
      {
        label: "Typical timeline",
        value: "3–5 weeks",
      },
      {
        label: "Core pages",
        value: "Up to 5",
      },
      {
        label: "Revisions",
        value: "2 rounds",
      },
    ],

    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "We understand the business, audience and what the website needs to accomplish.",
      },
      {
        number: "02",
        title: "Structure",
        description:
          "Pages, messaging hierarchy and conversion paths are organised.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Your interface direction is created and refined.",
      },
      {
        number: "04",
        title: "Development",
        description:
          "The approved direction becomes a responsive production website.",
      },
      {
        number: "05",
        title: "Launch",
        description:
          "Testing, analytics and deployment are completed.",
      },
    ],

    faqs: [
      {
        question:
          "Is hosting included in the ₦350,000?",
        answer:
          "Third-party hosting, domain registration and paid external services are generally separate unless specifically included in your proposal.",
      },
      {
        question:
          "Can I add more than five pages?",
        answer:
          "Yes. Five pages are included as the starting scope. Additional pages can be added based on content and complexity.",
      },
      {
        question:
          "Can Launch become an ecommerce website later?",
        answer:
          "Yes. The website can be extended later, although businesses already planning substantial ecommerce functionality should usually begin with Growth.",
      },
    ],
  },

  growth: {
    slug: "growth",

    number: "02",

    name: "Growth",

    eyebrow: "Commerce & Growth",

    headline:
      "Built for businesses ready to operate online.",

    description:
      "Growth combines a stronger website experience with commerce, payments, customer journeys and operational functionality — built for businesses moving beyond a simple online presence.",

    summary:
      "A commercial website for businesses ready to generate revenue, manage customers and operate more seriously online.",

    startingPrice: 750000,

    priceLabel: "Starting from",

    recommended: true,

    accentLabel: "Most popular",

    idealFor: [
      "Ecommerce brands",
      "Established businesses",
      "Retail businesses",
      "Service companies",
      "Growing startups",
    ],

    coreFeatures: [
      "Up to 10 core pages",
      "Advanced custom interface",
      "Ecommerce functionality",
      "Online payments",
      "Product catalogue",
      "Customer workflows",
      "Order management",
      "Analytics & conversion tracking",
      "Enhanced SEO foundations",
      "Responsive development",
    ],

    featureGroups: [
      {
        title: "Commerce",
        description:
          "Everything required to sell and transact online.",
        features: [
          "Product catalogue",
          "Shopping cart",
          "Checkout flow",
          "Payment gateway",
          "Order confirmation",
        ],
      },
      {
        title: "Growth",
        description:
          "Infrastructure for understanding and improving conversion.",
        features: [
          "Analytics",
          "Conversion events",
          "SEO foundations",
          "Campaign landing pages",
        ],
      },
      {
        title: "Operations",
        description:
          "Functionality that helps the business operate behind the website.",
        features: [
          "Order workflows",
          "Customer records",
          "Inventory-ready architecture",
          "Admin management",
        ],
      },
    ],

    addons: [
      {
        id: "customer-accounts",
        title: "Customer Accounts",
        description:
          "Allow customers to sign in, view orders and manage their information.",
        price: 180000,
        icon: Users,
      },
      {
        id: "advanced-dashboard",
        title: "Advanced Dashboard",
        description:
          "Extended business controls, reports and operational views.",
        price: 250000,
        icon: LayoutDashboard,
      },
      {
        id: "email-automation",
        title: "Email Automation",
        description:
          "Transactional and customer lifecycle email flows.",
        price: 150000,
        icon: Mail,
      },
      {
        id: "advanced-analytics",
        title: "Advanced Analytics",
        description:
          "Conversion events, funnel tracking and richer reporting.",
        price: 150000,
        icon: BarChart3,
      },
    ],

    timeline: [
      {
        label: "Typical timeline",
        value: "5–8 weeks",
      },
      {
        label: "Core pages",
        value: "Up to 10",
      },
      {
        label: "Revisions",
        value: "3 rounds",
      },
    ],

    process: [
      {
        number: "01",
        title: "Commercial Discovery",
        description:
          "We understand how the business sells, fulfils orders and serves customers.",
      },
      {
        number: "02",
        title: "Experience Architecture",
        description:
          "Products, content, customer journeys and operational requirements are mapped.",
      },
      {
        number: "03",
        title: "Interface Design",
        description:
          "The buying and browsing experience is designed around clarity and conversion.",
      },
      {
        number: "04",
        title: "Commerce Development",
        description:
          "Products, payments, workflows and management functionality are implemented.",
      },
      {
        number: "05",
        title: "Testing",
        description:
          "Checkout, mobile behaviour, payments and core flows are tested.",
      },
      {
        number: "06",
        title: "Launch",
        description:
          "Deployment and final commercial tracking are configured.",
      },
    ],

    faqs: [
      {
        question:
          "Which payment gateways can Fynaro integrate?",
        answer:
          "The exact gateway depends on your market and requirements. Common options can include Flutterwave, Paystack and other supported processors.",
      },
      {
        question:
          "Can customers create accounts?",
        answer:
          "Customer accounts can be included when required. Simple ecommerce stores may not need accounts, while more advanced customer workflows usually benefit from them.",
      },
      {
        question:
          "Does Growth include inventory management?",
        answer:
          "The package can support inventory-aware ecommerce. The exact inventory workflow is defined during project scoping.",
      },
    ],
  },

  custom: {
    slug: "custom",

    number: "03",

    name: "Custom",

    eyebrow: "Platforms & Systems",

    headline:
      "When a normal website is no longer enough.",

    description:
      "Custom is for businesses building platforms, portals, dashboards and specialised digital systems around their own workflows, users and operational requirements.",

    summary:
      "A bespoke engineering engagement for products and platforms requiring custom architecture and functionality.",

    startingPrice: 1500000,

    priceLabel: "Projects from",

    accentLabel: "Bespoke engagement",

    idealFor: [
      "SaaS products",
      "Marketplaces",
      "Operational platforms",
      "Client portals",
      "Internal business systems",
    ],

    coreFeatures: [
      "Custom product architecture",
      "Bespoke UX and interface design",
      "Authentication & permissions",
      "Dashboards",
      "Database architecture",
      "API integrations",
      "Complex workflows",
      "Admin systems",
      "Production deployment",
      "Technical handoff",
    ],

    featureGroups: [
      {
        title: "Product",
        description:
          "The experience is designed around actual user roles and workflows.",
        features: [
          "User flows",
          "Role architecture",
          "Dashboard UX",
          "Product interface",
        ],
      },
      {
        title: "Engineering",
        description:
          "A technical foundation shaped around the requirements of the platform.",
        features: [
          "Database design",
          "Authentication",
          "API architecture",
          "Business logic",
        ],
      },
      {
        title: "Infrastructure",
        description:
          "Deployment and production considerations are included from the start.",
        features: [
          "Environment configuration",
          "Security foundations",
          "Deployment",
          "Monitoring readiness",
        ],
      },
    ],

    addons: [
      {
        id: "advanced-roles",
        title: "Advanced User Roles",
        description:
          "Complex permissions and multiple levels of platform access.",
        price: 300000,
        icon: ShieldCheck,
      },
      {
        id: "external-api",
        title: "External API Integration",
        description:
          "Connect logistics, payments, CRM or other external systems.",
        price: 250000,
        priceLabel: "from ₦250,000",
        icon: ServerCog,
      },
      {
        id: "analytics-dashboard",
        title: "Analytics Dashboard",
        description:
          "Custom business metrics and operational reporting.",
        price: 300000,
        icon: Gauge,
      },
      {
        id: "complex-data",
        title: "Advanced Data Layer",
        description:
          "More complex database relationships and data operations.",
        price: 350000,
        icon: Database,
      },
    ],

    timeline: [
      {
        label: "Typical timeline",
        value: "8+ weeks",
      },
      {
        label: "Architecture",
        value: "Custom",
      },
      {
        label: "Delivery",
        value: "Milestone based",
      },
    ],

    process: [
      {
        number: "01",
        title: "Product Discovery",
        description:
          "Business requirements, users, workflows and success criteria are defined.",
      },
      {
        number: "02",
        title: "Architecture",
        description:
          "Technical structure, database relationships and system boundaries are planned.",
      },
      {
        number: "03",
        title: "Product Design",
        description:
          "User journeys and interfaces are designed around the system.",
      },
      {
        number: "04",
        title: "Engineering",
        description:
          "Frontend, backend, database and integrations are implemented.",
      },
      {
        number: "05",
        title: "Quality Assurance",
        description:
          "Critical workflows, permissions and system behaviour are tested.",
      },
      {
        number: "06",
        title: "Deployment",
        description:
          "Production environments and launch requirements are completed.",
      },
    ],

    faqs: [
      {
        question:
          "How is a Custom project priced?",
        answer:
          "₦1,500,000 is the starting point. Final investment depends on user roles, workflows, integrations, data complexity and overall engineering requirements.",
      },
      {
        question:
          "Can Fynaro build both frontend and backend?",
        answer:
          "Yes. Custom engagements can include frontend applications, backend APIs, databases, authentication, integrations and deployment.",
      },
      {
        question:
          "Can Custom projects be delivered in phases?",
        answer:
          "Yes. Larger systems are often better structured around milestones or product phases rather than attempting to release everything at once.",
      },
    ],
  },
};

export const packageOrder: PackageSlug[] = [
  "launch",
  "growth",
  "custom",
];

export const packageIcons = {
  launch: Globe2,
  growth: ShoppingBag,
  custom: Boxes,
};

export const packageSupportItems = [
  {
    icon: MessageCircle,
    title: "Project communication",
  },
  {
    icon: CreditCard,
    title: "Milestone billing",
  },
  {
    icon: Sparkles,
    title: "Fynaro quality review",
  },
];