"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle } from "lucide-react";
import { CALENDLY_URL } from "@/lib/links";
import { loadUtm, utmFromQuery } from "@/lib/utm";

// The booking-step form on /strategy-session (Page Copy v2 §3). It saves the
// enquiry through POST /api/enquiries with source "strategy-session", then
// opens Calendly's scheduler on the same page, prefilled.

const CALENDLY_WIDGET = "https://assets.calendly.com/assets/external/widget.js";

// Must match STATES, STRATEGY_GOALS and TIMINGS in
// backend/src/models/Enquiry.js byte for byte: the API compares exact strings,
// and the timings use en dashes (U+2013), not hyphens.
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", "Overseas"];
const GOALS = [
  "Buy my first investment property",
  "Add to my portfolio",
  "Buy through my SMSF",
  "Buy my first home",
  "Just learning for now",
];
const TIMINGS = ["Within 3 months", "3–6 months", "6–12 months", "Just researching"];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  goal: string;
  timing: string;
  contactConsent: boolean;
  marketingConsent: boolean;
};

// In page order, so the first one with an error gets focus.
const FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "state",
  "goal",
  "timing",
  "contactConsent",
] as const;
type FieldName = (typeof FIELDS)[number];
type FormErrors = Partial<Record<FieldName, string>>;

// Marketing consent starts unticked, as the client requires.
const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  goal: "",
  timing: "",
  contactConsent: false,
  marketingConsent: false,
};

// The same rules the API enforces; this layer only gives instant feedback, it
// is never the authority.
const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  const firstName = form.firstName.trim();
  if (!firstName) errors.firstName = "Please enter your first name";
  else if (firstName.length > 40) errors.firstName = "First name is too long";

  const lastName = form.lastName.trim();
  if (!lastName) errors.lastName = "Please enter your last name";
  else if (lastName.length > 40) errors.lastName = "Last name is too long";

  const email = form.email.trim();
  if (!email) errors.email = "Please enter your email";
  else if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Please enter a valid email";

  const phone = form.phone.trim();
  if (!phone) errors.phone = "Please enter your mobile number";
  else if (!/^\+?[\d\s()-]{8,20}$/.test(phone))
    errors.phone = "Please enter a valid mobile number";

  if (!form.state) errors.state = "Please select your state";
  if (!form.goal) errors.goal = "Please select what you are looking to do";
  if (!form.timing) errors.timing = "Please select when you are hoping to buy";
  if (!form.contactConsent)
    errors.contactConsent = "Please agree so we can contact you about your enquiry";

  return errors;
};

// Campaign attribution, so the CRM records where the enquiry came from. A tag
// on this page's own URL wins; any it lacks comes from the campaign UtmCapture
// saved earlier in the session. It goes to the API only, never to GA4.
const readUtm = () => {
  const utm = { ...loadUtm(), ...utmFromQuery(window.location.search) };
  return Object.keys(utm).length ? utm : undefined;
};

// The visitor's details for Calendly's form, in the embed's prefill shape.
// Calendly's phone question reads the number as international (tested 27 Oct:
// "0412…" showed as "+0412…", country unknown), so it goes in as +61… with no
// spaces; a number whose country can't be told is left for the visitor.
const calendlyPrefill = (form: FormState) => {
  const digits = form.phone.replace(/\D/g, "");
  const a3 = form.phone.trim().startsWith("+")
    ? `+${digits}`
    : form.state !== "Overseas" && digits.startsWith("0")
      ? `+61${digits.slice(1)}`
      : "";
  return {
    name: `${form.firstName.trim()} ${form.lastName.trim()}`,
    email: form.email.trim(),
    // Calendly numbers its invitee questions a1, a2… in order: "Your Contact
    // number" is the event's third (checked 27 Oct). Reorder the questions in
    // Calendly and this must follow.
    customAnswers: a3 ? { a3 } : undefined,
  };
};

// `muted` renders an unset <select> like a placeholder.
const inputClass = (hasError?: boolean, muted?: boolean) =>
  `w-full rounded-lg bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 border ${
    muted ? "text-gray-500" : "text-white"
  } ${
    hasError
      ? "border-red-500/60"
      : "border-[var(--card-border)] focus:border-[var(--primary-gold)]"
  }`;

const linkClass =
  "text-[var(--primary-gold)] underline underline-offset-4 hover:opacity-80";

