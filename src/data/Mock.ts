import {
  Apple,
  ChefHat,
  Carrot,
  Drumstick,
  Fish,
  Milk,
  SprayCan,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  name: string;
  tagline: string;
  icon: LucideIcon;
  bg: string;
}

export interface Product {
  id: number;
  name: string;
  unitLabel: string;
  price: number;
  image: string;
  inStock: boolean;
}

export const categories: Category[] = [
  {
    name: "Vegetables",
    tagline: "Garden-fresh",
    icon: Carrot,
    bg: "bg-[#eaf3e6]",
  },
  {
    name: "Fruits",
    tagline: "Naturally sweet",
    icon: Apple,
    bg: "bg-[#fdf0dd]",
  },
  {
    name: "Meat & poultry",
    tagline: "Quality cuts",
    icon: Drumstick,
    bg: "bg-[#fbe9e4]",
  },
  { name: "Seafood", tagline: "Fresh catches", icon: Fish, bg: "bg-[#e6f0f3]" },
  {
    name: "Dairy & eggs",
    tagline: "Daily essentials",
    icon: Milk,
    bg: "bg-[#f3efe5]",
  },
  {
    name: "Rice & pantry",
    tagline: "Cupboard staples",
    icon: Wheat,
    bg: "bg-[#faf1e0]",
  },
  {
    name: "Bakery",
    tagline: "Freshly baked",
    icon: ChefHat,
    bg: "bg-[#f4ebe6]",
  },
  {
    name: "Household",
    tagline: "Home essentials",
    icon: SprayCan,
    bg: "bg-[#eaf1ec]",
  },
];

// Put these images in /public/images/ (or replace with URLs from your API / Cloudinary).
export const products: Product[] = [
  {
    id: 1,
    name: "Farm-fresh tomatoes",
    unitLabel: "Sold by weight · per kg",
    price: 120,
    image: "/images/tomatoes.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Sweet Lakatan bananas",
    unitLabel: "Sold by weight · per kg",
    price: 95,
    image: "/images/bananas.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Creamy Hass avocado",
    unitLabel: "Sold by weight · per kg",
    price: 280,
    image: "/images/avocado.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "Free-range brown eggs",
    unitLabel: "Pack of 6 · fixed price",
    price: 105,
    image: "/images/eggs.jpg",
    inStock: true,
  },
];
