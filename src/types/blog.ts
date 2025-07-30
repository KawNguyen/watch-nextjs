export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  userId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
