import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
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
}
