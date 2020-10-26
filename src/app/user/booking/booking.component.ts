import {Location} from '../../model/location';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  listLocation: Location[] = [];
  constructor(private fb: FormBuilder, private bookService: BookingService) {
    this.bookService.getAll().subscribe(res => {
        this.listLocation = res;
    });
   }

  ngOnInit(): void {
  }

}
