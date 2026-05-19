import type { Restaurant } from "./types";
import { DEFAULT_HIGHLIGHT_BULLETS, DEFAULT_HIGHLIGHT_TAGS, DEFAULT_MENU_DISCLAIMER, defaultFaqs } from "./defaults";
import { generateId } from "./utils";

const prego =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";
const sushi =
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80";
const thai =
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80";

export const SEED_RESTAURANTS: Restaurant[] = [
  {
    id: "seed-prego",
    slug: "prego-kata-restaurant",
    name: "Prego Kata @OZO Phuket",
    businessType: "restaurant",
    description:
      "Italian dining at Kata Beach — wood-fired pizza, handmade pasta, ocean views.",
    address: "OZO Phuket, 11/1 Patak Rd, Karon, Phuket 83100",
    phone: "+66 76 123 456",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940!2d98.3!3d7.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDknMTIuMCJOIDk4wrAxOCcwMC4wIkU!5e0!3m2!1sen!2sth!4v1",
    hours: [
      { day: "Monday", open: "12:00", close: "22:00" },
      { day: "Sunday", open: "12:00", close: "22:00" },
    ],
    coverPhoto: prego,
    gallery: [prego, sushi, thai],
    promotionSlots: [
      { time: "12:00", discount: 50 },
      { time: "18:00", discount: 20 },
    ],
    highlightTags: [...DEFAULT_HIGHLIGHT_TAGS],
    highlightBullets: [...DEFAULT_HIGHLIGHT_BULLETS],
    googleReviewCount: 508,
    menuDisclaimer: DEFAULT_MENU_DISCLAIMER,
    faqs: defaultFaqs("Prego Kata @OZO Phuket"),
    menu: [
      { id: generateId(), name: "Tiramisu", photo: prego, price: 340, discountedPrice: 170 },
      { id: generateId(), name: "Lasagna", photo: sushi, price: 340, discountedPrice: 170 },
      { id: generateId(), name: "Burrata Fresca", photo: prego, price: 490, discountedPrice: 245 },
      { id: generateId(), name: "Spaghetti cabonara", photo: thai, price: 390, discountedPrice: 195 },
    ],
    reviews: [
      {
        id: generateId(),
        author: "Nicha T.",
        date: "2025-03-12",
        rating: 5,
        tags: ["Great food"],
        comment: "Best Italian on the island!",
      },
    ],
    rating: 4.7,
    reservations: 2840,
    priceRange: 3,
  },
  {
    id: "seed-sushi",
    slug: "sushi-zen-sukhumvit-restaurant",
    name: "Sushi Zen Sukhumvit",
    businessType: "restaurant",
    description: "Premium sushi in Bangkok — fresh fish daily.",
    address: "Sukhumvit Soi 24, Bangkok 10110",
    phone: "+66 2 123 4567",
    hours: [{ day: "Monday", open: "11:30", close: "22:00" }],
    coverPhoto: sushi,
    gallery: [sushi],
    promotionSlots: [{ time: "11:30", discount: 40 }],
    menu: [
      {
        id: generateId(),
        name: "Omakase Set",
        photo: sushi,
        price: 2490,
        discountedPrice: 1494,
      },
    ],
    reviews: [],
    rating: 4.9,
    reservations: 1520,
    priceRange: 4,
  },
  {
    id: "seed-thai",
    slug: "ban-thai-riverside-restaurant",
    name: "Baan Thai Riverside",
    businessType: "restaurant",
    description: "Classic Thai with Chao Phraya river views.",
    address: "Charoen Krung 70, Bangkok 10500",
    phone: "+66 2 987 6543",
    hours: [{ day: "Monday", open: "11:00", close: "22:00" }],
    coverPhoto: thai,
    gallery: [thai],
    promotionSlots: [{ time: "11:00", discount: 50 }],
    menu: [
      {
        id: generateId(),
        name: "Tom Yum River Prawn",
        photo: thai,
        price: 650,
        discountedPrice: 325,
      },
    ],
    reviews: [],
    rating: 4.6,
    reservations: 3100,
    priceRange: 2,
  },
];
