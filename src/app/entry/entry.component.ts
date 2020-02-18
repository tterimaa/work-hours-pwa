import { Component, OnInit } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import { Entry } from '../../types';
import { EntryService } from '../entry.service';

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
  private isGreaterOrEqual = (a: NgbTimeStruct, b: NgbTimeStruct) => {
    let bool;
    if(a.hour - b.hour > 0) bool = true;
    else if(a.hour - b.hour === 0 && a.minute - b.minute >= 0) bool = true;
    else bool = false;
    console.log(bool);
    return bool;
  }
  private difference = (start: NgbTimeStruct, end: NgbTimeStruct) => {
    let hours = end.hour - start.hour;
    let minutes = end.minute - start.minute;
    if(hours < 0) hours = 0;
    if(minutes < 0) minutes = 0;
    return { hours, minutes };
  }
  private calculateHours = () => {
    // Evening
    let eveningHours;
    let dayHours;
    if(this.isGreaterOrEqual(this.timeFrom, evening)) {
      eveningHours = this.difference(this.timeFrom, this.timeTo);
      dayHours = { hours: 0, minutes: 0}
      return { dayHours, eveningHours }
    }
    if(this.isGreaterOrEqual(evening, this.timeTo)) {
      dayHours = this.difference(this.timeFrom, this.timeTo)
      eveningHours = { hours: 0, minutes: 0 }
      return { dayHours, eveningHours }
    }
    dayHours = this.difference(this.timeFrom, evening);
    eveningHours = this.difference(evening, this.timeTo);
    return { dayHours, eveningHours }
  }
  private createEntry = (): Entry => {
    if (!this.date || !this.timeFrom || !this.timeTo)
      throw "Date, time from and time to must have a value";
    if (this.timeFrom.hour < timeEarliest || this.timeFrom.hour > timeLatest)
      throw `Time from must be between ${timeEarliest} and ${timeLatest}`;
    if (this.timeTo.hour < timeEarliest || this.timeTo.hour > timeLatest)
      throw `Time to must be between ${timeEarliest} and ${timeLatest}`;
    const year = this.date.year;
    const month = this.date.month;
    const day = this.date.day;
    const { dayHours, eveningHours } = this.calculateHours();
    return {
      date: new Date(year, month, day),
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
      console.log(err);
    }
    this.entry = newEntry;
    this.entryService.saveEntry(newEntry);
  }
  constructor(private calendar: NgbCalendar, private entryService: EntryService) {}

  ngOnInit(): void {
    this.date = this.calendar.getToday();
  }
}
