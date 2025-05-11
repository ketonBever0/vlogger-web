import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', component: VideoUploadComponent }];

@NgModule({
  imports: [CommonModule, VideoUploadComponent, RouterModule.forChild(routes)],
})
export class VideoUploadModule {}
