import { Injectable, OnInit } from '@angular/core';
import { TourVideo } from '../../models/TourVideo';
import { StoreService } from '../store/store.service';
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Tour } from '@app/core/models/Tour';
import { NewTourVideo } from '@app/core/models/NewTourVideo';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TourVideoService implements OnInit {
  constructor(
    private readonly fStore: StoreService,
    private readonly fAuth: AuthService
  ) {}

  tourVideos: TourVideo[] = [];
  tours: Tour[] = [];

  ngOnInit(): void {}

  async getTourVideos() {
    await getDocs(query(collection(this.fStore.db, 'videos'))).then((res) => {
      res.forEach((doc) => {
        this.tourVideos.push({
          id: doc.id,
          ...doc.data(),
        } as TourVideo);
      });
    });
  }

  async getTours() {
    await getDocs(query(collection(this.fStore.db, 'tours'))).then((res) => {
      res.forEach((doc) => {
        this.tours.push({
          id: doc.id,
          ...doc.data(),
        } as Tour);
      });
    });
  }

  async addVideo(tourVideo: NewTourVideo) {
    try {
      const res = await addDoc(collection(this.fStore.db, 'videos'), {
        title: tourVideo.title,
        description: tourVideo.description,
        tourId: tourVideo.tourId,
        userId: this.fAuth.userData?.id,
        thumbnail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        videoUrl: '',
        views: 0,
      });
      return !!res;
    } catch (e) {
      console.error('Error adding video:', e);
      return false;
    }
  }

  async addTemplateData() {
    for (const data of [
      {
        id: 'wuBgazfZpDZVJAR6d97Y',
        destination: 'Párizs, Franciaország',
        startDate: new Date('2025-06-15'),
        endDate: new Date('2025-06-20'),
        budget: 1200,
        activities: [
          'Eiffel-torony látogatás',
          'Múzeumok',
          'Hajókázás a Szajnán',
        ],
        transportation: 'Repülő',
        numberOfMembers: 51,
        limit: 60,
      },
      {
        id: '5JPbFE83HWzGmYaKcOCi',
        destination: 'Tokió, Japán',
        startDate: new Date('2025-09-10'),
        endDate: new Date('2025-09-20'),
        budget: 3000,
        activities: [
          'Halpiac felfedezése',
          'Sintoista szentélyek',
          'Robot étterem',
        ],
        transportation: 'Repülő',
        numberOfMembers: 51,
        limit: 60,
      },
      {
        id: 'MySRkwYuMjok60UmporG',
        destination: 'Barcelona, Spanyolország',
        startDate: new Date('2025-05-05'),
        endDate: new Date('2025-05-12'),
        budget: 1500,
        activities: ['Sagrada Família', 'Tengerparti pihenés', 'Tapas túra'],
        transportation: 'Vonat',
        numberOfMembers: 40,
        limit: 40,
      },
      {
        id: 'aPkAtexoIQSEk8JETvZl',
        destination: 'Bali, Indonézia',
        startDate: new Date('2025-12-01'),
        endDate: new Date('2025-12-10'),
        budget: 2000,
        activities: [
          'Szörfözés',
          'Trekking a vulkánnál',
          'Templomok látogatása',
        ],
        transportation: 'Repülő',
        numberOfMembers: 51,
        limit: 60,
      },
    ]) {
      const newVideo = data as any;
      await setDoc(
        doc(this.fStore.db, 'tours', data.id),
        {
          ...newVideo,
          id: deleteField(),
        },
        { merge: true }
      );
      console.log('Video added:', data.id);
    }
  }

  // tourVideos: TourVideo[] = [
  //   {
  //     id: 'xZJGT3LcBcbgGqPr6VCk',
  //     title: 'Tour Video 1',
  //     description: 'Description for Tour Video 1',
  //     thumbnail: 'https://example.com/thumbnail1.jpg',
  //     videoUrl: 'https://example.com/video1.mp4',
  //     createdAt: new Date('2025-04-11T00:00:00Z'),
  //     updatedAt: new Date(),
  //     tourId: 101,
  //     userId: 1,
  //     views: 1,
  //   },
  //   {
  //     id: 'UPwgvJRK1g4JbZyI99Ur',
  //     title: 'Tour Video 2',
  //     description: 'Description for Tour Video 2',
  //     thumbnail: 'https://example.com/thumbnail2.jpg',
  //     videoUrl: 'https://example.com/video2.mp4',
  //     createdAt: new Date(new Date().getTime() - 90000),
  //     updatedAt: new Date(),
  //     tourId: 102,
  //     userId: 2,
  //     views: 0,
  //   },
  //   {
  //     id: '3hsLoSHLbisMw5exf2wz',
  //     title: 'Tour Video 3',
  //     description: 'Description for Tour Video 3',
  //     thumbnail: 'https://example.com/thumbnail3.jpg',
  //     videoUrl: 'https://example.com/video3.mp4',
  //     createdAt: new Date('2025-04-12T00:00:00Z'),
  //     updatedAt: new Date(),
  //     tourId: 103,
  //     userId: 3,
  //     views: 0,
  //   },
  //   {
  //     id: 'MLZMxDs9siuXXAbhEguj',
  //     title: 'Tour Video 4',
  //     description: 'Description for Tour Video 4',
  //     thumbnail: 'https://example.com/thumbnail4.jpg',
  //     videoUrl: 'https://example.com/video4.mp4',
  //     createdAt: new Date('2024-07-22T00:00:00Z'),
  //     updatedAt: new Date(),
  //     tourId: 104,
  //     userId: 4,
  //     views: 362,
  //   },
  //   {
  //     id: 'KJatcSM4IsFFcv6O5SzT',
  //     title: 'Tour Video 5',
  //     description: 'Description for Tour Video 5',
  //     thumbnail: 'https://example.com/thumbnail5.jpg',
  //     videoUrl: 'https://example.com/video4.mp5',
  //     createdAt: new Date('2024-12-19T00:00:00Z'),
  //     updatedAt: new Date(),
  //     tourId: 105,
  //     userId: 5,
  //     views: 109,
  //   },
  // ];
}
