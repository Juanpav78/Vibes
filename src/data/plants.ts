import type { ImageMetadata } from 'astro';
import philodendron from '../img/planta-1.jpg';
import fiddleLeaf from '../img/planta-2.jpg';
import pothos from '../img/planta-3.jpg';
import zzPlant from '../img/planta-4.jpg';
import peaceLily from '../img/planta-5.jpg';
import peperomia from '../img/plantaCard.jpg';

export type Tag = 'easy-care' | 'pet-friendly' | 'large' | 'hanging' | 'low-light' | 'air-purifying';

export interface Plant {
  id: string;
  name: string;
  latin: string;
  price: number;
  image: ImageMetadata;
  short: string;
  description: string;
  light: string;
  water: string;
  size: string;
  tags: Tag[];
  bestSeller?: boolean;
  isNew?: boolean;
}

export const TAG_LABELS: Record<Tag, string> = {
  'easy-care': 'Easy care',
  'pet-friendly': 'Pet friendly',
  large: 'Large',
  hanging: 'Hanging',
  'low-light': 'Low light',
  'air-purifying': 'Air purifying',
};

export const plants: Plant[] = [
  {
    id: 'philodendron-prince-of-orange',
    name: 'Prince of Orange',
    latin: 'Philodendron hybrid',
    price: 32,
    image: philodendron,
    short: 'New leaves unfold in glowing orange tones.',
    description:
      'A compact philodendron whose new leaves emerge bright orange and slowly turn green, giving you a sunset of colors in a single pot. Grows slowly and stays tidy on desks and shelves.',
    light: 'Bright, indirect',
    water: 'Every 7–10 days',
    size: '40 – 50 cm',
    tags: ['easy-care', 'air-purifying'],
    bestSeller: true,
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    latin: 'Ficus lyrata',
    price: 58,
    image: fiddleLeaf,
    short: 'The statement tree every living room deserves.',
    description:
      'Large violin-shaped leaves and an upright silhouette make the Fiddle Leaf Fig the star of any room. Place it near a bright window and rotate it every few weeks to keep it growing straight.',
    light: 'Bright, filtered',
    water: 'Every 7 days',
    size: '110 – 130 cm',
    tags: ['large', 'air-purifying'],
    bestSeller: true,
  },
  {
    id: 'golden-pothos',
    name: 'Golden Pothos',
    latin: 'Epipremnum aureum',
    price: 22,
    image: pothos,
    short: 'Cascading vines that thrive almost anywhere.',
    description:
      'Heart-shaped leaves on long trailing vines — perfect for hanging baskets or high shelves. Pothos forgives forgotten waterings and adapts to low light, making it ideal for first-time plant parents.',
    light: 'Low to bright, indirect',
    water: 'When top soil is dry',
    size: 'Vines up to 90 cm',
    tags: ['easy-care', 'hanging', 'low-light', 'air-purifying'],
    isNew: true,
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    latin: 'Zamioculcas zamiifolia',
    price: 36,
    image: zzPlant,
    short: 'Glossy, architectural and nearly indestructible.',
    description:
      'Waxy, deep-green leaves that reflect light and look polished all year long. The ZZ stores water in its rhizomes, so it is happy with very little attention and tolerates dim corners.',
    light: 'Low to medium',
    water: 'Every 2–3 weeks',
    size: '60 – 70 cm',
    tags: ['easy-care', 'low-light'],
    bestSeller: true,
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    latin: 'Spathiphyllum wallisii',
    price: 28,
    image: peaceLily,
    short: 'Elegant white blooms and lush green leaves.',
    description:
      'A classic that blooms indoors with graceful white flowers. The Peace Lily even tells you when it is thirsty: its leaves droop slightly and bounce back right after watering.',
    light: 'Medium, indirect',
    water: 'Once a week',
    size: '50 – 60 cm',
    tags: ['low-light', 'air-purifying'],
  },
  {
    id: 'peperomia',
    name: 'Baby Rubber Plant',
    latin: 'Peperomia obtusifolia',
    price: 25,
    image: peperomia,
    short: 'Round, juicy leaves that are safe for pets.',
    description:
      'Thick, rounded leaves on a compact plant that fits any windowsill. Peperomia is non-toxic for cats and dogs, so it is a worry-free choice for homes with furry friends.',
    light: 'Medium to bright',
    water: 'Every 10–14 days',
    size: '25 – 30 cm',
    tags: ['easy-care', 'pet-friendly'],
    isNew: true,
  },
];

export const bestSellers = plants.filter((p) => p.bestSeller);

export const getPlant = (id: string) => plants.find((p) => p.id === id);
