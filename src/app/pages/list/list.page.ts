import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage {
  items$: Observable<any[]>;

  constructor(private firebase: FirebaseService) {
    this.items$ = this.firebase.getEntries();
  }
}
