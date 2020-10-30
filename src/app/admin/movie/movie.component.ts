import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/Movie';
import {MovieGenreType} from '../../model/MovieGenreType';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from './movie.service';
import {MovieGenreAssociate} from '../../model/MovieGenreAssociate';
import {Hall} from '../../model/Hall';
import {BookingTicketDTO} from '../../model/bookingTicketDTO';

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
    idMovieGenreTypes = [false, false, false, false, false, false, false, false, false, false, false, false];
    idEditMovieGenreTypesTrue: number[] = [];
    idEditMovieGenreTypes = [false, false, false, false, false, false, false, false, false, false, false, false];
    addFormMovie: FormGroup;
    addFormMovieGenreAssociate: FormGroup;
    editFormMovie: FormGroup;
    addFormShow: FormGroup;
    lastMovie: Movie;
    check: number;
    checkEdit: number;

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
    // ticketNew: BookingTicketDTO = new BookingTicketDTO();
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
            if (data.length === 0) {
                this.message = 'Could not find any movies';
            } else {
                this.message = '';
            }
            console.log(this.currentPage);
            console.log(this.totalPage);
            this.entityNumber = data.length;
            // this.totalPage = this.totalEntities/10;
            this.movies = data;
        });

        this.movieService.getAllMovieGenreType().subscribe((data) => {
            this.movieGenreTypes = data;
        });
        this.movieService.getAllMovieGenreAssociate().subscribe((data) => {
            this.movieGenreAssociates = data;
        });
        this.movieService.getLastMovie().subscribe((data) => {
            this.lastMovie = data;
        });
        this.movieService.getAllHall().subscribe((data) => {
            this.halls = data;
        });
        this.addFormMovie = this.fb.group(
            {
                name: ['', [Validators.required, Validators.maxLength(100)]],
                director: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
                actor: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
                isSub: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
                is2d: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
                posterUrl: ['', [Validators.required, Validators.maxLength(300)]],
                startDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'), dateValidator]],
                endDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
                duration: ['', [Validators.required, Validators.min(60), Validators.max(235)]],
                trailerUrl: ['', [Validators.required, Validators.maxLength(250), Validators.pattern('^(https://www.youtube.com)[0-9a-zA-Z./?=&_-]+$')]],
                starRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
                movieRatedAgeId: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
                description: ['', Validators.maxLength(1000)],
                entertainment: ['', [Validators.required, Validators.maxLength(45)]],
            }
        );
        this.editFormMovie = this.fb.group(
            {
                id: [''],
                name: ['', [Validators.required, Validators.maxLength(100)]],
                director: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
                actor: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.maxLength(45)]],
                isSub: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
                is2d: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
                posterUrl: ['', [Validators.required, Validators.maxLength(300)]],
                startDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'), dateValidator]],
                endDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
                duration: ['', [Validators.required, Validators.min(60), Validators.max(235)]],
                trailerUrl: ['', [Validators.required, Validators.maxLength(250), Validators.pattern('^(https://www.youtube.com)[0-9a-zA-Z./?=&_-]+$')]],
                starRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
                movieRatedAgeId: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
                description: ['', Validators.maxLength(1000)],
                entertainment: ['', [Validators.required, Validators.maxLength(45)]],
            }
        );
    }

    checkBoxes(event) {
        this.check = event.target.value;
        // console.log(this.idMovieGenreTypes[0]);
        console.log(this.check);
        let realCheck = this.check - 1;
        for (let i = 0; i < 12; i++) {
            if (realCheck == i) {
                if (this.idMovieGenreTypes[i] == false) {
                    this.idMovieGenreTypes[i] = true;
                } else {
                    this.idMovieGenreTypes[i] = false;
                }
            }
        }
    }

    addNewMovie() {
        this.movieService.addMovie(this.addFormMovie.value).subscribe();

        // add Movie Genre Associate
        this.idMovieGenreTypesTrue = [];
        for (let i = 0; i < this.idMovieGenreTypes.length; i++) {
            if (this.idMovieGenreTypes[i] == true) {
                this.idMovieGenreTypesTrue.push(i + 1);
            }
        }
        console.log(this.idMovieGenreTypesTrue);
        for (let i = 0; i < this.idMovieGenreTypesTrue.length; i++) {
            this.addFormMovieGenreAssociate = this.fb.group(
                {
                    movieId: [this.lastMovie.id],
                    movieGenreTypeId: [this.idMovieGenreTypesTrue[i]]
                }
            );
            console.log(this.lastMovie.id, this.idMovieGenreTypesTrue[i]);
            this.movieService.addMovieGenreAssociate(this.addFormMovieGenreAssociate.value).subscribe();
        }
        this.message = 'Added successfully';
    }

    getMovie(movie: Movie) {
        this.editFormMovie.patchValue(movie);
        this.movieService.getAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id).subscribe(
            (data) => {
                for (let item of data) {
                    this.idEditMovieGenreTypesTrue.push(item.movieGenreTypeId);
                    // console.log(this.arrEditMovieGenreTypeId);
                }
                console.log('idEditMovieGenreTypesTrue');
                console.log(this.idEditMovieGenreTypesTrue);
                for (let i = 0; i < this.idEditMovieGenreTypes.length; i++) {
                    for (let j = 0; j < this.idEditMovieGenreTypesTrue.length; j++) {
                        if (this.idEditMovieGenreTypesTrue[j] == i + 1) {
                            this.idEditMovieGenreTypes[i] = true;
                        }
                    }
                }
                // console.log('idEditMovieGenreTypes');
                // console.log(this.idEditMovieGenreTypes);
            });
    }

    checkBoxesEdit(event) {
        console.log(event.target.value);
        this.checkEdit = event.target.value;
        let realCheckEdit = this.checkEdit - 1;
        for (let i = 0; i < 12; i++) {
            if (realCheckEdit == i) {
                if (this.idEditMovieGenreTypes[i] == false) {
                    this.idEditMovieGenreTypes[i] = true;
                } else {
                    this.idEditMovieGenreTypes[i] = false;
                }
            }
        }
    }

    editMovie() {
        this.movieService.editMovieService(this.editFormMovie.value, this.editFormMovie.value.id).subscribe(data => {
            this.ngOnInit();
        });
        this.message = 'Edited Successfully';
        this.idEditMovieGenreTypesTrue.splice(0, this.idEditMovieGenreTypesTrue.length);
        // console.log(this.idEditMovieGenreTypesTrue);
        // console.log(this.idEditMovieGenreTypes);
        for (let i = 0; i < this.idEditMovieGenreTypes.length; i++) {
            if (this.idEditMovieGenreTypes[i] == true) {
                this.idEditMovieGenreTypesTrue.push(i + 1);
            }
        }
        // console.log(this.idEditMovieGenreTypesTrue);
        this.movieService.deleteAllMovieGenreAssociateByMovieId(this.editFormMovie.value.id).subscribe();
        for (let i = 0; i < this.idEditMovieGenreTypesTrue.length; i++) {
            this.addFormMovieGenreAssociate = this.fb.group(
                {
                    movieId: [this.editFormMovie.value.id],
                    movieGenreTypeId: [this.idEditMovieGenreTypesTrue[i]]
                }
            );
            // console.log(this.editFormMovie.value.id,this.idEditMovieGenreTypesTrue[i]);
            this.movieService.addMovieGenreAssociate(this.addFormMovieGenreAssociate.value).subscribe();
        }
    }


    checkedEdit(id) {
        for (let i = 0; i < this.idEditMovieGenreTypes.length; i++) {
            if (id == this.idEditMovieGenreTypesTrue[i]) {
                return true;
            }
        }
    }


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
        // console.log(this.showStartTimes);

    }


    deleteShowTimeAndShowPrice(i: number) {
        this.showStartTimes.splice(i, 1);
        console.log(this.showStartTimes);
    }


    addShow(length: number) {
        for (let i = 0; i < length; i++) {
            this.showPrice = parseInt((document.getElementById(i.toString()) as HTMLInputElement).value);
            this.showPrices.push(this.showPrice);
            console.log(this.showPrices);
            console.log(this.showStartTimes);
            for (let i = 0; i < this.showStartTimes.length; i++) {
                this.addFormShow = this.fb.group({
                    startTime: [this.showStartTimes[i]],
                    hallId: [parseInt((document.getElementById('hallId') as HTMLInputElement).value)],
                    movieId: [this.showMovie.id],
                    price: [this.showPrices[i]],
                    description: ['temporary'],
                    isearly: [0]
                });
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

    //creator Hieu
    searchByName(name: string): any {
        this.movieService.searhcByName(name).subscribe(
            (data) => this.movies = data
        );
    }

}

function dateValidator(formControl: FormControl) {
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
