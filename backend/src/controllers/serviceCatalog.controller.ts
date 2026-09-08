import { Request, Response } from "express";

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  sortOrder: number;
  defaultLocale: string;
  serviceCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogService {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  priceMinor: number;
  currency: string;
  durationMinutes: number | null;
  requiredMaterials: string | null;
  eligibility: string | null;
  active: boolean;
  featured: boolean;
  imageUrl: string | null;
  workflowKey: string | null;
  defaultLocale: string;
  categoryName: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: "cat-pitru-moksha",
    name: "PitruMoksha Gaya",
    slug: "pitru-moksha",
    description: "Authentic ancestral rites, Pind Daan, and Shraddha Karma in Gaya Ji.",
    active: true,
    sortOrder: 1,
    defaultLocale: "en",
    serviceCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-vedic-rituals",
    name: "Vedic Ritual Services",
    slug: "ritual-services",
    description: "Vedic ceremonies conducted with scriptural precision by verified Purohits.",
    active: true,
    sortOrder: 2,
    defaultLocale: "en",
    serviceCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-travel-assistance",
    name: "Pilgrim Travel Assistance",
    slug: "travel-assistance",
    description: "Logistics, sacred city transfers, hotel/dharamshala stay, and shadow assist.",
    active: true,
    sortOrder: 3,
    defaultLocale: "en",
    serviceCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-vahi-records",
    name: "Vahi Lineage Records",
    slug: "vahi-records",
    description: "Ancestral genealogy search, record preservation, and Panda ledger validation.",
    active: true,
    sortOrder: 4,
    defaultLocale: "en",
    serviceCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const SERVICES: CatalogService[] = [
  {
    id: "srv-pitru-moksha-gaya",
    categoryId: "cat-pitru-moksha",
    name: "PitruMoksha Gaya (Pind Daan & Shraddha Karma)",
    slug: "pitru-moksha-gaya",
    shortDescription: "Complete Vedic ancestral rites at Vishnupad, Falgu River, and Akshayavat in Gaya Ji.",
    description: "Complete ancestral rites performed under Vedic protocols by verified lineaged Tirth Purohits across Gaya Ji sacred tirthas (Falgu, Vishnupad, Akshayavat).",
    priceMinor: 0,
    currency: "INR",
    durationMinutes: 240,
    requiredMaterials: "Samagri provided by verified partner. Family Gotra and ancestor details required.",
    eligibility: "Available for all devotee families seeking ancestral peace and liberation.",
    active: true,
    featured: true,
    imageUrl: "/images/hero/vahi-records-ledger.jpg",
    workflowKey: "PITRU_MOKSHA_GAYA",
    defaultLocale: "en",
    categoryName: "PitruMoksha Gaya",
    categorySlug: "pitru-moksha",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "srv-griha-pravesh",
    categoryId: "cat-vedic-rituals",
    name: "Griha Pravesh Puja",
    slug: "griha-pravesh",
    shortDescription: "Auspicious home sanctification, Vastu Shanti, and Navagraha Havan.",
    description: "Traditional Vedic Griha Pravesh puja ensuring peace, prosperity, and divine blessings for your new home.",
    priceMinor: 0,
    currency: "INR",
    durationMinutes: 180,
    requiredMaterials: "Complete list of puja items and samagri will be confirmed upon inquiry review.",
    eligibility: "Homeowners moving into a new residence.",
    active: true,
    featured: true,
    imageUrl: null,
    workflowKey: "RITUAL_GRIHA_PRAVESH",
    defaultLocale: "en",
    categoryName: "Vedic Ritual Services",
    categorySlug: "ritual-services",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "srv-navagraha-shanti",
    categoryId: "cat-vedic-rituals",
    name: "Navagraha Shanti Havan",
    slug: "navagraha-shanti",
    shortDescription: "Planetary balance and peace havan guided by Vedic Purohits.",
    description: "Specialized planetary harmony homam to appease the nine celestial bodies and dispel planetary doshas.",
    priceMinor: 0,
    currency: "INR",
    durationMinutes: 150,
    requiredMaterials: "Navagraha samagri, dry fruits, ghee, and havan woods.",
    eligibility: "Open to all families seeking planetary peace and spiritual balance.",
    active: true,
    featured: false,
    imageUrl: null,
    workflowKey: "RITUAL_NAVAGRAHA",
    defaultLocale: "en",
    categoryName: "Vedic Ritual Services",
    categorySlug: "ritual-services",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "srv-travel-assistance",
    categoryId: "cat-travel-assistance",
    name: "Sacred City Pilgrim Travel Assistance",
    slug: "pilgrim-travel-assistance",
    shortDescription: "Complete logistics, station pickup, hotel/dharamshala coordination in Gaya Ji.",
    description: "Dedicated travel support, comfortable lodging, accessible local transport, and elderly shadow assist for sacred pilgrimages.",
    priceMinor: 0,
    currency: "INR",
    durationMinutes: null,
    requiredMaterials: "Travel itinerary and arrival details.",
    eligibility: "All visiting pilgrims and families.",
    active: true,
    featured: true,
    imageUrl: null,
    workflowKey: "TRAVEL_ASSISTANCE",
    defaultLocale: "en",
    categoryName: "Pilgrim Travel Assistance",
    categorySlug: "travel-assistance",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "srv-vahi-records",
    categoryId: "cat-vahi-records",
    name: "Ancestral Vahi & Lineage Verification",
    slug: "ancestral-vahi-records",
    shortDescription: "Verification and search of century-old family lineage records across Gaya Pandas.",
    description: "Authentic genealogy search across traditional handwritten Vahi bahi-khata registers preserved by lineage Pandas.",
    priceMinor: 0,
    currency: "INR",
    durationMinutes: null,
    requiredMaterials: "Grandfather/ancestor names, village of origin, Gotra, and previous visit details.",
    eligibility: "Families seeking to connect with their ancestral lineage records.",
    active: true,
    featured: true,
    imageUrl: "/images/hero/vahi-records-ledger.jpg",
    workflowKey: "VAHI_RECORDS",
    defaultLocale: "en",
    categoryName: "Vahi Lineage Records",
    categorySlug: "vahi-records",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getPublicCategories(req: Request, res: Response) {
  return res.json(CATEGORIES);
}

export function getPublicServices(req: Request, res: Response) {
  const { q, category, featured, page = "1", pageSize = "12" } = req.query;
  const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
  const sizeNum = Math.max(1, parseInt(String(pageSize), 10) || 12);

  let filtered = SERVICES.filter((s) => s.active);

  if (category && typeof category === "string") {
    filtered = filtered.filter((s) => s.categorySlug === category || s.categoryId === category);
  }

  if (featured === "true") {
    filtered = filtered.filter((s) => s.featured);
  }

  if (q && typeof q === "string") {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        (s.description && s.description.toLowerCase().includes(query)) ||
        (s.shortDescription && s.shortDescription.toLowerCase().includes(query)) ||
        s.categoryName.toLowerCase().includes(query)
    );
  }

  const total = filtered.length;
  const start = (pageNum - 1) * sizeNum;
  const items = filtered.slice(start, start + sizeNum);

  return res.json({
    items,
    total,
    page: pageNum,
    pageSize: sizeNum,
  });
}

export function getPublicServiceBySlug(req: Request, res: Response) {
  const slug = String(req.params.slug);
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found." });
  }
  return res.json(service);
}
