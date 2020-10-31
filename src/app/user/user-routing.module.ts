import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLayoutComponent} from './user-layout/user-layout.component';
import {HomeComponent} from './home/home.component';
import {PromotionComponent} from './promotion/promotion.component';
import {CustomerComponent} from './customer/customer.component';
import {InformationComponent} from './customer/information/information.component';
import {HistoryPointComponent} from './customer/history-point/history-point.component';
import {TickerPutComponent} from './customer/ticker-put/ticker-put.component';
import {TickerCancelComponent} from './customer/ticker-cancel/ticker-cancel.component';
import {MovieShowingComponent} from './movie/movie-showing/movie-showing.component';
import {MovieComingComponent} from './movie/movie-coming/movie-coming.component';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import { BookingComponent } from './booking/booking.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from '../auth.guard';
import {RegisterComponent} from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginpageComponent } from './loginpage/loginpage.component';



const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [{
          path: '',
          component: LoginComponent
        },
          {
            path: 'register',
            component: RegisterComponent
        }]
      },
      {
        path: 'login',
        component: LoginpageComponent
      },
      {
        path: 'promotion',
        component: PromotionComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'booking/:id',
        component: BookingComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'customer' || 'admin'
        }
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
      },
      {
        path: 'movie-showing',
        component: MovieShowingComponent,
        children: [{
          path: 'movie-showing',
          component: LoginComponent
        }]
      },
      {
        path: 'movie-coming',
        component: MovieComingComponent
      },
      {
        path: 'movie-detail/:id',
        component: MovieDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
