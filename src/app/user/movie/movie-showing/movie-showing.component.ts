import {Component, OnInit} from '@angular/core';
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
    checkDate = true;
    nameSearch = '';
    loading = false;

    constructor(private moviesService: MovieService, private pipe: DatePipe) {
    }

    ngOnInit(): void {
        this.loading = true;
        const dateCur = new Date();
        const resultDate = this.pipe.transform(dateCur, 'yyyy-MM-dd');
        console.log(resultDate);
        this.moviesService.getMovieByDate(resultDate).subscribe(
            (data) => {
                try {
                    this.movies = data;
                    this.loading = false;
                }catch (e) {
                    return 'Not found result !'
                }
            },error => console.log("Error !")
        );
        this.checkDate = true;
    }

    searchFilmByDate(date): void {
        this.loading = true;
        let date1=Date.parse(date);
        const dateCur = new Date();
        const resultDate = this.pipe.transform(dateCur, 'yyyy-MM-dd');
        let date2 = Date.parse(resultDate);
        if (date1 < date2){
            this.checkDate = false;
        }else {
            this.checkDate = true;
        }
        this.moviesService.getMovieByDate(date).subscribe(
            (data) => {
                try {
                    this.movies = data;
                    this.loading =false;
                }catch (e) {
                    return 'Not found result !'
                }

            },error => console.log("Error !")
        );
    }
    searchByName(): any{
        this.loading = true;
        //chua fix search theo ten viet thuong
        this.moviesService.getMovieByName(this.nameSearch).subscribe(
            (data) => {
                try {
                    this.movies = data;
                    this.loading = false;
                }catch (e) {
                    return 'Not found result !'
                }
            },error => console.log("Error !")
        )
    }


}
