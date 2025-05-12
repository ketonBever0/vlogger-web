import { Injectable, OnInit } from '@angular/core';
import { TourVideo } from '../../models/TourVideo';
import { StoreService } from '../store/store.service';
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
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

  async getTrendingVideos() {
    await getDocs(
      query(
        collection(this.fStore.db, 'videos'),
        orderBy('views', 'desc'),
        limit(5)
      )
    ).then((res) => {
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

  async getMyVideos(userId: string): Promise<TourVideo[]> {
    return (await getDocs(
      query(collection(this.fStore.db, 'videos'), where('userId', '==', userId))
    ).then((res) => {
      const data: TourVideo[] = [];
      res.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        } as TourVideo);
        return data;
      });
    })) as TourVideo[];
  }
}
