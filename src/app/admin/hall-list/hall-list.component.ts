import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router, RouterOutlet} from '@angular/router';
import {Hall} from '../../model/Hall';
import {TheaterService} from '../theater/theater.service';
import {HallType} from '../../model/hallType';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Theatre} from '../../model/theatre';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css']
})
export class HallListComponent implements OnInit {
  // pagenation
  titleSearch ='';
  pageHall = 1;
  count = 0;
  pageSizeHall = 10;
  pageSizes = [3, 6, 9];
  theaterId: number;

  // addHall
  addFormHall: FormGroup;
  editFormHall: FormGroup;
  addFormSeat : FormGroup;
  deleteFormHall: Hall;

  constructor(private route: ActivatedRoute, private router: Router, private theaterService: TheaterService,
              private fbAddHall: FormBuilder, private fbEditHall: FormBuilder ) { }

  hall: Hall;
  halls: Hall[] = [];
  hallType: HallType[] = [];
  theaterName: Theatre;
   
  ngOnInit(): void {
    this.theaterId = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    this.theaterService.getTheaterName(this.theaterId).subscribe((r) => {this.theaterName = r; console.log(this.theaterName.name); });
    this.showListHall();
    this.addFormHall = this.fbAddHall.group({
      name: ['', Validators.required],
      hallTypeId: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      theatreId: [this.theaterId],
    })
    ;

    this.editFormHall = this.fbEditHall.group({
      id: [''],
      name: ['', Validators.required],
      hallTypeId: ['', [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      theatreId: [''],
    })
    ;

  }

  handlePageChange($event: number) {
    this.pageHall = $event;
    this.showListHall();
  }

  search(): void {
    this.pageHall =1;
    this.showListHall();
  }

  private showListHall() {
    if ('' == this.titleSearch){
      this.theaterService
        .getAllHall(this.pageHall,this.theaterId,this.pageSizeHall)
        .subscribe(next => (this.halls = next), error => (this.halls = []));
    } else {
      this.theaterService
          .getAllHallSearch(this.pageHall, this.theaterId, this.titleSearch, this.pageSizeHall)
          .subscribe(next => (this.halls = next), error => (this.halls = []));
    }
    this.theaterService
        .getAllHallType()
        .subscribe((data) => {this.hallType = data; });
  }

  addHall() {
    if (this.addFormHall.valid) {
      const {value} = this.addFormHall;
      this.theaterService.addHall(value)
          .subscribe(nextHall => {
            this.halls.unshift(nextHall);
            this.addFormHall.reset();
            this.ngOnInit();
          }, error => console.log(error));
    }

  }

  editHall(hall: Hall){
    this.editFormHall.setValue(hall);
  };

  editHallConfirm() {
    this.hall = this.editFormHall.value;
    if (this.editFormHall.valid) {
      const { value } = this.editFormHall;
      const data = {
        ...this.hall,
        ...value
      };
      this.theaterService.editHall(data).subscribe(
          next => {
            this.halls[this.halls.findIndex(e => e.id === this.hall.id)] = this.hall;
          },
          error => console.log(error)
      );
    };
    this.showListHall();
  };

  formDeleteHall(hall: Hall){
    this.deleteFormHall = hall;
  }

  deleteHall(id: number) {
    const hall = this.halls[id];
    this.theaterService.deleteHall(hall.id).subscribe(() => {
      this.halls = this.halls.filter(t => t.id !== hall.id);
    });
    this.showListHall();
  }

  resetForm(){
    this.addFormHall.reset();
  }

  goToSeat(e, hallId){
    e.preventDefault();
    const url: string = '/admin/theater/hall/' + this.theaterName.id + '/seat/' + hallId;
    this.router.navigate([url]).then( () => {
        window.location.reload();
    });
  }
}
