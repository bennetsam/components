import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-list';
  movies = [
    {
      id: 1,
      title: 'Avengers Endgame',
      poster: 'http://localhost:4202/images/endgame.jpg'
    },
    {
      id: 2,
      title: 'Mission Impossible: Ghost Protocol',
      poster: 'http://localhost:4202/images/ghost_protocol.jpg'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster: 'http://localhost:4202/images/dark_knight.jpg'
    },
    {
      id: 4,
      title: 'Interstellar',
      poster: 'http://localhost:4202/images/interstellar.jpg'
    },
    {
      id: 5,
      title: 'Inception',
      poster: 'http://localhost:4202/images/inception.jpg'
    }
  ]
  checkAvailability(movieId: number): void {
    window.dispatchEvent(new CustomEvent('movieSelected', { detail: { movieId } }));
  }
}
