import { PhotoService, Photo } from './../services/photo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {
  constructor(public photoService: PhotoService) {}

  /**
   * Toggles the favorite status of a photo.
   *
   * @param photo The photo object to be toggled.
   */
  async toggleFavorite(photo: Photo) {
    await this.photoService.makeFavorite(photo);
  }
}
