import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {MovieComponent} from './movie/movie.component';
import {TicketComponent} from './ticket/ticket.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {GalleryComponent} from './gallery/gallery.component';
import {BookingTicketComponent} from './booking-ticket/booking-ticket.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
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
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
