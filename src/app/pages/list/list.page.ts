import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage implements OnInit {

  entries: any[] = [];

  constructor(
    private firebase: FirebaseService,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    const multimediaRef = collection(this.firestore, 'multimedia');
    const snapshot = await getDocs(multimediaRef);

    this.entries = snapshot.docs.map(doc => doc.data());
    console.log('Entradas encontradas:', this.entries);
  }
}
