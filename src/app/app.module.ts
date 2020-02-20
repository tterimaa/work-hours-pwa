import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { EntryComponent } from "./entry/entry.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { ServiceWorkerModule } from '@angular/service-worker';
import { InfoComponent } from './info/info.component';
import { NgbDatePipe } from './ngb-date.pipe';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [AppComponent, EntryComponent, InfoComponent, NgbDatePipe, MessageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
