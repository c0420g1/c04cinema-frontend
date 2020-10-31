import {Component, OnInit} from '@angular/core';
import {MovieService} from '../movie/movie.service';
import {Movie} from 'src/app/model/Movie';
import {DatePipe} from '@angular/common';
import {BannerService} from '../../service/banner.service';
import {Banner} from 'src/app/model/Banner';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    movieShowing: Movie[] = [];
    bannerList: Banner[] = [];
    movieBestChoice: Movie[] = [];
    randomNumberVote: number;
    constructor(private  moviesService: MovieService, private pipe: DatePipe,
                private bannerService: BannerService) {
    }

    ngOnInit(): void {
        this.randomNumberVote = Math.floor (Math.random () * 6 + 115);
        this.bannerService.getAllBanner().subscribe((data) => this.bannerList = data);

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
            width: 100,
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
        this.moviesService.getBestChoiceFilm().subscribe(
            (data) => {
                this.movieBestChoice = data;
            },
            error => console.log(error)
        );


    }

}
