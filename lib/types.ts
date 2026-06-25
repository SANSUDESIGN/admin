export type ProductStatus = 'available' | 'new' | 'sold' | 'edition';

export type Product = {
  id: number;
  title: string;
  medium: string;
  year: string;
  category: string;
  hidden: boolean;
  images: string[];
  description: string;
  dimensions: string;
  price: string;
  mercadolibreUrl?: string;
  cuidado?: string;
  encargos?: string;
  envio?: string;
  // Sansu V2 (optional, additive)
  series?: string;
  status?: ProductStatus;
  editionLabel?: string;
};

export type HeroContent = {
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  subtitle: string;
  ctaText: string;
  imageUrl: string;
  // Optional background video; when set it plays over imageUrl (used as poster).
  videoUrl?: string;
  // Sansu V2 hero tagline (optional)
  tagline1?: string;
  tagline2?: string;
};

export type WorksContent = {
  title: string;
  subtitle: string;
  instagramCta: string;
  instagramHandle: string;
  instagramUrl: string;
};

export type ValuesItem = {
  icon: string;
  title: string;
  description: string;
};

export type ValuesContent = {
  items: ValuesItem[];
};

export type StudioContent = {
  label: string;
  leadParagraph: string;
  subParagraph: string;
  column1: string[];
  column2: string[];
  tagline: string;
  photoUrl?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  label: string;
  title: string;
  items: FaqItem[];
};

export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  tagline: string;
  email: string;
  studioText: string;
  exploreHeading: string;
  navLinks: FooterNavLink[];
  socialHeading: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappLabel: string;
  whatsappUrl: string;
  brand: string;
  privacyLabel: string;
  copyright: string;
};

export type ProductsData = {
  products: Product[];
};

export type FontContent = {
  headingFont: string;
  bodyFont: string;
  fontSize: number;
};
