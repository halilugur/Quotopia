import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: Photo[] = [];

  constructor(
    private storage: Storage,
    private storageService: StorageService
  ) {
    this.storage.create();
  }

  async save(base64data: string, description: string): Promise<any> {
    const photo = {
      id: `photo_${new Date().getTime()}`,
      data: `data:image/png;base64,${base64data}`,
      description,
    };
    await this.storageService.saveData(`photo_${new Date().getTime()}`, photo);
    this.photos.unshift(photo);
  }

  async updatePhoto(photo: Photo): Promise<any> {
    await this.storageService.saveData(photo.id, photo);
  }

  public async readAllPhoto(): Promise<Photo[]> {
    await this.storage.forEach((photo, key, i) => {
      if (key.startsWith('photo')) {
        this.photos.unshift(photo);
      }
    })
    return this.photos;
  }

  async makeFavorite(photo: Photo): Promise<any> {
    photo.isFavorite = !photo.isFavorite;
    await this.storageService.saveData(photo.id, photo);
  }

  public readAllFavoritePhoto(): Photo[] {
    return this.photos.filter(({ isFavorite }) => isFavorite);    
  }

  public async getRandomPhoto(): Promise<Photo> {
    const randomIndex = Math.floor(Math.random() * this.photos.length);
    return this.photos[randomIndex];
  }
}

export interface Photo {
  id: string;
  data: string;
  description: string;
  isFavorite?: boolean
}
