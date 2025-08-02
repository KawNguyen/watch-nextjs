export type PriceValue = {
  minPrice: number;
  maxPrice: number;
};

export type FilterValue = string | PriceValue;

export interface FilterItem {
  title: string;
  value: FilterValue;
}

export interface FilterSection {
  title: string;
  value?: "price" | "brands" | "movements"; // optional vì bạn có vài mục không có
  items: FilterItem[];
}

export interface GenderFilter {
  title: string;
  value: "MEN" | "WOMEN";
  navItems: FilterSection[];
}