import {Component, OnInit} from '@angular/core';
import {Promotion} from '../../../Promotion';
import {PromotionService} from '../../promotion.service';
import {Customer} from '../customer/model/Customer';

@Component({
    selector: 'app-promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
    datas: Promotion[] = [];
    promotion: Promotion;
    customerID: string;
    customer: Customer;
    point: number;
    p: number = 1;

    constructor(private promotionService: PromotionService) {
    }

    ngOnInit(): void {
        this.promotionService.getAll().subscribe((res: any) => {
            this.datas = res;
            console.log(this.datas);
        });

    }

    rescus = '';

    myFunction(id: string) {
        let uri = 'filter={"property":"id","operator":"eq","value":' + id + '}';
        this.rescus = encodeURI(uri);
    }

    // getId(promotion) {
    //     this.promotion = promotion;
    //     // console.log(this.promotion)
    //     this.customerID = this.promotion.customerId;
    //     console.log(this.customerID);
    //     this.myFunction('1');
    //     this.promotionService.getCustomerPoint(this.rescus).subscribe(data => {
    //         this.customer = data;
    //
    //     });
    // }


    buyPromotion(promotion) {
        this.promotion = promotion;
        // console.log(this.promotion)
        this.customerID = this.promotion.customerId;
        console.log(this.customerID);
        this.myFunction('1');
        this.promotionService.getCustomerPoint(this.rescus).subscribe(data => {
            this.customer = data;

        });
        console.log(this.promotion.price);
        console.log(this.customer[0].currentBonusPoint);
        // @ts-ignore
        if (parseInt(this.promotion.price) > parseInt(this.customer[0].currentBonusPoint)) {

            alert('You are not enough point, Donate blood pls!');
        } else {
            // Tính Điểm sau khi đã mua Promotion cho Customer
            this.point = this.customer[0].currentBonusPoint - this.promotion.price;
            console.log(this.point);
            // Cập nhật điểm về lại cho Customer
            this.promotionService.updatePoint(1, this.point).subscribe(data => {
                // @ts-ignore
                this.customer[0].currentBonusPoint = data;
                console.log(this.customer[0].currentBonusPoint);

            });

            this.promotion.code= this.promotionService.getRandomCode(6);
            console.log(this.promotion.id);
            console.log(this.promotion.code);
            this.promotionService.updateCodePC(1,this.promotion.id, this.promotion.code).subscribe();


                alert(this.promotion.code)
        }
    }
}
