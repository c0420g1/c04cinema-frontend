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
  total = 0;
  id = 0;
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
      console.log(this.currentPage);
      console.log(this.totalPage);
      this.entityNumber = data.length;
      // this.totalPage = this.totalEntities/10;
      this.ticketList = data;
    });

  }
  search(): void {
    this.currentPage =1;
    this.ngOnInit();
  }

  getInfo(ticket: BookingTicketDTO): void {
    this.ticketNew = ticket;
    console.log(this.ticketNew)
    this.bookingTicketService.findTicketById(this.ticketNew.idBookingTicket).subscribe((data) => this.ticketUpdate = data);
    console.log(this.ticketUpdate);
  }

  confirm(id: number): void {
    this.confirmTicket = new ConfirmTicket(id, 1);
    console.log(this.confirmTicket);
    this.bookingTicketService.confirmTicket(this.confirmTicket).subscribe(() => this.ngOnInit());
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
}
