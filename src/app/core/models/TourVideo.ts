export interface TourVideo {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  tourId: number;
  userId: number;
}