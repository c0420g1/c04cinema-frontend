import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../user-layout/auth.service';
import {TokenStorageService} from '../user-layout/token-storage.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;
  roles: string;
  constructor(private fb: FormBuilder, private auth: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    $('.login-window').click(function(e){
      e.preventDefault();
      $('.overlay').removeClass('close').addClass('open');
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
    this.formLogin = this.fb.group({
      username: ['', Validators.required, Validators.maxLength(15)],
      password: ['', Validators.required]
    });
  }
  login(){
    console.log(this.formLogin.value);
    this.auth.attemptAuth(this.formLogin.value).subscribe(data => {
          if (data == null){
            this.errorMessage = 'account or password is wrong ';
            this.isLoginFailed = true;
          }else { console.log(data.authorities);
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
            this.tokenStorage.saveUserid(data.accountId)
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
            this.reloadPage();
          }
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        });
  }
  reloadPage() {
    window.location.reload();
  }
}
