import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {DatePipe} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {httpInterceptorProviders} from './user/user-layout/auth-interceptor.service';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        UserModule,
        AdminModule,
        ChartsModule
    ],
    providers: [DatePipe,httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
