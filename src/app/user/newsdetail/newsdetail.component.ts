import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.css']
})
export class NewsdetailComponent implements OnInit {
  items: number[]= [1,2,3,4,5,6,7,8,8,9,2,2,22,3,3,3];
  constructor() { }

  ngOnInit(): void {
  }

}
