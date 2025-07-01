import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ticket-availability';

  avaialableSeats = [0, 45, 3, 24, 33, 3];
  seatCount: number = 0;

  ngOnInit(): void {
    window.addEventListener('movieSelected', (event: Event) => {
      const customEvent = event as CustomEvent;
      const movieId = customEvent.detail.movieId;
      this.getAvailableSeats(movieId);
    })
  }

  ngOnDestroy(): void {
    window.removeEventListener('movieSelected', (event: Event) => { });
  }

  getAvailableSeats(movieId: number): void {
    this.seatCount = this.avaialableSeats[movieId];
  }
}
