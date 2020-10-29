import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';
// @ts-ignore
import {Hall} from '../../model/hall';
import {Show} from '../../model/show';
import {BookingTicketDTO} from '../../model/bookingTicketDTO';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL_MOVIE = 'http://localhost:8080/movies';
  private readonly API_URL_MOVIE_GENRE_TYPE = 'http://localhost:8080/movie_genre_type';
  private readonly API_URL_MOVIE_GENRE_ASSOCIATE = 'http://localhost:8080/movie_genre_associate';
  private readonly API_URL_LAST_MOVIE = 'http://localhost:8080/lastMovie';
  private readonly API_URL_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID = 'http://localhost:8080/getAllMovieGenreAssociate';
  private readonly API_URL_ALL_HALL = 'http://localhost:8080/hall';
  private readonly API_URL_DELETE_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID = 'http://localhost:8080/movieGenreAssociate';
  private readonly API_URL_SHOW = 'http://localhost:8080/show';

  //creator Hieu to search by name of movie
  private readonly API_SEARCH_NAME = 'http://localhost:8080/movie/';

  constructor(private http: HttpClient) { }
  getListMovie(search: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_MOVIE + '?search=' +search);
  }
  getAllMovie(pageNum: number, search: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_MOVIE + '/' + pageNum +'?search=' + search);
  }
  getAllMovieGenreType(): Observable<MovieGenreType[]>{
    return this.http.get<MovieGenreType[]>(this.API_URL_MOVIE_GENRE_TYPE);
  }
  getAllMovieGenreAssociate(): Observable<MovieGenreAssociate[]> {
    return this.http.get<MovieGenreAssociate[]>(this.API_URL_MOVIE_GENRE_ASSOCIATE);
  }
  getAllMovieGenreAssociateByMovieId(movieId: number): Observable<MovieGenreAssociate[]> {
    return this.http.get<MovieGenreAssociate[]>(this.API_URL_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID + '/' +  movieId)
  }
  addMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.API_URL_MOVIE, movie);
  }
  addMovieGenreAssociate(movieGenreAssociate: MovieGenreAssociate): Observable<MovieGenreAssociate>{
    return this.http.post<MovieGenreAssociate>(this.API_URL_MOVIE_GENRE_ASSOCIATE, movieGenreAssociate);
  }
  addShow(show: Show): Observable<Show>{
    return this.http.post<Show>(this.API_URL_SHOW, show);
  }
  getLastMovie(): Observable<Movie>{
    return this.http.get<Movie>(this.API_URL_LAST_MOVIE);
  }

  deleteAllMovieGenreAssociateByMovieId(movieId: number): Observable<MovieGenreAssociate>{
    return this.http.delete<MovieGenreAssociate>(this.API_URL_DELETE_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID + '/' + movieId);
  }

  editMovieService(movie: Movie, id: number): Observable<Movie> {
    return this.http.patch<Movie>(this.API_URL_MOVIE + '/' +  id, movie);
  }

  getAllHall(): Observable<Hall[]>{
    return this.http.get<Hall[]>(this.API_URL_ALL_HALL);
  }




  //creator Hieu to search by name of movie
  searhcByName(name: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_SEARCH_NAME + name)
  }
}
