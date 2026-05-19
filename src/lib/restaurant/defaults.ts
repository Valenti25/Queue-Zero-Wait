import type { FaqItem, MenuItem } from "./types";
import { generateId } from "./utils";

export const DEFAULT_MENU_DISCLAIMER =
  "ส่วนลดใช้กับเมนูราคาปกติทุกรายการ เว้นแต่ระบุไว้เป็นอย่างอื่นในข้อกำหนดพิเศษ";

export const DEFAULT_HIGHLIGHT_TAGS = ["Italian Pizza Must-Try"];

export const DEFAULT_HIGHLIGHT_BULLETS = [
  "Authentic Italian recipe",
  "Great for families",
  "Ocean view seating",
];

export function defaultFaqs(shopName: string): FaqItem[] {
  const n = shopName.trim() || "ร้านของคุณ";
  return [
    {
      id: generateId(),
      question: `จองออนไลน์ที่ ${n} ได้ไหม?`,
      answer: "ได้ — ลูกค้าจองผ่านลิงก์ /r/[slug] ของคุณได้ทันที",
    },
    {
      id: generateId(),
      question: `${n} เปิดกี่โมง?`,
      answer: "ดูเวลาเปิด-ปิดในหน้าร้านหรือแก้ไขในส่วน Business Hours",
    },
    {
      id: generateId(),
      question: `${n} มีแพ็กเกจอะไรบ้าง?`,
      answer: "ดูโปรโมชั่นและสล็อตเวลาที่หน้าจอง",
    },
  ];
}

export const SAMPLE_MENU_ITEMS: Omit<MenuItem, "id" | "photo">[] = [
  { name: "Tiramisu", price: 340, discountedPrice: 170 },
  { name: "Lasagna", price: 340, discountedPrice: 170 },
  { name: "Burrata Fresca", price: 490, discountedPrice: 245 },
  { name: "Spaghetti cabonara", price: 390, discountedPrice: 195 },
];
