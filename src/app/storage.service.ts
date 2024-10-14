import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
 providedIn: 'root'
})
export class StorageService {
 private _storage: Storage | null = null;
 constructor(private storage: Storage) {
   this.init();
 }
 async init() {
   const storage = await this.storage.create();
   this._storage = storage;
 }

// Create or update time entry
 public async set(key: string, value: any) {
   await this._storage?.set(key, value);
 }

// Read time entry
 public async get(key: string): Promise<any> {
   return this._storage?.get(key);
 }

// Delete time entry
 public async remove(key: string) {
   await this._storage?.remove(key);
 }

// Clear all entries
 public async clear() {
   await this._storage?.clear();
 }
}