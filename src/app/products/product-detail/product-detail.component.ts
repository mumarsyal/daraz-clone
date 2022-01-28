import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	detailsExpanded: boolean = false;
	loading: boolean = false;
	loadingFromSameSeller: boolean = false;
	billToPay: number;
	paramSub: Subscription;
	product: Product;
	productsFromSameSeller: Product[];

	constructor(
		private productService: ProductService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.loading = true;
		this.paramSub = this.activatedRoute.params.subscribe((params) => {
			this.detailsExpanded = false;
			this.productService.getProduct(params.id).subscribe((result) => {
				this.product = result.product;
				this.billToPay = this.product.currentPrice * 1;
				this.loading = false;
				this.loadingFromSameSeller = true;
				this.productService
					.getProducts({ seller: this.product.seller._id })
					.subscribe((data) => {
						this.productsFromSameSeller = data.products;
						const curProductIndex = this.productsFromSameSeller.findIndex(
							(prod) => prod._id === this.product._id
						);
						if (curProductIndex > -1) {
							this.productsFromSameSeller.splice(curProductIndex, 1);
						}
						this.loadingFromSameSeller = false;
					});
			});
		});
	}

	onQuantityChanged(quantity: HTMLInputElement) {
		this.billToPay = this.product.currentPrice * +quantity.value;
		if (+quantity.value >= 10) {
			this.billToPay = this.billToPay - 30;
		}
	}

	ngOnDestroy(): void {
		this.paramSub.unsubscribe();
	}
}
