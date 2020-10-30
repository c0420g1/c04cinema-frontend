import { Location } from '../../model/location';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/service/booking.service';
import { BookingTicketDTO } from 'src/app/model/bookingTicketDTO';
import { BookingTimeDTO } from 'src/app/model/BookingTimeDTO';
import { Seat } from 'src/app/model/seat';
import { BookingTicket } from 'src/app/model/bookingTicket';
import { DatePipe } from '@angular/common';
import { Booking } from 'src/app/model/Booking';
import { ActivatedRoute } from '@angular/router';
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
  listRes: Booking[] = [];
  ticketQuantity=0;
  totalPrice=0;
  showId=0;
  bonusPoint=0;
  proCode: string ='';
  isActive: boolean= false;
  step: string= 's1';
  accountId: number=1;
  movieId: number= 94;
  seatId: number;
  showTime: string;
  hallName: string;
  theatreName: string;
  // res: BookingTicket = new BookingTicket();
  constructor(private fb: FormBuilder, private bookService: BookingService, private datepipe: DatePipe, private activatedRoute: ActivatedRoute) {
    
  }

  changeLocation(lId){

    this.bookService.getBookingTime(lId, this.movieId, this.dateShow).subscribe((data: any) => {
      this.listTheatreTime = data; }
    );
  }

  searchByDate(date){
    this.dateShow= date;
    this.bookService.getBookingTime(this.locationId, this.movieId, this.dateShow).subscribe((data: any) => {
      this.listTheatreTime = data; }
    );
  }

  bookshow(showId, showPrice, showTime, hallName, theatreName) {
    this.showId= showId;
    this.bookService.getSeat(showId).subscribe(next => { this.listSeat = next; });
    $('.time-select__item').removeClass('active');
    $('#' + showId).addClass('active');
    this.priceShow= showPrice;
    this.showTime= showTime;
    this.hallName= hallName;
    this.theatreName= theatreName;
  }

  chooseSit(seatId, seatPrice, bonus_seat_point) {
    
    if ($('#' + seatId).hasClass('sits_state_not')){
      return;
    }

    if ($('#' + seatId).hasClass('sits-state--your')){
      $('#' + seatId).removeClass('sits-state--your');
    }
    else{
      $('#' + seatId).addClass('sits-state--your');
      this.seatId= seatId;
      this.bonusPoint += bonus_seat_point;
      let bt = new Booking();
      bt.showId= this.showId;
      bt.ticketTypeId=1;
      bt.accountId= this.accountId;
      bt.seatId = seatId;
      bt.price= Number(seatPrice)+ this.priceShow;
      this.totalPrice += bt.price;
      bt.bookingDate = this.datepipe.transform(new Date(), 'yyyy-MM-ddThh:mm');
      this.listRes.push(bt);
    }
  }
  
  getProCode(val){
     this.proCode= val; 
  }

  useProCode(){
    this.bookService.bookingUseBonus(1,this.proCode).subscribe(r=> {
      if(Number(r)>0){
        this.totalPrice= this.totalPrice - Number(r);
        alert("Thank you! Your discount is: " + r);
      }
      else{
        alert("You can not use this promotion code");
      }
      
    })
  }

  pricefn(priceSeat){
      return Number(priceSeat) + this.priceShow;
  }

  fstep1() {
    if(this.priceShow==0){
      return;
    }
    this.step='s2';
    $("#step1").hide();
    $("#step2").show();
  }
  fstep2() {
    this.step='s3';
    this.isActive= false;
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#payment").show();
    this.ticketQuantity= this.listRes.length;
  }

  fstep22() {
    this.step='s3';
    this.isActive= true;
    $("#step1").hide();
    $("#step2").hide();
    $("#payment").hide();
    $("#step3").show();
    this.ticketQuantity= this.listRes.length;
  }

  fstep3(){
    this.hiddenAll();
    this.listRes.forEach(e=> {
      e.contactEmail="hcronin0@mtv.com";
      e.contactPhone= "5859577512";
      e.paymentId= 2;
      e.promotionId= 16;
      this.bookService.booking(e).subscribe();
      });
    $("#reserve").show();
  }

  fstep4(){
    this.hiddenAll();
    // this.listRes.forEach(e=> {
    // e.contactEmail="hcronin0@mtv.com";
    // e.contactPhone= "5859577512";
    // e.paymentId= 2;
    // e.promotionId= 16;
    // e.status= 0;
    // this.bookService.booking(e).subscribe();
    // });
    // this.bookService.bookingUpdateBonus(1, this.bonusPoint).subscribe();
    $("#final").show();

  }

  pstep2(){
    this.step='s1';
    this.hiddenAll();
    $("#step0").show();
    $("#step1").show();
  }

  pPurchase(){
    this.step='s2';
    this.hiddenAll();
    $("#step0").show();
    $("#step2").show();
  }

  pReserve(){
    this.step='s2';
    this.hiddenAll();
    $("#step0").show();
    $("#step2").show();
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
    const currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.dateShow = currentDate;


    this.bookService.getAllLocation().subscribe(r => this.listLocation = r);
    this.bookService.getBookingTime(this.locationId, this.movieId, '2020-11-28').subscribe((data: any) => {
      this.listTheatreTime = data; console.log(this.listTheatreTime); }
    );
    this.bookService.getSeatType().subscribe(r => this.listSeatType = r);

    }

    getSeatName(){
      let seatName: string='A1';
      // this.bookService.bookingGetSeatName(this.seatId).subscribe(r=>{
      //       seatName= r;
      // });
      return seatName;
    }
}
