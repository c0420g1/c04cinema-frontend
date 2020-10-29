import { Component, OnInit } from '@angular/core';
import {TheaterService} from './theater.service';
import {Theatre} from '../../model/theatre';
import {Location} from '../../model/location';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {
  // pagenation
  title = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];
  // ----------
  theaters: Theatre[] = [];
  locations: Location[] = [];

  constructor(private theaterService: TheaterService) { }

  ngOnInit(): void {
    this.showListTheater();
  }

  private showListTheater() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this.theaterService
        .getAllTheater(params)
        .subscribe(next => (this.theaters = next), error => (this.theaters = []));
    this.theaterService.getAllLocation().subscribe((data) => {this.locations = data; });
  }

  private getRequestParams(page: number, pageSize: number) {
    const params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange($event: number) {
    this.page = $event;
    this.showListTheater();
  }
}
