'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import clsx from 'clsx';
import { site } from '@/config/site';

const NAV_ITEMS = [
  { href: '#services',     label: 'Services' },
  { href: '#service-area', label: 'Service Area' },
  { href: '#why-us',       label: 'Why Us' },
  { href: '#reviews',      label: 'Reviews' },
  { href: '#faq',          label: 'FAQ' },
] as const;

export function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-cream-200">
      <nav className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl tracking-wide text-ink uppercase"
          aria-label={`${site.business.name} home`}
        >
          {site.business.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-ink">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="py-2 border-b-2 border-transparent hover:border-accent transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a href="#book" className="btn-secondary-light">Book Service</a>
          <a href="#book" className="btn-primary">Get a Quote</a>
        </div>

        {/* Mobile call + menu */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`tel:${site.business.phoneE164}`}
            aria-label={`Call ${site.business.phone}`}
            className="btn-primary h-12 min-w-0 px-4"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Call</span>
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-pill border-[1.5px] border-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={clsx(
          'lg:hidden overflow-hidden border-t border-cream-200 transition-[max-height,opacity] duration-200',
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="container-x flex flex-col py-4 gap-1 text-base font-semibold">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 border-b border-cream-200 last:border-0"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4 flex flex-col gap-2">
            <a href="#book" onClick={() => setOpen(false)} className="btn-secondary-light">Book Service</a>
            <a href="#book" onClick={() => setOpen(false)} className="btn-primary">Get a Quote</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
