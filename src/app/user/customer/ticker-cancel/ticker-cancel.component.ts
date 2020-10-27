import { Component, OnInit } from '@angular/core';
import {Ticker} from '../model/Ticker';
import {TickerService} from '../service/ticker.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ticker-cancel',
  templateUrl: './ticker-cancel.component.html',
  styleUrls: ['./ticker-cancel.component.css']
})
export class TickerCancelComponent implements OnInit {
  tickerPut: Ticker[] = [];
  tickerListPut: Ticker[] = [];
  message: string;
  entityNumber = 0;
  totalEntities: number;
  currentPage = 1;
  totalPage: number;
  jumpPage: any;
  sub: Subscription;
  constructor(private tickerService: TickerService,  private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const key = paramMap.get('id');
    this.tickerService
        .getTickerById(key,this.currentPage,1)
        .subscribe(next => (this.tickerPut = next), error => (this.tickerPut = []));

    this.tickerService
        .getTickerByListId(key,1)
        .subscribe(next => {
          (this.tickerListPut = next
              ,this.totalEntities = this.tickerListPut.length
              , this.totalPage = this.totalEntities/10),
              error => (this.tickerListPut = []);
          if (next.length === 0){
            this.message = 'not Data!';
          } else {
            this.message = '';
          }});
    });
  }

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
}
