import { Location } from '../../model/location';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingService } from 'src/app/service/booking.service';
import { BookingTicketDTO } from 'src/app/model/bookingTicketDTO';
import { BookingTimeDTO } from 'src/app/model/BookingTimeDTO';
import { Seat } from 'src/app/model/seat';
import { BookingTicket } from 'src/app/model/bookingTicket';

import { DatePipe } from '@angular/common';
import { Booking } from 'src/app/model/Booking';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../movie/movie.service';
import { Ticket } from 'src/app/model/Ticket';
import { Movie } from 'src/app/model/Movie';
import { GlobalConstants } from 'src/app/model/GlobalConstants';
declare var testq: any;
declare var $: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
  export class BookingComponent implements OnInit {
   //#region avaiable 
   title = 'paypal';
   @ViewChild('paypalRef', {static: true}) private  paypalRef: ElementRef;
 

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
  movieName: string;
  seatId: number;
  showTime: string;
  hallName: string;
  theatreName: string;
  quantity: number=0;
  selectedObject : Location;
  listCombo: any= [];
  totalCombo: number= 0;
  totalFinal: number=0;
  listTicket: Ticket[]= [];
  seat: Seat= new Seat();
  movieBestChoice: Movie[] = [];
  listTicketType: any=[];
  //#endregion

  //#region build in
  constructor(private fb: FormBuilder, private bookService: BookingService, private datepipe: DatePipe, private activatedRoute: ActivatedRoute, private movieService: MovieService) {   
  }

  @Input() name: string ='user';
  ngOnInit(): void {
    this.movieService.getBestChoiceFilm().subscribe(
      (data) => {
          this.movieBestChoice = data;
      },
      error => console.log(error)
  );

  this.bookService.bookingGetTicketType().subscribe(r=> this.listTicketType= r);

    $.getScript('assets/js/custom.js');

    paypal.Buttons({
      // Set up the transaction
      createOrder: (data, actions) => {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: this.totalFinal
                  }
              }]
          });
      },

      // Finalize the transaction
      onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              // Show a success message to the buyer
              $("#btPurchase").removeClass("dg");
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
          });
      }


  }).render('#paypal-button-container');



    
    
    const currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.dateShow = currentDate;

    this.activatedRoute.paramMap.subscribe(
      (param: ParamMap) => {
          this.movieId = (Number)(param.get('id'));
          this.movieService.getMovieById(this.movieId.toString()).subscribe(r=>{
            this.movieName= r[0].name;
          });
      });
    this.bookService.getAllLocation().subscribe(r => {this.listLocation = r; console.log(this.listLocation)});
    this.bookService.getBookingTime(this.locationId, this.movieId, this.dateShow).subscribe((data: any) => {
      this.listTheatreTime = data; console.log(this.listTheatreTime); }
    );
    this.bookService.getSeatType().subscribe(r => this.listSeatType = r);
    this.bookService.bookingGetCombo().subscribe(c => this.listCombo = c );
    }

  //#endregion
 
  //#region event & service
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

      let tic= new Ticket();
      this.bookService.bookingGetSeatName(this.seatId).subscribe(r=>{
          this.seat = r;
          tic.code="ABCDE"+this.seat.name;
          tic.price= seatPrice;
          tic.seatName= this.seat.name;
          this.listTicket.push(tic);
      });
    }
  }
  
  getProCode(val){
     this.proCode= val; 
  }

  useProCode(){
    this.bookService.bookingUseBonus(GlobalConstants.accId,this.proCode).subscribe(r=> {
      if(Number(r)>0){
        this.totalFinal= this.totalFinal - Number(r);
        alert("Thank you! Your discount is: " + r);
      }
      else{
        alert("You can not use this promotion code");
      }
      
    })
  }
  //#endregion
  
  //#region show hide
  
  chooseFilm(movieId){
    $('.cinema-rating').removeClass('choose');
    $('#' + movieId).addClass('choose');
    this.movieId= movieId;
    this.bookService.getBookingTime(this.locationId, this.movieId, this.dateShow).subscribe((data: any) => {
      this.listTheatreTime = data; console.log(this.listTheatreTime); }
    );
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
    $('#more').hide();
    $("#step2").show();
  }
  fstep2() {
    this.step='s3';
    this.isActive= false;
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#stCombo").show();
  }

  fstep22() {
    this.step='s4';
    this.isActive= false;
    $("#step1").hide();
    $("#step2").hide();
    $("#stCombo").hide();
    $("#payment").show();
    this.totalFinal= this.totalCombo + this.totalPrice;
    this.ticketQuantity= this.listRes.length;
  }

  fs33(){
    this.step='s4';
    this.isActive= true;
    $("#stCombo").hide();
    $("#step1").hide();
    $("#step2").hide();
    $("#payment").hide();
    $("#step3").show();
  }

  fstep3(){
    this.step='s4';
    this.isActive= true;
    $("#stCombo").hide();
    $("#step1").hide();
    $("#step2").hide();
    $("#payment").hide();
    $("#step3").show();
    this.ticketQuantity= this.listRes.length;
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

  stepCombo(){
    this.step='s2';
    this.hiddenAll();
    $("#step0").show();
    $("#step2").show();
  }

  fstep4(){
    this.hiddenAll();
    this.listRes.forEach(e=> {
    e.contactEmail="hcronin0@mtv.com";
    e.contactPhone= "5859577512";
    e.paymentId= 2;
    e.promotionId= 16;
    e.status= 0;
    this.bookService.booking(e).subscribe();
    });
    this.bookService.bookingUpdateBonus(this.accountId, this.bonusPoint).subscribe();
    $("#final").show();

  }

  pstep2(){
    this.step='s1';
    this.hiddenAll();
    $("#step0").show();
    $("#step1").show();
  }

  pPurchase(){
    this.step='s3';
    this.hiddenAll();
    $("#step0").show();
    $("#stCombo").show();
  }

  pReserve(){
    this.step='s3';
    this.hiddenAll();
    $("#step0").show();
    $("#stCombo").show();
  }
  hiddenAll(){
    $("#step0").hide();
    $("#step1").hide();
    $("#step2").hide();
    $("#step3").hide();
    $("#stCombo").hide();
    $("#payment").hide();
    $("#reserve").hide();
  }

  plus(id, price){
    let q= $("#"+id+'a').val();
    let res= Number(q) + 1;
    $("#"+id+'a').val(res);
    let tot= res * Number(price);
    $("#"+id+'q').text('$'+tot);
    this.totalCombo+= Number(price);
 }
 minus(id, price){
  let q= $("#"+id+'a').val();
   if(Number(q)>0){
    let res= Number(q) - 1;
    $("#"+id+'a').val(res);
    let tot= res * Number(price);
    $("#"+id+'q').text('$'+tot);
    this.totalCombo-= Number(price);
   }
     
 }

 quan(val){
    this.quantity= val;
 }
  
 print(){
  window.print();
 }

    //#endregion
}