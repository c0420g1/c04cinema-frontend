import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie-hieu/movie.service';
import {Movie} from 'src/app/model/Movie';
import {DatePipe} from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    movieShowing: Movie[] = [];

    constructor(private  moviesService: MovieService, private pipe: DatePipe) {
    }

    ngOnInit(): void {

        $('.banner').show().revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: 500,

            navigation: {

                arrows: {
                    enable: true,
                    style: 'hebe',
                    hide_onleave: false,
                    tmp: '<span class="slider__info">{{title}}</span>'
                }
            },

            spinner: 'spinner2',
        });

        $('.score').raty({
            width: 130,
            score: 0,
            path: 'assets/images/rate/',
            starOff: 'star-off.svg',
            starOn: 'star-on.svg'
        });
        this.moviesService.getMoviesNew().subscribe(
            (data) => {
                this.movieShowing = data;
            }
        );

    }

}
