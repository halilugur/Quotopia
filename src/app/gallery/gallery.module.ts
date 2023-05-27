import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GalleryPageRoutingModule } from './gallery-routing.module';
import { GalleryPage } from './gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    ExploreContainerComponentModule
  ],
  declarations: [GalleryPage]
})
export class GalleryPageModule {}
