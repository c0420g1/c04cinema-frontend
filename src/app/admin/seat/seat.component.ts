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

  constructor(private route: ActivatedRoute, private theaterService: TheaterService, private fbAddSeat: FormBuilder, private fbEditSeat: FormBuilder) { 

  }

  hallIdReceive: number;
  hall: Hall;
  seat: Seat;
  seats: Seat[] = [];
  seatType: SeatType[] = [];
  seatNumber : number = 0;
  addFormSeat: FormGroup;
  editFormSeat: FormGroup;


  ngOnInit(): void {
    this.hallIdReceive = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    this.showListSeats(this.hallIdReceive);

    this.editFormSeat = this.fbEditSeat.group({
      id: [''],
      name: [''],
      hallId: [''],
      seatTypeId: [''],
    })
    ;

    this.addFormSeat = this.fbAddSeat.group({
      name: [''],
      hallId: [this.hallIdReceive],
      seatTypeId: [1],
    });

  }

  showListSeats(hallId){
    this.theaterService.getAllSeatType().subscribe((data) => {this.seatType = data; });
    this.theaterService.getAllSeat(hallId).subscribe((data) => {this.seats = data; });
  }

  addSeatToHall(){
    this.theaterService.addSeat(this.hallIdReceive,100).subscribe((data) => {this.seats = data; });
    this.showListSeats(this.hallIdReceive);
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

  checkSeatContain(){
    if (this.seats.length == 0){
      return true
    };
  }

  setMsg(seatnumber){
    this.seatNumber = Number.parseInt(seatnumber);
  }
}
