import { Component, OnInit } from '@angular/core';
import {CustomerDTO} from '../user-layout/model/customerDTO';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../user-layout/register.service';
import {TokenStorageService} from '../user-layout/token-storage.service';
import {Router} from '@angular/router';
import {Account} from '../customer/model/Account';
declare var $: any;
import * as bcrypt from 'bcryptjs';
import {RoleAccount} from '../user-layout/model/role-account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account: Account;
  accountFindById: Account;
  customerDTO: CustomerDTO;
  formAccount: FormGroup;
  formCustomer: FormGroup;
  pass: string;
  role: RoleAccount = new RoleAccount();
  constructor(private fb: FormBuilder, private registerService: RegisterService, private token: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
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
    this.registerService.getAccountIdFirst().subscribe(data => {this.accountFindById = data; });
    this.registerService.getCustomerIdFirst().subscribe(data => {console.log(data); });
    this.formAccount = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formCustomer = this.fb.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      cardid: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      customerTypeId: ['1'],
      currentBonusPoint: ['0'],
      isactive: ['1'],
      code: [''],
      imageUrl: ['https://www.freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder.png']
    });
  }
  getForm(){
    this.account = this.formAccount.value;
    this.pass = bcrypt.hashSync(this.account.password, 10);
    console.log(this.pass);
    this.account.password = this.pass;
    this.registerService.addAccount(this.formAccount.value).subscribe();
    this.customerDTO = this.formCustomer.value;
    // tslint:disable-next-line:radix
    this.customerDTO.accountId = this.accountFindById.id + 1;
    console.log(this.customerDTO);
    this.registerService.addCustomer(this.customerDTO).subscribe();
    this.role.accountId =  this.accountFindById.id + 1;
    this.role.roleId = 1;
    console.log(this.role);
    this.registerService.addRole(this.role).subscribe();
  }

}
