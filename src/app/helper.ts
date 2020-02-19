import { NgbTimeStruct, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

const difference = (start: NgbTimeStruct, end: NgbTimeStruct) => {
  let hours = end.hour - start.hour;
  let minutes = end.minute - start.minute;
  if (hours < 0 || (hours === 0 && minutes < 0)) throw "End time must be greater than start time";
  if (minutes < 0) {
    hours = hours - 1;
    minutes = 60 + minutes;
  }
  return { hours, minutes };
};

const isGreaterOrEqual = (a: NgbTimeStruct, b: NgbTimeStruct) => {
  let bool;
  if (a.hour - b.hour > 0) bool = true;
  else if (a.hour - b.hour === 0 && a.minute - b.minute >= 0) bool = true;
  else bool = false;
  console.log(bool);
  return bool;
};

export const calculateHours = (
  from: NgbTimeStruct,
  to: NgbTimeStruct,
  divider: NgbTimeStruct
) => {
  let eveningHours;
  let dayHours;
  const noHours = { hours: 0, minutes: 0 };
  if (isGreaterOrEqual(from, divider)) {
    eveningHours = difference(from, to);
    dayHours = noHours;
    return { dayHours, eveningHours };
  }
  if (isGreaterOrEqual(divider, to)) {
    dayHours = difference(from, to);
    eveningHours = noHours;
    return { dayHours, eveningHours };
  }
  dayHours = difference(from, divider);
  eveningHours = difference(divider, to);
  return { dayHours, eveningHours };
};

export const validateForm = (date: NgbDateStruct, from: NgbTimeStruct, to: NgbTimeStruct, earliest: number, latest: number) => {
    if (!date || !from || !to)
      throw "Date, time from and time to must have a value";
    if (from.hour < earliest || from.hour > latest)
      throw `Time from must be between ${earliest} and ${latest}`;
    if (to.hour < earliest || to.hour > latest)
      throw `Time to must be between ${earliest} and ${latest}`;
}

export const generateKey = (date: NgbDateStruct) => {
    return Object.values(date).join("");
}
