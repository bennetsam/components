import { DateTime } from "luxon";

export interface IDay {
    date?: number;
    week?: number;
    weekday: number;
    isFirstweekday?: boolean;
    isFirst?: boolean;
    disabled?: boolean;
}

export const WEEKDAYS = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thrusday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7

};
export const FIRST_DAY_IN_MONTH = 1;

export const MONTHS = {
    firstMonth: 1,
    lastMonth: 12
};

export interface CurrentDate {
    year: number;
    month: number;
    today: DateTime;
}
