import { Component, OnInit } from '@angular/core';
import {Movie} from '../../../model/Movie';
import {DatePipe} from '@angular/common';
import {MovieService} from '../movie.service';

@Component({
  selector: 'app-movie-showing',
  templateUrl: './movie-showing.component.html',
  styleUrls: ['./movie-showing.component.css']
})
export class MovieShowingComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MovieService, private pipe: DatePipe) {
  }

  ngOnInit(): void {
    const dateCur = new Date();
    const resultDate = this.pipe.transform(dateCur, 'yyyy-MM-dd');
    console.log(resultDate);
    this.moviesService.getMovieByDate(resultDate).subscribe(
        (data) => {
          this.movies = data;
          console.log(data);
        }
    );
  }

  searchFilmByDate(date: string) {
    this.moviesService.getMovieByDate(date).subscribe(
        (data) => {
          console.log(date);
          this.movies = data;
        }
    );
  }

}
