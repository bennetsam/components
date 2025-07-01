import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { IDay } from './calendar.helper';
@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  days: IDay[] = [];
  week: number = 1;
  // follows the id as luxon lib. i.e 1 for Monday
  calendarWeek = new Map();
  calendarWeek1 = new Map([
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday'],
    [7, 'Sunday']
  ]);
  calendarWeek2 = new Map([
    [7, 'Sunday'],
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday']
  ]);
  firstweekday: number = 1;
  monthName: string = '';
  currentSelection: { year: number, month: number, today: DateTime } = {
    year: DateTime.now().year,
    month: DateTime.now().month,
    today: DateTime.now()
  };
  enableOtherMonth: boolean = false;
  startWithSunday: boolean = true;

  ngOnInit(): void {
    const today = DateTime.now();
    this.createCalendar(today);
  }

  createCalendar(date: DateTime): void {
    const month = date.month;
    this.monthName = date.monthLong ?? '';
    const firstday = DateTime.local(date.year, month, 1);
    this.firstweekday = firstday.weekday;
    const days: IDay[] = [];
    let weekday = firstday.weekday;
    let week = 1;
    this.calendarWeek = !this.startWithSunday ? this.calendarWeek1 : this.calendarWeek2;
    console.log(this.calendarWeek.size);

    // if the week has started but the month has not filled the week from the start, then show empty items for the items in the week.
    this.initPreviousMonth(date, week, weekday, days);

    // create a model of the dates for the calendar 
    const dayCount = new Date(date.year, month, 0).getDate();
    for (let val = 1; val <= dayCount; val++) {
      days.push({ date: val, weekday, week, isFirstweekday: val === 1 });
      if (weekday === this.calendarWeek.size) {
        weekday = 1;
        week++;
      } else {
        weekday++
      }
    }

    // if the week has started but the calendar has not filled the week , then show empty items for the rest of the week.
    this.initNextMonth(date, week, weekday, days);
    console.log(weekday);
    this.week = week;
    this.days = days;


  }

  initNextMonth(date: DateTime<boolean>, week: number, weekday: number, days: IDay[]): IDay[] {
    const daysFilled = (weekday - 1);
    let startDate = 1;
    let endDate = this.calendarWeek.size - weekday;
    if (!this.startWithSunday) {
      endDate = this.calendarWeek.size - daysFilled;
    }
    if (endDate !== this.calendarWeek.size && daysFilled < this.calendarWeek.size) {
      for (let val = startDate; val <= endDate; val++) {
        days.push({
          date: this.enableOtherMonth ? val : undefined,
          weekday: this.enableOtherMonth ? weekday++ : val,
          week,
          disabled: true
        });

      }
    }

    return days;
  }


  initPreviousMonth(date: DateTime<boolean>, week: number, weekday: number, days: IDay[]): IDay[] {
    const month = date.month;
    let startDate = 1;
    let endDate = weekday;
    if (this.startWithSunday) {
      startDate = weekday === 7 ? weekday : 0;
      endDate = weekday;
    }
    if (this.enableOtherMonth && startDate !== endDate) {
      const dateCount = new Date(date.year, month - 1, 0).getDate();
      const count = this.startWithSunday ? endDate : endDate - 1;
      startDate = dateCount - count;
      endDate = dateCount;
    }
    // fill the calendar with empty fields before showing the month
    for (let val = startDate; val < endDate; val++) {
      days.push({
        date: this.enableOtherMonth ? val + 1 : undefined,
        weekday: val,
        week,
        disabled: true,
        isFirst: val === startDate
      });
    }

    return days;
  }

  navigateMonth(action: number): void {
    this.currentSelection.month = action === 1 ? this.currentSelection.month + 1 : this.currentSelection.month - 1;
    console.log(this.currentSelection.month);
    if (this.currentSelection.month <= 0) {
      this.currentSelection.year--;
      this.currentSelection.month = 12;
    }
    if (this.currentSelection.month > 12) {
      this.currentSelection.year++;
      this.currentSelection.month = 1;
    }
    const date = DateTime.local(this.currentSelection.year, this.currentSelection.month, 1);
    this.createCalendar(date);

  }

  showOtherMonthDates(): void {
    this.enableOtherMonth = !this.enableOtherMonth;
    const date = DateTime.local(this.currentSelection.year, this.currentSelection.month, 1);
    this.createCalendar(date);
  }

  toggleSundayOption(): void {
    this.startWithSunday = !this.startWithSunday;
    const date = DateTime.local(this.currentSelection.year, this.currentSelection.month, 1);
    this.createCalendar(date);
  }

}
