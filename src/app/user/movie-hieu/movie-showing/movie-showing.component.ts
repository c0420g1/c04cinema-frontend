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

    constructor(private moviesService: MovieService, private pipe: DatePipe) {
    }

    ngOnInit(): void {
        const dateCur = new Date();
        const resultDate = this.pipe.transform(dateCur, 'yyyy-MM-dd');
        console.log(resultDate);
        this.moviesService.getMovieByDate(resultDate).subscribe(
            (data) => {
                this.movies = data;
                console.log(data);
            }
        );
        this.checkDate = true;
    }

    searchFilmByDate(date) {
        let date1=Date.parse(date);
        const dateCur = new Date();
        const resultDate = this.pipe.transform(dateCur, 'yyyy-MM-dd');
        let date2 = Date.parse(resultDate);
        if (date1 > date2){
            this.checkDate = false;
        }else {
            this.checkDate = true;
        }
        this.moviesService.getMovieByDate(date).subscribe(
            (data) => {
                this.movies = data;
            }
        );
    }
    searchByName(): any{
        this.moviesService.getFilmByName(this.nameSearch).subscribe(
            (data) => {
                console.log(data);
                this.movies = data;
            }
        )
    }

}
