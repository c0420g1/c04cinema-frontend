import {Component, OnInit, Pipe} from '@angular/core';
import {Movie} from 'src/app/model/Movie';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MovieService} from '../movie.service';
import {DatePipe} from '@angular/common';
import {Show} from 'src/app/model/Show';
import {ShowService} from '../show.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import DateTimeFormat = Intl.DateTimeFormat;

declare var $: any;


@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

    id = '';
    movie: Movie = {
        id: 0,
        name: '',
        director: '',
        actor: '',
        isSub: null,
        is2d: null,
        posterUrl: '',
        startDate: '',
        endDate: '',
        duration: 0,
        trailerUrl: '',
        starRating: 0,
        movieRatedAgeId: 0,
        description: '',
        entertainment: '',
    };
    shows: Show [] = [];
    videoUrl: SafeResourceUrl = '';
    dangerousVideoUrl = '';
    checkHideButton = false;
    show: Show;
    showTableTime: Show[] = [];
    votes: number;


    constructor(private moviesService: MovieService,
                private activatedRoute: ActivatedRoute,
                private showService: ShowService,
                private pipe: DatePipe,
                private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit(): void {
        this.votes = Math.floor (Math.random () * 6 + 115);

        const dateCur = new Date();
        const resultDate = this.pipe.transform(dateCur, 'yyyy-MM-dd');
        let date2 = Date.parse(resultDate);
        this.activatedRoute.paramMap.subscribe(
            (param: ParamMap) => {
                this.id = param.get('id');
                this.moviesService.getMovieById(this.id).subscribe(
                    (data) => {
                        try {
                            this.checkHideButton = false;
                            this.movie = data[0];
                            this.updateVideoUrl(this.youtube_parser(this.movie.trailerUrl));
                            let date1 = Date.parse(this.movie.startDate);
                            if (date2 > date1) {
                                this.checkHideButton = true;
                            }
                        } catch (e) {
                            return 'Not found data result !';
                        }

                    }, error => console.log('Error !')
                );
            }
        );
        $('.movie__show-btn').click(
            function(ev) {
                ev.preventDefault();
                $(this).parents('.movie--preview').find('.time-select').slideToggle(500);
            });
        $('.time-select__item').click(function() {
            $('.time-select__item').removeClass('active');
            $(this).addClass('active');
        });

        $('.score').raty({
            width: 130,
            score: 0,
            path: 'assets/images/rate/',
            starOff: 'star-off.svg',
            starOn: 'star-on.svg',
        });


        this.showService.getAllShow().subscribe(
            (data) => {
                this.shows = data;
                for (let i = 0; i < this.shows.length; i++){
                    if (this.movie.id === this.shows[i].movieId){
                        this.showTableTime.push(this.shows[i])
                    }
                }

            }, error => console.log('Error !')
        );



    }

    updateVideoUrl(id: string) {
        this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
        this.videoUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }

    youtube_parser(url) {
        let videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        console.log('url' + url);
        if (videoid != null) {
            console.log(videoid[1]);
            return videoid[1];
        } else {
            console.log('The youtube url is not valid.');
        }
    }



    solve(): any{

    }

}
