import {Component, OnInit} from '@angular/core';
import {CustomerService} from './service/customer.service';
import {Customer} from './model/Customer';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    customer: Customer;
    rescus: string;
    point = 0;

    constructor(private customerService: CustomerService,private activatedRoute: ActivatedRoute, ) {
    }

    ngOnInit(): void {
        this.myFunction(1);
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


    }

    myFunction(id: number) {
        let uri = 'filter={"property":"id","operator":"eq","value":' + id + '}';
        this.rescus = encodeURI(uri);
    }

}
