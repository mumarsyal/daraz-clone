import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Seller } from '../shared/seller.model';
import { Product } from './product.model';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private productsApiUrlPrefix = environment.apiUrlPrefix + 'products/';

	constructor(private http: HttpClient) {}

	getProducts(queryParams?: {}) {
		return this.http.get<{
			message: string;
			products: Product[];
			totalProducts: number;
			fetchedProducts: number;
		}>(`${this.productsApiUrlPrefix}`, {
			params: queryParams,
		});
	}

	getProduct(id: string) {
		return this.http.get<{
			message: string;
			product: Product;
		}>(`${this.productsApiUrlPrefix}` + id);
	}

	getBrands() {
		return this.http.get<{
			message: string;
			brands: string[];
			totalBrands: number;
		}>(`${this.productsApiUrlPrefix}brands`);
	}

	getSellers() {
		return this.http.get<{
			message: string;
			sellers: Seller[];
			totalSellers: number;
		}>(`${environment.apiUrlPrefix}sellers/`);
	}
}
