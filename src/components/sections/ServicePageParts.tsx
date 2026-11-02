import Link from "next/link";
import type { ReactNode } from "react";
import BookingLabel from "@/components/ui/BookingLabel";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/links";

// Building blocks for the landing pages written from Page Content v2 (Buyer's
// Agent Sydney, Interstate Buyer's Agent). Classes and markup follow
// /investment-property-buyers-agent, so the pages read as one site.

export const SITE_URL = "https://www.vrsrealinvest.com.au";
export const BODY = "text-sm md:text-base leading-relaxed tracking-wide text-gray-400";
export const H2 = "text-2xl md:text-3xl font-medium tracking-[-0.01em] text-white";
export const H3 = "text-base md:text-lg font-medium tracking-wide text-white";
export const TEXT_LINK =
  "text-[var(--primary-gold)] underline underline-offset-4 transition hover:opacity-80";
const LIST = `space-y-3 pl-5 marker:text-[var(--primary-gold)] ${BODY}`;

// Service + BreadcrumbList. The provider is the root layout's Organization; no
// offers, price, priceRange or rating markup (Page Content v2, developer notes).
export function ServiceJsonLd({
  path,
  crumb,
  serviceType,
  areaServed,
}: {
  path: string;
  crumb: string;
  serviceType: string;
  areaServed: object | object[];
}) {
  const url = `${SITE_URL}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: crumb, item: url },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function BookingButton() {
  return (
    <Link
      href={BOOKING_URL}
      className="inline-block rounded-lg bg-[var(--primary-gold)] px-7 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#221F1F] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-gold)]"
    >
      <BookingLabel />
    </Link>
  );
}

// "Button: Schedule a One-on-One Strategy Session · Or message us on WhatsApp"
export function CtaRow() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
      <BookingButton />
      <p className={BODY}>
        Or <ExternalLink href={WHATSAPP_URL}>message us on WhatsApp</ExternalLink>
      </p>
    </div>
  );
}

export function PageHero({
  crumb,
  title,
  children,
}: {
  crumb: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,200,156,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-[11px] uppercase tracking-[0.2em] text-gray-400"
        >
          <ol className="flex flex-wrap items-center">
            <li>
              <Link href="/" className="transition hover:text-[var(--primary-gold)]">
                Home
              </Link>
              <span aria-hidden="true" className="mx-2">
                ›
              </span>
            </li>
            <li aria-current="page" className="text-gray-200">
              {crumb}
            </li>
          </ol>
        </nav>

        <div className="mb-5 h-[2px] w-12 bg-[var(--primary-gold)]" />

        <h1 className="max-w-4xl text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>

        <div className="max-w-2xl">{children}</div>
      </div>
    </section>
  );
}

// The text column under the hero, same left edge as the hero.
export function PageBody({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      <div className="max-w-3xl space-y-14">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className={H2}>{title}</h2>
      {children}
    </section>
  );
}

export function Para({ children, className = "mt-5" }: { children: ReactNode; className?: string }) {
  return <p className={`${className} ${BODY}`}>{children}</p>;
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className={`mt-5 list-disc ${LIST}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

// Steps and checklists written as "**Lead.** text" in the copy.
export function LeadList({
  items,
  ordered = false,
}: {
  items: [string, ReactNode][];
  ordered?: boolean;
}) {
  const List = ordered ? "ol" : "ul";
  return (
    <List className={`mt-5 ${ordered ? "list-decimal" : "list-disc"} ${LIST}`}>
      {items.map(([lead, text]) => (
        <li key={lead}>
          <strong className="font-medium text-white">{lead}</strong> {text}
        </li>
      ))}
    </List>
  );
}

// A real HTML table in a labelled, keyboard-scrollable region: on phones it
// scrolls sideways inside the region (never the page) and the first column
// stays in view. The first cell of each row is its row header.
export function DataTable({
  id,
  caption,
  head,
  rows,
  minWidth,
}: {
  id: string;
  caption: string;
  head: string[];
  rows: ReactNode[][];
  minWidth: string;
}) {
  const cell = "border-b border-[var(--card-border)] px-4 py-3 align-top";
  // The pinned first column's edge: a border wouldn't stay with a sticky cell
  // in a collapsed-border table, an inset shadow does.
  const pinned = "sticky left-0 bg-[var(--card-bg)] shadow-[inset_-1px_0_0_var(--card-border)]";
  return (
    <div
      role="region"
      aria-labelledby={id}
      tabIndex={0}
      className="mt-5 overflow-x-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] focus-visible:outline-2 focus-visible:outline-[var(--primary-gold)]"
    >
      <table className={`w-full border-collapse text-left text-sm ${minWidth}`}>
        <caption id={id} className="sr-only">
          {caption}
        </caption>
        <thead>
          <tr>
            {head.map((h, i) =>
              h ? (
                <th
                  key={h}
                  scope="col"
                  className={`${cell} font-medium text-[var(--primary-gold)] ${i === 0 ? pinned : ""}`}
                >
                  {h}
                </th>
              ) : (
                <td key={i} className={`${cell} ${pinned}`} />
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(([header, ...cells], r) => (
            <tr key={r} className="last:*:border-b-0">
              <th
                scope="row"
                className={`${cell} ${pinned} font-medium text-white`}
              >
                {header}
              </th>
              {cells.map((c, i) => (
                <td key={i} className={`${cell} leading-relaxed text-gray-400`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Faqs({ items }: { items: [string, string][] }) {
  return (
    <Section title="Frequently asked questions">
      <div className="mt-5 space-y-6">
        {items.map(([question, answer]) => (
          <div key={question}>
            <h3 className={H3}>{question}</h3>
            <p className={`mt-2 ${BODY}`}>{answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// The closing card: a lead line (not a heading, as on the service page), the
// copy, then the booking button and WhatsApp link.
export function ClosingBlock({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 p-6 backdrop-blur-sm md:p-10">
      <p className={`${H2} font-[family-name:var(--font-heading)]`}>{lead}</p>
      <p className={`mt-4 ${BODY}`}>{children}</p>
      <CtaRow />
    </section>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-relaxed tracking-wide text-gray-500">{children}</p>;
}
