import {Component, OnInit} from '@angular/core';
import {Promotion} from '../../../Promotion';
import {PromotionService} from '../../promotion.service';
import {Customer} from '../customer/model/Customer';
import {GlobalConstants} from '../../model/GlobalConstants';

@Component({
    selector: 'app-promotion',
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
    datas: Promotion[] = [];
    promotion: Promotion;
    proCode: string;
    customerID: string;
    customer: Customer;
    point: number;
    p: number = 1;
    accountID: number;
    check = false;
    constructor(private promotionService: PromotionService) {
    }

    ngOnInit(): void {
        this.promotionService.getAll().subscribe((res: any) => {
            this.datas = res;
            console.log(this.datas);
        });
        this.accountID = GlobalConstants.accId;
        // GlobalConstants để đăng nhập tự động nhận account id của customer
        this.promotionService.findCustomer(GlobalConstants.accId).subscribe(data => {
            this.customer = data;
            console.log(this.customer.id);
        });
    }





    buyPromotion(promotion) {
        this.promotion = promotion;


         // @ts-ignore
        if (parseInt(this.promotion.price) > parseInt(this.customer.currentBonusPoint)) {

            // alert('You are not enough point, Donate blood pls!');
            this.check =true;
        } else {
            // Tính Điểm sau khi đã mua Promotion cho Customer
            this.point = this.customer.currentBonusPoint - this.promotion.price;
            console.log(this.point);
            // Cập nhật điểm về lại cho Customer
            this.promotionService.updatePoint(this.customer.id, this.point).subscribe(data => {
                // @ts-ignore
                this.customer.currentBonusPoint = data;
                console.log(this.customer.currentBonusPoint);

            });
            //
                this.proCode = this.promotionService.getRandomCode(6);
                console.log(this.promotion.id);
                console.log(this.promotion.code);
                this.promotionService.updateCodePC(this.customer.id,this.promotion.id, this.proCode).subscribe();



        }
        this.check = true;

    }

    load() {
        // Load lại trang
        window.location.reload();
    }
}
