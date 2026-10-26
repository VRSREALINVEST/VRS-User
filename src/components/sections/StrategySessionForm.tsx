"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { loadUtm, utmFromQuery } from "@/lib/utm";

// The booking-step form on /strategy-session (Page Copy v2 §3). It saves the
// enquiry through POST /api/enquiries with source "strategy-session".

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

        {/* Booking step. When the client confirms the Calendly event to embed
            and the order of its questions, Calendly's inline widget goes here,
            prefilled from `form` through the embed's prefill option (never the
            URL), and booking_completed fires on its calendly.event_scheduled
            message. Until then the team follows up from the enquiry inbox. */}
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
