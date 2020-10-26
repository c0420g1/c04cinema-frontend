import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {TheaterService} from '../theater/theater.service';
import {Seat} from '../../model/seat';
import {SeatType} from '../../model/seatType';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private theaterService: TheaterService) { }

  hallId: number;
  seats: Seat[] = [];
  seatType: SeatType[] = [];

  ngOnInit(): void {
    this.hallId = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    this.theaterService.getAllSeat().subscribe((data) => {this.seats = data; });
    this.theaterService.getAllSeatType().subscribe((data) => {this.seatType = data; });
  }

}
