import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  async saveData(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async getData(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  public async delete(key: string){
    return await this.storage.remove(key);
  }
}