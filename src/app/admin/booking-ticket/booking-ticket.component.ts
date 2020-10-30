import { Component, OnInit } from '@angular/core';
import {BookingTicketDTO} from '../../model/bookingTicketDTO';
import {BookingTicket} from '../../model/bookingTicket';
import {Router} from '@angular/router';
import {ConfirmTicket} from '../../model/confirmTicket';
import {BookingTicketService} from '../../service/booking-ticket.service';

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.css']
})
export class BookingTicketComponent implements OnInit {
  variableFind = '';
  ticketList: BookingTicketDTO[] = [];
  message: string;
  currentPage = 1;
  totalEntities: number;
  totalPage: number;
  ticketNew: BookingTicketDTO = new BookingTicketDTO();
  entityNumber: number;
  jumpPage: number;
  numberTicket: number = 0;
  total = 0;
  id = 0;
  quantity = 0;
  check: boolean = true;
  seatList: BookingTicketDTO[] = [];
  private confirmTicket: ConfirmTicket;
  ticketUpdate = new BookingTicket();
  constructor(private bookingTicketService: BookingTicketService,
              private route: Router) { }

  ngOnInit(): void {

    this.bookingTicketService.getListTicket(this.variableFind).subscribe((data) => {
      this.totalEntities = data.length;
      this.totalPage = this.totalEntities/10;
    });

    this.bookingTicketService.getAllTicket(this.currentPage, this.variableFind).subscribe((data) => {
      if (data.length === 0){
        this.message = 'Không tìm thấy đặt vé nào!';
      } else {
        this.message = '';
      }
      this.entityNumber = data.length;
      this.ticketList = data;
    });

  }
  search(): void {
    this.currentPage =1;
    this.ngOnInit();
  }

  getInfo(ticket: BookingTicketDTO): void {
    this.bookingTicketService.findTicketById(ticket.idBookingTicket).subscribe((data) => {
      this.ticketUpdate = data;

      this.bookingTicketService.getQuantity(data[0].showId,data[0].accountId)
          .subscribe((dataSeat) => {
            this.seatList = dataSeat;
            this.quantity = this.seatList.length;
            console.log(this.quantity);
            this.total = this.quantity * data[0].price;
          });
    });
    this.ticketNew = ticket;
  }

  confirm(id: number): void {
    this.confirmTicket = new ConfirmTicket(id, 1);
    if (this.numberTicket == null){
      this.bookingTicketService.confirmTicket(this.confirmTicket,0).subscribe(() => this.ngOnInit());
    } else {
      this.bookingTicketService.confirmTicket(this.confirmTicket,this.numberTicket*500).subscribe(() => this.ngOnInit());
    }

    this.check = false;
    document.getElementById('formEdit').click();
  }
  prePage(): void {
    if (this.currentPage >= 2 ){
      this.currentPage--;
      this.jumpPage = this.currentPage;
    }
    this.ngOnInit();
  }

  nexPage(): void {
    if (this.currentPage < this.totalEntities / 10) {
      this.currentPage++;
      this.jumpPage = this.currentPage;
    }
    console.log(this.currentPage)
    this.ngOnInit();
  }

  goToPage() {
    this.currentPage = this.jumpPage;
    this.ngOnInit();
  }

  checkPoint() {
    if (this.ticketNew.pointCustomer >= this.numberTicket*500){
      this.total = (this.quantity - this.numberTicket) * this.ticketNew.priceTicket;
      this.check = true;
    } else{
      this.check = false;
    }
  }
}
