import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {CustomerDTO} from './model/customerDTO';
declare var $: any;
import * as bcrypt from 'bcryptjs';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {Router} from '@angular/router';
import {Account} from '../customer/model/Account';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  info: any;
  customerDTO: CustomerDTO;
  constructor(private fb: FormBuilder, private registerService: RegisterService, private token: TokenStorageService,
              private router: Router) { }

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
    this.registerService.getCustomerIdFirst().subscribe(data => {console.log(data);  });
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }
  login() {
    this.router.navigateByUrl('/');
    console.log(this.info)
  }
   register(){
   this.router.navigateByUrl('/register');
  }
}
