import { RegistrationForm } from "@/components/owner/registration-form";

export const metadata = { title: "สมัครร้าน" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">สมัครร้านกับเรา</h1>
        <p className="text-muted-foreground">
          กรอกประเภทร้านและข้อมูล — ระบบจะสร้างลิงก์ localhost + Vercel ให้ทันที
        </p>
      </div>
      <RegistrationForm mode="create" />
    </div>
  );
}
