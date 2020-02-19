import { Component, OnInit } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import { Entry } from '../../types';
import { EntryService } from '../entry.service';
import { calculateHours, validateForm, generateKey } from '../helper';
import { generate } from 'rxjs';

const evening: NgbTimeStruct = {
  hour: 18,
  minute: 0,
  second: 0
};
const timeLatest = 23;
const timeEarliest = 6;

@Component({
  selector: "app-entry",
  templateUrl: "./entry.component.html",
  styleUrls: ["./entry.component.scss"]
})
export class EntryComponent implements OnInit {
  date: NgbDateStruct;
  timeFrom: NgbTimeStruct;
  timeTo: NgbTimeStruct;
  entry: Entry;
  entriesInDb: Entry[];
  private createEntry = (): Entry => {
    try {
      validateForm(this.date, this.timeFrom, this.timeTo, timeEarliest, timeLatest);
    } catch(err) {
      console.error(err);
      return;
    }
    const key = generateKey(this.date);
    const { dayHours, eveningHours } = calculateHours(this.timeFrom, this.timeTo, evening);
    return {
      key: key,
      date: Object.assign({}, this.date),
      dayH: dayHours,
      eveningH: eveningHours,
      timeFrom: Object.assign({}, this.timeFrom),
      timeTo: Object.assign({}, this.timeTo)
    };
  };
  setForm(): void {
    const entry = this.entriesInDb.find(entry => entry.key === generateKey(this.date));
    if(!entry) return;
    this.timeFrom = {
      ...entry.timeFrom,
      second: 0
    };
    this.timeTo = {
      ...entry.timeTo,
      second: 0
    };
  }
  onSubmit(): void {
    console.log("click");
    let newEntry;
    try {
      newEntry = this.createEntry();
    } catch (err) {
      console.error(err);
      return;
    }
    this.entry = newEntry;
    this.entryService.saveEntry(newEntry);
  }
  constructor(private calendar: NgbCalendar, private entryService: EntryService) {}

  ngOnInit(): void {
    console.log('INIT');
    this.date = this.calendar.getToday();
    this.entryService.getEntries().subscribe(entries => this.entriesInDb = entries);
  }
}
