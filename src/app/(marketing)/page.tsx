import type { Metadata } from "next";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "จองง่าย รอน้อย",
  description:
    "แพลตฟอร์มจองและคิวสำหรับร้านอาหาร ร้านเสริมสวย และกิจการที่มีคิว — ลูกค้าจองได้เลย ไม่ต้องโหลดแอป",
};
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { MerchantValue } from "@/components/landing/merchant-value";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Industries } from "@/components/landing/industries";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProblemSolution } from "@/components/landing/problem-solution";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <MerchantValue />
      <HowItWorks />
      <Industries />
      <DashboardPreview />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
