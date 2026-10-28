declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// gtag.js is loaded conditionally in app/layout.tsx, only when
// NEXT_PUBLIC_GA_MEASUREMENT_ID is set and on the live host, so it may be absent.
interface Window {
  gtag?: (...args: unknown[]) => void;
  // Calendly's widget.js, loaded by the /strategy-session form once an
  // enquiry is saved.
  Calendly?: {
    initInlineWidget(options: {
      url: string;
      parentElement: HTMLElement;
      prefill?: {
        name?: string;
        email?: string;
        customAnswers?: Record<string, string>;
      };
    }): void;
  };
}