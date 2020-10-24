import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL_MOVIE = 'http://localhost:8080/movie';
  private readonly API_URL_MOVIE_GENRE_TYPE = 'http://localhost:8080/movie_genre_type';
  private readonly API_URL_MOVIE_GENRE_ASSOCIATE = 'http://localhost:8080/movie_genre_associate';
  private readonly API_URL_LAST_MOVIE = 'http://localhost:8080/lastMovie';
  constructor(private http: HttpClient) { }
  getAllMovie(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_MOVIE);
  }
  getAllMovieGenreType(): Observable<MovieGenreType[]>{
    return this.http.get<MovieGenreType[]>(this.API_URL_MOVIE_GENRE_TYPE);
  }
  getAllMovieGenreAssociate(): Observable<MovieGenreAssociate[]> {
    return this.http.get<MovieGenreAssociate[]>(this.API_URL_MOVIE_GENRE_ASSOCIATE);
  }
  addMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.API_URL_MOVIE, movie);
  }
  addMovieGenreAssociate(movieGenreAssociate: MovieGenreAssociate): Observable<MovieGenreAssociate>{
    return this.http.post<MovieGenreAssociate>(this.API_URL_MOVIE_GENRE_ASSOCIATE, movieGenreAssociate);
  }
  getLastMovie(): Observable<Movie>{
    return this.http.get<Movie>(this.API_URL_LAST_MOVIE);
  }


  editMovieService(movie: Movie, id: number): Observable<Movie> {
    return this.http.patch<Movie>(this.API_URL_MOVIE + '/' +  id, movie);
  }
}
