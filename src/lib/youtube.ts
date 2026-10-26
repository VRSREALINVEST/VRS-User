// watch?v=, youtu.be/, shorts/ and embed/ links; IDs are exactly 11 characters.
// Anything else returns null, and that video is skipped.
export const youtubeId = (url?: string): string | null =>
  url?.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})(?![\w-])/,
  )?.[1] ?? null;

// YouTube's own still for a video: hqdefault exists for every public video
// (480x360, letterboxed for 16:9). Pages show it through next/image, so the
// browser contacts nothing at YouTube until someone presses Play.
export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
