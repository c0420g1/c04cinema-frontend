import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';
import {Hall} from '../../model/Hall';
import {MovieService} from './movie.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  url: string;
  message: string;
  messageEdit: string;
  messageAdd: string;
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
  posterUrlShowImage: string;

  // variables used for the add show function
  showStartTimes: string[] = [];
  showStartTime: string;
  showPrices: number[] = [];
  showPrice: number;
  showMovie: Movie;
  movieName = '';


  // variables used for paging functions
  variableFind = '';
  currentPage = 1;
  totalEntities: number;
  totalPage: number;
  entityNumber: number;
  jumpPage: number;

    constructor(private movieService: MovieService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.movieService.getListMovie(this.variableFind).subscribe((data) => {
            this.totalEntities = data.length;
            this.totalPage = this.totalEntities / 10;
        });

    this.movieService.getAllMovie(this.currentPage, this.variableFind).subscribe((data) => {
        if (data.length === 0){
            this.message = 'Could not find any movies';
        } else {
            this.message = '';
        }
        this.entityNumber = data.length;
        this.totalPage = this.totalEntities/10;
        this.movies = data;
    });

    this.movieService.getAllMovieGenreType().subscribe((data) => {this.movieGenreTypes = data; });
    this.movieService.getAllMovieGenreAssociate().subscribe((data) => {this.movieGenreAssociates = data; });
    this.movieService.getLastMovie().subscribe((data) => {this.lastMovie = data; });
    this.movieService.getAllHall().subscribe((data) => {this.halls = data; });
    this.addFormMovie = this.fb.group(
        {
            name: ['',[Validators.required, Validators.maxLength(100)]],
            director: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/),Validators.maxLength(45)]],
            actor: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
            isSub: ['1',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern(/^[0-9]+$/)]],
            is2d: ['1',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern(/^[0-9]+$/)]],
            posterUrl: ['',[Validators.required]],
            startDate: ['',[Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),dateValidator]],
            endDate: ['',[Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
            duration: ['',[Validators.required,Validators.min(60),Validators.max(235),Validators.pattern(/^[0-9]+$/)]],
            trailerUrl: ['',[Validators.required,Validators.maxLength(250)]],
            starRating:['',[Validators.required,Validators.min(1),Validators.max(5),Validators.pattern(/^[0-9]+$/)]],
            movieRatedAgeId: ['',[Validators.required,Validators.min(1),Validators.max(5),Validators.pattern(/^[0-9]+$/)]],
            description: ['',Validators.maxLength(1000)],
            entertainment: ['',[Validators.required,Validators.maxLength(45)]],
        }
    )
      this.editFormMovie = this.fb.group(
          {
              id: [''],
              name: ['',[Validators.required,Validators.maxLength(100)]],
              director: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
              actor: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
              isSub: ['',[Validators.required,Validators.min(0),Validators.max(1)]],
              is2d: ['',[Validators.required,Validators.min(0),Validators.max(1)]],
              posterUrl: ['', [Validators.required,Validators.maxLength(300)]],
              startDate: ['',[Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
              endDate: ['',[Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),]],
              duration: ['',[Validators.required,Validators.min(60),Validators.max(235),Validators.pattern(/^[0-9]+$/)]],
              trailerUrl: ['',[Validators.required,Validators.maxLength(250),
                              Validators.pattern('^(https://www.youtube.com)[0-9a-zA-Z./?=&_-]+$')]],
              starRating:['',[Validators.required,Validators.min(1),Validators.max(5)]],
              movieRatedAgeId: ['',[Validators.required,Validators.min(1),Validators.max(5)]],
              description: ['',Validators.maxLength(1000)],
              entertainment: ['',[Validators.required,Validators.maxLength(45)]],
          }
      );
  }

  // to check boxes of movie genre type, and validate idMovieGenreType, in add new movie function
    errorIdMovieGenreType = false;
  checkBoxesAdd(event) {
        this.check = event.target.value;
        if (this.check < 1 || this.check > 12){
            this.errorIdMovieGenreType = true;
        }else {
            this.errorIdMovieGenreType = false;
        }
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
  // add new movie & movie genre type
  addNewMovie() {
      this.movieService.addMovie(this.addFormMovie.value).subscribe(
          data=> {
              this.messageAdd = "Added Successfully";
              this.ngOnInit();
          }
          );

      // add Movie Genre Associate
      this.idMovieGenreTypesTrue=[];
      for(let i=0;i<this.idMovieGenreTypes.length;i++){
          if(this.idMovieGenreTypes[i]==true){
              this.idMovieGenreTypesTrue.push(i+1);
          }
      }

      for(let i=0; i < this.idMovieGenreTypesTrue.length; i++){
          this.addFormMovieGenreAssociate = this.fb.group(
              {
                  movieId: [this.lastMovie.id],
                  movieGenreTypeId: [this.idMovieGenreTypesTrue[i]]
              }
          )
          this.movieService.addMovieGenreAssociate(this.addFormMovieGenreAssociate.value).subscribe(
              (data)=>{
                  this.ngOnInit();
              }
          );
      }

  }


    getMovieEdit(movie: Movie) {
        this.posterUrlShowImage= movie.posterUrl;
        this.editFormMovie.patchValue(movie);
        console.log(movie);
        this.movieService.getAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id).subscribe(
            (data) => {
                for (let item of data) {
                    this.idEditMovieGenreTypesTrue.push(item.movieGenreTypeId);
                }

                for (let i=0; i<this.idEditMovieGenreTypes.length; i++){
                    for (let j=0; j<this.idEditMovieGenreTypesTrue.length; j++){
                        if (this.idEditMovieGenreTypesTrue[j] == i+1){
                            this.idEditMovieGenreTypes[i] = true;
                        }
                    }
                }
            });
    }
    // check boxes movie genre type at screen edit function
    errorIdMovieGenreTypeEdit: boolean;
    checkBoxesEdit(event) {
        console.log(event.target.value);
        this.checkEdit = event.target.value;
        if (this.checkEdit > 12 || this.checkEdit <1){
            this.errorIdMovieGenreTypeEdit = true;
        }else {
            this.errorIdMovieGenreTypeEdit = false;
        }
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
    // edit movie
    editMovie() {
        this.movieService.editMovieService(this.editFormMovie.value, this.editFormMovie.value.id).subscribe(

             (data)=>{
                 this.messageEdit = "Edit Successful!!!!"
                 this.ngOnInit();
             }

        );

        this.idEditMovieGenreTypesTrue.splice(0, this.idEditMovieGenreTypesTrue.length);
        for(let i=0; i<this.idEditMovieGenreTypes.length; i++){
            if(this.idEditMovieGenreTypes[i]==true){
                this.idEditMovieGenreTypesTrue.push(i+1);
            }
        }

        this.movieService.deleteAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id).subscribe();
        for (let i = 0; i < this.idEditMovieGenreTypesTrue.length; i++) {
            this.addFormMovieGenreAssociate = this.fb.group(
                {
                    movieId: [this.editFormMovie.value.id],
                    movieGenreTypeId: [this.idEditMovieGenreTypesTrue[i]]
                }
            )
            this.movieService.addMovieGenreAssociate(this.addFormMovieGenreAssociate.value).subscribe(
                // (data)=>this.ngOnInit()
            );
        }
    }

    // to show the movie genre type to the edit screen,
    checkedEdit(id) {
        for (let i = 0; i < this.idEditMovieGenreTypes.length; i++) {
            if (id == this.idEditMovieGenreTypesTrue[i]) {
                return true;
            }
        }
    }

    // add show times
    addShowTimes(event) {
        console.log(event.target.value);
        this.showStartTime = event.target.value;
        if (this.showStartTimes.length == 0) {
            this.showStartTimes.push(this.showStartTime);
        }
        for (let i = 0; i < this.showStartTimes.length; i++) {
            if (this.showStartTime != this.showStartTimes[i]) {
                this.showStartTimes.push(this.showStartTime);
            }
        }
    }

    // delete showtime and show input tag: price, at add show screen
    deleteShowTimeAndShowPrice(i: number) {
        this.showStartTimes.splice(i,1);
    }

    // add show at button add, in add show screen
    addShow(length: number) {
        for (let i = 0; i < length; i++) {
            this.showPrice = parseInt((document.getElementById(i.toString()) as HTMLInputElement).value);
            this.showPrices.push(this.showPrice);
            for (let i=0; i<this.showStartTimes.length; i++){
                this.addFormShow = this.fb.group({
                    startTime: [this.showStartTimes[i]],
                    hallId: [parseInt((document.getElementById('hallId') as HTMLInputElement).value)],
                    movieId: [this.showMovie.id],
                    price: [this.showPrices[i]],
                    description: ['temporary'],
                    isearly: [0]
                })
                this.movieService.addShow(this.addFormShow.value).subscribe();
            }
        }
    }

    getShowMovie(movie: Movie) {
        this.showMovie = movie;
        this.movieName = this.showMovie.name;
        console.log(this.showMovie);
    }


    prePage(): void {
        if (this.currentPage >= 2) {
            this.currentPage--;
            this.jumpPage = this.currentPage;
        }
        this.ngOnInit();
    }

    nexPage(): void {
        if (this.currentPage < this.totalEntities / 10) {
            this.currentPage++;
            this.jumpPage = this.currentPage;
        }
        console.log(this.currentPage);
        this.ngOnInit();
    }

    goToPage() {
        this.currentPage = this.jumpPage;
        this.ngOnInit();
    }

    search(): void {
        this.currentPage = 1;
        this.ngOnInit();
    }

    end: string;
    start: string;
    error = false;
    Plus: string;

    // validate start date < end date
    compareTwoDates() {
        let endDate: string[];
        let startDate: string[];
        endDate = this.end.split('-');
        startDate = this.start.split('-');
        let dateNumberEnd = (parseInt(endDate[0]) * 12 * 365) + (parseInt(endDate[1]) * 30) + (parseInt(endDate[2]));
        let dateNumberStar = (parseInt(startDate[0]) * 12 * 365) + (parseInt(startDate[1]) * 30) + (parseInt(startDate[2]));
        if (dateNumberEnd <= dateNumberStar || dateNumberEnd > dateNumberStar + 30) {
            this.error = true;
        } else {
            this.error = false;
        }
    }

    // hai edit
    getLink(value) {
        this.url = value;
    }
}

// function to validate date > current date
function dateValidator(formControl: FormControl) {
    if(formControl.value == undefined) {
        return null;
    }
    let date1: string[];
    date1 = formControl.value.split('-');
    const o_date = new Intl.DateTimeFormat;
    const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
    const m_date = o_date.formatToParts().reduce(f_date, {});
    const dateNumber = (parseInt(date1[0]) * 365) + (parseInt(date1[1]) * 30) + (parseInt(date1[2]));
    const dateNumberNow = (parseInt(m_date.year) * 365) + (parseInt(m_date.month) * 30) + (parseInt(m_date.day));
    if (dateNumber < dateNumberNow) {
        return {checkDate: true};
    }
    return null;
}


