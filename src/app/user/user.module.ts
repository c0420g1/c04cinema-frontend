import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CustomerComponent } from './customer/customer.component';
import { InformationComponent } from './customer/information/information.component';
import {HistoryPointComponent} from './customer/history-point/history-point.component';
import {TickerPutComponent} from './customer/ticker-put/ticker-put.component';
import {TickerCancelComponent} from './customer/ticker-cancel/ticker-cancel.component';


@NgModule({
  declarations: [UserLayoutComponent, HomeComponent, MovieComponent,
    PromotionComponent, CustomerComponent, InformationComponent, HistoryPointComponent, TickerPutComponent, TickerCancelComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
