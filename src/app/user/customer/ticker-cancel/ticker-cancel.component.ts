import { Component, OnInit } from '@angular/core';
import {Ticker} from '../model/Ticker';
import {TickerService} from '../service/ticker.service';

@Component({
  selector: 'app-ticker-cancel',
  templateUrl: './ticker-cancel.component.html',
  styleUrls: ['./ticker-cancel.component.css']
})
export class TickerCancelComponent implements OnInit {

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
