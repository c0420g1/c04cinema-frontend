import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Movie} from 'src/app/model/Movie';
import {DatePipe} from '@angular/common';


@Component({
    selector: 'app-movie-coming',
    templateUrl: './movie-coming.component.html',
    styleUrls: ['./movie-coming.component.css']
})
export class MovieComingComponent implements OnInit {
    movies: Movie[] = [];
    loading = false;
    currentPage = 1;
    totalPage: number;
    totalEntities: number;
    jumpPage = 1;
    dateCurrent: string;

    constructor(private moviesService: MovieService, private pipe: DatePipe) {
        this.dateCurrent = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    }

    ngOnInit(): void {
        this.loading = true;
        const dateCur = this.pipe.transform(new Date(), 'yyyy-MM-dd');//date milliseconds

        this.moviesService.getTotalPage(this.dateCurrent).subscribe(
            (data) => {
                this.totalPage = parseInt(String(data / 4));
            },
            error => console.log(error)
        );
        this.moviesService.getMovieComing(this.currentPage, dateCur).subscribe(
            (data) => {
                this.movies = data;
                this.loading = false;

            },
            error => console.log(error)
        );
    }

    prePage(): void {
        try {
            this.currentPage--;
            if (this.currentPage <= 1) {
                this.currentPage = 1;
            }
            this.jumpPage = this.currentPage;
            this.ngOnInit();
        } catch (e) {
            console.log(e);
        }

    }

    nexPage(): void {
        try {
            this.currentPage++;
            if (this.currentPage >= this.totalPage) {
                this.currentPage = this.totalPage;
            }

            this.jumpPage = this.currentPage;
            this.ngOnInit();
        } catch (e) {
            console.log(e);
        }

    }

    goToPage() {
        try {
            this.currentPage = this.jumpPage;
            this.ngOnInit();
        } catch (e) {
            console.log(e);

        }

    }


}
