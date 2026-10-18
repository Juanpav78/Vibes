// Versión serializable del catálogo para las islas React (modal y carrito),
// con las imágenes ya optimizadas en build.
import { getImage } from 'astro:assets';
import { plants, TAG_LABELS } from '../data/plants';

export interface ClientPlant {
  id: string;
  name: string;
  latin: string;
  price: number;
  description: string;
  light: string;
  water: string;
  size: string;
  tags: string[];
  image: string;
  thumb: string;
}

export async function getClientPlants(): Promise<ClientPlant[]> {
  return Promise.all(
    plants.map(async ({ image, tags, short: _short, bestSeller: _b, isNew: _n, ...plant }) => {
      const [large, thumb] = await Promise.all([
        getImage({ src: image, width: 720, height: 720, fit: 'cover', format: 'webp', quality: 75 }),
        getImage({ src: image, width: 160, height: 160, fit: 'cover', format: 'webp', quality: 70 }),
      ]);
      return { ...plant, tags: tags.map((t) => TAG_LABELS[t]), image: large.src, thumb: thumb.src };
    }),
  );
}
