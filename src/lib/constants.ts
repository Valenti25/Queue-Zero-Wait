import type { Industry } from "@/types";

export const APP_NAME = "Queue-Zero-Wait";
export const APP_TAGLINE = "Book smarter. Wait less.";

export const INDUSTRIES: {
  id: Industry;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "restaurant",
    label: "Restaurants",
    icon: "UtensilsCrossed",
    description: "Table reservations & walk-in waitlists",
  },
  {
    id: "clinic",
    label: "Clinics & Hospitals",
    icon: "Stethoscope",
    description: "Patient appointments & triage queues",
  },
  {
    id: "salon",
    label: "Salons & Barbers",
    icon: "Scissors",
    description: "Stylist bookings & chair queues",
  },
  {
    id: "bank",
    label: "Banks",
    icon: "Landmark",
    description: "Teller appointments & service queues",
  },
  {
    id: "fitness",
    label: "Fitness Classes",
    icon: "Dumbbell",
    description: "Class slots & studio capacity",
  },
  {
    id: "automotive",
    label: "Car Services",
    icon: "Car",
    description: "Service bays & pickup scheduling",
  },
  {
    id: "events",
    label: "Events",
    icon: "Ticket",
    description: "Timed entry & crowd flow",
  },
  {
    id: "government",
    label: "Government Offices",
    icon: "Building2",
    description: "Citizen services & document queues",
  },
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for single-location businesses getting started.",
    features: [
      "1 location",
      "Unlimited waitlist entries",
      "Real-time queue tracking",
      "Google Business Profile link",
      "Email notifications",
      "Basic analytics",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: 79,
    description: "For growing businesses that need more power and insights.",
    features: [
      "Up to 5 locations",
      "Appointment booking",
      "SMS + push notifications",
      "Optional actions (forms, deposits)",
      "Merchant dashboard",
      "Priority support",
      "Advanced analytics",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "Custom solutions for chains, hospitals, and large organizations.",
    features: [
      "Unlimited locations",
      "API access & webhooks",
      "SSO & role-based access",
      "Custom branding",
      "Dedicated success manager",
      "SLA & compliance support",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export const FAQ_ITEMS = [
  {
    question: "Do customers need to download an app?",
    answer:
      "No. Queue-Zero-Wait is fully web-based. Customers click your Google booking link and reserve or join a waitlist in their browser — no app store required.",
  },
  {
    question: "How does Google Business Profile integration work?",
    answer:
      "Connect your Google Business Profile in the merchant dashboard. We generate Reserve and Join Waitlist links you add to your profile so customers find you on Search and Maps.",
  },
  {
    question: "What industries do you support?",
    answer:
      "Any business with appointments or waiting lines: restaurants, clinics, salons, banks, fitness studios, car services, events, government offices, and more.",
  },
  {
    question: "How accurate is the estimated wait time?",
    answer:
      "Estimates update in real time based on queue length, average service time, and no-shows. Merchants can also adjust pacing from the dashboard.",
  },
  {
    question: "Can customers pre-order or pay while waiting?",
    answer:
      "Yes. Enable optional actions like pre-orders, intake forms, deposits, or attendance confirmation so customers are ready when called.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Every plan includes a 14-day free trial with full access. No credit card required to start.",
  },
];
