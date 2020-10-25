import { Component, OnInit } from '@angular/core';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MovieService} from './movie.service';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';
import {Hall} from '../../model/Hall';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    url: string;
  message: string;
  movies: Movie[] = [];
  movieGenreTypes: MovieGenreType[] = [];
  movieGenreAssociates: MovieGenreAssociate[] = [];
  halls: Hall[] = [];
  idMovieGenreTypesTrue: number[] = [];
  idMovieGenreTypes = [false,false,false,false,false,false,false,false,false,false,false,false];
  idEditMovieGenreTypesTrue: number[] = [];
  idEditMovieGenreTypes = [false,false,false,false,false,false,false,false,false,false,false,false];
  addFormMovie: FormGroup;
  addFormMovieGenreAssociate: FormGroup;
  editFormMovie: FormGroup;
  addFormShow: FormGroup;
  lastMovie: Movie;
  check: number;
  checkEdit: number;
  showStartTimes: string[] = [];
  showStartTime: string;
  showPrices: number[] = [];
  showPrice: number;
  showMovie: Movie;
  movieName = '';

  constructor(private movieService: MovieService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe((data) => {this.movies = data; });
    this.movieService.getAllMovieGenreType().subscribe((data) => {this.movieGenreTypes = data; });
    this.movieService.getAllMovieGenreAssociate().subscribe((data) => {this.movieGenreAssociates = data; });
    this.movieService.getLastMovie().subscribe((data) => {this.lastMovie = data; });
    this.movieService.getAllHall().subscribe((data) => {this.halls = data; });
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
      this.editFormMovie = this.fb.group(
          {
              id: [''],
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
        this.movieService.getAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id).subscribe(
            (data) => {
                for(let item of data){
                    this.idEditMovieGenreTypesTrue.push(item.movieGenreTypeId);
                    // console.log(this.arrEditMovieGenreTypeId);
                }
                console.log("idEditMovieGenreTypesTrue");
                console.log(this.idEditMovieGenreTypesTrue);
                for (let i=0; i<this.idEditMovieGenreTypes.length; i++){
                    for (let j=0; j<this.idEditMovieGenreTypesTrue.length; j++){
                        if (this.idEditMovieGenreTypesTrue[j] == i+1){
                            this.idEditMovieGenreTypes[i] = true;
                        }
                    }
                }
                console.log("idEditMovieGenreTypes");
                console.log(this.idEditMovieGenreTypes);
            });
    }

    checkBoxesEdit(event) {
      console.log(event.target.value);
        this.checkEdit = event.target.value;
        let realCheckEdit = this.checkEdit -1;
        for(let i=0;i<12;i++){
            if(realCheckEdit == i){
                if(this.idEditMovieGenreTypes[i]==false){
                    this.idEditMovieGenreTypes[i]=true;
                }else{
                    this.idEditMovieGenreTypes[i]=false;
                }
            }
        }
    }

    editMovie() {
        this.movieService.editMovieService(this.editFormMovie.value, this.editFormMovie.value.id).subscribe(data => {this.ngOnInit()});
        this.message = "Edited Successfully";
        this.idEditMovieGenreTypesTrue.splice(0, this.idEditMovieGenreTypesTrue.length);
        // console.log(this.idEditMovieGenreTypesTrue);
        // console.log(this.idEditMovieGenreTypes);
        for(let i=0; i<this.idEditMovieGenreTypes.length; i++){
            if(this.idEditMovieGenreTypes[i]==true){
                this.idEditMovieGenreTypesTrue.push(i+1);
            }
        }
        // console.log(this.idEditMovieGenreTypesTrue);
        this.movieService.deleteAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id).subscribe();
        for(let i=0; i < this.idEditMovieGenreTypesTrue.length; i++){
            this.addFormMovieGenreAssociate = this.fb.group(
                {
                    movieId: [this.editFormMovie.value.id],
                    movieGenreTypeId: [this.idEditMovieGenreTypesTrue[i]]
                }
            )
            console.log(this.editFormMovie.value.id,this.idEditMovieGenreTypesTrue[i]);
            this.movieService.addMovieGenreAssociate(this.addFormMovieGenreAssociate.value).subscribe();
        }
    }


    checkedEdit(id) {
      for(let i=0; i<this.idEditMovieGenreTypes.length; i++){
          if(id==this.idEditMovieGenreTypesTrue[i]){
              return true;
          }
      }
    }


    addShowTimes(event) {
        console.log(event.target.value);
        this.showStartTime = event.target.value;
        this.showStartTimes.push(this.showStartTime);
    }


    deleteShowTimeAndShowPrice(i: number) {
        this.showStartTimes.splice(i,1);
        console.log(this.showStartTimes);
    }


    addShow(length: number) {
        for(let i=0; i<length; i++){
            this.showPrice = parseInt((document.getElementById(i.toString()) as HTMLInputElement).value);
            this.showPrices.push(this.showPrice);
            // console.log(this.showPrices);
            for (let i=0; i<this.showStartTimes.length; i++){
                this.addFormShow = this.fb.group({
                    startTime: [this.showStartTimes[i]],
                    hallId: [parseInt((document.getElementById('hallId') as HTMLInputElement).value)],
                    movieId: [this.showMovie.id],
                    price: [this.showPrices[i]],
                    description: ['every'],
                    isearly: [0]
                })
                console.log(this.addFormShow.value);
                this.movieService.addShow(this.addFormShow.value).subscribe();
            }
        }


    }


    getShowMovie(movie: Movie) {
        this.showMovie = movie;
        this.movieName = this.showMovie.name;
        console.log(this.showMovie);
    }

    getMark(event) {
        this.url = event;
    }
}
