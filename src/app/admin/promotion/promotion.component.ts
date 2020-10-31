import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Promotion} from '../../model/promotion';
import {PromotionService} from '../../service/promotion.service';
import {ShowService} from '../../user/movie/show.service';
import {Show} from '../../model/show';
import {Movie} from '../../model/Movie';
import {Theatre} from '../../model/theatre';
import {Customer} from '../../user/customer/model/Customer';
import {MovieService} from '../movie/movie.service';
import {TheaterService} from '../theater/theater.service';
import {CustomerService} from '../../user/customer/service/customer.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotionList: Promotion[] = [];
  showList: Show[] = [];
  movieList: Movie[] = [];
  theatreList: Theatre[] = [];
  customerList: Customer[] = [];
  promotion = new Promotion();
  updatePromotion = new Promotion();
  editFormPromotion: FormGroup;
  addFormPromotion: FormGroup;
  picUrl: string;
  check = false;
  constructor(private promotionService: PromotionService,
              private showService: ShowService,
              private movieService: MovieService,
              private theatreService: TheaterService,
              private customerService: CustomerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.promotionService.getAllPromotion().subscribe((data) => {
      this.promotionList = data;
    });

    this.addFormPromotion = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      discount: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      showId: ['', Validators.required],
      moveId: ['', Validators.required],
      theatreId: ['', Validators.required],
      customerId: ['', Validators.required],
      staffId: ['', Validators.required],
      price: ['', Validators.required],
      picture: ['', Validators.required]
    })

    this.editFormPromotion = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      discount: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      showId: ['', Validators.required],
      moveId: ['', Validators.required],
      theatreId: ['', Validators.required],
      customerId: ['', Validators.required],
      staffId: ['', Validators.required],
      price: ['', Validators.required],
      picture: ['', Validators.required]
    })
  }

  getPromotion(promotion: Promotion) {
    this.picUrl = promotion.picture;
    if (this.picUrl == null){
      this.check = true;
    }
    this.editFormPromotion.patchValue(promotion);
    this.showService.getAllShow().subscribe((data) => this.showList = data);
  }

  addNewPromotion() {
    this.promotion = this.addFormPromotion.value;
    this.promotionService.addNewPromotion(this.promotion).subscribe(() => this.ngOnInit());
  }

  EditPromotion() {
    this.updatePromotion = this.editFormPromotion.value;
    console.log(this.updatePromotion);
    console.log(this.updatePromotion.showId);
    console.log(this.updatePromotion.picture);
    this.promotionService.updatePromotion(this.updatePromotion.id, this.updatePromotion).subscribe(() => {
      this.picUrl = null;
      this.ngOnInit()
    });
     document.getElementById("editPromotion").click();
  }

  deletePromotion(promotion: Promotion) {

  }

  getLink(value) {
    this.picUrl = value;
  }
}
