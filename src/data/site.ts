// Datos ficticios del sitio. Edita este archivo para personalizar el template.
import blogImg from '../img/blog.jpg';
import pothos from '../img/planta-3.jpg';
import peaceLily from '../img/planta-5.jpg';

export { site, formatPrice } from './config';


export const services = [
  {
    title: 'Fresh',
    icon: 'leaf',
    description: 'Every plant is grown in our own greenhouse and checked by hand before it leaves for your home.',
  },
  {
    title: 'Delivery',
    icon: 'truck',
    description: 'Same-day delivery in the city and protective packaging so your plant arrives happy and healthy.',
  },
  {
    title: 'Physical store',
    icon: 'store',
    description: 'Visit any of our three stores to see, touch and choose your plant with the help of our team.',
  },
  {
    title: 'At a touch',
    icon: 'pointer',
    description: 'Add plants to your cart and send us your order by WhatsApp. No accounts, no complicated forms.',
  },
] as const;

export const posts = [
  {
    id: 'how-to-care-for-plants',
    title: 'How to care for plants',
    date: '2026-09-12',
    image: blogImg,
    excerpt:
      'Light, water and a little patience: the three pillars of a healthy plant. Learn to read what your plant is telling you before problems appear.',
    body: [
      'Most indoor plants come from the floor of tropical forests, where light is filtered by the canopy. That is why “bright, indirect light” is the golden rule: close to a window, but out of the harsh afternoon sun.',
      'Overwatering is the most common mistake. Before watering, push a finger two centimeters into the soil — if it is still moist, wait a few days. Always use pots with drainage holes.',
      'Wipe the leaves with a damp cloth once a month so they can breathe and absorb more light, and rotate the pot so the plant grows evenly.',
    ],
  },
  {
    id: 'plants-for-low-light',
    title: 'Plants that love low light',
    date: '2026-08-28',
    image: pothos,
    excerpt:
      'No big windows? No problem. These tough plants will turn the darkest corner of your apartment into a green spot.',
    body: [
      'The ZZ Plant, the Golden Pothos and the Peace Lily are champions of low-light spaces. They grow slower in the shade, but stay green and healthy.',
      'In darker spaces plants drink less water, so space out your waterings. Yellow leaves are usually a sign of too much water, not too little light.',
      'If you notice long, stretched stems, move the plant a little closer to a light source for a few weeks.',
    ],
  },
  {
    id: 'pet-friendly-plants',
    title: 'Pet-friendly plants for your home',
    date: '2026-08-02',
    image: peaceLily,
    excerpt:
      'Cats and dogs love to nibble leaves. Choose plants that are safe for them and enjoy a green home without worries.',
    body: [
      'The Peperomia, the Calathea and the Parlor Palm are non-toxic for cats and dogs, so they are great choices for homes with pets.',
      'Some popular plants, like the Pothos or the Peace Lily, can cause irritation if eaten. Keep them on high shelves or hanging baskets.',
      'Look for the “Pet friendly” tag in our catalog to quickly find safe options.',
    ],
  },
];

export const testimonials = [
  {
    name: 'Laura Méndez',
    role: 'Plant mom of 23',
    text: 'My Fiddle Leaf Fig arrived perfectly packed and it has already grown three new leaves. The care guide they include is gold.',
    rating: 5,
  },
  {
    name: 'Carlos Rivera',
    role: 'Interior designer',
    text: 'I buy for my clients’ projects every month. The quality is consistent and the team always helps me choose the right plant for each space.',
    rating: 5,
  },
  {
    name: 'Sofía Herrera',
    role: 'First-time plant owner',
    text: 'I thought I killed every plant I touched. They recommended a ZZ Plant and a Pothos and both are thriving after six months!',
    rating: 5,
  },
  {
    name: 'Andrés Gómez',
    role: 'Café owner',
    text: 'Ordering by WhatsApp was super fast. The plants transformed our café and customers always ask where they are from.',
    rating: 4,
  },
];

export const stores = [
  {
    id: 'centro',
    name: 'Vibes Centro',
    address: 'Calle Verde 12, Centro',
    hours: 'Mon – Sat · 9:00 – 19:00',
    phone: '+57 300 000 0001',
    lat: 6.2476,
    lng: -75.5658,
  },
  {
    id: 'laureles',
    name: 'Vibes Laureles',
    address: 'Av. Jardín 45, Laureles',
    hours: 'Mon – Sun · 10:00 – 20:00',
    phone: '+57 300 000 0002',
    lat: 6.2447,
    lng: -75.5967,
  },
  {
    id: 'poblado',
    name: 'Vibes Poblado',
    address: 'Carrera Helecho 8, El Poblado',
    hours: 'Mon – Sat · 9:00 – 18:00',
    phone: '+57 300 000 0003',
    lat: 6.2088,
    lng: -75.5671,
  },
];

export const socials = [
  { name: 'Instagram', icon: 'instagram', handle: '@vibes.plants', followers: '48.2k', url: 'https://www.instagram.com/' },
  { name: 'Facebook', icon: 'facebook', handle: '/vibesplants', followers: '21.7k', url: 'https://www.facebook.com/' },
  { name: 'YouTube', icon: 'youtube', handle: 'Vibes Plants', followers: '9.4k', url: 'https://www.youtube.com/' },
  { name: 'Twitter', icon: 'twitter', handle: '@vibesplants', followers: '12.1k', url: 'https://x.com/' },
] as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/find', label: 'Find Us' },
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(iso + 'T12:00:00'));
