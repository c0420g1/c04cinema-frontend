import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../model/Customer';
import {CustomerService} from '../service/customer.service';
import {Account} from '../model/Account';
import {AccountService} from '../service/account.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

    customerForm: FormGroup;
    accountForm: FormGroup;
    account: Account;
    customer: Customer;
    rescus: string;
    resacc: string;

    passOld: string;
    passNew: string;
    passReNew: string;
    checkPass: boolean;
    checkPassNew: boolean;
    checkUppass: boolean;
    checkUpInfor: boolean;

    constructor(private customerService: CustomerService, private accountService: AccountService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', Validators.required],
            birthday: ['', Validators.required],
            phone: ['', Validators.required],
            gender: ['', Validators.required],
            cardid: ['', Validators.required],
            accountId: ['', Validators.required],
        });
        this.accountForm = this.fb.group({
            id: [''],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });


        this.myFunction(1);

        this.customerService.getCustomerById(this.rescus).subscribe(
            next => {
                this.customer = next[0];
                this.customerForm.patchValue(this.customer);
                this.myFunction1(this.customer.accountId);
                this.accountService.getAccountById(this.resacc).subscribe(
                    next => {
                        this.account = next[0];
                        this.accountForm.patchValue(this.account);
                    },
                    error => {
                        console.log(error);
                        this.account = null;
                    }
                );
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

    myFunction1(id: number) {
        let uri = 'filter={"property":"id","operator":"eq","value":' + id + '}';
        this.resacc = encodeURI(uri);
    }

    editCustomer() {
        console.log(this.customerForm);
        if (this.customerForm.valid) {
            const {value} = this.customerForm;
            const data = {
                ...this.customer,
                ...value
            };
            this.customerService.updateCustomer(data, this.customer.id).subscribe(
                next => {
                    this.checkUpInfor = true;
                    this.ngOnInit();
                },
                error => console.log(error)
            );
        }
    };

    editPass() {
        if (this.passReNew != this.passNew) {
            this.checkPassNew = true;
            this.checkUppass = false;
        }
        if (this.passOld == this.account.password) {
            this.account.password = this.passNew;
            this.accountService.updatePassword(this.account).subscribe(
                next => {
                    this.ngOnInit();
                    this.checkUppass= true;
                    this.checkPass = false;
                    this.checkPassNew = false;
                },
                error => console.log(error)
            );
        } else {
            this.checkPass = true;
            this.checkUppass = false;
        }
    };

}
