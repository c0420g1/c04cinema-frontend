import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {Hall} from '../../model/hall';
import {Show} from '../../model/show';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL_MOVIE = 'http://localhost:8080/movies';
  private readonly API_URL_MOVIE_2 = 'http://localhost:8080/movie';
  private readonly API_URL_MOVIE_GENRE_TYPE = 'http://localhost:8080/movie_genre_type';
  private readonly API_URL_MOVIE_GENRE_ASSOCIATE = 'http://localhost:8080/movie_genre_associate';
  private readonly API_URL_LAST_MOVIE = 'http://localhost:8080/lastMovie';
  private readonly API_URL_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID = 'http://localhost:8080/getAllMovieGenreAssociate';
  private readonly API_URL_ALL_HALL = 'http://localhost:8080/hall';
  private readonly API_URL_DELETE_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID = 'http://localhost:8080/movieGenreAssociate';
  private readonly API_URL_SHOW = 'http://localhost:8080/show';

  constructor(private http: HttpClient) { }
  //get Movie List and Search that disable pageable
  getListMovie(search: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_MOVIE + '?search=' +search);
  }
  //get Movie List and Search that able pageable
  getAllMovie(pageNum: number, search: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_MOVIE + '/' + pageNum +'?search=' + search);
  }
  // get All Movie Genre Type
  getAllMovieGenreType(): Observable<MovieGenreType[]>{
    return this.http.get<MovieGenreType[]>(this.API_URL_MOVIE_GENRE_TYPE);
  }
  // get All Movie Genre Associate
  getAllMovieGenreAssociate(): Observable<MovieGenreAssociate[]> {
    return this.http.get<MovieGenreAssociate[]>(this.API_URL_MOVIE_GENRE_ASSOCIATE);
  }
  // get All Movie Genre Associate By Movie Id   to delete all these before add new these in edit movie function ( have edit Movie Genre Type)
  getAllMovieGenreAssociateByMovieId(movieId: number): Observable<MovieGenreAssociate[]> {
    return this.http.get<MovieGenreAssociate[]>(this.API_URL_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID + '/' +  movieId)
  }
  // add new Movie
  addMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.API_URL_MOVIE_2, movie);
  }
  // add new Movie Genre Type into add new movie function
  addMovieGenreAssociate(movieGenreAssociate: MovieGenreAssociate): Observable<MovieGenreAssociate>{
    return this.http.post<MovieGenreAssociate>(this.API_URL_MOVIE_GENRE_ASSOCIATE, movieGenreAssociate);
  }
  // create movie show times in theaters
  addShow(show: Show): Observable<Show>{
    return this.http.post<Show>(this.API_URL_SHOW, show);
  }
  // after add new movie, get the newest movie, to take out movieId, use for add new movie genre type function of that movie
  getLastMovie(): Observable<Movie>{
    return this.http.get<Movie>(this.API_URL_LAST_MOVIE);
  }
  // delete all  Movie Genre Associate (By Movie Id) before add new these in edit movie function ( have edit Movie Genre Type)
  deleteAllMovieGenreAssociateByMovieId(movieId: number): Observable<MovieGenreAssociate>{
    return this.http.delete<MovieGenreAssociate>(this.API_URL_DELETE_ALL_MOVIE_GENRE_ASSOCIATE_BY_MOVIE_ID + '/' + movieId);
  }
  //edit Movie
  editMovieService(movie: Movie, id: number): Observable<Movie> {
    return this.http.patch<Movie>(this.API_URL_MOVIE_2 + '/' +  id, movie);
  }
  // get All Hall
  getAllHall(): Observable<Hall[]>{
    return this.http.get<Hall[]>(this.API_URL_ALL_HALL);
  }
}
