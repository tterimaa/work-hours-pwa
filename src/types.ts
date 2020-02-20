import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface Entry {
  key: string;
  fields: FormFields;
  dayH: {
    hours: number;
    minutes: number;
  };
  eveningH: {
    hours: number;
    minutes: number;
  };
}

export interface SavedHours {
    hours: number,
    minutes: number
}

export interface FormFields {
    date: NgbDateStruct,
    from: NgbTimeStruct,
    to: NgbTimeStruct
}
