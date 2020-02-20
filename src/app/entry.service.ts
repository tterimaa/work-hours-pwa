import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Entry } from './entry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private entriesCollection: AngularFirestoreCollection<Entry>;
  entries: Observable<Entry[]>;

  saveEntry(entry: Entry) {
    return this.firestore.collection('entries').doc(entry.key).set(entry);
  }

  getEntries(): Observable<Entry[]> {
    return this.entries;
  }

  getById(id: string) {
    return this.firestore.collection('entries').doc(id).ref.get();
  }

  constructor(private firestore: AngularFirestore) {
    this.entriesCollection = firestore.collection<Entry>('entries');
    this.entries = this.entriesCollection.valueChanges();
  }
}
