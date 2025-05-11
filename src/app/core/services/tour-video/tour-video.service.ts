import { Injectable, OnInit } from '@angular/core';
import { TourVideo } from '../../models/TourVideo';
import { StoreService } from '../store/store.service';
import { deleteField, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TourVideoService {
  constructor(private readonly fStore: StoreService) {}

  async addTemplateVideos() {
    for (const video of this.tourVideos) {
      const newVideo = video as any;
      await setDoc(doc(this.fStore.db, 'videos', video.id), {
        ...newVideo,
        id: deleteField(),
      }, {merge: true});
      console.log('Video added:', video.id);
    }
  }

  tourVideos: TourVideo[] = [
    {
      id: 'xZJGT3LcBcbgGqPr6VCk',
      title: 'Tour Video 1',
      description: 'Description for Tour Video 1',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      videoUrl: 'https://example.com/video1.mp4',
      createdAt: new Date('2025-04-11T00:00:00Z'),
      updatedAt: new Date(),
      tourId: 101,
      userId: 1,
      views: 1,
    },
    {
      id: 'UPwgvJRK1g4JbZyI99Ur',
      title: 'Tour Video 2',
      description: 'Description for Tour Video 2',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      videoUrl: 'https://example.com/video2.mp4',
      createdAt: new Date(new Date().getTime() - 90000),
      updatedAt: new Date(),
      tourId: 102,
      userId: 2,
      views: 0,
    },
    {
      id: '3hsLoSHLbisMw5exf2wz',
      title: 'Tour Video 3',
      description: 'Description for Tour Video 3',
      thumbnail: 'https://example.com/thumbnail3.jpg',
      videoUrl: 'https://example.com/video3.mp4',
      createdAt: new Date('2025-04-12T00:00:00Z'),
      updatedAt: new Date(),
      tourId: 103,
      userId: 3,
      views: 0,
    },
    {
      id: 'MLZMxDs9siuXXAbhEguj',
      title: 'Tour Video 4',
      description: 'Description for Tour Video 4',
      thumbnail: 'https://example.com/thumbnail4.jpg',
      videoUrl: 'https://example.com/video4.mp4',
      createdAt: new Date('2024-07-22T00:00:00Z'),
      updatedAt: new Date(),
      tourId: 104,
      userId: 4,
      views: 362,
    },
    {
      id: 'KJatcSM4IsFFcv6O5SzT',
      title: 'Tour Video 5',
      description: 'Description for Tour Video 5',
      thumbnail: 'https://example.com/thumbnail5.jpg',
      videoUrl: 'https://example.com/video4.mp5',
      createdAt: new Date('2024-12-19T00:00:00Z'),
      updatedAt: new Date(),
      tourId: 105,
      userId: 5,
      views: 109,
    },
  ];
}
