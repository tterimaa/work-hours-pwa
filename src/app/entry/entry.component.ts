import { Component, OnInit } from "@angular/core";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import { Entry, SavedHours } from "../../types";
import { EntryService } from "../entry.service";
import { calculateHours, validateForm, generateKey } from "../helper";

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
  dayH: SavedHours;
  eveningH: SavedHours;
  entry: Entry;
  entriesInDb: Entry[];
  private createEntry = (): Entry => {
    try {
      validateForm(
        this.date,
        this.timeFrom,
        this.timeTo,
        timeEarliest,
        timeLatest
      );
    } catch (err) {
      console.error(err);
      return;
    }
    const key = generateKey(this.date);
    const { dayHours, eveningHours } = calculateHours(
      this.timeFrom,
      this.timeTo,
      evening
    );
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
    console.log("set form");
    this.entryService.getById(generateKey(this.date)).then(doc => {
      if (doc.exists) {
        this.timeFrom = doc.data().timeFrom;
        this.timeTo = doc.data().timeTo;
        this.dayH = doc.data().dayH;
        this.eveningH = doc.data().eveningH;
      } else {
        this.timeFrom = null;
        this.timeTo = null;
        this.dayH = null;
        this.eveningH = null;
      }
    });
  }
  onSubmit(): void {
    try {
      this.entryService.saveEntry(this.createEntry());
    } catch (err) {
      console.error(err);
    }
  }
  constructor(
    private calendar: NgbCalendar,
    private entryService: EntryService
  ) {}

  ngOnInit(): void {
    console.log("INIT");
    this.date = this.calendar.getToday();
    this.setForm();
  }
}
