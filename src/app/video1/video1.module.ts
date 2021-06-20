import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Video1PageRoutingModule } from './video1-routing.module';

import { Video1Page } from './video1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Video1PageRoutingModule
  ],
  declarations: [Video1Page]
})
export class Video1PageModule {}
