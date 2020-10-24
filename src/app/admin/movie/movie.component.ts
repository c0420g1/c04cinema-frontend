import { Component, OnInit } from '@angular/core';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MovieService} from './movie.service';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  message: string;
  movies: Movie[] = [];
  movieGenreTypes: MovieGenreType[] = [];
  movieGenreAssociates: MovieGenreAssociate[] = [];
  idMovieGenreTypesTrue: number[] = [];
  idMovieGenreTypes = [false,false,false,false,false,false,false,false,false,false,false,false];
  editIdMovieGenreTypes = [false,false,false,false,false,false,false,false,false,false,false,false];
  addFormMovie: FormGroup;
  addFormMovieGenreAssociate: FormGroup;
  editFormMovie: FormGroup;
  lastMovie: Movie;
  check: number;
  arrEditMovieGenreTypeId: number[] = [];

  constructor(private movieService: MovieService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe((data) => {this.movies = data; });
    this.movieService.getAllMovieGenreType().subscribe((data) => {this.movieGenreTypes = data; });
    this.movieService.getAllMovieGenreAssociate().subscribe((data) => {this.movieGenreAssociates = data; });
    this.movieService.getLastMovie().subscribe((data) => {this.lastMovie = data; });
    this.addFormMovie = this.fb.group(
        {
          name: [''],
          director: [''],
          actor: [''],
          isSub: [''],
          is2d: [''],
          posterUrl: ['every'],
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
      this.editFormMovie = this.fb.group(
          {
              id: [''],
              name: [''],
              director: [''],
              actor: [''],
              isSub: [''],
              is2d: [''],
              posterUrl: ['every'],
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
  }

  checkBoxes(event) {
        this.check = event.target.value;
        // console.log(this.idMovieGenreTypes[0]);
        console.log(this.check);
        let realCheck = this.check -1;
        for(let i=0;i<12;i++){
            if(realCheck == i){
                if(this.idMovieGenreTypes[i]==false){
                    this.idMovieGenreTypes[i]=true;
                }else{
                    this.idMovieGenreTypes[i]=false;
                }
            }
        }
  }

  addNewMovie() {
      this.movieService.addMovie(this.addFormMovie.value).subscribe();

      // add Movie Genre Associate
      this.idMovieGenreTypesTrue=[];
      for(let i=0;i<this.idMovieGenreTypes.length;i++){
          if(this.idMovieGenreTypes[i]==true){
              this.idMovieGenreTypesTrue.push(i+1);
          }
      }
      console.log(this.idMovieGenreTypesTrue);
      for(let i=0; i < this.idMovieGenreTypesTrue.length; i++){
          this.addFormMovieGenreAssociate = this.fb.group(
              {
                  movieId: [this.lastMovie.id],
                  movieGenreTypeId: [this.idMovieGenreTypesTrue[i]]
              }
          )
          console.log(this.lastMovie.id, this.idMovieGenreTypesTrue[i]);
          this.movieService.addMovieGenreAssociate(this.addFormMovieGenreAssociate.value).subscribe();
      }
      this.message = "Added successfully";
  }

    getMovie(movie: Movie) {
        this.editFormMovie.patchValue(movie);
        // this.movieService.getAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id)
        this.movieService.getAllMovieGenreAssociateByMovieId(115).subscribe(
            (data) => {
                for(let item of data){
                    this.arrEditMovieGenreTypeId.push(item.movieGenreTypeId);
                    // console.log(this.arrEditMovieGenreTypeId);
                }
                console.log("ket qua");
                console.log(this.arrEditMovieGenreTypeId);
                console.log("ket qua2");
                console.log(this.arrEditMovieGenreTypeId[2]);
                console.log(typeof this.arrEditMovieGenreTypeId);
                for (let i=0; i<this.editIdMovieGenreTypes.length; i++){
                    for (let j=0; j<this.arrEditMovieGenreTypeId.length; j++){
                        if (this.arrEditMovieGenreTypeId[j] == i+1){
                            this.editIdMovieGenreTypes[i] = true;
                        }
                    }
                }
                console.log("ket qua3");
                console.log(this.editIdMovieGenreTypes);

            });


    }
    editMovie() {
        this.movieService.editMovieService(this.editFormMovie.value, this.editFormMovie.value.id).subscribe(data => {this.ngOnInit()});
        this.message = "Edit Successfully";
    }


}
