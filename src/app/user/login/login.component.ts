import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../user-layout/auth.service';
import {TokenStorageService} from '../user-layout/token-storage.service';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
firebase.initializeApp(environment.firebaseConfig);
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  provider: any;
  user: any;
  formLogin: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;
  roles: string;
  infoFB: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged( user => {
      this.user = user;
    });
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
          console.log(data.imageUrl);
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
            this.tokenStorage.saveUserid(data.accountId);
            this.tokenStorage.saveImageUrl(data.imageUrl);
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
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.provider = provider;
    console.log(this.provider);
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.user = result.user;
      this.infoFB = {
        name: this.user.displayName,
        email: this.user.email
      }
      console.log(this.user.displayName);
      console.log(this.user.email);
      console.log(this.infoFB);
      this.auth.loginFB(this.infoFB).subscribe(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveUserid(data.accountId);
        this.tokenStorage.saveImageUrl(data.imageUrl);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      })
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // ...
    });
  }
  reloadPage() {
    window.location.reload();
  }
}
