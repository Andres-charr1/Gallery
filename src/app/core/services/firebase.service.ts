import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';

export interface MultimediaEntry {
  description: string;
  imageUrl: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private multimediaCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.multimediaCollection = collection(this.firestore, 'multimedia');
  }

  async addEntry(entry: MultimediaEntry): Promise<void> {
    try {
      const docRef = await addDoc(this.multimediaCollection, entry);
      console.log('Documento agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  }

  async getMediaRecords(): Promise<MultimediaEntry[]> {
    try {
      const snapshot = await getDocs(this.multimediaCollection);
      return snapshot.docs.map((doc) => doc.data() as MultimediaEntry);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
      throw error;
    }
  }
}
