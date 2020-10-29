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
        AdminModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
