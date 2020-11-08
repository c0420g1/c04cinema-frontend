import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../model/Customer';
import {CustomerService} from '../service/customer.service';
import {Account} from '../model/Account';
import {AccountService} from '../service/account.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Error1} from '../model/error1';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {

    customerForm: FormGroup;
    accountForm: FormGroup;
    account: Account;
    customer: Customer;
    rescus: string;
    resacc: string;
    error1s: Error1[];
    error2s: Error1 = new Error1();
    passOld: string;
    passNew: string;
    passReNew: string;
    checkPassNew: boolean;
    checkUpInfor = false;
    sub: Subscription;
    errorPassNew: string;
    errorPassReNew: string;
    regexPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,20}$');


    constructor(private customerService: CustomerService,
                private accountService: AccountService,
                private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\\W|_]+')]],
            birthday: ['', [Validators.required, dateValidator, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
            gender: ['', [Validators.required, Validators.pattern('Male|Female')]],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,}(@)[a-zA-Z]{3,}\.[a-zA-Z]{3}$/)]],
            cardid: ['', [Validators.required, Validators.pattern('[\\d]{3,}(-)[\\d]{2,}(-)[\\d]{4,}')]],
            phone: ['', [Validators.required, Validators.pattern('^[\\d\\s]+$')]],
            address: ['', [Validators.required, Validators.maxLength(200)]],
        });
        this.accountForm = this.fb.group({
            username: ['', Validators.required],
        });


        this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const key = paramMap.get('id');
            this.myFunction(key);
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
        });

    }


    myFunction(id: string) {
        let uri = 'filter={"property":"id","operator":"eq","value":' + id + '}';
        this.rescus = encodeURI(uri);
    }

    myFunction1(id: number) {
        let uri = 'filter={"property":"id","operator":"eq","value":' + id + '}';
        this.resacc = encodeURI(uri);
    }


    // Huỳnh Văn Thịnh.
    // Chỉnh sửa thông tin customer
    editCustomer() {
        if (this.customerForm.valid) {
            const {value} = this.customerForm;
            const data = {
                ...this.customer,
                ...value
            };
            this.customerService.updateCustomer(data, this.customer.id).subscribe(
                next => {
                    this.error1s = next;
                    console.log(this.error1s);
                    if (this.error1s.length == 0) {
                        this.ngOnInit();
                        this.reloadPage();
                        this.checkUpInfor = true;}
                },
                error => console.log(error)
            );
        }
    };

    checkRegexPass() {
        if (!this.regexPass.test(this.passNew) || !this.regexPass.test(this.passReNew)) {
            this.errorPassNew = 'New Pass length pass word > 8 and < 20 or pass format Abcd123';
            this.errorPassReNew = 'Re New Pass length pass word > 8 and < 20 or pass format Abcd123';
            this.checkUpInfor = false;
        } else {
            this.editPass();
        }
    }

    // Huỳnh Văn Thịnh.
    // chỉnh sửa password
    editPass() {
        if (this.passNew != this.passReNew) {
            this.checkPassNew = true;
            this.error2s = null;
        } else {
            this.accountService.updatePassword(this.passOld, this.passNew, this.account.id).subscribe(
                next => {
                    this.error2s = next[0];
                    this.checkPassNew = false;
                    this.errorPassReNew = null;
                    this.errorPassNew = null;
                    this.passOld = '';
                    this.passNew = '';
                    this.passReNew = '';
                    this.ngOnInit();
                },
                error => console.log(error)
            );
        }
    };


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    reloadPage() {
        window.location.reload();
    }

}

function dateValidator(formControl: FormControl) {
    let date1: string[];
    date1 = formControl.value.split('-');
    const o_date = new Intl.DateTimeFormat;
    const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
    const m_date = o_date.formatToParts().reduce(f_date, {});
    let dateNumber = ((parseInt(date1[0])) * 365) + ((parseInt(date1[1])) * 30) + (parseInt(date1[2]));
    let dateNumberNow = ((parseInt(m_date.year)) * 365) + ((parseInt(m_date.month)) * 30) + (parseInt(m_date.day));
    if ((dateNumber < (dateNumberNow - 36000))) {
        return {checkDate: true};
    }
    if ((dateNumber > dateNumberNow)) {
        return {checkDate: true};
    }
    return null;
}
