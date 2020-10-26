import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserLayoutComponent} from './user-layout/user-layout.component';
import {HomeComponent} from './home/home.component';
import {MovieComponent} from './movie/movie.component';
import {PromotionComponent} from './promotion/promotion.component';
import {CustomerComponent} from './customer/customer.component';
import {InformationComponent} from './customer/information/information.component';
import {HistoryPointComponent} from './customer/history-point/history-point.component';
import {TickerPutComponent} from './customer/ticker-put/ticker-put.component';
import {TickerCancelComponent} from './customer/ticker-cancel/ticker-cancel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MovieShowingComponent} from './movie-hieu/movie-showing/movie-showing.component';
import {MovieComingComponent} from './movie-hieu/movie-coming/movie-coming.component';
import {MovieDetailComponent} from './movie-hieu/movie-detail/movie-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {SafePipeModule} from 'safe-pipe';
import {BookingComponent} from './booking/booking.component';


// @ts-ignore
@NgModule({
    declarations: [UserLayoutComponent, HomeComponent, MovieComponent,
        PromotionComponent, CustomerComponent, InformationComponent,
        HistoryPointComponent, TickerPutComponent, TickerCancelComponent,
        MovieShowingComponent, MovieComingComponent,
        MovieDetailComponent, BookingComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        SafePipeModule,

    ]
})
export class UserModule {
}
