import { Location } from '../../model/location';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/service/booking.service';
import { BookingTicketDTO } from 'src/app/model/bookingTicketDTO';
import { BookingTimeDTO } from 'src/app/model/BookingTimeDTO';
import { Seat } from 'src/app/model/seat';
import { BookingTicket } from 'src/app/model/bookingTicket';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  locationId: number = 1;
  dateShow: string = '';
  listLocation: Location[] = [];
  listTheatreTime: any = [];
  listSeat: any = [];
  priceShow: number=0;
  listSeatType: any= [];
  listRes: BookingTicket[] = [];
  ticketQuantity=0;
  totalPrice=0;
  showId=0;
  // res: BookingTicket = new BookingTicket();
  constructor(private fb: FormBuilder, private bookService: BookingService, private datepipe: DatePipe) {
    const currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.dateShow = currentDate;
    this.bookService.getAllLocation().subscribe(r => this.listLocation = r);
    this.bookService.getBookingTime(this.locationId, '2020-11-28').subscribe((data: any) => {
      this.listTheatreTime = data; console.log(this.listTheatreTime); }
    );
    this.bookService.getSeatType().subscribe(r => this.listSeatType = r);
  }

  changeLocation(lId){

    this.bookService.getBookingTime(lId, this.dateShow).subscribe((data: any) => {
      this.listTheatreTime = data; }
    );
  }

  searchByDate(date){
    this.dateShow= date;
    this.bookService.getBookingTime(this.locationId, this.dateShow).subscribe((data: any) => {
      this.listTheatreTime = data; }
    );
  }

  bookshow(showId, showPrice) {
    this.showId= showId;
    this.bookService.getSeat(showId).subscribe(next => { this.listSeat = next; });
    $('.time-select__item').removeClass('active');
    $('#' + showId).addClass('active');
    this.priceShow= showPrice;
  }

  chooseSit(seatId, seatPrice) {
    if ($('#' + seatId).hasClass('sits_state_not')){
      return;
    }

    if ($('#' + seatId).hasClass('sits-state--your')){
      $('#' + seatId).removeClass('sits-state--your');
    }
    else{
      $('#' + seatId).addClass('sits-state--your');
      let bt = new BookingTicket();
      bt.showId= this.showId;
      bt.ticketTypeId=1;
      bt.accountId= 2;
      bt.seatId = seatId;
      bt.price= Number(seatPrice)+ this.priceShow;
      this.totalPrice += bt.price;
      this.listRes.push(bt);
    }
  }
  
  pricefn(priceSeat){
      return Number(priceSeat) + this.priceShow;
  }

  fstep1() {
    if(this.priceShow==0){
      return;
    }
      
    $("#step1").hide();
    $("#step2").show();
  }
  fstep2() {
    $("#step1").hide();
    $("#step2").hide();
    $("#payment").show();
    this.ticketQuantity= this.listRes.length;
  }

  fstep3(){
    this.hiddenAll();
    $("#reserve").show();
  }

  fstep4(){
    this.hiddenAll();
    $("#final").show();
  }
  hiddenAll(){
    $("#step0").hide();
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#payment").hide();
    $("#reserve").hide();
  }
  ngOnInit(): void {
    $.getScript('https://www.paypal.com/sdk/js?client-id=AbJeouGlJvVRkjJTAc6A19dol8QuE10JquuF_DjlCItut0bYICC8qfCzOhTNJpw1PhoAin9zZMPXHA9j&currency=USD');
    }
}
