import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IDay, IWeek, IWeekDate } from '../calendar.helper';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector: 'week-view',
  imports: [CommonModule],
  templateUrl: './week-view.component.html',
  styleUrl: './week-view.component.scss'
})
export class WeekViewComponent implements OnChanges, OnInit {
  @Input() daylist = new Map<string, IWeekDate>();
  @Input() days: IDay[] = [];
  @Input() startWithSunday: boolean | undefined = false;
  @Input() calendarView = new Map<string, IWeek>();

  weekDays = new Map();
  timeList: string[] = [];
  weekNumber: number | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.hasOwnProperty('calendarView') || changes.hasOwnProperty('days')) && this.calendarView) {
      const week = this.calendarView.get('week');
      const startWithSunday = week?.options?.startWithSunday;
      let date = startWithSunday ? week?.startDate.minus({ days: 1 }) : week?.startDate;
      this.weekNumber = this.calendarView.get('week')?.weekNumber

      this.daylist.forEach((value: IWeekDate, key: string) => {
        value.date = date?.day;
        date = date?.plus({ days: 1 })
      });
    }
  }

  ngOnInit(): void {
    this.getTimeList();
  }

  getTimeList() {
    this.timeList =  Array.from({
      length: 48
    }, (value, index) => {
      return DateTime.fromObject({
        hour: Math.floor(index / 2),
        minute: (index % 2 === 0 ? 0 : 30)
      }).toFormat('hh:mm a')
    });
    console.log(this.timeList);
  }

}
