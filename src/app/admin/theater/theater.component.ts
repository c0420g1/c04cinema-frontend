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
  theaters: Theatre[] = [];
  locations: Location[] = [];

  constructor(private theaterService: TheaterService) { }

  ngOnInit(): void {
    this.theaterService.getAllTheater().subscribe((data) => {this.theaters = data; });
    this.theaterService.getAllLocation().subscribe((data) => {this.locations = data; });
  }

}
