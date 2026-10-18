// Configuración general de la tienda (sin imágenes: se importa también desde el cliente).
export const site = {
  name: 'Vibes',
  tagline: 'The best company for your home',
  description:
    'Vibes is a plant shop with hand-picked indoor plants, care guides and physical stores. Browse the catalog and order in a few clicks.',
  email: 'hello@vibesplants.example',
  phone: '+57 300 000 0000',
  // Número (ficticio) al que se envía el pedido del carrito por WhatsApp
  whatsapp: '573000000000',
  currency: 'USD',
  freeShippingFrom: 60,
  shippingCost: 5,
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: site.currency, maximumFractionDigits: 0 }).format(value);
