import { Component, OnInit } from '@angular/core';
import {BannerService} from '../../service/banner.service';
import {Banner} from '../../model/Banner';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  bannerList: Banner[] = [];
  banner = new Banner();
  editFormBanner: FormGroup;
  addFormBanner: FormGroup;
  constructor(private bannerService: BannerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bannerService.getAllBanner().subscribe((data) => {
       this.bannerList = data;
    });

    this.addFormBanner = this.fb.group({
      id: [''],
      title: [''],
      url: [''],
      description: ['']
    })

    this.editFormBanner = this.fb.group({
      id: [''],
      title: [''],
      url: [''],
      description: ['']
    })
  }

  getBanner(banner: Banner) {

  }

  addNewBanner() {
    this.banner = this.addFormBanner.value;
    this.bannerService.addNewBanner(this.banner).subscribe(() =>this.ngOnInit());
  }
}
