export interface favoriteItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  movement: {
    id: string;
    name: string;
    slug: string;
  };
  material: {
    id: string;
    name: string;
    slug: string;
  };
  bandMaterial: {
    id: string;
    name: string;
    slug: string;
  };
  images: {
    absolute_url: string;
    public_id: string;
  }[];
}
