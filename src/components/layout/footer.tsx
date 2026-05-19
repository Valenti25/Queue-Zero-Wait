"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { useT } from "@/components/providers/locale-provider";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Footer() {
  const t = useT();

  const footerLinks = {
    [t.footer.product]: [
      { href: "/#features", label: t.nav.features },
      { href: "/#how-it-works", label: t.nav.howItWorks },
      { href: "/pricing", label: t.nav.pricing },
      { href: "/book/harbor-bistro", label: t.footer.demoBooking },
    ],
    [t.footer.company]: [
      { href: "#", label: t.footer.about },
      { href: "#", label: t.footer.blog },
      { href: "#", label: t.footer.careers },
      { href: "#", label: t.footer.contact },
    ],
    [t.footer.legal]: [
      { href: "#", label: t.footer.privacy },
      { href: "#", label: t.footer.terms },
      { href: "#", label: t.footer.security },
    ],
  };

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className={cn(siteContainerClass, "py-16")}>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground font-display">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Queue-Zero-Wait. {t.footer.copyright}
          </p>
          <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
