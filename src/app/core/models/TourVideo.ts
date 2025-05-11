export interface TourVideo {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  tourId: number;
  userId: number;
}