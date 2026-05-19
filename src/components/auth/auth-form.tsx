"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/layout/logo";
import { useT } from "@/components/providers/locale-provider";

type AuthMode = "login" | "signup";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const t = useT();
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    window.location.href = "/dashboard";
  }

  return (
    <Card className="w-full max-w-md border-border/60 bg-card/80 glow-card shadow-xl">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
          <Logo />
        </div>
        <CardTitle className="text-2xl font-display">
          {isSignup ? t.auth.createAccount : t.auth.welcomeBack}
        </CardTitle>
        <CardDescription>
          {isSignup ? t.auth.signupDesc : t.auth.loginDesc}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="business">{t.auth.businessName}</Label>
              <Input id="business" placeholder="Harbor Bistro" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input id="email" type="email" placeholder="you@business.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input id="password" type="password" placeholder="••••••••" required minLength={8} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-gradient-brand text-primary-foreground border-0"
            disabled={loading}
          >
            {loading
              ? t.auth.pleaseWait
              : isSignup
                ? t.auth.createAccountBtn
                : t.auth.signInBtn}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>
                {t.auth.hasAccount}{" "}
                <Link href="/login" className="text-brand-500 hover:underline">
                  {t.common.logIn}
                </Link>
              </>
            ) : (
              <>
                {t.auth.noAccount}{" "}
                <Link href="/signup" className="text-brand-500 hover:underline">
                  {t.common.startTrial}
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
