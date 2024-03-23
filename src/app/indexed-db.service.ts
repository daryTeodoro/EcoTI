// indexed-db.service.ts
import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface VisitCounterDB extends DBSchema {
  visitCounter: {
    key: string;
    value: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private readonly dbName = 'visitCounterDB';
  private readonly storeName = 'visitCounter';

  constructor() { }

  async openDB(): Promise<IDBPDatabase<VisitCounterDB>> {
    return openDB<VisitCounterDB>(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('visitCounter');
      }
    });
  }

  async getVisitCount(): Promise<number> {
    const db = await this.openDB();
    return db.get(this.storeName, 'visits') || 0;
  }

  async incrementVisitCount(): Promise<void> {
    const db = await this.openDB();
    const count = (await db.get(this.storeName, 'visits')) || 0;
    await db.put(this.storeName, count + 1, 'visits');
  }
}
