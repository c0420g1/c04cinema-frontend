import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {Hall} from '../../model/Hall';
import {TheaterService} from '../theater/theater.service';
import {HallType} from '../../model/hallType';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.css']
})
export class HallListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private theaterService: TheaterService) { }

  theaterId: number;
  halls: Hall[] = [];
  hallType: HallType[] = [];

  ngOnInit(): void {
    this.theaterId = Number.parseInt(this.route.snapshot.paramMap.get("id"));
    this.theaterService.getAllHall().subscribe((data) => {this.halls = data; });
    this.theaterService.getAllHallType().subscribe((data) => {this.hallType = data; });
  }

}
