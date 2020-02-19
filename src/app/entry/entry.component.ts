import { Component, OnInit } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import { Entry } from '../../types';
import { EntryService } from '../entry.service';
import { calculateHours, validateForm, generateKey } from '../helper';

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
    };
  };
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
    this.date = this.calendar.getToday();
  }
}
