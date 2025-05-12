import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVideosComponent } from './my-videos.component';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', component: MyVideosComponent }];

@NgModule({
  imports: [CommonModule, MyVideosComponent, RouterModule.forChild(routes)],
})
export class MyVideosModule {}
