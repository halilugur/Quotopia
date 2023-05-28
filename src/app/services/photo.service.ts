import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  addressResolveAPI: string =
    'https://geocode.maps.co/reverse?lat=38.963745&lon=35.243320';
  photos: Photo[] = [];

  constructor(
    private storage: Storage,
    private storageService: StorageService
  ) {}

  /**
   * Saves a photo with the given base64 data and description.
   *
   * @param base64data The base64-encoded data of the photo.
   * @param description The description of the photo.
   */
  async save(base64data: string, description: string): Promise<any> {
    const location = await this.getCurrentPosition();
    const photo = {
      id: `photo_${new Date().getTime()}`,
      data: `data:image/png;base64,${base64data}`,
      description,
      location,
    };

    await this.storageService.saveData(`photo_${new Date().getTime()}`, photo);
    this.photos.unshift(photo);
  }

  /**
   * Retrieves the current position (latitude, longitude) and resolves the corresponding address.
   *
   * @returns The current location object with latitude, longitude, and address.
   * If an error occurs during the process, a default location object is returned.
   */
  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const api =
        this.addressResolveAPI +
        `lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`;
      const address: Address = await axios.get(api);
      const location = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        address: address.display_name,
      };
      return location;
    } catch (error) {
      return {
        latitude: 0,
        longitude: 0,
        address: '',
      };
    }
  }

  /**
   * Updates a photo in the storage with the provided photo object.
   *
   * @param photo The photo object to be updated.
   */
  async updatePhoto(photo: Photo): Promise<any> {
    await this.storageService.saveData(photo.id, photo);
  }

  /**
   * Retrieves all photos from the storage and returns an array of photo objects.
   *
   * @returns An array of photo objects.
   */
  public async readAllPhoto(): Promise<Photo[]> {
    await this.storage.forEach((photo, key, i) => {
      if (key.startsWith('photo')) {
        this.photos.unshift(photo);
      }
    });
    return this.photos;
  }

  /**
   * Toggles the favorite status of a photo.
   *
   * @param photo The photo object to be updated.
   */
  async makeFavorite(photo: Photo): Promise<any> {
    photo.isFavorite = !photo.isFavorite;
    await this.storageService.saveData(photo.id, photo);
  }

  /**
   * Retrieves all favorite photos from the stored photos.
   *
   * @returns An array of favorite photo objects.
   */
  public readAllFavoritePhoto(): Photo[] {
    return this.photos.filter(({ isFavorite }) => isFavorite);
  }

  /**
   * Retrieves a random photo from the stored photos.
   *
   * @returns A random photo object.
   */
  public async getRandomPhoto(): Promise<Photo> {
    const randomIndex = Math.floor(Math.random() * this.photos.length);
    return this.photos[randomIndex];
  }
}

export interface Photo {
  id: string;
  data: string;
  description: string;
  isFavorite?: boolean;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Address {
  display_name: string;
}
