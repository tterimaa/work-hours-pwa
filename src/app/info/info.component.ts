import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {
  
  @Input() dayHours: {
    hours: number;
    minutes: number;
  };

  @Input() eveningHours: {
    hours: number;
    minutes: number;
  };

  constructor() {}

  ngOnInit(): void {}
}
