import {Component, OnInit} from '@angular/core';
import {TickerService} from '../service/ticker.service';
import {Ticker} from '../model/Ticker';

@Component({
    selector: 'app-ticker-put',
    templateUrl: './ticker-put.component.html',
    styleUrls: ['./ticker-put.component.css']
})
export class TickerPutComponent implements OnInit {

    tickerPut: Ticker[] = [];
    page = 1;

    constructor(private tickerService: TickerService) {
    }

    ngOnInit(): void {
        this.tickerService
            .getTickerById(1,this.page)
            .subscribe(next => (this.tickerPut = next), error => (this.tickerPut = []));
    }

}


