import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsService} from './news.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {News} from '../../model/News';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  url: string;
  addFormNews: FormGroup;
  editFormNews: FormGroup;
  newses: News[] = [];
  message: string;
  newsEdit: News;
  newsDelete: News;
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
          this.message = "Could not find any news in data"
      }else {
        this.message = "";
      }
      this.entityNumber = data.length;
      this.totalPage = this.totalEntities/10;
      this.newses = data;
    })

    this.addFormNews = this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(100)]],
      type: ['',[Validators.required,Validators.maxLength(45)]],
      description: ['',[Validators.required,Validators.maxLength(2000)]],
      isOther: ['1'],
      imageUrl: ['',[Validators.required,Validators.maxLength(500)]],
    });

    this.editFormNews = this.fb.group({
      id: [''],
      name: ['',[Validators.required,Validators.maxLength(100)]],
      type: ['',[Validators.required,Validators.maxLength(45)]],
      description: ['',[Validators.required,Validators.maxLength(2000)]],
      isOther: ['1'],
      imageUrl: ['',[Validators.required,Validators.maxLength(500)]],
    });
  }

  search() {
    this.currentPage = 1;
    this.ngOnInit();
  }

  getNewsEdit(news: News) {
    this.editFormNews.patchValue(news);
    this.newsEdit = news;
  }
  editNews() {
    this.newsService.editNews(this.editFormNews.value, this.editFormNews.value.id).subscribe((data)=>this.ngOnInit());
  }

  prePage(): void {
    if (this.currentPage > 2){
      this.currentPage--;
      this.jumpPage = this.currentPage;
    }
    this.ngOnInit();
  }

  goToPage() {
    this.currentPage  = this.jumpPage;
    this.ngOnInit();
  }

  nexPage() {
    if (this.currentPage < this.totalEntities / 10){
      this.currentPage ++;
      this.jumpPage = this.currentPage;
    }
    this.ngOnInit();
  }

  addNews() {
    this.newsService.addNews(this.addFormNews.value).subscribe((data)=>this.ngOnInit());
    this.message = "Added successfully";
  }
  getDeleteNews(news: News) {
    this.newsDelete = news;
  }
  deleteNews() {
    this.newsService.deleteNews(this.newsDelete.id).subscribe((data)=>this.ngOnInit());
  }

  getLink(value) {
    this.url = value;
  }


}
