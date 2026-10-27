// Every "Schedule a One-on-One Session" button on the site opens the short
// form on /strategy-session in the same tab, so the enquiry, consent and
// tracking run before Calendly (client review, 26 Oct).
export const BOOKING_URL = "/strategy-session#book";

// The Calendly event that form opens once the enquiry is saved. Site buttons
// never link here directly; direct links stay for Google Business Profile and
// emails.
export const CALENDLY_URL =
  "https://calendly.com/sudhesh-vrsrealinvest/one-on-one-session";

// WhatsApp chat (number confirmed by Sudhesh). wa.me takes the number as
// country code + digits only.
export const WHATSAPP_URL = "https://wa.me/61412864050";

// Social profiles supplied by the client (27 Oct), tracking parameters
// removed. Facebook is the page its share link resolves to. LinkedIn is
// Sudhesh's personal profile; Instagram is his @vrsrealinvest account.
export const FACEBOOK_URL = "https://www.facebook.com/VRSrealinvest/";
export const INSTAGRAM_URL = "https://www.instagram.com/vrsrealinvest/";
export const YOUTUBE_URL = "https://www.youtube.com/@Createrealfreedom";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sudhesh-k-valappil";
