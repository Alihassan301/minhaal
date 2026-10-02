import type { Chapter, Memory, WishFlower } from '../types/gift';

/**
 * ─────────────────────────────────────────────
 *  THE GIFT OF YOU — all personal content lives here.
 *  Edit any text or image below to personalise the gift.
 * ─────────────────────────────────────────────
 */

export const name = 'Minaal';

export const opening = {
  lines: ['Something special...', 'has been made for you.'],
  prompt: 'Tap the gift to open it'
};

export const hero = {
  tagline: 'A little something, made just for you.',
  subline: 'Because some people deserve more than ordinary words.',
  cta: 'Open Your Gift',
  // Swap for your own artwork if you like.
  image: "/a723f945-35d4-45bc-8fae-f50a36bb6258.jpg"
};

export const words = {
  heading: 'Words For You',
  note: 'a letter, unfolding as you read',
  lines: [
  'Some people make ordinary moments feel special.',
  'Some smiles stay in your memory longer than expected.',
  'And some people simply deserve to know how appreciated they are.',
  `Today, these words are for you, ${name}.`]

};

export const garden = {
  accent: 'a bouquet',
  title: 'Every flower here grew for you.',
  body: 'Roses for warmth, sunflowers for light, and small blossoms for all the quiet good you bring.'
};

export const wishes = {
  heading: 'A Few Things',
  accent: 'I Wish For You',
  items: [
  'More beautiful days.',
  'More reasons to smile.',
  'More unforgettable memories.',
  'More adventures.',
  'More peace.',
  'More confidence.',
  'More moments that make you genuinely happy.',
  'More dreams becoming reality.']

};

/**
 * Replace each `src` with your own photo, e.g. '/images/minaal-1.jpg'.
 */
export const memories = {
  accent: 'memories',
  heading: 'A small album of moments.',
  items: [
  {
    src: "/1b8de736-8a34-4b90-bb8d-45cb9aa7c334.jpg", // '/images/minaal-1.jpg'
    alt: 'Hands holding a small bouquet of blush roses in golden light',
    caption: 'A moment worth remembering.',
    note: 'The kind of light that makes everything feel softer.'
  },
  {
    src: "/b0408ee3-481c-4301-ba19-fba6c8a17d00.jpg", // '/images/minaal-2.jpg'
    alt: 'Sunflowers and roses on a sunlit table beside a handwritten letter',
    caption: 'Some memories speak without words.',
    note: 'Quiet afternoons, kept carefully.'
  },
  {
    src: "/c820a8e5-244d-497c-8f9d-f0a0bb54c283.jpg", // '/images/minaal-3.jpg'
    alt: 'A woman walking through a wildflower field at sunset',
    caption: 'Keep this smile forever.',
    note: 'Wherever you go, may it always feel like this.'
  }] as
  Memory[]
};

export const surprise = {
  heading: 'One Little Surprise',
  prompt: 'Open this.',
  hint: 'Tap the envelope',
  salutation: `For ${name}`,
  message: `${name}, I hope life gives you countless reasons to smile.`,
  signature: 'with warmth, always'
};

export const gardenOfWishes = {
  heading: 'The Garden of Wishes',
  accent: 'each flower, a wish',
  flowers: [
  { label: 'Happiness', kind: 'sunflower' },
  { label: 'Peace', kind: 'blossom' },
  { label: 'Success', kind: 'rose' },
  { label: 'Adventure', kind: 'sunflower' },
  { label: 'Beautiful Memories', kind: 'peony' },
  { label: 'Everything Your Heart Hopes For', kind: 'rose' }] as
  WishFlower[]
};

export const appreciation = {
  statement: 'You Matter.',
  follow: 'More than you probably realize.'
};

export const finalMessage = {
  lines: ['Before you leave...', 'Remember this.', 'You are appreciated.', `Stay happy, ${name}. ❤️`]
};

export const finale = {
  line: 'A little gift, with a lot of good wishes.',
  closing: 'Always keep smiling. ❤️',
  again: 'Begin again'
};

export const chapters: Chapter[] = [
{ id: 'intro', label: 'Introduction' },
{ id: 'words', label: 'Words' },
{ id: 'wishes', label: 'Wishes' },
{ id: 'memories', label: 'Memories' },
{ id: 'surprise', label: 'Surprise' },
{ id: 'garden', label: 'Finale' }];


export const music = {
  label: 'Music'
};