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

	addProduct(product: Product) {
		const productData = new FormData();
		for (const key in product) {
			if (
				Object.prototype.hasOwnProperty.call(product, key) &&
				key !== 'images' &&
				key !== 'colors' &&
				key !== 'features' &&
				key !== 'inTheBox'
			) {
				productData.append(key, product[key]);
			}
		}
		for (let i = 0; i < product.images.length; i++) {
			productData.append(
				'images',
				product.images[i],
				product.images[i]['name']
			);
		}
		for (let i = 0; i < product.colors.length; i++) {
			productData.append('colors', product.colors[i]);
		}
		for (let i = 0; i < product.features.length; i++) {
			productData.append('features', product.features[i]);
		}
		for (let i = 0; i < product.inTheBox.length; i++) {
			productData.append('inTheBox', product.inTheBox[i]);
		}

		return this.http.post<{ message: string; product: Product }>(
			`${this.productsApiUrlPrefix}`,
			productData
		);
	}

	getProducts(queryParams?: {}) {
		return this.http.get<{
			message: string;
			products: Product[];
			totalProducts: number;
			fetchedProducts: number;
			filteredProducts: number;
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

	deleteProduct(productId: string) {
		return this.http.delete(`${this.productsApiUrlPrefix}` + productId);
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
