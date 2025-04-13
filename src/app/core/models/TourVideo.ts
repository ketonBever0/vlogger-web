export interface TourVideo {
  id: number;
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