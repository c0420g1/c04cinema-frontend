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
customer: Customer= new Customer();
    constructor(private promotionService: PromotionService) {
    }

    ngOnInit(): void {
        this.promotionService.getAll().subscribe((res: any) => {
            this.datas = res;
        });
        // this.getAll();
    }

    // getAll() {
    //     this.promotionService.getAll().subscribe((res: any) => {
    //         this.datas = res;
    //     });
    // }
    //
    getId(promotion) {
        this.promotion = promotion;
        // console.log(this.promotion)
        this.customerID = this.promotion.customerId;
        console.log(this.customerID);
        this.promotionService.getCustomerPoint(1).subscribe(data => {this.customer = data;
        console.log(this.customer)});
    }

    buyPromotion() {
console.log(this.customer.current_bonus_point )
    }
}
