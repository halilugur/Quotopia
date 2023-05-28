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
  public address: any = '';
  isModalOpen = false;

  constructor(public photoService: PhotoService) {}

  /**
   * Toggles the favorite status of a photo.
   *
   * @param photo The photo object to be toggled.
   */
  async toggleFavorite(photo: Photo) {
    await this.photoService.makeFavorite(photo);
  }

  /**
   * Sets the state of the modal and updates the selected photo, description, and address.
   *
   * @param isOpen A boolean indicating whether the modal is open or closed.
   * @param photo Optional photo object to update the selected photo, description, and address.
   */
  setOpen(isOpen: boolean, photo?: Photo) {
    this.selectedPhoto = photo;
    this.description = photo?.description;
    this.address = photo?.location?.address;
    this.isModalOpen = isOpen;
  }

  /**
   * Updates the selected photo with the modified description and address.
   * The updated photo is then sent to the photo service for further processing.
   */
  async updatePhoto() {
    this.selectedPhoto.description = this.description;
    this.selectedPhoto.address = this.address;
    await this.photoService.updatePhoto(this.selectedPhoto);
  }
}
