import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL = 'http://localhost:8080/movie';
  private readonly API_URL2 = 'http://localhost:8080/movie_genre_type';
  constructor(private http: HttpClient) { }
  getAllMovie(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL);
  }
  getAllMovieGenreType(): Observable<MovieGenreType[]>{
    return this.http.get<MovieGenreType[]>(this.API_URL2);
  }
  addMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.API_URL, movie);
  }
}
