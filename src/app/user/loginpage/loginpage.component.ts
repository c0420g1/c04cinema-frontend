import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../user-layout/auth.service';
import {TokenStorageService} from '../user-layout/token-storage.service';
import {Router} from '@angular/router';

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
  constructor(private fb: FormBuilder, private auth: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
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
            this.tokenStorage.saveUserid(data.accountId)
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

}
