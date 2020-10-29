import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from 'src/environments/environment';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieComponent } from './movie/movie.component';
import { TicketComponent } from './ticket/ticket.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import { BannerComponent } from './banner/banner.component';
import { PromotionAdminComponent } from './promotion-admin/promotion-admin.component';

@NgModule({
  declarations: [AdminLayoutComponent, DashboardComponent, MovieComponent, TicketComponent, ImageUploadComponent, GalleryComponent, BookingTicketComponent, BannerComponent, PromotionAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class AdminModule { }
