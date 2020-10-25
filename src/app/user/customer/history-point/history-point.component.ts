import {Component, OnInit} from '@angular/core';
import {PointService} from '../service/point.service';
import {Point} from '../model/Point';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
    selector: 'app-history-point',
    templateUrl: './history-point.component.html',
    styleUrls: ['./history-point.component.css']
})
export class HistoryPointComponent implements OnInit {

    pointS: Point[] = [];
    pointListS: Point[] = [];
    pointForm: FormGroup;
    check = true;
    message: string;
    entityNumber = 0;
    totalEntities: number;
    currentPage = 1;
    totalPage: number;
    jumpPage: any;
    sub: Subscription;

    constructor(private pointService: PointService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.pointForm = this.fb.group({
            contractStarDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
            contractEndDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
            gender: new FormControl('', Validators.required)
        });
        this.searchPoint();
    }


    get f() {
        return this.pointForm.controls;
    }

    end: string;
    star: string;
    error = false;
    Plus: string;


    compareTwoDates() {
        let dateEnd: string[];
        let dateStar: string[];
        dateEnd = this.end.split('-');
        dateStar = this.star.split('-');
        let dateNumberEnd = (parseInt(dateEnd[0]) * 12 * 365) + (parseInt(dateEnd[1]) * 30) + (parseInt(dateEnd[2]));
        let dateNumberStar = (parseInt(dateStar[0]) * 12 * 365) + (parseInt(dateStar[1]) * 30) + (parseInt(dateStar[2]));
        if (dateNumberEnd <= dateNumberStar) {
            this.error = true;
        } else {
            this.error = false;
        }
    }

    searchPoint() {
        if (this.Plus == 'true') {
            this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
                const key = paramMap.get('id');
                this.pointService.getTickerPlusById(key, this.currentPage, this.star, this.end).subscribe(next => (this.pointS = next), error => (this.pointS = []));
                this.pointService
                    .getTickerListPlusById(key, this.star, this.end)
                    .subscribe(next => {
                        (this.pointListS = next
                            , this.totalEntities = this.pointListS.length
                            , this.totalPage = this.totalEntities / 10),
                            error => (this.pointListS = []);
                        if (next.length === 0) {
                            this.message = 'not Data!';
                        } else {
                            this.message = '';
                        }
                    });
            });
        }
        if (this.Plus == 'false') {
            this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
                const key = paramMap.get('id');
                this.pointService.getTickerUseById(key, this.currentPage, this.star, this.end).subscribe(next => (this.pointS = next), error => (this.pointS = []));
                this.pointService
                    .getTickerListUseById(key, this.star, this.end)
                    .subscribe(next => {
                        (this.pointListS = next
                            , this.totalEntities = this.pointListS.length
                            , this.totalPage = this.totalEntities / 10),
                            error => (this.pointListS = []);
                        if (next.length === 0) {
                            this.message = 'not Data!';
                        } else {
                            this.message = '';
                        }
                    });
            });
        }
    }

    changeGender(e) {
        this.Plus = e.target.value;
    }

    prePage() {
        if (this.currentPage >= 2) {
            this.currentPage--;
            this.jumpPage = this.currentPage;
        }
        this.ngOnInit();
    }

    goToPage() {
        this.currentPage = this.jumpPage;
        this.ngOnInit();
    }

    nexPage() {
        if (this.currentPage < this.totalEntities / 10) {
            this.currentPage++;
            this.jumpPage = this.currentPage;
        }
        this.ngOnInit();
    }
}
