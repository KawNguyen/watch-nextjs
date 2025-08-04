export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: {
      absolute_url: string;
    } | null;
  };
}
