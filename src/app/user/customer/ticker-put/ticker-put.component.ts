import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickerService} from '../service/ticker.service';
import {Ticker} from '../model/Ticker';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {Error1} from '../model/error1';

@Component({
    selector: 'app-ticker-put',
    templateUrl: './ticker-put.component.html',
    styleUrls: ['./ticker-put.component.css']
})
export class TickerPutComponent implements OnInit, OnDestroy {

    tickerPut: Ticker[] = [];
    tickerListPut: Ticker[] = [];
    message: string;
    entityNumber = 0;
    totalEntities: number;
    currentPage = 1;
    totalPage: number;
    jumpPage: any;
    sub: Subscription;
    error1s: Error1[];
    i : number;

    constructor(private tickerService: TickerService,  private activatedRoute: ActivatedRoute) {
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const key = paramMap.get('id');
            this.tickerService
                .getTickerById(key, this.currentPage, 0)
                .subscribe(next => (this.tickerPut = next),error => (this.tickerPut = []));

            this.tickerService
                .getTickerByListId(key, 0)
                .subscribe(next => {
                    (this.tickerListPut = next
                        , this.totalEntities = this.tickerListPut.length
                        , this.totalPage = this.totalEntities / 10),
                        error => (this.tickerListPut = []);
                    if (next.length === 0) {
                        this.message = 'not Data!';
                    } else {
                        this.message = '';
                    }
                });
        });
    };

    prePage() {
        if (this.currentPage >= 2 ){
            this.currentPage--;
            this.jumpPage = this.currentPage;
        }
        this.ngOnInit();
    }

    goToPage() {
        this.currentPage = this.jumpPage;
        this.ngOnInit();
    }

    nexPage() {
        if (this.currentPage < this.totalEntities / 10) {
            this.currentPage++;
            this.jumpPage = this.currentPage;
        }
        this.ngOnInit();
    }

    cancelTicker() {
        this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const key = paramMap.get('id');
        this.tickerService
            .pathTicker(key,this.i)
            .subscribe(next => (this.error1s = next),error => (this.tickerPut = []));
            this.reloadPage();
        });
    }
    reloadPage() {
        window.location.reload();
    }

    checkDelete(i: number) {
        this.i = i;
    }
}


