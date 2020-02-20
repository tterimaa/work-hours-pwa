export interface Entry {
  key: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  dayH: {
    hours: number;
    minutes: number;
  };
  eveningH: {
    hours: number;
    minutes: number;
  };
  timeFrom: {
    hour: number;
    minute: number;
  };
  timeTo: {
    hour: number;
    minute: number;
  };
}

export interface SavedHours {
    hours: number,
    minutes: number
}
