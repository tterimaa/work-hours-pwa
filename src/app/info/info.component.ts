import { Component, OnInit, Input } from "@angular/core";
import { SavedHours } from "./../../types";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {
  @Input() dayHours: SavedHours;

  @Input() eveningHours: SavedHours;

  @Input() date: NgbDateStruct;

  constructor() {}

  ngOnInit(): void {}
}
