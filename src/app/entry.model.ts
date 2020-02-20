import { FormFields } from '../types';

export class Entry {
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
