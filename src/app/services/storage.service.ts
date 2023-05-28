import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Constructs an instance of the class.
   *
   * @param storage The storage object used for data storage.
   */
  constructor(private storage: Storage) {
    this.storage.create();
  }

  /**
   * Saves data in the storage with the specified key-value pair.
   *
   * @param key The key used to store the data.
   * @param value The data to be stored.
   */
  async saveData(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  /**
   * Retrieves the data from the storage based on the specified key.
   *
   * @param key The key used to retrieve the data.
   * @returns A Promise that resolves to the retrieved data.
   */
  async getData(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  /**
   * Deletes the data from the storage based on the specified key.
   *
   * @param key The key used to delete the data.
   */
  public async delete(key: string) {
    return await this.storage.remove(key);
  }
}
