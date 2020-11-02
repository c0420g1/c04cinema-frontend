import { Component, OnInit } from '@angular/core';
import {News} from '../../model/News';
import {NewService} from './new.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
   news: News [] = [];
    p: number = 1;
  constructor(private  newsService: NewService) { }

  ngOnInit(): void {
    this.newsService.getAllNew().subscribe(
        (data) => {
          this.news = data;
        }
    )
  }
  plusPage(): any{
      this.p++
  }
  prevPage(): any{
      this.p --;
  }

}
