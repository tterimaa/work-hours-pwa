import { Component, OnInit } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { Entry, SavedHours, FormFields } from "../../types";
import { EntryService } from "../entry.service";
import { calculateHours, validateForm, generateKey } from "../helper";
import { settings } from "./../settings";

const { evening, latest, earliest } = settings;

@Component({
  selector: "app-entry",
  templateUrl: "./entry.component.html",
  styleUrls: ["./entry.component.scss"]
})
export class EntryComponent implements OnInit {
  fields: FormFields;
  dayH: SavedHours;
  eveningH: SavedHours;
  entry: Entry;
  message: {
    text: string;
    type: string;
  };

  private createEntry = (): Entry => {
    try {
      validateForm(
        this.fields.date,
        this.fields.from,
        this.fields.to,
        earliest,
        latest
      );
    } catch (err) {
      throw err;
    }
    const key = generateKey(this.fields.date);
    const { dayHours, eveningHours } = calculateHours(
      this.fields.from,
      this.fields.to,
      evening
    );
    return {
      key: key,
      fields: {
        date: Object.assign({}, this.fields.date),
        from: this.fields.from,
        to: this.fields.to
      },
      dayH: dayHours,
      eveningH: eveningHours
    };
  };

  setForm(): void {
    this.entryService.getById(generateKey(this.fields.date)).then(doc => {
      if (doc.exists) {
        this.fields.from = doc.data().fields.from;
        this.fields.to = doc.data().fields.to;
        this.dayH = doc.data().dayH;
        this.eveningH = doc.data().eveningH;
      } else {
        this.fields.from = null;
        this.fields.to = null;
        this.dayH = null;
        this.eveningH = null;
      }
    });
  }

  onSubmit(): void {
    try {
      this.entryService
        .saveEntry(this.createEntry())
        .then(() => this.setForm());
    } catch (err) {
      console.error(err);
      this.message = {
        text: err,
        type: "error"
      };
      setTimeout(() => {
        this.message = { text: "", type: "" };
      }, 5000);
    }
  }
  constructor(
    private calendar: NgbCalendar,
    private entryService: EntryService
  ) {}

  ngOnInit(): void {
    this.fields = {
      date: this.calendar.getToday(),
      from: { hour: 0, minute: 0, second: 0 },
      to: { hour: 0, minute: 0, second: 0 }
    };
    this.setForm();
  }
}
