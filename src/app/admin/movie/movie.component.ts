import { Component, OnInit } from '@angular/core';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MovieService} from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  movieGenreTypes: MovieGenreType[] = [];
  idMovieGenreTypes: number[] = [];
  addFormMovie: FormGroup;
  addFormMovieGenreAssociate: FormGroup;
  check: number;
  constructor(private movieService: MovieService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe((data) => {this.movies = data; });
    this.movieService.getAllMovieGenreType().subscribe((data) => {this.movieGenreTypes = data; });
    this.addFormMovie = this.fb.group(
        {
          name: [''],
          director: [''],
          actor: [''],
          isSub: [''],
          is2d: [''],
          posterUrl: [''],
          startDate: [''],
          endDate: [''],
          duration: [''],
          trailerUrl: [''],
          starRating: [''],
          movieRatedAgeId: [''],
          description: [''],
          entertainment: [''],
        }
    );
    this.addFormMovieGenreAssociate = this.fb.group(
        {
          movieId: [''],
          movieGenreTypeId: new FormArray([]),
        }
    );
  }
  addNewMovie() {

    console.log(this.addFormMovie);
    console.log(this.addFormMovieGenreAssociate);

  }
  checkBoxs(event) {
    this.check = event.target.value;
    // this.idMovieGenreTypes.push(this.check);
    for (let i = 0; i < this.idMovieGenreTypes.length; i++) {
      console.log(this.idMovieGenreTypes[i]);
      if (this.check === this.idMovieGenreTypes[i]){
        this.idMovieGenreTypes.splice(i, 1);
      }
      this.idMovieGenreTypes.push(this.check);
      console.log(this.idMovieGenreTypes);
    }
  }

}
