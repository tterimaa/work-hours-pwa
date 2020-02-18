import { Component, OnInit } from "@angular/core";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-entry",
  templateUrl: "./entry.component.html",
  styleUrls: ["./entry.component.scss"]
})
export class EntryComponent implements OnInit {
  model: NgbDateStruct;
  time: {hour: 13, minute: 30}
  constructor(private calendar: NgbCalendar) {}

  ngOnInit(): void {
    this.model = this.calendar.getToday();
  }
}
