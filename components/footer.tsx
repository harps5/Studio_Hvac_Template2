import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { site } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand + NAP */}
        <div className="md:col-span-4">
          <Link href="/" className="font-display text-3xl uppercase tracking-wide">
            {site.business.name}
          </Link>

          <a
            href={`tel:${site.business.phoneE164}`}
            className="mt-6 block font-display text-display-sub text-white hover:text-accent transition-colors"
          >
            {site.business.phone}
          </a>

          <ul role="list" className="mt-6 flex flex-col gap-3 text-sm text-muted-dark">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
              <a href={`mailto:${site.business.email}`} className="hover:text-white">
                {site.business.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
              <span>
                {site.business.address.street}
                <br />
                {site.business.address.city}, {site.business.address.region}{' '}
                {site.business.address.postal}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
              <span className="font-semibold text-white">
                {site.business.hours.emergency}
              </span>
            </li>
          </ul>
        </div>

        {/* Services */}
        <FooterColumn title="Services">
          {site.services.map((s) => (
            <FooterLink key={s.slug} href={`#${s.slug}`}>{s.name}</FooterLink>
          ))}
        </FooterColumn>

        {/* Service area */}
        <FooterColumn title="Service area">
          {site.serviceArea.map((c) => (
            <FooterLink key={c.name} href="#service-area">{c.name}</FooterLink>
          ))}
        </FooterColumn>

        {/* Hours + Legal */}
        <div className="md:col-span-2">
          <h3 className="eyebrow text-white">Hours</h3>
          <ul role="list" className="mt-4 flex flex-col gap-2 text-sm text-muted-dark">
            <li>{site.business.hours.weekdays}</li>
            <li>{site.business.hours.saturday}</li>
            <li>{site.business.hours.sunday}</li>
          </ul>

          <h3 className="eyebrow text-white mt-8">Connect</h3>
          <ul role="list" className="mt-4 flex flex-col gap-2 text-sm">
            {site.business.social.google && (
              <li><FooterLink href={site.business.social.google}>Google</FooterLink></li>
            )}
            {site.business.social.facebook && (
              <li><FooterLink href={site.business.social.facebook}>Facebook</FooterLink></li>
            )}
            {site.business.social.instagram && (
              <li><FooterLink href={site.business.social.instagram}>Instagram</FooterLink></li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-t border-ink-700">
        <div className="container-x py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-dark">
          <p>
            &copy; {new Date().getFullYear()} {site.business.legalName}. Licensed &amp;
            insured in Alberta.
          </p>
          <p>
            Built by{' '}
            <a
              href="https://birchmont.studio"
              className="text-white hover:text-accent underline underline-offset-4 decoration-accent decoration-2"
            >
              Birchmont Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-3">
      <h3 className="eyebrow text-white">{title}</h3>
      <ul role="list" className="mt-4 flex flex-col gap-2 text-sm">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-muted-dark hover:text-white">
      {children}
    </a>
  );
}
