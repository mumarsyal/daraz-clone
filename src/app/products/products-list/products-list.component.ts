import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Seller } from '../../shared/seller.model';
import { Category } from '../../categories/category.model';
import { CategoryService } from '../../categories/category.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
	loading: boolean = false;
	loadingBrands: boolean = false;
	loadingSellers: boolean = false;
	loadingCategories: boolean = false;
	products: Product[] = [];
	totalProducts: number = 0;
	fetchedProducts: number = 0;
	brands: string[] = [];
	sellers: Seller[] = [];
	categories: Category[] = [];
	filtersApplied = {
		brand: [],
		seller: [],
		category: [],
		sort: null,
	};
	queryParamSub: Subscription;

	constructor(
		private productService: ProductService,
		private categoryService: CategoryService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.queryParamSub = this.route.queryParams.subscribe((queryParams) => {
			this.loading = true;
			this.loadingBrands = true;
			this.loadingSellers = true;
			this.loadingCategories = true;

			if (queryParams['brand']) {
				// if 'brand' exists in query params
				if (Array.isArray(queryParams['brand'])) {
					// if there are more than 1 query params with the name of 'brand',
					// copy the full array to 'this.filtersApplied.brand'
					this.filtersApplied.brand = queryParams['brand'].slice();
				} else if (!this.filtersApplied.brand.includes(queryParams['brand'])) {
					// if there is only one query param with the name of 'brand',
					// and it does NOT already exist in 'this.filtersApplied.brand' array,
					// add it to 'this.filtersApplied.brand' array
					this.filtersApplied.brand.push(queryParams['brand']);
					// if it already exists in 'this.filtersApplied.brand' array,
					// ignore it
				}
			}
			if (queryParams['seller']) {
				// if 'seller' exists in query params
				if (Array.isArray(queryParams['seller'])) {
					// if there are more than 1 query params with the name of 'seller',
					// copy the full array to 'this.filtersApplied.seller'
					this.filtersApplied.seller = queryParams['seller'].slice();
				} else if (
					!this.filtersApplied.seller.includes(queryParams['seller'])
				) {
					// if there is only one query param with the name of 'seller',
					// and it does NOT already exist in 'this.filtersApplied.seller' array,
					// add it to 'this.filtersApplied.seller' array
					this.filtersApplied.seller.push(queryParams['seller']);
					// if it already exists in 'this.filtersApplied.seller' array,
					// ignore it
				}
			}
			if (queryParams['category']) {
				// if 'category' exists in query params
				if (Array.isArray(queryParams['category'])) {
					// if there are more than 1 query params with the name of 'category',
					// copy the full array to 'this.filtersApplied.category'
					this.filtersApplied.category = queryParams['category'].slice();
				} else if (
					!this.filtersApplied.category.includes(queryParams['category'])
				) {
					// if there is only one query param with the name of 'category',
					// and it does NOT already exist in 'this.filtersApplied.category' array,
					// add it to 'this.filtersApplied.category' array
					this.filtersApplied.category.push(queryParams['category']);
					// if it already exists in 'this.filtersApplied.category' array,
					// ignore it
				}
			}
			if (queryParams['sort']) {
				this.filtersApplied.sort = queryParams['sort'];
			}

			this.productService.getProducts(queryParams).subscribe((result) => {
				this.products = result.products;
				this.totalProducts = result.totalProducts;
				this.fetchedProducts = result.fetchedProducts;

				this.loading = false;
			});

			this.productService.getBrands().subscribe((result) => {
				this.brands = result.brands;
				this.loadingBrands = false;
			});

			this.productService.getSellers().subscribe((result) => {
				this.sellers = result.sellers;
				this.loadingSellers = false;
			});

			this.categoryService.getCategories().subscribe((result) => {
				this.categories = result.categories;
				this.loadingCategories = false;
			});
		});
	}

	filterProducts(filter: string, value: string) {
		if (filter === 'sort') {
			this.filtersApplied.sort = value;
		} else {
			const index = this.filtersApplied[filter].indexOf(value);

			if (index > -1) {
				this.filtersApplied[filter].splice(index, 1);
			} else {
				this.filtersApplied[filter].push(value);
			}
		}

		let qParams = { ...this.filtersApplied };

		if (!qParams.brand.length) {
			delete qParams.brand;
		}
		if (!qParams.seller.length) {
			delete qParams.seller;
		}
		if (!qParams.category.length) {
			delete qParams.category;
		}
		if (!qParams.sort) {
			delete qParams.sort;
		}

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: qParams,
		});
	}

	ngOnDestroy(): void {
		this.queryParamSub.unsubscribe();
	}
}
