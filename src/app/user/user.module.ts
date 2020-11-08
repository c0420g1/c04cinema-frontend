import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserLayoutComponent} from './user-layout/user-layout.component';
import {HomeComponent} from './home/home.component';

import {PromotionComponent} from './promotion/promotion.component';
import {CustomerComponent} from './customer/customer.component';
import {InformationComponent} from './customer/information/information.component';
import {HistoryPointComponent} from './customer/history-point/history-point.component';
import {TickerPutComponent} from './customer/ticker-put/ticker-put.component';
import {TickerCancelComponent} from './customer/ticker-cancel/ticker-cancel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MovieShowingComponent} from './movie/movie-showing/movie-showing.component';
import {MovieComingComponent} from './movie/movie-coming/movie-coming.component';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {SafePipeModule} from 'safe-pipe';
import {BookingComponent} from './booking/booking.component';
import {NgxLoadingModule} from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';
import {ImageUploadComponent} from '../admin/image-upload/image-upload.component';


// @ts-ignore
@NgModule({
    declarations: [UserLayoutComponent, HomeComponent,
        PromotionComponent, CustomerComponent, InformationComponent,
        HistoryPointComponent, TickerPutComponent, TickerCancelComponent,
        MovieShowingComponent, MovieComingComponent, MovieDetailComponent, BookingComponent, ContactComponent, NewsComponent, GalleryComponent, LoginComponent, RegisterComponent, LoginpageComponent, NewsdetailComponent],
   exports: [BookingComponent],
        imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        SafePipeModule,
        NgxLoadingModule,
        NgxPaginationModule,

    ]
})
export class UserModule {
}
