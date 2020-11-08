import {Component, OnInit} from '@angular/core';
import {CustomerService} from './service/customer.service';
import {Customer} from './model/Customer';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../user-layout/token-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


    customer: Customer;
    rescus: string;
    point = 0;
    check: boolean;
    sub: Subscription;


    constructor(private customerService: CustomerService
                , private activatedRoute: ActivatedRoute
                , private token: TokenStorageService) {
    }

    ngOnInit(): void {
        this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const key = paramMap.get('id');
            this.myFunction(key);
            this.customerService.getCustomerById(this.rescus).subscribe(
                next => {
                    this.customer = next[0];
                    this.point = this.customer.currentBonusPoint;
                },
                error => {
                    console.log(error);
                    this.customer = null;
                }
            );
        });

        this.check = true;
    }

    myFunction(id: string) {
        let uri = 'filter={"property":"accountId","operator":"eq","value":' + id + '}';
        this.rescus = encodeURI(uri);
    }

    checkShow() {
        this.check = false;
    }
    logout() {
        this.token.signOut();
        window.location.reload();
    }
}
