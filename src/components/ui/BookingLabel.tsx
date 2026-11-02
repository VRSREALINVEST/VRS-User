// The site-wide booking label (Page Copy v3). Narrow buttons wrap it, and a
// browser may break after either hyphen ("One-on-" / "One"), so "One-on-One"
// is kept on one line.
export default function BookingLabel() {
  return (
    <>
      Schedule a <span className="whitespace-nowrap">One-on-One</span> Strategy
      Session
    </>
  );
}
