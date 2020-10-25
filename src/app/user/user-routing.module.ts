import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLayoutComponent} from './user-layout/user-layout.component';
import {HomeComponent} from './home/home.component';
import {MovieComponent} from './movie/movie.component';
import {PromotionComponent} from './promotion/promotion.component';
import {CustomerComponent} from './customer/customer.component';
import {InformationComponent} from './customer/information/information.component';
import {HistoryPointComponent} from './customer/history-point/history-point.component';
import {TickerPutComponent} from './customer/ticker-put/ticker-put.component';
import {TickerCancelComponent} from './customer/ticker-cancel/ticker-cancel.component';


const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'movie',
        component: MovieComponent
      },
      {
        path: 'promotion',
        component: PromotionComponent
      },
      {
        path: 'customer',
        component: CustomerComponent,
        children: [
          {
            path: 'information/:id',
            component: InformationComponent
          },
          {
            path: 'history-point/:id',
            component: HistoryPointComponent
          },
          {
            path: 'ticker-put/:id',
            component: TickerPutComponent
          },
          {
            path: 'ticker-cancel/:id',
            component: TickerCancelComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
