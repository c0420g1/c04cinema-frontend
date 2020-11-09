import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from './service/customer.service';
import {Customer} from './model/Customer';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../user-layout/token-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Image} from '../../admin/Image';
import {ImageService} from '../../service/image.service';
import {finalize} from 'rxjs/operators';
import {Error1} from './model/error1';
import {GlobalConstants} from '../../model/GlobalConstants';

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
    @Output()
    getLinkFather: EventEmitter<string> = new EventEmitter<string>();
    imgSrc = 'assets/images/banners/300.png';
    loading = false;
    editImage: Image = {
        key: null,
        name: '',
        imageUrl: '',
        category: '',
        caption: ''
    };
    confirm = true;
    dateImage: number;
    selectedImage: any = null;
    error1s: Error1[];
    checkImage  = false;


    constructor(private customerService: CustomerService
        , private activatedRoute: ActivatedRoute
        , private token: TokenStorageService, private storage: AngularFireStorage, private service: ImageService) {
    }

    ngOnInit(): void {
        this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const key = paramMap.get('id');
            this.myFunction(key);
            this.customerService.getCustomerById(this.rescus).subscribe(
                next => {
                    this.customer = next[0];
                    this.point = this.customer.currentBonusPoint;
                    console.log(this.customer.imageUrl);
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

    showPreview(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            this.checkImage = true;
            reader.onload = (e: any) => {
                this.imgSrc = e.target.result;
                console.log('hello' + e.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
            this.selectedImage = event.target.files[0];
            console.log(this.selectedImage);
        } else {
            this.imgSrc = 'assets/images/banners/300.png';
            this.selectedImage = null;
        }
    }

    addNewImage() {
        this.loading = true;
        this.dateImage = new Date().getTime();
        this.editImage.name = `${this.dateImage}`;
        const filePath = `${this.editImage.category}/${this.selectedImage.name}_${this.dateImage}`;
        const fileRef = this.storage.ref(filePath);

        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                    this.customer.imageUrl = url,
                        this.customerService.updateCustomer(this.customer).subscribe(
                            next => {
                                this.error1s = next;
                                console.log(this.error1s);
                                this.token.saveImageUrl(this.customer.imageUrl)
                                window.location.reload();
                            });
                    this.checkImage = false;
                    this.service.insertImageDetails(this.editImage);
                    this.confirm = this.service.imageConfirm;
                    this.loading = false;
                });
            })
        ).subscribe();
    }
}
