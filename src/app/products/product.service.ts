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

	getProducts(limit?: number) {
		const queryParams = `?limit=${limit}`;

		return this.http.get<{
			message: string;
			products: Product[];
			totalProducts: number;
		}>(`${this.productsApiUrlPrefix}` + queryParams);
	}
}
