import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  private readonly API_URL = 'https://source.unsplash.com/random/?nature';
  constructor() {}

  /**
   * get Rantom image form the API
   * 
   * @returns an image url
   */
  async getRandomImage(): Promise<string> {
    let imageUrl: string = this.API_URL;
    await axios
      .get(this.API_URL)
      .then((response) => (imageUrl = response.request.responseURL));
    return imageUrl;
  }
}