function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: FieldName;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`ss-${name}`}
        className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-gray-400"
      >
        {label}
        <span className="text-[var(--primary-gold)]"> *</span>
      </label>

      {children}

      {error && (
        <p id={`ss-${name}-error`} className="mt-1.5 text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function StrategySessionForm() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  // `submitting` only changes on the next render, so a fast second click
  // could still see it false; the ref blocks a duplicate enquiry outright.
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [calendlyFailed, setCalendlyFailed] = useState(false);

  // Messages from the scheduler, trusted only from calendly.com.
  useEffect(() => {
    if (!submitted) return;
    let prefilled = false;
    let booked = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const event = e.data?.event;
      // widget.js posts the prefill while the scheduler loads, which
      // Calendly's app can miss (it did in testing, 27 Oct). So the same
      // message goes again when the visitor clicks Next to the details form:
      // at once, after 250 ms and after 1 s, because the form's phone field
      // resets itself as it starts (one send kept the phone 1 time in 3,
      // three sends 3 in 3).
      if (event === "calendly.date_and_time_selected" && !prefilled) {
        prefilled = true;
        const { customAnswers, ...details } = calendlyPrefill(form);
        const send = () =>
          calendlyRef.current
            ?.querySelector("iframe")
            ?.contentWindow?.postMessage(
              { event: "calendly.prefill", payload: { ...details, ...customAnswers } },
              "https://calendly.com",
            );
        for (const ms of [0, 250, 1000]) timers.push(setTimeout(send, ms));
      }
      // booking_completed, the GA4 key event, comes only from Calendly's own
      // confirmation, once, and bare like the other events.
      if (event === "calendly.event_scheduled" && !booked) {
        booked = true;
        window.gtag?.("event", "booking_completed");
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      timers.forEach(clearTimeout);
    };
  }, [submitted, form]);

  // Prefilled through the embed, never through a URL.
  const openCalendly = () => {
    const parentElement = calendlyRef.current;
    // onReady runs again on a remount; keep one scheduler.
    if (!parentElement || parentElement.childElementCount) return;
    window.Calendly?.initInlineWidget({
      url: CALENDLY_URL,
      parentElement,
      prefill: calendlyPrefill(form),
    });
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the field's error as soon as the visitor starts correcting it.
    setErrors((prev) =>
      prev[key as FieldName] ? { ...prev, [key]: undefined } : prev,
    );
  };

  const focusFirstError = (found: FormErrors) => {
    const first = FIELDS.find((name) => found[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#ss-${first}`)?.focus();
  };

  // Ties an input to its error message (and an optional hint) for screen
  // readers. `required` only announces the field as required: noValidate
  // keeps the browser's own validation out of the way.
  const describe = (name: FieldName, hintId?: string) => ({
    id: `ss-${name}`,
    required: true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      [errors[name] && `ss-${name}-error`, hintId].filter(Boolean).join(" ") ||
      undefined,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;

    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirstError(found);
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch(`${API}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "strategy-session",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          state: form.state,
          requirement: form.goal,
          timing: form.timing,
          contactConsent: form.contactConsent,
          marketingConsent: form.marketingConsent,
          utm: readUtm(),
        }),
      });

      if (res.status === 201) {
        // The form is replaced and inFlight stays set, so nothing can resend.
        setSubmitted(true);
        // Fired only for a saved enquiry, and bare: no parameters, so nothing
        // the visitor typed can reach GA4.
        window.gtag?.("event", "strategy_form_submit");
        // "Choose a time" has now opened the scheduler: a booking click, not
        // a booking.
        window.gtag?.("event", "booking_click");
        return;
      }

      // Map the API's field names back onto this form's.
      const data = await res.json().catch(() => ({}));
      const apiErrors = data.errors ?? {};
      const mapped: FormErrors = {
        firstName: apiErrors.firstName,
        lastName: apiErrors.lastName,
        email: apiErrors.email,
        phone: apiErrors.phone,
        state: apiErrors.state,
        goal: apiErrors.requirement,
        timing: apiErrors.timing,
        contactConsent: apiErrors.contactConsent,
      };
      setErrors(mapped);
      setServerError(data.message || "Something went wrong. Please try again.");
      focusFirstError(mapped);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }

    inFlight.current = false;
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <CheckCircle
          size={44}
          strokeWidth={1.5}
          className="mx-auto text-[var(--primary-gold)]"
        />

        {/* Focused on arrival so screen readers announce the result. */}
        <h3
          ref={(heading) => heading?.focus()}
          tabIndex={-1}
          className="mt-6 text-2xl font-medium tracking-[-0.01em] text-white outline-none"
        >
          Thank You
        </h3>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed tracking-wide text-gray-400">
          Your enquiry has been received. Our team will review it and be in
          touch with you shortly.
        </p>

        {/* Booking step: Calendly's scheduler on this page (v2 "Choose a
            time"). The enquiry is already saved, so a visitor who doesn't
            book is still followed up from the enquiry inbox. */}
        <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[var(--primary-gold)]">
          Choose a time
        </p>
        {calendlyFailed ? (
          <p className="mt-4 text-sm text-gray-400">
            The calendar didn’t load.{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Open it in a new tab
              <NewTab />
            </a>
          </p>
        ) : (
          // -mx-6 hands the card's padding to the scheduler on phones, where
          // Calendly needs the width.
          <div ref={calendlyRef} className="-mx-6 mt-4 h-[700px] md:mx-0" />
        )}
        <Script
          src={CALENDLY_WIDGET}
          onReady={openCalendly}
          onError={() => setCalendlyFailed(true)}
        />
      </div>
    );
  }

  return (
    // No `name` attributes and method="post": if the button were pressed
    // before the page hydrated, the browser's own submit would send nothing
    // and could never put the visitor's details in a URL.
    <form
      ref={formRef}
      method="post"
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label="First name" error={errors.firstName}>
          <input
            {...describe("firstName")}
            type="text"
            autoComplete="given-name"
            maxLength={40}
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputClass(!!errors.firstName)}
          />
        </Field>

        <Field name="lastName" label="Last name" error={errors.lastName}>
          <input
            {...describe("lastName")}
            type="text"
            autoComplete="family-name"
            maxLength={40}
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputClass(!!errors.lastName)}
          />
        </Field>
      </div>

      <Field name="email" label="Email" error={errors.email}>
        <input
          {...describe("email")}
          type="email"
          autoComplete="email"
          maxLength={150}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field name="phone" label="Mobile" error={errors.phone}>
        <input
          {...describe("phone", "ss-phone-hint")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClass(!!errors.phone)}
        />
        <p id="ss-phone-hint" className="mt-1.5 text-[11px] text-gray-500">
          Used only to contact you about this enquiry.
        </p>
      </Field>

      <Field name="state" label="State you live in" error={errors.state}>
        <select
          {...describe("state")}
          value={form.state}
          onChange={(e) => update("state", e.target.value)}
          className={inputClass(!!errors.state, !form.state)}
        >
          <option value="">Select your state</option>
          {STATES.map((state) => (
            <option key={state} value={state} className="bg-[#221F1F] text-white">
              {state}
            </option>
          ))}
        </select>
      </Field>

      <Field name="goal" label="What are you looking to do?" error={errors.goal}>
        <select
          {...describe("goal", form.goal === "Just learning for now" ? "ss-goal-hint" : undefined)}
          value={form.goal}
          onChange={(e) => update("goal", e.target.value)}
          className={inputClass(!!errors.goal, !form.goal)}
        >
          <option value="">Select an option</option>
          {GOALS.map((goal) => (
            <option key={goal} value={goal} className="bg-[#221F1F] text-white">
              {goal}
            </option>
          ))}
        </select>

        {/* An extra pointer only: every answer can still book a time. */}
        {form.goal === "Just learning for now" && (
          <p id="ss-goal-hint" className="mt-2 text-xs leading-relaxed text-gray-400">
            You can still book a time. You might also like our{" "}
            <Link href="/webinar" target="_blank" className={linkClass}>
              free webinars
              <NewTab />
            </Link>
            .
          </p>
        )}
      </Field>

      <Field name="timing" label="When are you hoping to buy?" error={errors.timing}>
        <select
          {...describe("timing")}
          value={form.timing}
          onChange={(e) => update("timing", e.target.value)}
          className={inputClass(!!errors.timing, !form.timing)}
        >
          <option value="">Select a timeframe</option>
          {TIMINGS.map((timing) => (
            <option key={timing} value={timing} className="bg-[#221F1F] text-white">
              {timing}
            </option>
          ))}
        </select>
      </Field>

      {/* Two separate consents: contact is required, marketing never is. */}
      <div className="space-y-4 pt-2">
        <div>
          <label
            htmlFor="ss-contactConsent"
            className="flex items-start gap-3 text-sm leading-relaxed text-gray-300"
          >
            <input
              {...describe("contactConsent")}
              type="checkbox"
              checked={form.contactConsent}
              onChange={(e) => update("contactConsent", e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary-gold)]"
            />
            <span>
              I agree to VRS Realinvest contacting me by email, phone or SMS
              about this enquiry and my One-on-One Session.{" "}
              <Link href="/privacy-policy" target="_blank" className={linkClass}>
                Privacy policy
                <NewTab />
              </Link>
              <span className="text-[var(--primary-gold)]"> *</span>
            </span>
          </label>
          {errors.contactConsent && (
            <p
              id="ss-contactConsent-error"
              className="ml-7 mt-1.5 text-[11px] text-red-400"
            >
              {errors.contactConsent}
            </p>
          )}
        </div>

        <label
          htmlFor="ss-marketingConsent"
          className="flex items-start gap-3 text-sm leading-relaxed text-gray-300"
        >
          <input
            id="ss-marketingConsent"
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(e) => update("marketingConsent", e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary-gold)]"
          />
          <span>
            Send me occasional emails about free webinars, guides and market
            updates. I can unsubscribe at any time.
          </span>
        </label>
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-[var(--primary-gold)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#221F1F] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Choose a time"}
      </button>
    </form>
  );
}

// "Book a time now" beside the page intro: an in-page jump to the form, and a
// booking click in GA4 (Page Copy v2 tracking).
export function BookTimeNow({ className }: { className: string }) {
  return (
    <a
      href="#book"
      onClick={() => window.gtag?.("event", "booking_click")}
      className={className}
    >
      Book a time now
    </a>
  );
}
