import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  saveEntry(entry: Entry) {
    return this.firestore.collection('entries').doc(entry.key).set(entry);
  }

  getById(id: string) {
    return this.firestore.collection('entries').doc(id).ref.get();
  }

  constructor(private firestore: AngularFirestore) { }
}
