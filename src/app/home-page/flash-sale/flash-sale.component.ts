import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../../products/product.model';
import { ProductService } from '../../products/product.service';

@Component({
	selector: 'app-flash-sale',
	templateUrl: './flash-sale.component.html',
	styleUrls: ['./flash-sale.component.css'],
})
export class FlashSaleComponent implements OnInit, OnDestroy {
	loading: boolean = false;
	saleItems: Product[] = [];
	endingInHours = '00';
	endingInMinutes = '00';
	endingInSeconds = '00';
	countDownInterval;

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.loading = true;

		this.productService
			.getProducts({ pageSize: 6, pageNum: 1 })
			.subscribe((result) => {
				this.saleItems = result.products;
				this.loading = false;
			});

		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const endingOn = new Date('02/05/2022').getTime();

		this.countDownInterval = setInterval(() => {
			const now = new Date().getTime();
			const distance = endingOn - now;

			this.endingInHours = Math.floor(distance / hour).toString();
			this.endingInMinutes = Math.floor((distance % hour) / minute).toString();
			this.endingInSeconds = Math.floor(
				(distance % minute) / second
			).toString();

			//do something later when date is reached
			if (distance < 0) {
				this.endingInHours = '00';
				this.endingInMinutes = '00';
				this.endingInSeconds = '00';
				clearInterval(this.countDownInterval);
			}
		}, 0);
	}

	ngOnDestroy(): void {
		clearInterval(this.countDownInterval);
	}
}
