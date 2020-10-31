import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsService} from './news.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  // variables used for paging functions
  variableFind = '';
  currentPage = 1;
  totalEntities: number;
  totalPage: number;
  entityNumber: number;
  jumpPage: number;
  constructor(private newsService: NewsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newsService.getListNews(this.variableFind).subscribe((data)=>{
      this.totalEntities = data.length;
      this.totalPage = this.totalEntities/10;
    });

    this.newsService.getAllNews(this.currentPage, this.variableFind).subscribe((data)=>{
      if (data.length === 0){

      }
    })
  }

}
