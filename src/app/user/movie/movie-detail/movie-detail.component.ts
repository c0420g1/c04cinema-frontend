import {Component, OnInit, Pipe} from '@angular/core';
import {Movie} from 'src/app/model/Movie';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MovieService} from '../movie.service';
import {DatePipe} from '@angular/common';
import {Show} from 'src/app/model/Show';
import {Comment} from 'src/app/model/Comment';
import {ShowService} from '../show.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import DateTimeFormat = Intl.DateTimeFormat;
import { GlobalConstants } from 'src/app/model/GlobalConstants';
import * as moment from 'moment';
import { TestBed } from '@angular/core/testing';
declare var addReply: any;
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
    listComment: any= [];
    sumComment: number = 0;    
    com: string;
    cusId: number;
    constructor(private moviesService: MovieService,
                private activatedRoute: ActivatedRoute,
                private showService: ShowService,
                private pipe: DatePipe,
                private sanitizer: DomSanitizer,
                private router: Router
    ) {
        window['addReply'] = this.addReply;
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

        this.moviesService.getCCustomerByAccountId(GlobalConstants.accId.toString()).subscribe(r=> this.cusId= r.id);
        this.moviesService.getCommentByMovieId(this.id).subscribe(e=>
            {this.listComment = e; this.sumComment= e[0].sumComment; console.log(this.listComment)} );

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

    freply(e, cid, cusId){
        e.preventDefault();
        const movieId= this.id;
        const replyCusId= this.cusId;
        let moviceService= this.moviesService;
        let router= this.router;
            $('.comment').find('.comment-form').remove();
            $('#'+ cid+ 'a').parent().append("<div class='comment-form'>\
                                <textarea id='"+ cid +"b' class='comment-form__text' placeholder='Add you comment here'></textarea>\
                                <label class='comment-form__info'>450 characters left</label>\
                                <button id='quoc' class='btn btn-md btn--danger comment-form__btn'>add comment</button>\
                            </div>");

                            $('#quoc').click(function(){
                              const content= $('#'+ cid+'b').val(); 
                                addReply(moviceService,movieId,replyCusId, cid,cusId, content, router);
                            })
    };

    getCom(val){
       this.com= val;     
    }

    addReply(moviceService, movieId, replyCusId, commentId, customerId, content, router){
        let reply= new Comment();
        reply.customerId= customerId;
        reply.movieId= movieId;
        reply.createDate= new Date().toISOString();
        reply.replyOneCustomId= replyCusId;
        reply.replyTwoCustomId= commentId; 
        reply.comment= content;
        moviceService.addComment(reply).subscribe();
        const currentRoute = router.url;
        router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            router.navigate([currentRoute]);
        }); 
    }

    addCom(){
        let comment= new Comment();
        comment.customerId= this.cusId;
        comment.movieId= Number(this.id);
        comment.comment= this.com;
        comment.createDate= new Date().toISOString();
        this.moviesService.addComment(comment).subscribe();
        this.refeshComponent();
    }

    refeshComponent(){
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]);
        }); 
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
