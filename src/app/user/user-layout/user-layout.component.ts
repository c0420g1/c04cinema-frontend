import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;
import {Router} from '@angular/router';
import { RegisterService } from './register.service';
import { CustomerDTO } from './model/customerDTO';
import { TokenStorageService } from './token-storage.service';
import { GlobalConstants } from 'src/app/model/GlobalConstants';
import { NewsService } from 'src/app/admin/news/news.service';
import { NewService } from '../news/new.service';
import { News } from 'src/app/model/News';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  info: any;
  customerDTO: CustomerDTO;
  listSiteMap: News[]=[];
  constructor(private fb: FormBuilder, private registerService: RegisterService, private token: TokenStorageService, private newsService: NewService,
              private router: Router) { }

  ngOnInit(): void {
    this.newsService.getAllSiteMap().subscribe(r=> this.listSiteMap= r);

    $('.auth__show').click(function (e){
      e.preventDefault();
      $('.auth__function').toggleClass('open-function')
    });
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
      authorities: this.token.getAuthorities(),
      accountId: this.token.getUserid()
    };
     GlobalConstants.accId=Number(this.token.getUserid());
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
  toggle(){
    var menu = document.querySelector('.auth__function');
    menu.classList.toggle('open-function');
  }

  goToSetting(val){
      this.router.navigateByUrl("/customer/"+val )
  .then(() => {
    window.location.reload();
  });
  }
}
