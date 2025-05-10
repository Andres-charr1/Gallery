import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private multimediaCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.multimediaCollection = collection(this.firestore, 'multimedia');
  }

  async addEntry(description: string, imageUrl: string): Promise<void> {
    const data = {
      description,
      imageUrl,
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(this.multimediaCollection, data);
      console.log('Documento agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  }
}
