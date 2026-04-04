export type Product = {
  id: number;
  title: string;
  medium: string;
  year: string;
  category: string;
  image: string;
  dimensions: string;
  price: string;
  mercadolibreUrl: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Forma I",
    medium: "Terracotta",
    year: "2024",
    category: "Escultura",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2400&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2400&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2400&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=2400&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2400&auto=format&fit=crop",
    dimensions: "50 × 25 × 25 cm",
    price: "ARS 125.000",
    mercadolibreUrl: "#",
  },
];
