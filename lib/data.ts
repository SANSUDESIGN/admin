export type Product = {
  id: number;
  title: string;
  medium: string;
  year: string;
  category: string;
  images: string[];
  description: string;
  dimensions: string;
  price: string;
  mercadolibreUrl: string;
};

export const toSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Forma I",
    medium: "Terracotta",
    year: "2024",
    category: "Escultura",
    images: [
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2400&auto=format&fit=crop",
    ],
    description: "Pieza de terracotta de forma libre, construida a mano con arcilla local. Superficie sin esmaltar que conserva la textura y el color natural de la tierra.",
    dimensions: "32 × 18 × 18 cm",
    price: "ARS 85.000",
    mercadolibreUrl: "#",
  },
  {
    id: 2,
    title: "Tierra Viva",
    medium: "Stoneware y pigmentos naturales",
    year: "2024",
    category: "Escultura",
    images: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2400&auto=format&fit=crop",
    ],
    description: "Escultura en stoneware pigmentado con óxidos minerales naturales. Cada tonalidad es resultado del proceso de cocción, irrepetible en cada pieza.",
    dimensions: "45 × 22 × 22 cm",
    price: "ARS 110.000",
    mercadolibreUrl: "#",
  },
  {
    id: 3,
    title: "Quietud",
    medium: "Arcilla enrollada a mano",
    year: "2024",
    category: "Detalle de interior",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop",
    ],
    description: "Forma plana construida con la técnica de enrollado. Las marcas del proceso quedan visibles como parte del lenguaje de la pieza.",
    dimensions: "28 × 28 × 12 cm",
    price: "ARS 72.000",
    mercadolibreUrl: "#",
  },
  {
    id: 4,
    title: "Raíz",
    medium: "Cerámica raku",
    year: "2023",
    category: "Escultura",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2400&auto=format&fit=crop",
    ],
    description: "Escultura de gran formato horneada con la técnica raku. Las fracturas y manchas del proceso son el alma de la pieza — ninguna es igual a otra.",
    dimensions: "60 × 20 × 20 cm",
    price: "ARS 145.000",
    mercadolibreUrl: "#",
  },
  {
    id: 5,
    title: "Origen",
    medium: "Stoneware",
    year: "2023",
    category: "Detalle de interior",
    images: [
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2400&auto=format&fit=crop",
    ],
    description: "Pieza compacta en stoneware natural. Pensada para habitar una repisa o mesa, su geometría simple invita a ser tocada.",
    dimensions: "20 × 20 × 30 cm",
    price: "ARS 68.000",
    mercadolibreUrl: "#",
  },
  {
    id: 6,
    title: "Flujo",
    medium: "Loza y óxido",
    year: "2023",
    category: "Escultura",
    images: [
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2400&auto=format&fit=crop",
    ],
    description: "Forma ondulante en loza, tratada con óxido de hierro. La superficie recoge el tiempo del horneado como una piel.",
    dimensions: "50 × 25 × 25 cm",
    price: "ARS 125.000",
    mercadolibreUrl: "#",
  },
];
