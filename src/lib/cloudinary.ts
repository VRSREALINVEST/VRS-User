// Blog images are stored as Cloudinary originals: PNGs of up to 7 MB and
// 2560px. Adding a transformation component after /upload/ makes Cloudinary
// serve a resized AVIF/WebP of the same image; the stored URL is unchanged.
// f_auto and q_auto pick the format and quality per browser. c_limit only ever
// scales down and keeps the aspect ratio (w_ alone means c_scale, which
// enlarges a narrower original).
// ponytail: only plain versioned upload URLs (what the admin upload stores)
// are rewritten. Other hosts, signed, already-transformed and versionless
// URLs are returned as is, so a transformation is never applied twice.
const UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/)/;

export function cloudinaryUrl(url: string | undefined, width: number) {
  return url?.replace(UPLOAD, `$1f_auto,q_auto,c_limit,w_${width}/$2`);
}
