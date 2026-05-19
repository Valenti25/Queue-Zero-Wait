import { QuickRestaurantSignup } from "@/components/owner/quick-restaurant-signup";
import { Section } from "@/components/shared/section";

export const metadata = {
  title: "ทดลองใช้ฟรี — สมัครร้าน",
};

export default function StartPage() {
  return (
    <Section className="pb-32 pt-8 md:pt-12">
      <QuickRestaurantSignup />
    </Section>
  );
}
