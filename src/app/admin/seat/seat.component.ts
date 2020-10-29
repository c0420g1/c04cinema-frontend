import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TheaterService} from '../theater/theater.service';
import {Seat} from '../../model/seat';
import {SeatType} from '../../model/seatType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Hall} from '../../model/Hall';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private theaterService: TheaterService, private fbAddSeat: FormBuilder, private fbEditSeat: FormBuilder) { }

  hallIdReceive: number;
  hall: Hall;
  seat: Seat;
  seats: Seat[] = [];
  seatType: SeatType[] = [];
  addFormSeat: FormGroup;
  editFormSeat: FormGroup;


  ngOnInit(): void {
    this.hallIdReceive = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    this.theaterService.getHall(this.hallIdReceive).subscribe((data) => {this.hall = data; });
    this.showListSeats(this.hallIdReceive);
    this.addFormSeat = this.fbAddSeat.group({
      name: [''],
      theatreId: [this.hall.theatreId],
      hallId: [this.hall.id],
      seatTypeId: [1]
    })
    ;

    this.editFormSeat = this.fbEditSeat.group({
      name: ['' , [Validators.required, Validators.pattern(/^(A|B|C|D|E|F|G|H)([0-9]{1,2})$/)]],
      theatreId: [this.hall.theatreId],
      hallId: [this.hall.id],
      seatTypeId: ['' , Validators.required]
    })
    ;

  }

  showListSeats(hallId){
    this.theaterService.getAllSeatType().subscribe((data) => {this.seatType = data; });
    this.theaterService.getAllSeat(hallId).subscribe((data) => {this.seats = data; });
  }

  addSeatToHall(seatNumber,hallId){
    for (let i = 0; i <= seatNumber ; i ++){
      const {value} = this.addFormSeat;
      this.theaterService.addSeat(value)
          .subscribe(nextSeat => {
            this.seats.unshift(nextSeat);
          }, error => console.log(error));
    }
    this.showListSeats(hallId);
  }

  editSeat(seat: Seat){
    this.editFormSeat.setValue(seat);
  }

  editSeatConfirm() {
    this.seat = this.editFormSeat.value;
    if (this.editFormSeat.valid) {
      const { value } = this.editFormSeat;
      const data = {
        ...this.seat,
        ...value
      };
      this.theaterService.editSeat(data).subscribe(
          next => {
            this.seats[this.seats.findIndex(e => e.id === this.seat.id)] = this.seat;
          },
          error => console.log(error)
      );
    }
  }

}
