import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';
import {DatePipe} from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        UserModule,
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
