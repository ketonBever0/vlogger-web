import { NgModule } from '@angular/core';

import { MyProfileComponent } from './my-profile.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: MyProfileComponent }];

@NgModule({
  imports: [CommonModule, MyProfileComponent, RouterModule.forChild(routes)],
})
export class MyProfileModule {}
