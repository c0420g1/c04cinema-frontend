import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegisterService} from './register.service';
import {Customer} from './model/customer';
declare var $: any;
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  accounts: Account[] = [];
  customer: Customer;
  formAccount: FormGroup;
  formCustomer: FormGroup;

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
    $('#submit').click(function(e) {
      e.preventDefault;
      $('.overlay').removeClass('open').addClass('close');
      $('.overlayregister').removeClass('open').addClass('close');

      setTimeout(function(){
        $('.overlay').removeClass('close');
        $('.overlayregister').removeClass('close');
      }, 500);
    });
    this.registerService.getAllAccount().subscribe(data => this.accounts = data);
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
      phone: ['']
    });

  }
  getForm(){
    this.customer = this.formCustomer.value;
    console.log(this.formAccount.value);
    console.log(this.formCustomer.value);
    console.log(this.accounts[this.accounts.length - 1].id);
    // tslint:disable-next-line:radix
    this.customer.accountId = parseInt(this.accounts[this.accounts.length - 1].id);
    console.log(this.customer);
  }
}
