import { Timestamp } from "firebase/firestore";

export interface TourVideo {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  videoUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  tourId: number;
  userId: number;
}