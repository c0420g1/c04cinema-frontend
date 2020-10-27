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
    customer: Customer = new Customer();
    point: number;

    constructor(private promotionService: PromotionService) {
    }

    ngOnInit(): void {
        this.promotionService.getAll().subscribe((res: any) => {
            this.datas = res;
            console.log(this.datas);
        });

    }

    getId(promotion) {
        this.promotion = promotion;
        // console.log(this.promotion)
        this.customerID = this.promotion.customerId;
        console.log(this.customerID);
        this.promotionService.getCustomerPoint(1).subscribe(data => {
            this.customer = data;
            console.log(this.customer);
            this.promotionService.updatePoint(1, this.point).subscribe(data => {
                // @ts-ignore
                this.customer.currentBonusPoint = data;
                console.log(this.customer.currentBonusPoint)
            });
        });
    }

    buyPromotion() {
        // @ts-ignore
        if (parseInt(this.promotion.price) > parseInt(this.customer.currentBonusPoint)) {
            alert('You are not enough point, Donate blood pls!');
        } else {
            // @ts-ignore
            this.point = parseInt(this.customer.currentBonusPoint) - parseInt(this.promotion.price);
            console.log(this.point);
        }


    }
}
