import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  addEntry(description: string, imageUrl: string) {
    const data = {
      description,
      imageUrl,
      createdAt: new Date().toISOString()
    };
    return this.firestore.collection('multimedia').add(data);
  }

  getEntries(): Observable<any[]> {
    return this.firestore
      .collection('multimedia', ref => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' });
  }
}
