import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterService} from './register.service';
import {CustomerDTO} from './model/customerDTO';
import {Account} from './model/account';
declare var $: any;
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  account: Account;
  accountFindById: Account;
  customerDTO: CustomerDTO;
  formAccount: FormGroup;
  formCustomer: FormGroup;
  pass: string;
  check = true;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    $('.login-window').click(function(e){
      e.preventDefault();
      $('.overlay').removeClass('close').addClass('open');
    });
    $('.register-window').click(function(e){
      e.preventDefault();
      $('.overlayregister').removeClass('close').addClass('open');
    });
    $('.overlay-close').click(function(e) {
      e.preventDefault;
      $('.overlay').removeClass('open').addClass('close');
      $('.overlayregister').removeClass('open').addClass('close');

      setTimeout(function(){
        $('.overlay').removeClass('close');
        $('.overlayregister').removeClass('close');
      }, 500);
    });
    $('.signin').click(function(e) {
      e.preventDefault;
      $('.overlay').removeClass('close').addClass('open');
      $('.overlayregister').removeClass('open').addClass('close');

      setTimeout(function(){
        $('.overlay').removeClass('close');
        $('.overlayregister').removeClass('close');
      }, 500);
    });
    this.registerService.getAccountIdFirst().subscribe(data => {this.accountFindById = data; });

    this.formAccount = this.fb.group({
      username: [''],
      password: ['']
    });
    this.formCustomer = this.fb.group({
      name: [''],
      birthday: [''],
      gender: [''],
      cardid: [''],
      email: [''],
      address: [''],
      phone: [''],
      customerTypeId: ['1'],
      currentBonusPoint: ['0'],
      isactive: ['1'],
      code: ['']
    });

  }
  getForm(){
    this.account = this.formAccount.value;
    this.pass = bcrypt.hashSync(this.account.password, 10);
    this.account.password = this.pass;
    this.registerService.addAccount(this.formAccount.value).subscribe();
    this.customerDTO = this.formCustomer.value;
    // tslint:disable-next-line:radix
    this.customerDTO.accountId = this.accountFindById.id + 1;
    console.log(this.customerDTO);
    this.registerService.addCustomer(this.customerDTO).subscribe();
    this.check = false;
  }
}
