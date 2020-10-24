import { Component, OnInit } from '@angular/core';
import {PointService} from '../service/point.service';
import {Point} from '../model/Point';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-history-point',
  templateUrl: './history-point.component.html',
  styleUrls: ['./history-point.component.css']
})
export class HistoryPointComponent implements OnInit {

  pointS: Point[] = [];
  pointForm: FormGroup;
  check = true;


  constructor(private pointService: PointService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pointForm = this.fb.group({
      contractStarDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
      contractEndDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
      gender: new FormControl('', Validators.required)
    })
  }


  get f(){
    return this.pointForm.controls;
  }

  end: string;
  star: string;
  error = false;
  Plus: string;


  compareTwoDates() {
    let dateEnd: string[];
    let dateStar: string[];
    dateEnd = this.end.split('-');
    dateStar = this.star.split('-');
    let dateNumberEnd = (parseInt(dateEnd[0]) * 12 * 365) + (parseInt(dateEnd[1]) * 30) + (parseInt(dateEnd[2])) ;
    let dateNumberStar = (parseInt(dateStar[0]) * 12 * 365) + (parseInt(dateStar[1]) * 30) + (parseInt(dateStar[2])) ;
    if (dateNumberEnd <= dateNumberStar) {
      this.error = true;
    } else
      this.error = false;
  }

  searchPoint() {

    if (this.Plus == 'true') {
      this.pointService.getTickerPlusById(1, 1, this.star, this.end).subscribe(next => (this.pointS = next,console.log(this.pointS)), error => (this.pointS = []))
    }
    if (this.Plus == 'false') {
      this.pointService.getTickerUseById(34, 1, this.star, this.end).subscribe(next => (this.pointS = next), error => (this.pointS = []))
    }
  }

  changeGender(e) {
     this.Plus = e.target.value;
  }
}
