import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {MovieComponent} from './movie/movie.component';
import {TicketComponent} from './ticket/ticket.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {BookingTicketComponent} from './booking-ticket/booking-ticket.component';
import {BannerComponent} from './banner/banner.component';
import { TheaterComponent } from './theater/theater.component';
import {HallListComponent} from './hall-list/hall-list.component';
import {SeatComponent} from './seat/seat.component';
import {NewsComponent} from './news/news.component';
import { BookingComponent } from '../user/booking/booking.component';

import { PromotionComponent } from './promotion/promotion.component';
import {GalleryComponent} from '../admin/gallery/gallery.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'banner',
        component: BannerComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'movie',
        component: MovieComponent
      },
      {
        path: 'ticket',
        component: TicketComponent
      },
      {
        path: 'image',
        component: ImageUploadComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'booking-ticket',
        component: BookingTicketComponent
      },
      {
        path: 'booking',
        component: BookingComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'promotion',
        component: PromotionComponent
      },
      {
        path: 'theater',
        component: TheaterComponent,
        children:[
          {
            path: 'hall/:id',
            component: HallListComponent,
            children:[
              {
                path: 'seat/:id',
                component: SeatComponent,
              }
            ]
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
export class AdminRoutingModule { }
