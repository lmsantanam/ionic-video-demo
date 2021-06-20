import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Video1Page } from './video1.page';

const routes: Routes = [
  {
    path: '',
    component: Video1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Video1PageRoutingModule {}
