import { Component } from '@angular/core';
import { PhotoService, Photo } from '../services/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {
  public selectedPhoto: any;
  public description: any = '';
  constructor(public photoService: PhotoService) {}

  async toggleFavorite(photo: Photo) {
    await this.photoService.makeFavorite(photo);
  }

  isModalOpen = false;

  setOpen(isOpen: boolean, photo?: Photo) {
    this.selectedPhoto = photo;
    this.description = photo?.description;
    this.isModalOpen = isOpen;
  }

  async updatePhoto() {
    this.selectedPhoto.description = this.description;
    await this.photoService.updatePhoto(this.selectedPhoto);
  }
}
