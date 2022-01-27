import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Seller } from '../../shared/seller.model';
import { Category } from '../../categories/category.model';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
	loading: boolean = false;
	products: Product[] = [];
	brands: Set<string> = new Set();
	sellerIds: Set<string> = new Set();
	sellers: Seller[] = [];
	categoryIds: Set<string> = new Set();
	categories: Category[] = [];
	totalProducts: Number = 0;
	queryParamSub: Subscription;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.queryParamSub = this.route.queryParams.subscribe((queryParams) => {
			this.loading = true;
			// this.products = [];

			this.productService.getProducts(queryParams).subscribe((result) => {
				this.products = result.products;
				this.totalProducts = result.totalProducts;
				for (const product of this.products) {
					this.brands.add(product.brand);
					this.sellerIds.add(product.seller._id);
					this.categoryIds.add(product.category._id);
				}

				if (!this.sellers.length) {
					for (const sellerId of this.sellerIds) {
						const index = this.products.findIndex(
							(prod) => prod.seller._id === sellerId
						);
						if (index > -1) {
							this.sellers.push(this.products[index].seller);
						}
					}
				}
				if (!this.categories.length) {
					for (const categoryId of this.categoryIds) {
						const index = this.products.findIndex(
							(prod) => prod.category._id === categoryId
						);
						if (index > -1) {
							this.categories.push(this.products[index].category);
						}
					}
				}
				this.loading = false;
			});
		});
	}

	filterProducts(queryParams: { [k: string]: any }) {
		// changes the route without moving from the current view or
		// triggering a navigation event,
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: queryParams,
			// preserve the existing query params in the route
			queryParamsHandling: 'merge',
			// do not trigger navigation
			// skipLocationChange: true,
		});
	}

	ngOnDestroy(): void {
		this.queryParamSub.unsubscribe();
	}
}
