import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  // entries: Observable<Entry[]> = null;
  // entry: Observable<Entry> = null;

  saveEntry(entry: Entry) {
    return this.firestore.collection('entries').add(entry);
  }

  constructor(private firestore: AngularFirestore) { }
}
