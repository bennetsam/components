import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDay } from '../calendar.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'month-view',
  imports: [CommonModule],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss'
})
export class MonthViewComponent {
  @Input() daylist = new Map();
  @Input() days: IDay[] = [];
  @Input() startWithSunday: boolean | undefined = false;
  @Output() updateWeek: EventEmitter<IDay> = new EventEmitter<IDay>();

  updateWeekData(day:IDay): void {
    this.days.forEach((x) => {
      x.selected = false;
    })
    day.selected = true;
    this.updateWeek.emit(day);
  }
}
