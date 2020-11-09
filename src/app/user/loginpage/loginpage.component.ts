import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../user-layout/auth.service';
import {TokenStorageService} from '../user-layout/token-storage.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
// import {environment} from '../../../environments/environment';
// firebase.initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  formLogin: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;
  roles: string;
  provider: any;
  user: any;
  infoFB: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged( user => {
      this.user = user;
    });
    this.formLogin = this.fb.group({
      username: ['', Validators.required, Validators.maxLength(15)],
      password: ['', Validators.required]
    });
  }
  loginpage(){
    console.log(this.formLogin.value);
    this.auth.attemptAuth(this.formLogin.value).subscribe(data => {
          if (data == null){
            this.errorMessage = 'account or password is wrong ';
            this.isLoginFailed = true;
          }else { console.log(data.authorities);
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
            this.tokenStorage.saveUserid(data.accountId);
            this.tokenStorage.saveImageUrl(data.imageUrl);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
            window.location.replace("/")
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
        window.location.replace("/")
      })
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // ...
    });
  }

}
